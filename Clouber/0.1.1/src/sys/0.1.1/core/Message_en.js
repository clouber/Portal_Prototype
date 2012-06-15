/**
* Clouber English message package.
* @fileOverview Clouber English message.
* @module Message_en
* @author Jon Zhou
* @version 0.1.1
* @requires Clouber
*/


/**
* Clouber system core modules, using namespace Clouber.sys.core
* @class  Clouber.sys.core
* @property  Clouber.sys.core
* @module Clouber.sys.core
* @namespace Clouber.sys.core
*/
Clouber.namespace("Clouber.sys.core");

/**
* Clouber English message package.
* @class  Clouber.sys.core.Message_EN
* @namespace namespace Clouber.sys.core
* @constructor
*/
Clouber.sys.core.Message_EN = function () {

    this.ajaxCallError = "Ajax call failed!";
    this.defaultValue = "Using default value.";
    this.htmlLoadErrror = "Failed to load HTML file!";
    this.loadError = "Failed to load configuration file!";
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
Clouber.message = new Clouber.sys.core.Message_EN();
