﻿/**
* @fileOverview Clouber config, loader js library.
* @copyright Clouber.org 2012
* @author Jon Zhou
* @module clouber
* @requires Clouber
*/


/**
* Clouber system core modules, using namespace Clouber.Sys.Core
* @class  Clouber.Sys.Core
* @module Clouber.Sys.Core
* @namespace Clouber.Sys.Core
*/
Clouber.namespace("Clouber.Sys.Core");

/**
* Configuration Management object.
* @class  Clouber.Sys.Core.ConfigManager
* @namespace Clouber
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.Sys.Core.ConfigManager = function () {
    'use strict';

    /**
    * private config object.
    * @ignore
    * @property
    * @config
    * @private
    */
    var _conf = null;

    /**
    * Get configuration data.
    * @function getConfig
    * @return {object} config object.
    */
    this.getConfig = function () {
        var o;
        try {
            if (_conf === null) {
                _conf = new Clouber.Sys.Core.Cache();
            }
            o = _conf.get("CLOUBER_CONFIG", null);
            return JSON.parse(o);
        } catch (e) {
            e.code = "Clouber.Sys.Core.ConfigManager#getConfig";
            console.log(e);
        }
    };

    /**
     * Set basic config of Clouber.
     * @function setting
     * @param {object} config Clouber system global config.
     */
    this.setting = function (config) {
        var o;
        try {
            if (_conf === null) {
                _conf = new Clouber.Sys.Core.Cache();
            }
            if (typeof config !==  'undefined') {
                o = _conf.get("CLOUBER_CONFIG");
                o = JSON.parse(o);
                o = Clouber.merge(o, config);
                _conf.put(
                    "CLOUBER_CONFIG",
                    JSON.stringify(o),
                    null
                );
            }
        } catch (e) {
            e.code = "Clouber.Sys.Core.ConfigManager#getConfig";
            console.log(e);
        }
    };

    /**
    * Get base path.
    * @function getBase
    */
    this.getBase = function () {
        return this.getConfig().base;
    };

    /**
    * Get current version of Clouber.
    * @function getVersion
    */
    this.getVersion = function () {
        var v = this.getConfig().version;
        if (v === undefined) {
            v = this.getConfig().versions[0].version;
        }
        return v;
    };

    /**
    * Get configuration by version.
    * @function getConf
    * @param (string) version Current version.
    * @return {object} config object.
    */
    this.getConf = function (version) {
        var i, conf, v;

        if (version === undefined) {
            version = this.getVersion();
        }

        v = this.getConfig().versions;
        for (i in v) {
            if (version === v[i].version) {
                conf = Clouber.merge(
                    this.getConfig(),
                    v[i]
                );
                break;
            }
        }
        return conf;
    };

    /**
    * Get application configuration by version.
    * @function getAppConf
    * @param (string) version Current version.
    * @return {object} config object.
    */
    this.getAppConf = function (version, app) {
        var i, j, conf, appconf;

        conf = this.getConf(version);

        for (i in conf.apps) {

            if (app === conf.apps[i].app) {
                appconf = Clouber.merge(appconf, conf.apps[i]);

                for (j in conf.apps[i].versions) {
                    if (appconf.version ===
                            conf.apps[i].versions[j].version) {

                        appconf = Clouber.merge(
                            appconf,
                            conf.apps[i].versions[j]
                        );
                        break;
                    }
                }
                break;
            }
        }
        return appconf;
    };
    
    /**
    * Load a configuration information.
    * @function loadConf
    */
    this.loadConf = function () {
        var that = this,
            c = this.getConfig();
        if ((typeof c !== "object") || (c !== null)) {
            setTimeout(function () {that._loadConf();}, 60000);
        } else {
            this._loadConf();
        }
    }
  

    /**
    * Internal configuration loading function.
    * @function loadConf
    * @param  {object} params Parameter object
    * @param  {string} params.data  post data
    * @param  {string} params.href config url
    * @param  {boolean} params.async load mode
    * @param  {function} params.loaded Loaded event handler,use to callback
    * @param  {object} params.loadedContext loading event context
    * @param  {function} params.success Success event handler
    * @param  {function} params.error Error event handler
    * @param  {object} params.context loading event context
    */
    this._loadConf = function (params) {

        if (params === undefined) {    // default loading params
            params = {};
            params.async = false;
            if ((this.getConfig() === undefined) ||
                    (this.getConfig() === null)) {
                params.href = "Sys/conf.json";
            } else {
                params.href = this.getConfig().base + "/Sys/conf.json";
            }
            params.context = this;
            params.success = this.configLoaded;
        }

        if (params.error === undefined) {
            params.error = this.configError;    // set default event
        }

        // load config through ajax
        Clouber.document.ajax({
            method: 'GET',
            async: params.async,
            url: params.href,
            data: params.data,
            dataType: "text",
            context: params.context,
            success: params.success,
            complete: params.loaded,
            error: params.error
        });
        // load config through LocalStorage
    };

    /**
    * Get URL by name, type and theme.
    * @function getModulePath
    * @param {string} name Module's name(space).
    * @param {string} type File type, such as js, css, html, json, conf.
    * @param {string} theme Control's theme name.
    * @return {string} url
    */
    this.getModulePath = function (name, path, type, theme) {
        var href, names, conf, i, leng;

        try {
            if (typeof type !== "undefined") {
                type = type.toLowerCase();
            }

            if ((theme === undefined) || (theme === null)) {
                theme = "default";
            }

            name = name.replace(/\./g, "/");  // replace .
            name = name.replace(/\_/g, "/");  // replace _
            name = name.replace(/\\/g, "/");  // replace \

            names = name.split("/");

            if (this.getBase() === ".") {
                href = "";
            } else {
                href = this.getBase()  + "/";
            }

            if (names[0].toLowerCase() === "clouber") {

                if (names[1].toLowerCase() === "sys") {
                    href = href + "Sys/" + this.getConfig().version;

                } else {
                    href = href + path;
                }

            } else {
                href = href + path + "/" + names[1];
            }

            for (i = 2, leng = names.length; i < leng; i++) {
                href = href + "/" + names[i];
            }

            if (type === "js") {
                href = href + "/" + names[i - 1] + ".js";

            } else if (type === "json") {
                href = href + "/conf.json";

            } else if (type === "conf") {
                href = href + "/" + names[i - 1] + ".conf";

            } else if ((type === "css") || (type === "html")) {
                href = href + "/theme/" + theme + "/" +
                        names[i - 1] + "." + type;

            } else {
                href = href + "/";
            }

            return href;
        } catch (e) {
            e.code = "Clouber.Sys.Core.ConfigManager#getModuleUrl";
            e.text = name;
            Clouber.log(e);
        }
    };

    /**
    * Default config loading error event, can be overrided
    * @event configError
    * @function configError
    * @param {string} textStatus Can be timeout, error, abort, parsererror.
    * @param {exception}  errorThrown receives the textual portion of
    *     the HTTPstatus, such as "Not Found" or "Internal Server Error."
    */
    this.configError = function (textStatus, errorThrown, url) {
        var e = new Clouber.Exception({
            number: 10004,
            name: "ConfigLoadError",
            message: Clouber.message.loadError + " (" + url + ")",
            description: errorThrown,
            text: textStatus,
            code: "Clouber.Sys.Core.ConfigManager#configError"
        });
        Clouber.log(e);
    };

    /**
    * Default config loading success event
    * @event configLoaded
    * @function configLoaded
    * @param {string} data config text.
    */
    this.configLoaded = function (data) {
        try {
            var conf = JSON.parse(data);
            this.setting(conf);
        } catch (e) {
            e.description = Clouber.message.typeErrror;
            e.text = data;
            Clouber.log(e);
        }
    };
};
Clouber.extend(Clouber.Sys.Core.ConfigManager, Clouber.BaseObject);
/**
* Clouber object initialization.
*/
Clouber.config = new Clouber.Sys.Core.ConfigManager();
Clouber.config.loadConf();


/**
* @class  Clouber.loader Clouber module management object.
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.Sys.Core.ModuleLoader = function (config) {
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

        // load config through ajax
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
            Clouber.message = new Clouber.Sys.Core.Message_CN();
            break;
        case "en":
            Clouber.message = new Clouber.Sys.Core.Message_EN();
            break;
        default:
            Clouber.message = new Clouber.Sys.Core.Message_EN();
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
        //jQuery.ajax({type: "GET", url: href, async: false,
        //        dataType: "script"});
    };

};
Clouber.extend(Clouber.Sys.Core.ModuleLoader, Clouber.BaseObject);
Clouber.loader = new Clouber.Sys.Core.ModuleLoader(Clouber.config);

