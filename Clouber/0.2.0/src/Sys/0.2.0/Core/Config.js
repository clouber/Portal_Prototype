/**
* @fileOverview Clouber config, loader js library.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module clouber
* @requires Clouber.* Clouber.Sys.Core.*
*/


/**
* Clouber system core modules, using namespace Clouber.Sys.Core
* @class  Clouber.Sys.Core
* @module Clouber.Sys.Core
* @namespace Clouber.Sys.Core
*/
Clouber.namespace("Clouber.Sys.Core");

/**
* Clouber configuration object.
* @class  Clouber.Sys.Core.Config
* @namespace Clouber
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.Sys.Core.Config = function () {
    'use strict';

    /**
    * private config object.
    * @ignore
    * @property _conf
    * @private
    */
    this._conf = null;

    /**
    * private config data.
    * @ignore
    * @property _data
    * @private
    */
    this._data = null;

    /**
    * private config object loading interval.
    * @ignore
    * @property _interval
    * @private
    */
    this._interval = 60000;

    /**
    * private config key name.
    * @ignore
    * @property _key
    * @private
    */
    this._key = "CLOUBER_CONFIG";

    /**
    * Set config loading interval.
    * @function setInterval
    * @param {number} i Configuration loading interval.
    */
    this.setInterval = function (i) {
        if (typeof i === "number") {
            this._interval = i;
        }
    };

    /**
    * Set config key.
    * @function setKey
    * @param {string} key Configuration key.
    */
    this.setKey = function (key) {
        if (typeof key === "string") {
            this._key = key;
        }
    };

    /**
    * Get config key.
    * @function setKey
    * @return {string} key Configuration key.
    */
    this.getKey = function () {
        return this._key;
    };

    /**
    * Get configuration data.
    * @function getConfig
    * @return {object} config object.
    */
    this.getConfig = function () {
        var o;
        try {
            if ((typeof this._data === "undefined") || (this._data === null)) {
                this._data = new Clouber.Sys.Core.Cache();
                // get config from cache
                o = this._data.get(this.getKey(), null);
                if ((typeof o !== "undefined") && (o !== null)) {
                    Clouber.log(Clouber.message.getCacheData + " (" +
                        this.getKey() + ")");
                    try {
                        o = JSON.parse(o);
                        this.setting(o);
                    } catch (ex) {
                        this.setting(this.parse(o));
                    }
                }
            }
            return this._conf;

        } catch (e) {
            e.code = "Clouber.Sys.Core.ConfigManager#getConfig";
            Clouber.log(e);
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
            if (typeof config !== 'undefined') {
                this._conf = Clouber.merge(this._conf, config);
            }
        } catch (e) {
            e.code = "Clouber.Sys.Core.ConfigManager#getConfig";
            Clouber.log(e);
        }
    };

    /**
    * Load a configuration information.
    * @function loadConf
    * @param  {object} conf Config object
    * @param  {string} conf.base Config file base path.
    * @param  {string} conf.config Config file path.
    * @param  {object} params Parameter object
    */
    this.loadConf = function (conf, params) {
        var that = this,
            c = this.getConfig();

        if ((typeof c !== "object") || (c === null)) {
            this._loadConf(conf, params);
        } else {
            if (this._data.count() <= 0) {
                window.setTimeout(function () {
                    that._loadConf(conf, params);
                }, this._interval);
            }
            this.confSuccess();
        }
    };

    /**
    * Internal configuration loading function.
    * @function loadConf
    * @param  {object} conf Config object
    * @param  {string} conf.base Config file base path.
    * @param  {string} conf.config Config file path.
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
    this._loadConf = function (conf, params) {
        var href;

        if ((typeof conf !== "object") || (conf === null)) {
            conf = {};
        }

        if (typeof conf.base !== "string") {
            conf.base = ".";
        }
        if (typeof conf.config !== "string") {
            conf.config = "Sys/conf.json";
        }
        //this.setting(conf);

        href = conf.base + "/" + conf.config;

        if (params === undefined) {
            params = {};
        }

        if (params.success === undefined) {
            params.success = this._confSuccess;    // set default success event
        }

        if (params.loaded === undefined) {
            params.loaded = this.confLoaded;    // set default loaded event
        }

        if (params.loadedContext === undefined) {
            params.loadedContext = this;    // set default loaded context
        }

        if (params.async === undefined) {
            params.async = false;    // set async model
        }

        if (params.error === undefined) {
            params.error = this._loadError;    // set default error event
        }

        if (params.context === undefined) {
            params.context = this;    // set default context event
        }

        this.confLoading(href);

        Clouber.document.ajax({
            method: 'GET',
            url: href,
            async: params.async,
            dataType: "text",
            data: params.data,
            success: params.success,
            error: params.error,
            context: params.context,
            complete: params.loaded,
            loadedContext: params.loadedContext
        });

    };

    /**
    * Default config loading success event
    * @event configLoaded
    * @param {object} data Receive data object.
    * @param {string} status Can be timeout, error, abort, parsererror.
    * @param {string} url Config file url.
    */
    this.configLoaded = function (data, status, url) {
        try {
            Clouber.log("Clouber.Sys.Core.Config#configLoaded " +
                status + "(" + url + ")");
        } catch (e) {
            e.description = Clouber.message.typeErrror;
            e.text = data;
            Clouber.log(e);
        }
    };

    /**
    * Default config loading event, can be overrided.
    * @event confLoading
    * @param {object} data parameter object.
    */
    this.confLoading = function (data) {};

    /**
    * Internal config loaded success event.
    * @event _confSuccess
    * @param {object} data Receive data object.
    * @param {string} status Can be timeout, error, abort, parsererror.
    * @param {string} url Config file url.
    * @ignore
    */
    this._confSuccess = function (data, status, url) {
        var conf;
        try {
            // save config into cache
            if ((typeof this._data === "undefined") || (this._data === null)) {
                this._data = new Clouber.Sys.Core.Cache();
            }
            this._data.put(this.getKey(), data, null);
            Clouber.log(Clouber.message.saveCacheData + " (" +
                this.getKey() + ")");

            try {
                conf = JSON.parse(data);
            } catch (ex) {
                conf = this.parse(data);
            }

            this.setting(conf);
            this.confSuccess(data, status, url);

        } catch (e) {
            e.code = "Clouber.Sys.Core.Config#_confSuccess";
            Clouber.log(e);
        }
    };

    /**
    * Default config loaded success event, can be overrided.
    * @event confSuccess
    * @param {object} data Receive data object.
    */
    this.confSuccess = function (data) {};

    /**
    * Default config loaded event, can be overrided.
    * @event confLoaded
    * @param {object} data Receive data object.
    * @param {string} status Can be timeout, error, abort, parsererror.
    * @param {string} url Config file url.
    */
    this.confLoaded = function (jqXHR, status, url) {
        Clouber.log("Clouber.Sys.Core.Config#confLoaded " +
            status + "(" + url + ")");
    };

    /**
    * Internal config loading error event, can be overrided
    * @event _loadError
    * @param {string} status Can be timeout, error, abort, parsererror.
    * @param {exception}  errorThrown receives the textual portion of the HTTP
    *        status, such as "Not Found" or "Internal Server Error."
    */
    this._loadError = function (status, errorThrown, url, text, context) {
        var e;
        e = new Clouber.Exception({
            number: 10001,
            name: status,
            message: Clouber.message.loadError + "(" + url + ")",
            description: errorThrown,
            code: "Clouber.Sys.Core.Config#_loadError"
        });
        Clouber.log(e);
        context.loadError({status: status, error: errorThrown});
    };

    /**
    * Config loaded error event, can be overrided.
    * @event loadError
    * @param {object} msg Error message.
    */
    this.loadError = function (msg) {};

    /**
    * Parse config data to js object, can be override.
    * @function parse
    * @param {object} data portal config data.
    */
    this.parse = function (data) {};

};
Clouber.extend(Clouber.Sys.Core.Config, Clouber.BaseObject);

/**
* Configuration Management object.
* @class  Clouber.Sys.Core.ConfigManager
* @namespace Clouber
* @extends Clouber.Sys.Core.Config
* @constructor
*/
Clouber.Sys.Core.ConfigManager = function () {
    'use strict';

    /** @constant string TYPE */
    this.TYPE = "CLOUBER_CONFIG";

    /**
    * private config key name.
    * @ignore
    * @property _key
    * @private
    * @override
    */
    this._key = "CLOUBER_CONFIG";

    /**
    * Get base path.
    * @function getBase
    */
    this.getBase = function () {
        var c = this.getConfig();
        if (c !== null) {
            return c.base;
        } else {
            return ".";
        }
    };

    /**
    * Get current version of Clouber.
    * @function getVersion
    */
    this.getVersion = function () {
        var v, c = this.getConfig();

        if (c !== null) {
            v = c.version;
            if (v === undefined) {
                v = c.versions[0].version;
            }
            return v;
        }
    };

    /**
    * Get configuration by version.
    * @function getConf
    * @param (string) version Current version.
    * @return {object} config object.
    */
    this.getConf = function (version) {
        var i, conf, v, c = this.getConfig();

        if (c !== null) {
            if (version === undefined) {
                version = this.getVersion();
            }

            v = c.versions;
            for (i in v) {
                if ((v.hasOwnProperty(i)) && (version === v[i].version)) {
                    conf = Clouber.merge(
                        this.getConfig(),
                        v[i]
                    );
                    break;
                }
            }
            return conf;
        }
    };

    /**
    * Get application configuration by version.
    * @function getAppConf
    * @param (string) version Current version.
    * @return {object} config object.
    */
    this.getAppConf = function (version, app) {
        var i, j, conf, appconf, c = this.getConfig();

        if (c === null) {
            return;
        }

        conf = this.getConf(version);

        if ((typeof conf !== "undefined") && (conf !== null)) {
            for (i in conf.apps) {
                if ((conf.apps.hasOwnProperty(i)) &&
                        (app === conf.apps[i].app)) {
                    appconf = Clouber.merge(appconf, conf.apps[i]);

                    for (j in conf.apps[i].versions) {
                        if ((conf.apps[i].versions.hasOwnProperty(j)) &&
                                (appconf.version ===
                                conf.apps[i].versions[j].version)) {

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
        }
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

};
Clouber.extend(Clouber.Sys.Core.ConfigManager, Clouber.Sys.Core.Config);
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

