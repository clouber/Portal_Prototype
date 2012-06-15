/**
* Clouber exception, log, config, loader js library.
* @fileOverview clouber
* @module clouber
* @author Jon Zhou
* @version 0.1.1
* @requires Clouber, jQuery
*/


/**
* Clouber system core modules, using namespace Clouber.sys.core
* @class  Clouber.sys.core
* @module Clouber.sys.core
* @namespace Clouber.sys.core
*/
Clouber.namespace("Clouber.sys.core");

/**
* Configuration Management object.
* @class  Clouber.sys.core.ConfigManager
* @namespace Clouber
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.sys.core.ConfigManager = function () {
    'use strict';

    /**
    * private config object.
    * @ignore
    * @property
    * @config
    * @private
    */
    var _conf = { base: "." };

    /**
    * Get configuration data.
    * @function getConfig
    * @return {object} config object.
    */
    this.getConfig = function () {
        return _conf;
    };

    /**
     * Set basic config of Clouber.
     * @function setting
     * @param {object} config Clouber system global config.
     */
    this.setting = function (config) {
        if (typeof config !==  'undefined') {
            _conf = Clouber.merge(_conf, config);
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
        var i, conf, leng;

        if (version === undefined) {
            version = this.getVersion();
        }

        for (i = 0, leng = this.getConfig().versions.length; i < leng; i++) {

            if (version === this.getConfig().versions[i].version) {
                conf = Clouber.merge(
                    this.getConfig(),
                    this.getConfig().versions[i]
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
        var i, j, conf, appconf, leng1, leng2;

        conf = this.getConf(version);

        for (i = 0, leng1 = conf.apps.length; i < leng1; i++) {

            if (app === conf.apps[i].app) {
                appconf = Clouber.merge(appconf, conf.apps[i]);

                for (j = 0, leng2 = conf.apps[i].versions.length;
                        j < leng2; j++) {
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
    this.loadConf = function (params) {

        if (params === undefined) {    // default loading params
            params = {};
            params.async = false;
            params.href = this.getConfig().base + "/sys/conf.json";
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
    * @function getModuleUrl
    * @param {string} name Module's name(space).
    * @param {string} type File type, such as js, css, html, json, conf.
    * @param {string} theme Control's theme name.
    * @return {string} url
    */
    this.getModuleUrl = function (name, type, theme) {
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

                if (names[1] === "sys") {
                    href = href + "sys/" + this.getConfig().version;

                } else {
                    conf = this.getAppConf(
                        this.getConfig().version,
                        names[1]
                    );

                    href = href + conf.path;
                }

            } else {
                conf = this.getAppConf(
                    this.getConfig().version,
                    names[0]
                );
                href = href + conf.path + "/" + names[1];
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
            e.code = "Clouber.sys.core.ConfigManager#getModuleUrl";
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
            code: "Clouber.sys.core.ConfigManager#configError"
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
Clouber.extend(Clouber.sys.core.ConfigManager, Clouber.BaseObject);
/**
* Clouber object initialization.
*/
Clouber.config = new Clouber.sys.core.ConfigManager();
Clouber.config.loadConf();


/**
* @class  Clouber.loader Clouber module management object.
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.sys.core.ModuleLoader = function (config) {
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
    this.require = function (name) {
        var href;

        href = _config.getModuleUrl(name, "js");
        this.loadJs(href);
    };

    /**
    * Include a js file into script tag.
    * @function include
    * @param  {string} name JS module name.
    */
    this.include = function (name) {
        var href;
        href = _config.getModuleUrl(name, "js");
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
    this.load = function (params, type) {
        var result, href = null;

        if (type === undefined) {
            type = "js";
        }

        href = _config.getModuleUrl(
            params.namespace,
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
    this.get = function (params, type, success, error, context) {
        var href;

        if ((type === undefined) || (type === null)) {
            type = "js";
        }

        href = _config.getModuleUrl(
            params.namespace,
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
            Clouber.message = new Clouber.sys.core.Message_CN();
            break;
        case "en":
            Clouber.message = new Clouber.sys.core.Message_EN();
            break;
        default:
            Clouber.message = new Clouber.sys.core.Message_EN();
            Clouber.log(Clouber.message.unsupportedLanguage);
        }
    };

    /**
    * @ignore Include a js file into script tag.
    * @function _includeJs
    */
    this._includeJs = function (href) {      //
        // include js using sync ajax
        jQuery.ajax({type: "GET", url: href, async: false,
                dataType: "script"});
    };

};
Clouber.extend(Clouber.sys.core.ModuleLoader, Clouber.BaseObject);
Clouber.loader = new Clouber.sys.core.ModuleLoader(Clouber.config);

