/**
* @fileOverview Clouber loader js library.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module clouber
* @requires Clouber.* Clouber.Core.*
*/


/**
* Clouber system core modules, using namespace Clouber.Core
* @class  Clouber.Core
* @module Clouber.Core
* @namespace Clouber.Core
*/
Clouber.namespace("Clouber.Core");

/**
* Clouber loader object to load js, html, css and json files, etc.
* @class  Clouber.Core.Loader
* @namespace Clouber.Core
* @extends Clouber.Core.BaseObject
* @constructor
*/
Clouber.Core.Loader = function (config) {
    "use strict";

    /**
     * @property _config private config object
     * @config
     * @ignore
     */
    var _config = config;

    /**
    * Add a script tab to load a js module.
    * @function require
    * @param  {string} name JS module name. name delimiter
    *          can be "/", ".", "_", and "\".
    */
    this.require = function (path, name) {
        var href;

        href = _config.getModulePath(name, path, "js");
        this.loadJs(href);
    };

    /**
    * Include a js file into script tag.
    * @function include
    * @param  {string} name JS module name.
    */
    this.include = function (path, name) {
        var href;
        href = _config.getModulePath(name, path, "js");
        this._includeJs(href);
    };

    /**
    * Load application module with module namespace, type and theme.
    * @function load
    * @param  {object} params Parameter object
    * @param  params.namespace   Module's namespace.
    * @param  params.theme  Theme's name.
    * @param  type  Type of the module(may be file extension name),
    *          such as js, css, html.
    * @return {string} url.
    */
    this.load = function (params, path, type) {
        var result, href = null;

        if (type === undefined) {
            type = "js";
        }

        href = _config.getModulePath(
            params.namespace,
            path,
            type,
            params.theme
        );

        if ((type.toLowerCase() === "js") ||
                (type.toLowerCase() === "javascript")) {

            this.loadJs(href);
            result = href;

        } else if (type.toLowerCase() === "css") {
            this.loadCss(href);
            result = href;

        } else if (type.toLowerCase() === "html") {
            result = href;

        }

        return result;
    };


    /**
    * Get application module markup.
    * @function get
    * @param  {object} params Parameter object
    * @param  params.namespace   Module's namespace.
    * @param  params.theme  Theme's name.
    * @param  type  Type of the module(may be file extension name),
    *          such as js, css, html.
    * @return {string} resource.
    */
    this.get = function (params, path, type, success, error, context) {
        var href;

        if ((type === undefined) || (type === null)) {
            type = "js";
        }

        href = _config.getModulePath(
            params.namespace,
            path,
            type,
            params.theme
        );

        // load file through ajax
        Clouber.document.ajax({
            method: 'GET',
            async: params.async,
            url: params.href,
            data: params.data,
            dataType: "text",
            context: context,
            success: success,
            error: error
        });

        return href;
    };

    /**
    * Load CSS file .
    * @function loadCss
    */
    this.loadCss = function (href) {
        if (Clouber.document.size("head link[href=\"" + href + "\"]") === 0) {
            Clouber.document.append("head", '<link rel="stylesheet" href="' +
                    href + '" type="text/css" />');
        }
    };

    /**
    * Load js file asynchronously.
    * @function loadJs
    */
    this.loadJs = function (href) {
        var script;

        if (Clouber.document.size("head script[src = \"" + href + "\"]") <= 0) {

            script = document.createElement('script'); // using script tag
            script.src = href;
            script.type = "text/javascript";
            document.getElementsByTagName('head')[0].appendChild(script);
           // document.write("<scr" + "ipt src = \"" + href +
           //         "\"></sc" + "ript>");
        }
    };


    /**
    * Load message package.
    * @function message
    */
    this.message = function (lang) {
        switch (lang) {
        case "cn":
            Clouber.message = new Clouber.Core.Message_CN();
            break;
        case "en":
            Clouber.message = new Clouber.Core.Message_EN();
            break;
        default:
            Clouber.message = new Clouber.Core.Message_EN();
            Clouber.log(Clouber.message.unsupportedLanguage);
        }
    };

    /**
    * @ignore Include a js file into script tag.
    * @function _includeJs
    */
    this._includeJs = function (href) {      //
        // include js using sync ajax
        Clouber.document.ajax({
            method: "GET",
            url: href,
            async: false,
            dataType: "script"
        });
    };

};
Clouber.extend(Clouber.Core.Loader, Clouber.Core.BaseObject);

/**
* Clouber loader object initialization.
*/
Clouber.set("loader", new Clouber.Core.Loader(Clouber.config));
Clouber.lock(Clouber.loader);

