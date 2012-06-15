/**
 * @fileOverview Clouber Portlet Request.
 * @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
 * @module Clouber.sys.portlet.Request
 * @version 0.1.0
 * @license
 * @requires Clouber
 */

Clouber.namespace("Clouber.sys.portlet");

/**
* The Request defines to provide client request
* information to a portlet. The portlet container uses two specialized versions
* of this interface when invoking a portlet, ActionRequest and RenderRequest.
* The portlet container creates these objects and passes them as arguments to
* the portlet's processAction and render methods.
* @class  Clouber.sys.portlet.Request
* @namespace Clouber.sys.portlet
* @extends Clouber.BaseObject,
* @constructor
* @param {PortletConfig} config
*/
Clouber.sys.portlet.Request = function (config) {
    'use strict';

    if ((typeof config === "undefined") ||
            (!config instanceof Clouber.sys.portlet.PortletConfig)) {

        throw (new Clouber.Exception({
            number: 10004,
            name: "ParameterError",
            message: Clouber.message.paramError,
            description: Clouber.message.paramError,
            fileName: "Clouber.sys.portlet.Request#constructor"
        }));
    }

    /**
    * @constant TYPE
    */
    this.TYPE = "PORTLET_REQUEST";

   /**
    * portlet config
    * @type portletConfig
    */
    this.config = config;

   /**
    * portlet event
    * @property {string} event
    */
    this.event = "";

   /**
    * portlet method
    * @property {string} method
    */
    this.method = "";

    /**
    * Returns the event that triggered the call to the processEvent method.
    * @function getEvent
    * @return {object} Event
    */
    this.getEvent = function () {
        return this.event;
    };

    /**
    * Returns the name of the HTTP method with which the original action
    * request was made, for example, POST, or PUT.
    * @function getMethod
    * @return {String}
    */
    this.getMethod = function () {
        return this.method;
    };

    /**
    * Returns the value of a request parameter as a String, or null if the
    * parameter does not exist.
    * @function getParameter
    * @param {String} name
    * @return {String}
    */
    this.getParameter = function (name) {
        return this.config.context.parameters.get(name);
    };

    /**
    * Returns a Map of the parameters of this request.
    * @function getParameterMap
    * @return {Map} name/value string map
    */
    this.getParameterMap = function () {
        return this.config.context.parameters;
    };

    /**
    * Returns an Enumeration of String objects containing the names of the
    * parameters contained in this request.
    * @function getParameterNames
    * @return {array(string)}
    */
    this.getParameterNames = function () {
        return this.config.context.parameters.keys();
    };

    /**
    * Returns an array of String objects containing all of the values the given
    * request parameter has, or null if the parameter does not exist.
    * @function getParameterValues
    * @param {String} name
    * @return {array(string)}
    */
    this.getParameterValues = function (name) {
        return this.config.context.parameters.values();
    };

    /**
    * Returns a Map of the public parameters of this request.
    * @function getPublicParameterMap
    * @return {array} name/value map
    */
    this.getPublicParameterMap = function () {
        return this.config.context.parameters;
    };

    /**
    * Returns the context of the calling portal.
    * @function getPortalContext
    * @return {object} PortalContext
    */
    this.getPortalContext = function () {
        return this.config.context;
    };

    /**
    * Returns the current portlet mode of the portlet.
    * @function getPortletMode
    * @return {Array} PortletMode
    */
    this.getPortletMode = function () {
        return this.config.portletManagedModes;
    };

    /**
    * Returns the current portlet session or, if there is no current session
    * and the given flag is true, creates one and returns the new session.
    * @function getPortletSession
    * @param {boolean} create
    * @return {object} PortletSession
    */
    this.getPortletSession = function (create) {
        return this.config.context;
    };

    /**
    * Returns the value of the specified request property as a String. (ini)
    * @function getProperty
    * @param {String} name
    * @return {String}
    */
    this.getProperty = function (name) {
        return this.config.context.initParameters.get(name);
    };

    /**
    * Returns a Enumeration of all the property names this request contains.
    * @function getPropertyNames
    * @param {} getPropertyNames
    * @return {array(string)}
    */
    this.getPropertyNames = function () {};

    /**
    * Removes an attribute from this request.
    * @function removeAttribute
    * @param {String} name
    */
    this.removeAttribute = function (name) {
        this.config.context.attributes.remove(name);
    };

    /**
    * Stores an attribute in this request.
    * @function setAttribute
    * @param {string} name
    * @param {object} o
    */
    this.setAttribute = function (name, o) {
        this.config.context.attributes.put(name, o);
    };

    /**
    * Returns the value of the named attribute as an Object, or null if no
    * attribute of the given name exists.
    * @function getAttribute
    * @param {String} name
    * @return {object}
    */
    this.getAttribute = function (name) {
        return this.config.context.attributes.get(name);
    };

    /**
    * Returns an Enumeration containing the names of the attributes available
    * to this request.
    * @function getAttributeNames
    * @return {array(string)}
    */
    this.getAttributeNames = function () {
        return this.config.context.attributes.keys();
    };

    /**
    * Returns the login of the user making this request, if the user has been
    * authenticated, or null if the user has not been authenticated.
    * @function getRemoteUser
    * @return {String}
    */
    this.getRemoteUser = function () {
        return this.config.context.getUser();
    };

    /**
    * Returns the session ID indicated in the client request.
    * @function getRequestedSessionId
    * @return {String}
    */
    this.getRequestedSessionId = function () {
        return this.config.context.producer.getUid().toString();
    };

    /**
    * Returns the portal preferred content type for the response.
    * @function getResponseContentType
    * @return {String}
    */
    this.getResponseContentType = function () {
        return "text/html";
    };

    /**
    * Gets a list of content types which the portal accepts for the response.
    * @function getResponseContentTypes
    * @return {array(string)}
    */
    this.getResponseContentTypes = function () {
        return ["text/html", "text/xml"];
    };

    /**
    * Returns a java.security.Principal object containing the name of the
    * current authenticated user.
    * @function getUserPrincipal
    * @return {object} Principal
    */
    this.getUserPrincipal = function () {
        return this.config.context.getUser();
    };

    /**
    * Returns the portlet window ID.
    * @function getWindowID
    * @return {String}
    */
    this.getWindowID = function () {
        return this.config.context.getUid();
    };

    /**
    * Returns the current window state of the portlet.
    * @function getWindowState
    * @return {object} WindowState
    */
    this.getWindowState = function () {
        return this.config.context.state;
    };

    /**
    * Returns true, if the given portlet mode is a valid one to set for this
    * portlet in the context of the current request.
    * @function isPortletModeAllowed
    * @param {object} mode PortletMode.
    * @return {boolean}
    */
    this.isPortletModeAllowed = function (mode) {
        var i, l, b = false;
        for (i = 0, l = this.config.config.portletManagedModes.length;
                i < l; i++) {
            if (mode === this.config.config.portletManagedModes[i]) {
                b = true;
                break;
            }
        }
        return b;
    };

    /**
    * Returns a boolean indicating whether this request was made using a secure
    * channel between client and the portal, such as HTTPS.
    * @function isSecure
    * @return {boolean}
    */
    this.isSecure = function () {
        return false;
    };

    /**
    * Returns true, if the given window state is valid to be set for this
    * portlet in the context of the current request.
    * @function isWindowStateAllowed
    * @param {object} state WindowState
    * @return {boolean}
    */
    this.isWindowStateAllowed = function (state) {
        return true;
    };

    /**
    * Returns the name of the character encoding used in the body of this
    * request.
    * @function getCharacterEncoding
    * @return {String}
    */
    this.getCharacterEncoding = function () {
        return "utf-8";
    };

    /**
    * Returns the length, in bytes, of the request body which is made available
    * by the input stream, or -1 if the length is not known.
    * @function getContentLength
    * @return {int}
    */
    this.getContentLength = function () {
        return -1;
    };

    /**
    * Returns the MIME type of the body of the request, or null if the type is 
    * not known.
    * @function getContentType
    * @return {String}
    */
    this.getContentType = function () {
        return "text/html";
    };

    /**
    * Overrides the name of the character encoding used in the body of this
    * request.
    * @function setCharacterEncoding
    * @param {String} enc
    */
    this.setCharacterEncoding = function (enc) {};





    /**
    * Returns an array containing all of the Cookie properties.
    * @function getCookies
    * @return {array} Cookies
    */
    this.getCookies = function () {};

    /**
    * Returns the context path which is the path prefix associated with the
    * deployed portlet application.
    * @function getContextPath
    * @return {String}
    */
    this.getContextPath = function () {};

    /**
    * Returns a boolean indicating whether the authenticated user is included
    * in the specified logical "role".
    * @function isUserInRole
    * @param {sring} role
    * @return {boolean}
    */
    this.isUserInRole = function (role) {};


    /**
    * Retrieves the body of the HTTP request from client to portal as binary
    * data using an InputStream.
    * @function getPortletInputStream
    * @return {object} InputStream
    */
    this.getPortletInputStream = function () {};


    /**
    * Retrieves the body of the HTTP request from the client to the portal as
    * character data using a BufferedReader.
    * @function getReader
    * @return {object} BufferedReader
    */
    this.getReader = function () {};

    /**
    * Returns a Map of the private parameters of this request.
    * @function getPrivateParameterMap
    * @return {array} name/value map
    */
    this.getPrivateParameterMap = function () {};


    /**
    * Returns the preferences object associated with the portlet.(init params)
    * @function getPreferences
    * @return {object} PortletPreferences
    */
    this.getPreferences = function () {};

    /**
    * Returns the name of the scheme used to make this request.
    * @function getScheme
    * @return {String}
    */
    this.getScheme = function () {};

    /**
    * Returns the host name of the server that received the request.
    * @function getServerName
    * @return {String}
    */
    this.getServerName = function () {};

    /**
    * Returns the port number on which this request was received.
    * @function getServerPort
    * @return {int}
    */
    this.getServerPort = function () {};

    /**
    * Checks whether the requested session ID is still valid.
    * @function isRequestedSessionIdValid
    * @return {boolean}
    */
    this.isRequestedSessionIdValid = function () {};

    /**
    * Returns the preferred Locale in which the portal will accept content.
    * @function getLocale
    * @return {object} Locale
    */
    this.getLocale = function () {};

    /**
    * Returns an Enumeration of Locale objects indicating, in decreasing order
    * starting with the preferred locale in which the portal will accept
    * content for this request.
    * @function getLocales
    * @return {array} Locales
    */
    this.getLocales = function () {};

    /**
    * Returns the name of the authentication scheme used for the connection
    * between client and portal, for example, BASIC_AUTH, CLIENT_CERT_AUTH, a
    * custom one or null if there was no authentication.
    * @function getAuthType
    * @return {String}
    */
    this.getAuthType = function () {};


};
Clouber.extend(Clouber.sys.portlet.Request, Clouber.BaseObject);


