/**
* Clouber Application js library.
* @fileOverview clouber
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module clouber
* @requires Clouber.* Clouber.Core.*
*/

/**
* The base class of Clouber application.
* @class  Clouber.Core.Application
* @namespace Clouber.Core
* @extends Clouber.Core.Config
* @constructor
* @param {object} conf Configuration object.
*/
Clouber.Core.Application = function () {
    'use strict';

    /**
    * Get application configuration.
    * @function getConf
    * @return {object} conf
    */
    this.getConf = function () {
        return this.getConfig();
    };

    /**
    * Set application configuration information.
    * @function setConf
    * @param {object} conf Configuration object.
    */
    this.setConf = function (conf) {
        this.setting(conf);
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

};
Clouber.extend(Clouber.Core.Application, Clouber.Core.Config);

