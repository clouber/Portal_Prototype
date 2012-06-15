/**
* Clouber English message package.
* @fileOverview Clouber English message.
* @copyright Clouber.org 2012
* @author Jon Zhou
* @module Message_en
* @requires Clouber
*/


/**
* Clouber system core modules, using namespace Clouber.Sys.Core
* @class  Clouber.Sys.Core
* @property  Clouber.Sys.Core
* @module Clouber.Sys.Core
* @namespace Clouber.Sys.Core
*/
Clouber.namespace("Clouber.Sys.Core");

/**
* Clouber English message package.
* @class  Clouber.Sys.Core.Message_EN
* @namespace namespace Clouber.Sys.Core
* @constructor
*/
Clouber.Sys.Core.Message_EN = function () {

    this.ajaxCallError = "Ajax call failed!";
    this.defaultValue = "Using default value.";
    this.htmlLoadErrror = "Failed to load HTML file!";
    this.loadError = "Failed to load configuration file!";
    this.noLocalStorage = 
        "HTML5 localStorage is not supported. Please upgrade your browser.";
    this.pageNotExist = "Page doesn't exist!";
    this.paramError = "Invalid paramters!";
    this.portletConfigNotExist = 
        "Portlet configuration doesn't get from Portlet Producer!";
    this.portletInvocateError = "Portlet update failure!";
    this.portletUpdated = "Updated successfully.";
    this.producerRegisterError = "Failed to register portlet producer!";
    this.producerRegisterSuccess = "Register portlet producer successfully.";
    this.typeErrror = "Not a valid type!";
    this.unsupportedLanguage =
        "The language setting is not supported (default language is English)!";
};
Clouber.message = new Clouber.Sys.Core.Message_EN();
