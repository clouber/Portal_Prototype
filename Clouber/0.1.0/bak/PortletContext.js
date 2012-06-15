/**
 * @fileOverview Clouber Portlet Context
 * @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
 * @module Clouber.sys.portlet.PortletContext
 * @version 0.1.0
 * @license
 * @requires Clouber
 */

Clouber.namespace("Clouber.sys.portlet");



/**
* public interface PortletContext
* The PortletContext interface defines a portlet view of the portlet container.
* The PortletContext also makes resources available to the portlet. Using the
* context, a portlet can access the portlet log, and obtain URL references to
* resources.
* @class  Clouber.sys.portlet.PortletContext
* @namespace Clouber.sys.portlet
* @extends Clouber.BaseObject,
* @constructor
* @param {PortletConfig} config
* @param {ProducerContext} producerContext
*/
Clouber.sys.portlet.PortletContext = function (config, producerContext) {
    'use strict';

    if ((typeof config === "undefined") ||
            (!config instanceof Clouber.sys.portlet.PortletConfig) ||
            (typeof producerContext === "undefined")) {

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
    this.TYPE = "PORTLET_CONTEXT";

    /**
    * @type object
    */
    this.producer = producerContext;

    /**
    * @type PortletInfo
    */
    this.context = Clouber.copy(config);

    /**
    * portlet request parameters.
    * @type Map
    */
    this.parameters = new Clouber.Map();

    /**
    * portlet attributes.
    * @type Map
    */
    this.attributes = new Clouber.Map();

    /**
    * Portlet mode
    * @property {String} mode
    */
    this.mode = "wsrp:view";

    /**
    * Portlet window state
    * @property {String} state
    */
    this.state = "wsrp:normal";

    /**
    * @type UserContext
    */
    this.user = {};

    /** @type Handle */
    this.portletHandle = new WSRP.Handle();

    /** @type base64Binary */
    this.portletState = {};

    /** @type Lifetime */
    this.scheduledDestruction = new WSRP.Lifetime();

    /** @type Array(Extension) */
    this.extensions = [];

    /**
    * Returns the portlet request parameters.
    * @function getAttribute
    * @param {String} queryString
    */
    this.setParameters = function (queryString) {
        this.parameters.parseString(queryString, "&", "=");
    };

    /**
    * Set user context.
    * @function setUserContext
    * @param {UserContext} user
    */
    this.setUserContext = function (user) {
        this.user = user;
    };

    /**
    * Returns the portlet cosumer user.
    * @function getUser
    */
    this.getUser = function () {
        return this.user.extensions[0];
    };



    /**
    * Returns a String containing the real path for a given virtual path.
    * @function getRealPath
    * @param {String} path
    * @return {String}
    */
    this.getRealPath = function (path) {
    };

    /**
    * Returns the portlet container attribute with the given name, or null if
    * there is no attribute by that name.
    * @function getAttribute
    * @param {String} name
    * @return {Object}
    */
    this.getAttribute = function (name) {
        return this.attributes.get(name);
    };

    /**
    * Returns an Enumeration containing the attribute names available within
    * this portlet context, or an empty Enumeration if no attributes are
    * available.
    * @function getAttributeNames
    * @return {Array(String)}
    */
    this.getAttributeNames = function () {
        return this.attributes.keys();
    };

    /**
    * Removes the attribute with the given name from the portlet context.
    * @function removeAttribute
    * @param {String} name
    */
    this.removeAttribute = function (name) {
        this.attributes.remove(name);
    };

    /**
    * Binds an object to a given attribute name in this portlet context.
    * @function setAttribute
    * @param {String} name
    * @param {Object} object
    */
    this.setAttribute = function (name, object) {
        this.attributes.put(name, object);
    };

    /**
    * Returns a String containing the value of the named context-wide
    * initialization parameter, or null if the parameter does not exist.
    * @function getInitParameter
    * @param {String} name
    * @return {String}
    */
    this.getInitParameter = function (name) {
        return this.context.initParameters.get(name);
    };

    /**
    * Returns the names of the context initialization parameters as an
    * Enumeration of String objects, or an empty Enumeration if the context has
    * no initialization parameters.
    * @function getInitParameterNames
    * @return {Array(String)}
    */
    this.getInitParameterNames = function () {
        return this.context.initParameters.keys();
    };

    /**
    * Returns the MIME type of the specified file, or null if the MIME type is
    * not known.
    * @function getMimeType
    * @param {String} file
    * @return {String}
    */
    this.getMimeType = function (file) {
        return "text/html";
    };

    /**
    * Returns the major version of the Portlet API that this portlet container
    * supports.
    * @function getMajorVersion
    * @return {int}
    */
    this.getMajorVersion = function () {
        var v = this.producer.config.version.split(".");
        return v[0];
    };

    /**
    * Returns the minor version of the Portlet API that this portlet container
    * supports.
    * @function getMinorVersion
    * @return {int}
    */
    this.getMinorVersion = function () {
        var v = this.producer.config.version.split(".");
        return v[1];
    };

    /**
    * Returns the name of this portlet application correponding to this
    * PortletContext as specified in the web.xml deployment descriptor for this
    * web application by the display-name element.
    * @function getPortletContextName
    * @return {String}
    */
    this.getPortletContextName = function () {
        return this.context.displayName();
    };

    /**
    * Returns a URL to the resource that is mapped to a specified path.
    * @function getResource
    * @param {String} path
    * @return {URL}
    */
    this.getResource = function (path) {
        return null;
    };

    /**
    * Returns a directory-like listing of all the paths to resources within the
    * web application longest sub-path of which matches the supplied path
    * argument.
    * @function getResourcePaths
    * @param {String} path
    * @return {Array(string)}
    */
    this.getResourcePaths = function (path) {
        return null;
    };

    /**
    * Returns the name and version of the portlet container in which the
    * portlet is running.
    * @function getServerInfo
    * @return {String}
    */
    this.getServerInfo = function () {
        return this.producer.config.name + "." + this.producer.config.version;
    };

    /**
    * Writes an explanatory message and a stack trace for a given Throwable
    * exception to the portlet log file.
    * @function log
    * @param {String} message
    * @param {Exception} throwable
    */
    this.log = function (message, throwable) {
        if (typeof throwable === "undefined") {
            Clouber.log(message);
        } else if (throwable instanceof Error) {
            throwable.text = message;
            Clouber.log(throwable);
        } else {
            Clouber.log(message + " -- " + throwable.toString());
        }
    };

    /**
    * Returns the container container runtime options keys supported by this
    * portlet container.
    * @function getContainerRuntimeOptions
    * @return {Array(String)}
    */
    this.getContainerRuntimeOptions = function () {
        return null;
    };

};
Clouber.extend(Clouber.sys.portlet.PortletContext, Clouber.BaseObject);


