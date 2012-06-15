/**
* Clouber Application js library.
* @fileOverview clouber
* @copyright Clouber.org 2012
* @author Jon Zhou
* @module clouber
* @requires Clouber
*/

/**
* The base class of Clouber application.
* @class  Clouber.Sys.Core.Application
* @namespace Clouber.Sys.Core
* @extends Clouber.BaseObject
* @constructor
* @param {object} conf Configuration object.
*/
Clouber.Sys.Core.Application = function () {
    'use strict';
    /**
    * internal application configuration variable.
    * @property
    * @config
    * @ignore
    */
    this._conf = null;

    /** Object setting function.
    * @function setting
    * @param {object} params Object settings.
    */
    this.setting = function (params) {
        if (this.getConf() === null) {
            this.setConf({});
        }
        if (typeof params !== "undefined") {
            this.setConf(Clouber.merge(this.getConf(), params));
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
    * @param {object} conf Configuration object.
    */
    this.setConf = function (conf) {
        if (typeof conf !== "undefined") {
            this._conf = conf;
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
            this.getConf().app);

        this._conf = Clouber.merge(this._conf, conf);

        href = Clouber.config.getBase() + "/" + this.getConf().config;

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
            params.async = true;    // set async model
        }

        if (params.error === undefined) {
            params.error = this.loadError;    // set default error event
        }

        if (params.context === undefined) {
            params.context = this;    // set default context event
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
            e.code = "Clouber.Sys.Core.Application#_confSuccess";
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
            code: "Clouber.Sys.Core.Application#loadError"
        }));
    };
};
Clouber.extend(Clouber.Sys.Core.Application, Clouber.BaseObject);

