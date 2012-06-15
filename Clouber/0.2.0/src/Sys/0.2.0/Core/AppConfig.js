/**
* Clouber Application Config js library.
* @fileOverview clouber
* @copyright Clouber.org 2012
* @author Jon Zhou
* @module clouber
* @requires Clouber
*/

/**
* Application Configuration Object.
* @class Clouber.Sys.Core.AppConfig
* @namespace Clouber.Sys.Core
* @extends Clouber.BaseObject
* @param  {Producer} obj Producer object
* @constructor
*/
Clouber.Sys.Core.AppConfig = function () {
    'use strict';

     /**
    * @constant TYPE
    */
    this.TYPE = "APPLICATION_CONFIG";

   /**
    * Application configuration data object.
    * @type config
    */
    this.config = null;

    /**
    * Get application configuration data object.
    * @function getConfig
    * @return {object} config object.
    */
    this.getConfig = function () {
        return this.config;
    };

    /**
    * Load portal configuration file. default name is portal.json or portal.conf
    * @function loadConfig
    * @param  {object} params Parameter object
    * @param  {string} params.base config file base path.
    * @param  {string} params.path config path.
    * @param  {string} params.file config file.
    * @param  {boolean} params.async load mode
    */
    this.loadConfig = function (params) {
        var href;

        if ((params === undefined) || (params.base === undefined) ||
                (params.path === undefined) || (params.file === undefined)) {
            throw (new Clouber.Exception({
                number: 10004,
                name: "ParameterError",
                message: Clouber.message.paramError,
                description: Clouber.message.paramError,
                code: "Clouber.sys.portlet.AppConfig"
            }));
        }

        href = params.base + "/" + params.path + "/" + params.file;

        if (params.async === undefined) {
            params.async = true;    // set default event
        }

        this.configLoading(params);

        Clouber.document.ajax({
            url: href,
            data: params.data,
            async: params.async,
            success: this._loadSuccess,
            dataType: "text",
            error: this._loadError,
            context: this
        });
    };

    /**
    * Parse config data to js object, can be override.
    * @function parse
    * @param {object} data portal config data.
    */
    this.parse = function (data) {};

    /**
    * Internal config loaded success event.
    * @event _loadSuccess
    * @param {object} data portal config
    * @ignore
    */
    this._loadSuccess = function (data) {
        try {
            this.config = JSON.parse(data);
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.AppConfig#_loadSuccess> " +
                e.message + "(JSON Parsing error)");
            this.config = this.parse(data);
        }
        this.loadSuccess(data);
    };

    /**
    * Interal config loading error event
    * @event _loadError
    * @param {string} textStatus Can be timeout, error, abort, parsererror.
    * @param {exception}  errorThrown receives the textual portion of the HTTP
    *        status, such as "Not Found" or "Internal Server Error."
    * @ignore
    */
    this._loadError = function (textStatus, errorThrown, url) {
        var e;
        this.loadError({status: textStatus, error: errorThrown});
        e = new Clouber.Exception({
            number: 10001,
            name: textStatus,
            message: Clouber.message.typeErrror + "(" + url + ")",
            description: errorThrown,
            code: "Clouber.sys.portlet.AppConfig#_loadError"
        });
        Clouber.log(e);
        throw (e);
    };

    /**
    * Config loaded success event, can be overrided.
    * @event loadSuccess
    * @param {object} data config data.
    */
    this.loadSuccess = function (data) {};

    /**
    * Config loaded error event, can be overrided.
    * @event loadError
    * @param {object} msg Error message.
    */
    this.loadError = function (msg) {};

    /**
    * Portlet config loading event, can be overrided
    * @event configLoading
    * @param {object} params portal config loading parameters
    */
    this.configLoading = function (params) {};

};
Clouber.extend(Clouber.Sys.Core.AppConfig, Clouber.BaseObject);

