/**
 * @fileOverview Clouber Portlet js library.
 * @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
 * @version 0.1.0
 * @license
 */

Clouber.namespace("Clouber.sys.portlet");

/**
 * Portal producer generic portlet
 * @class  Clouber.sys.portlet.GenericPortlet
 * @extends Clouber.sys.ui.ComponentController
 * @constructor
 */
Clouber.sys.portlet.GenericPortlet = function () {
    'use strict';

    /**
     * Called by the portlet container to indicate to a portlet that the portlet
     * is being placed into service. Can be overrided.
     * @function init
     * @param {PortletConfig} config
     */
    this.init = function (config) {};

    /**
     * Called by the portlet container to indicate to a portlet that the portlet
     * is being taken out of service. Can be overrided.
     * @function destroy
     */
    this.destroy = function () {};

    /**
     * Helper method to serve up the edit mode. Can be overrided.
     * @function doEdit
     * @param {RenderRequest} request
     * @param {RenderResponse} response
     */
    this.doEdit = function (request, response) {
        this.doView(request,  response);
    };


    /**
     * Helper method to serve up the help mode. Can be overrided.
     * @function doHelp
     * @param {RenderRequest} request
     * @param {RenderResponse} response
     */
    this.doHelp = function (request,  response) {
        this.doView(request,  response);
    };


    /**
     * Helper method to serve up the mandatory view mode. Can be overrided.
     * @function doView
     * @param {RenderRequest} request
     * @param {RenderResponse} response
     */
    this.doView = function (request, response) {};

    /**
     * Called by the portlet container to allow the portlet to process an action
     * request. Can be overrided.
     * @function processAction
     * @param {ActionRequest}
     * @param {ActionResponse}
     */
    this.processAction = function (request,  response) {};

    /**
     * The default implementation tries to dispatch to a method annotated with
     * @ProcessEvent that matches the event name or, if no such method is found
     * just sets the current render parameters on the response.
     *  Note that the annotated methods needs to be public in order to be
     * allowed to be called by GenericPortlet..  Can be overrided.
     * @function processEvent
     * @param {EventRequest}
     * @param {EventResponse}
     */
    this.processEvent = function (request,  response) {};

    /**
     * The default implementation of this method sets the headers using the
     * doHeaders method, sets the title using the getTitle method and invokes
     * the doDispatch method.
     * @function render
     * @param {RenderRequest} request
     * @param {RenderResponse} response
     */
    this.render = function (request,  response) {};

    /**
     * Returns the default namespace for events and public parameters.
     * @function getDefaultNamespace
     * @return {string}
     */
    this.getDefaultNamespace = function () {};


    /**
     * Returns a String containing the value of the named initialization
     * parameter, or null if the parameter does not exist.
     * @function getInitParameter
     * @param {String} name
     * @return {string}
     */
    this.getInitParameter = function (name) {};

    /**
     * Returns the names of the portlet initialization parameters as an
     * Enumeration of String objects, or an empty Enumeration if the portlet
     * has no initialization parameters.
     * @function getInitParameterNames
     * @return {array}
     */
    this.getInitParameterNames = function () {};

    /**
     * Returns the PortletConfig object of this portlet.
     * @function getPortletConfig
     * @return {object} PortletConfig
     */
    this.getPortletConfig = function () {};

    /**
     * Returns the PortletContext of the portlet application the portlet is in.
     * @function getPortletContext
     * @return {object} PortletContext
     */
    this.getPortletContext = function () {};

    /**
     * Returns the name of this portlet.
     * @function getPortletName
     * @return {string}
     */
    this.getPortletName = function () {};

    /**
     * Used by the render method to get the title.
     * @function getTitle
     * @param {RenderRequest} request
     * @return {string}
     */
    this.getTitle = function (request) {};

};

