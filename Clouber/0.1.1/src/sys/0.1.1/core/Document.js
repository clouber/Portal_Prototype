/**
* Clouber Document library.
* @fileOverview Document
* @module clouber
* @author Jon Zhou
* @version 0.1.1
* @requires jQuery, Clouber
*/

/**
* DOM Document utility.
* @class  Clouber.sys.core.Document
* @namespace Clouber.sys.core
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.sys.core.Document = function () {
    "use strict";
    /**
    * Set document node html.
    * @function html
    * @param {string} selector DOM selector.
    * @param {string} html html markup.
    * @return {object} DOM object
    */
    this.html = function (selector, html) {
        if (typeof html !== "undefined") {
            jQuery(selector).html(html);
        } else {
            return jQuery(selector).html();
        }
    };

    /**
    * Set document node text.
    * @function text
    * @param {string} selector DOM selector.
    * @param {string} text text.
    * @return {object} DOM object
    */
    this.text = function (selector, text) {
        if (typeof text !== "undefined") {
            jQuery(selector).text(text);
        } else {
            return jQuery(selector).text();
        }
    };

    /**
    * Set document tag attribute.
    * @function attr
    * @param {string} selector DOM selector.
    * @param {string} attribute tag attribute.
    * @param {object} value attribute value.
    * @return {object} DOM object
    */
    this.attr = function (selector, attribute, value) {
        return jQuery(selector).attr(attribute, value);
    };

    /**
    * document nodes number
    * @function size
    * @param {string} selector DOM selector.
    * @param {string} html html markup.
    * @return {object} DOM object
    */
    this.size = function (selector) {
        return jQuery(selector).size();
    };

    /**
    * Append a document node.
    * @function html
    * @param {string} selector DOM selector.
    * @param {string} html html markup.
    * @return {object} DOM object
    */
    this.append = function (selector, html) {
        return jQuery(selector).append(html);
    };

    /**
    * remove document node.
    * @function remove
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.remove = function (selector) {
        return jQuery(selector).remove();
    };

    /**
    * show document node.
    * @function show
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.show = function (selector) {
        return jQuery(selector).show();
    };

    /**
    * hide document node.
    * @function hide
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.hide = function (selector) {
        return jQuery(selector).hide();
    };

    /**
    * fade In document node.
    * @function fadeIn
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.fadeIn = function (selector) {
        return jQuery(selector).fadeIn();
    };

    /**
    * fade Out document node.
    * @function fadeOut
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.fadeOut = function (selector) {
        return jQuery(selector).fadeOut();
    };

    /**
    * Add a style class to a document node.
    * @function addHandler
    * @param {string} selector DOM selector.
    * @param {string} className html class Name.
    * @return {object} DOM object
    */
    this.addClass = function (selector, className) {
        return jQuery(selector).addClass(className);
    };

    /**
    * Remove a style class to a document node.
    * @function removeClass
    * @param {string} selector DOM selector.
    * @param {string} className html class Name.
    * @return {object} DOM object
    */
    this.removeClass = function (selector, className) {
        return jQuery(selector).removeClass(className);
    };

    /**
    * Set a style to a document node.
    * @function css
    * @param {string} selector DOM selector.
    * @param {string} name html class Name.
    * @param {string} value html class Name.
    * @return {object} DOM object
    */
    this.css = function (selector, name, value) {
        return jQuery(selector).css(name, value);
    };

    /**
    * Ajax call.
    * @function ajax
    * @param  {object} params Parameter object
    * @param  {string} params.method  HTTP method, i.e. GET, POST
    * @param  {string} params.data  post data
    * @param  {Map} params.headers  request header attributes
    * @param  {string} params.href config url
    * @param  {boolean} params.async load mode
    * @param  {function} params.loaded Loaded event handler,use to callback
    * @param  {object} params.loadedContext loading event context
    * @param  {function} params.success Success event handler
    * @param  {function} params.error Error event handler
    * @param  {object} params.context loading event context
    */
    this.ajax = function (params) {
        jQuery.ajax({
            type: params.method,
            async: params.async,
            crossDomain: params.crossDomain,
            url: params.url,
            data: params.data,
            beforeSend: function (request) {
                var i, l;
                if (params.headers instanceof Clouber.Map) {
                    for (i = 0, l = params.headers.size(); i < l; i++) {
                        request.setRequestHeader(
                            params.headers.getKeyByIndex(i),
                            params.headers.getByIndex(i)
                        );
                    }
                }
            },
            dataType: params.dataType,
            context: params.context,
            success: jQuery.proxy(params.success, params.context),
            complete: jQuery.proxy(function (jqXHR, textStatus) {
                if ((typeof params.complete !== "undefined") &&
                        (typeof params.complete === "function")) {
                    params.complete(jqXHR, textStatus);
                } else {
                    Clouber.log("Clouber.sys.core.Document#ajax#complete " +
                        textStatus + "(" + params.url + ")");
                }
            }, params.loadedContext),
            error: jQuery.proxy(function (jqXHR, textStatus, errorThrown) {
                if ((typeof params.error !== "undefined") &&
                        (typeof params.error === "function")) {
                    params.error(textStatus, errorThrown, params.url,
                        jqXHR.responseText);
                }
            }, params.context)
        });
    };

};
Clouber.extend(Clouber.sys.core.Document, Clouber.BaseObject);

/**
* Window and DOM event utility.
* @class  Clouber.sys.core.Event
* @namespace Clouber.sys.core
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.sys.core.Event = function () {
    "use strict";

    /**
    * Add a event handler.
    * @function addHandler
    * @param {object} element DOM element.
    * @param {string} type Event type, e.g. click.
    * @param {function} handler Event handler
    */
    this.addHandler = function (element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    };

    /**
    * Add a event handler.
    * @function addHandler
    * @param {object} element DOM element.
    * @param {string} type Event type, e.g. click.
    * @param {function} handler Event handler
    */
    this.removeHandler = function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    };
};
Clouber.extend(Clouber.sys.core.Event, Clouber.BaseObject);

/**
* Clouber object initialization.
*/
Clouber.document = new Clouber.sys.core.Document();
Clouber.event = new Clouber.sys.core.Event();
