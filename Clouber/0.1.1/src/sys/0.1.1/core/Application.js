/**
* Clouber Application js library.
* @fileOverview clouber
* @module clouber
* @author Jon Zhou
* @version 0.1.1
* @requires Clouber
*/

/**
* The base class of Clouber application.
* @class  Clouber.sys.core.Application
* @namespace Clouber.sys.core
* @extends Clouber.BaseObject
* @constructor
* @param {object} conf Configuration object.
*/
Clouber.sys.core.Application = function (conf) {
    'use strict';
    /**
    * internal application configuration variable.
    * @property
    * @config
    * @ignore
    */
    this._conf = (conf === undefined) ? {} : conf;

    /** Object setting function.
    * @function setting
    * @param {object} params Object settings.
    */
    this.setting = function (params) {
        if (typeof params !== "undefined") {
            this._conf = Clouber.merge(this._conf, params);
        }
    };

    /**
    * Get application configuration.
    * @function getConf
    * @return {object} conf
    */
    this.getConf = function () {
        return this._conf;
    };

    /**
    * Set application configuration information.
    * @function setConf
    * @param {object} params Setting object.
    * @param params.base       base url
    * @param params.app        application name
    * @param params.version    application version
    * @param params.modules    application modules(Array object).
    */
    this.setConf = function (params) {

        if (typeof params !==  'undefined') {
            this._conf = Clouber.merge(this._conf, params);
        }
    };

    /**
    * Application initialization.
    * @function init
    * @param {object} params Setting object.
    * @param {string} param.base Base directory
    * @param {string} param.path Application path
    * @param {string} param.version Application version
    */
    this.init = function (params) {
        this.setConf(params);
    };

    /**
    * Load application configuration. default config file name is conf.json.
    * @function loadConf
    * @param  {object} params Parameter object
    * @param  {string} params.data  post data
    * @param  {string} params.href config url
    * @param  {boolean} params.async load mode
    * @param  {function} params.loaded Loaded event handler
    * @param  {object} params.loadedContext loading event context
    * @param  {function} params.success Success event handler
    * @param  {function} params.error Error event handler
    * @param  {object} params.context loading event context
    */
    this.loadConf = function (params) {
        var href, conf;

        conf = Clouber.config.getAppConf(Clouber.config.getVersion(),
            this._conf.app);

        this._conf = Clouber.merge(this._conf, conf);

        href = Clouber.config.getBase() + "/" + this._conf.path + "/conf.json";

        if (params === undefined) {
            params = {};
        }

        if (params.type === undefined) {
            params.type = "json";
        }

        if (params.success === undefined) {
            params.success = this._confSuccess;    // set default event
        }

        if (params.loaded === undefined) {
            params.loaded = this.confLoaded;    // set default event
        }

        if (params.loadedContext === undefined) {
            params.loadedContext = this;    // set default event
        }

        if (params.async === undefined) {
            params.async = true;    // set default event
        }

        if (params.error === undefined) {
            params.error = this.loadError;    // set default event
        }

        if (params.context === undefined) {
            params.context = this;    // set default event
        }

        this.confLoading(href);

        Clouber.config.loadConf({
            href: href,
            data: params.data,
            async: params.async,
            success: params.success,
            loaded: params.loaded,
            loadedContext: params.loadedContext,
            error: params.error,
            context: params.context
        });
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
    * @param {object} jqXHR Setting object.
    * @param {string} textStatus Can be timeout, error, abort, parsererror.
    * @ignore
    */
    this._confSuccess = function (data) {
        try {
            var conf = JSON.parse(data);
            this.setConf(conf);
            this.confSuccess(data);
        } catch (e) {
            e.code = "Clouber.sys.core.Application#_confSuccess";
            Clouber.log(e);
        }
    };

    /**
    * Default config loaded success event, can be overrided.
    * @event confSuccess
    * @param {object} jqXHR Setting object.
    * @param {string} textStatus Can be timeout, error, abort, parsererror.
    */
    this.confSuccess = function (data) {};

    /**
    * Default config loaded event, can be overrided.
    * @event confLoaded
    * @param {object} jqXHR Setting object.
    * @param {string} textStatus Can be timeout, error, abort, parsererror.
    */
    this.confLoaded = function (jqXHR, textStatus) {};

    /**
    * Default config loading error event, can be overrided
    * @event loadError
    * @param {string} textStatus Can be timeout, error, abort, parsererror.
    * @param {exception}  errorThrown receives the textual portion of the HTTP
    *        status, such as "Not Found" or "Internal Server Error."
    */
    this.loadError = function (textStatus, errorThrown, url) {
        Clouber.log(new Clouber.Exception({
            number: 10001,
            name: textStatus,
            message: Clouber.message.typeErrror + " (" + url + ")",
            description: errorThrown,
            code: "Clouber.sys.core.Application#loadError"
        }));
    };
};
Clouber.extend(Clouber.sys.core.Application, Clouber.BaseObject);

