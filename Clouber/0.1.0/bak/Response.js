/**
 * @fileOverview Clouber Portlet Response.
 * @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
 * @module Clouber.sys.portlet.Response
 * @version 0.1.0
 * @license
 * @requires Clouber
 */

Clouber.namespace("Clouber.sys.portlet");

/**
* The Response defines to assist a portlet in
* creating and sending a response to the client. The portlet container uses
* specialized versions of this interface when invoking a portlet. The portlet
* container creates these objects and passes them as arguments to the portlet's
* processAction, processEvent, serveResource and render methods.
* @class  Clouber.sys.portlet.Response
* @namespace Clouber.sys.portlet
* @extends Clouber.BaseObject,
* @constructor
* @param {PortletConfig} config
*/
Clouber.sys.portlet.Response = function (config) {
    'use strict';

    /**
    * Adds a HTTP Cookie property to the response.
    *  The portlet should note that the cookie may not make it to the client,
    * but may be stored at the portal.
    * @function
    * @param {object} Cookie
    */
    this.addProperty = function (cookie) {};

    /**
    * Adds an XML DOM element property to the response.
    * @function
    * @param {String} key
    * @param {Object} dom.Element
    */
    this.addProperty = function (key, element) {};

    /**
    * Adds a String property to an existing key to be returned to the portal.
    * @function
    * @param {String} key
    * @param {String} value
    */
    this.addProperty = function (key, value) {};

    /**
    * Creates an element of the type specified to be used in the
    * addProperty(String,Element) method.
    * @function
    * @param {String} tagName
    * @return {object} dom.Element
    */
    this.createElement = function (tagName) {};

    /**
    * Returns the encoded URL of the resource, like servlets, JSPs, images and
    * other static files, at the given path.
    * @function
    * @param {String} path
    * @return {String}
    */
    this.encodeURL = function (path) {};

    /**
    * The value returned by this method should be prefixed or appended to
    * elements, such as JavaScript variables or function names, to ensure they
    * are unique in the context of the portal page.
    * @function
    * @return {String}
    */
    this.getNamespace = function () {};

    /**
    * Sets a String property to be returned to the portal.
    * @function
    * @param {String} key
    * @param {String} value
    */
    this.setProperty = function (key, value) {};

    /**
    * Creates a portlet URL targeting the portlet.
    * @function
    * @return {object} PortletURL
    */
    this.createActionURL = function () {};

     /**
    * Creates a portlet URL targeting the portlet.
    * @function
    * @param {}
    * @return {object} PortletURL
    */
    this.createRenderURL = function () {};

    /**
    * Creates a portlet URL targeting the portlet.
    * @function
    * @param {}
    * @return {object} ResourceURL
    */
    this.createResourceURL = function () {};

    /**
    * Forces any content in the buffer to be written to the underlying output
    * stream.
    * @function
    */
    this.flushBuffer = function () {};

    /**
    * Returns the actual buffer size used for the response.
    * @function
    * @return {int}
    */
    this.getBufferSize = function () {};

    /**
    * Returns the cache control object allowing to set specific cache settings
    * valid for the markup returned in this response.
    * @function
    * @return {object} CacheControl
    */
    this.getCacheControl = function () {};

    /**
    * Returns the name of the charset used for the MIME body sent in this
    * response.
    * @function
    * @return {String}
    */
    this.getCharacterEncoding = function () {};

    /**
    * Returns the MIME type that can be used to contribute markup to the render
    * response.
    * @function
    * @return {String}
    */
    this.getContentType = function () {};

    /**
    * Returns the locale assigned to the response.
    * @function
    * @return {object} Locale
    */
    this.getLocale = function () {};

    /**
    * Returns a OutputStream suitable for writing binary data in the response.
    * @function
    * @return {object} OutputStream
    */
    this.getPortletOutputStream = function () {};

    /**
    * Returns a PrintWriter object that can send character text to the portal.
    * @function
    * @param {}
    * @return {object} PrintWriter
    */
    this.getWriter = function () {};

    /**
    * Returns a boolean indicating if the response has been committed.
    * @function
    * @param {}
    * @return {boolean}
    */
    this.isCommitted = function () {};

    /**
    * Clears any data that exists in the buffer as well as the properties set.
    * @function
    */
    this.reset = function () {};

    /**
    * Clears the content of the underlying buffer in the response without
    * clearing properties set.
    * @function
    */
    this.resetBuffer = function () {};

    /**
    * Sets the preferred buffer size for the body of the response.
    * @function
    * @param {int} size
    * @return {}
    */
    this.setBufferSize = function (size) {};

    /**
    * Sets the MIME type for the response.
    * @function
    * @param {String}  type
    */
    this.setContentType = function (type) {};

    /**
    * Sets the MIME type for the render response.
    * @function
    * @param {String} type
    */
    this.setContentType = function (type) {};

    /**
    * This method allows the portlet to tell the portal the next possible
    * portlet modes that the make sense from the portlet point of view.
    * @function
    * @param {array} portletModes
    */
    this.setNextPossiblePortletModes = function (portletModes) {};

    /**
    * This method sets the title of the portlet.
    * @function
    * @param {String} title
    */
    this.setTitle = function (title) {};


    /**
    * Returns the currently set portlet mode on this reponse.
    * @function
    * @return {object} PortletMode
    */
    this.getPortletMode = function () {};

    /**
    * Returns a Map of the render parameters currently set on this response.
    * @function
    * @return {object} string map
    */
    this.getRenderParameterMap = function () {};

    /**
    * Returns the currently set window state on this response.
    * @function
    * @return {object} WindowState
    */
    this.getWindowState = function () {};

    /**
    * Removes the specified public render parameter.
    * @function
    * @param {name}
    */
    this.removePublicRenderParameter = function (name) {};

    /**
    * Publishes an Event with the given payload.
    * @function
    * @param {object} QName
    * @param {object} value
    */
    this.setEvent = function (name, value) {};

    /**
    * Publishes an Event with the given payload in the default namespace.
    * @function
    * @param {String} name
    * @param {object} value
    */
    this.setEvent = function (name, value) {};

    /**
    * Sets the portlet mode of a portlet to the given portlet mode.
    * @function
    * @param {object} portletMode
    */
    this.setPortletMode = function (portletMode) {};

    /**
    * Sets a String parameter for the render request.
    * @function
    * @param {String} key
    * @param {String} value
    */
    this.setRenderParameter = function (key, value) {};

    /**
    * Sets a String array parameter for the render request.
    * @function
    * @param {String} key
    * @param {array(String)} values
    */
    this.setRenderParameter = function (key, values) {};

    /**
    * Sets a parameter map for the render request.
    * @function
    * @param {array} parameters string map
    */
    this.setRenderParameters = function (parameters) {};

    /**
    * Sets the window state of a portlet to the given window state.
    * @function
    * @param {object} windowState
    */
    this.setWindowState = function (windowState) {};



    /**
    * Instructs the portlet container to send a redirect response to the client
    * using the specified redirect location URL.
    * @function
    * @param {String} location
    */
    this.sendRedirect = function (location) {};

    /**
    * Instructs the portlet container to send a redirect response to the client
    * using the specified redirect location URL and encode a render URL as
    * parameter on the redirect URL.
    * @function
    * @param {String} location
    * @param {String} renderUrlParamName
    */
    this.sendRedirect = function (location, renderUrlParamName) {};

    /**
    * Maintain the current render parameters of the request for the response.
    * @function
    * @param {object} request EventRequest
    */
    this.setRenderParameters = function (request) {};
    
    
};
Clouber.extend(Clouber.sys.portlet.Response, Clouber.BaseObject);

