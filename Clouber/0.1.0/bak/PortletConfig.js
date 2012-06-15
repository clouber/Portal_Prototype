/**
 * @fileOverview Clouber Portlet Configuration object
 * @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
 * @module Clouber.sys.portlet.PortletConfig
 * @version 0.1.0
 * @license
 */

Clouber.namespace("Clouber.sys.portlet");


/**
* PortletConfig
* The PortletConfig interface provides the portlet with its configuration. The
* configuration holds information about the portlet that is valid for all
* users. The configuration is retrieved from the portlet definition in the
* deployment descriptor. The portlet can only read the configuration data.
*
* The configuration information contains the portlet name, the portlet
* initialization parameters, the portlet resource bundle and the portlet
* application context.
* @class  Clouber.sys.portlet.PortletConfig
* @namespace Clouber.sys.portlet
* @extends Clouber.BaseObject,
* @param  {Map} config Portlet config
* @param  {ProducerContext} producer Producer context
* @constructor
*/
Clouber.sys.portlet.PortletConfig = function (config, producer) {
    'use strict';

    if ((typeof config === "undefined") ||
            (!config instanceof Clouber.sys.portlet.PortletInfo) ||
            (typeof producer === "undefined")) {

        throw (new Clouber.Exception({
            number: 10004,
            name: "ParameterError",
            message: Clouber.message.paramError,
            description: Clouber.message.paramError,
            fileName: "Clouber.sys.portlet.PortletContext#constructor"
        }));
    }

    /**
    * @constant TYPE
    */
    this.TYPE = "PORTLET_CONFIG";

    /**
    * Portlet config object
    * @type Map
    */
    this.config = config;

    /**
    * Producer context object
    * @type ProducerContext
    */
    this.producer = producer;

    /**
    * Portlet context object
    * @type PortletContext
    */
    this.context = new Clouber.sys.portlet.PortletContext(this.config,
        this.producer);

    /**
    * Returns the container runtime options and values for this portlet.
    * @function
    * @return {arry} name/value map
    */
    this.getContainerRuntimeOptions = function () {
        return this.config.initParameters;
    };

    /**
    * Returns the default namespace for events and public parameters.
    * @function getDefaultNamespace
    * @return {string}
    */
    this.getDefaultNamespace = function () {
        return this.config.groupID;
    };

    /**
    * Returns a String containing the value of the named initialization *
    * parameter, or null if the parameter does not exist.
    * @function getInitParameter
    * @param {String} name
    * @return {string}
    */
    this.getInitParameter = function (name) {
        return this.config.initParameters.get(name);
    };

    /**
    * Returns the names of the portlet initialization parameters as an
    * Enumeration of String objects, or an empty Enumeration if the portlet
    * has no initialization parameters.
    * @function getInitParameterNames
    * @return {array}
    */
    this.getInitParameterNames = function () {
        return this.config.initParameters.keys();
    };

    /**
    * Returns the PortletContext of the portlet application the portlet is in.
    * @function getPortletContext
    * @return {object} PortletContext
    */
    this.getPortletContext = function () {
        return this.context;
    };

    /**
    * Returns the name of this portlet.
    * @function getPortletName
    * @return {string}
    */
    this.getPortletName = function () {
        return this.config.displayName;
    };

    /**
    * Returns the QNames of the processing events supported by the portlet as
    * an Enumeration of QName objects, or an empty Enumeration if the portlet
    * has not defined any processing events. Event names are represented as
    * QNames to identify them uniquely.
    * @function getProcessingEventQNames
    * @return {array} QName
    */
    this.getProcessingEventQNames = function () {
        return this.config.handledEvents;
    };

    /**
    * Returns the QNames of the publishing events supported by the portlet as
    * an Enumeration of QName objects, or an empty Enumeration if the portlet
    * has not defined any publishing events..
    * @function getPublishingEventQNames
    * @return {array} QNames
    */
    this.getPublishingEventQNames = function () {
        return this.config.publishedEvents;
    };

    /**
    * Returns the names of the public render parameters supported by the
    * portlet as an Enumeration of String objects, or an empty Enumeration if
    * the portlet has no public render parameters.
    * @function getPublicRenderParameterNames
    * @return {array} Strings.
    */
    this.getPublicRenderParameterNames = function () {
        return this.config.initParameters.keys();
    };

    /**
    * Gets the resource bundle for the given locale based on the resource
    * bundle defined in the deployment descriptor with resource-bundle tag or
    * the inlined resources defined in the deployment descriptor.
    * @function
    * @param {object} locale Locale
    * @return {object} ResourceBundle
    */
    this.getResourceBundle = function (locale) {
        return null;
    };

    /**
    * Returns the locales supported by the portlet as an Enumeration of Locale
    * objects, or an empty Enumeration if the portlet has not defined any
    * supported locales.
    * @function
    * @return {array} Locales
    */
    this.getSupportedLocales = function () {
        return ["en", "cn"];
    };
};
Clouber.extend(Clouber.sys.portlet.PortletConfig, Clouber.BaseObject);













