/**
* Clouber English message package.
* @fileOverview Clouber English message.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Message_en
* @requires Clouber.* Clouber.Core.*
*/


/**
* Clouber system core modules, using namespace Clouber.Core
* @class  Clouber.Core
* @property  Clouber.Core
* @module Clouber.Core
* @namespace Clouber.Core
*/
Clouber.namespace("Clouber.Core");

/**
* Clouber English message package.
* @class  Clouber.Core.Message_EN
* @namespace namespace Clouber.Core
* @constructor
*/
Clouber.Core.Message_EN = function () {

    this.ajaxCallError = "Ajax call failed!";
    this.decryptError = "Decryption failed!";
    this.defaultValue = "Using default value.";
    this.getCacheData = "Get data from local cache.";
    this.htmlLoadErrror = "Failed to load HTML file!";
    this.loadError = "Failed to load configuration file!";
    this.noLocalStorage = 
        "HTML5 localStorage is not supported. Please upgrade your browser.";
    this.pageNotExist = "Page doesn't exist!";
    this.paramError = "Invalid parameters!";
    this.portletConfigNotExist = 
        "Portlet configuration doesn't get from Portlet Producer!";
    this.portletInvocateError = "Portlet update failure!";
    this.portletUpdated = "Updated successfully.";
    this.producerRegisterError = "Failed to register portlet producer!";
    this.producerRegisterSuccess = "Register portlet producer successfully.";
    this.saveCacheData = "Save data into local cache.";
    this.typeErrror = "Not a valid type!";
    this.unsupportedLanguage =
        "The language setting is not supported (default language is English)!";
};
Clouber.message = new Clouber.Core.Message_EN();
