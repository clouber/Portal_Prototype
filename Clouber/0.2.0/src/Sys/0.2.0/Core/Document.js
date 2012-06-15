/**
* Clouber Document library.
* @fileOverview Document
* @copyright Clouber.org 2012
* @author Jon Zhou
* @module clouber
* @requires jQuery, Clouber
*/

/**
* DOM Document utility.
* @class  Clouber.Sys.Core.Document
* @namespace Clouber.Sys.Core
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.Sys.Core.Document = function () {
    "use strict";
    /**
    * Set document node html.
    * @function html
    * @param {string} selector DOM selector.
    * @param {string} html html markup.
    * @return {object} DOM object
    */
    this.html = function (selector, html) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            if ((typeof html === "string") && (html.length > 0)) {
                jQuery(selector).html(html);
            } else {
                return jQuery(selector).html();
            }
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#html> " + Clouber.dump(e));
            return this.text(selector, html);
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
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            if ((typeof text === "string") && (text.length > 0)) {
                jQuery(selector).text(text);
            } else {
                return jQuery(selector).text();
            }
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#text> " + Clouber.dump(e));
        }
    };

    /**
    * Append a document node.
    * @function html
    * @param {string} selector DOM selector.
    * @param {string} html html markup.
    * @return {object} DOM object
    */
    this.append = function (selector, html) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            if ((typeof html === "string") && (html.length > 0)) {
                return jQuery(selector).append(html);
            }
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#append> " +
                Clouber.dump(e));
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
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).attr(attribute, value);
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#attr> " + Clouber.dump(e));
        }
    };

    /**
    * document nodes number
    * @function size
    * @param {string} selector DOM selector.
    * @param {string} html html markup.
    * @return {object} DOM object
    */
    this.size = function (selector) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).size();
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#size> " + Clouber.dump(e));
        }
    };

    /**
    * remove document node.
    * @function remove
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.remove = function (selector) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).remove();
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#remove> " +
                Clouber.dump(e));
        }
    };

    /**
    * show document node.
    * @function show
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.show = function (selector) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).show();
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#show> " + Clouber.dump(e));
        }
    };

    /**
    * hide document node.
    * @function hide
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.hide = function (selector) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).hide();
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#hide> " + Clouber.dump(e));
        }
    };

    /**
    * fade In document node.
    * @function fadeIn
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.fadeIn = function (selector) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).fadeIn();
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#fadeIn> " +
                Clouber.dump(e));
        }
    };

    /**
    * fade Out document node.
    * @function fadeOut
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.fadeOut = function (selector) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).fadeOut();
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#fadeOut> " +
                Clouber.dump(e));
        }
    };

    /**
    * Add a style class to a document node.
    * @function addHandler
    * @param {string} selector DOM selector.
    * @param {string} className html class Name.
    * @return {object} DOM object
    */
    this.addClass = function (selector, className) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).addClass(className);
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#addClass> " +
                Clouber.dump(e));
        }
    };

    /**
    * Remove a style class to a document node.
    * @function removeClass
    * @param {string} selector DOM selector.
    * @param {string} className html class Name.
    * @return {object} DOM object
    */
    this.removeClass = function (selector, className) {
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).removeClass(className);
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#removeClass> " +
                Clouber.dump(e));
        }
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
        if ((typeof selector !== "string") || (selector.length === 0)) {
            return null;
        }
        try {
            return jQuery(selector).css(name, value);
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#css> " +
                Clouber.dump(e));
        }
    };

    /**
    * Ajax call.
    * @function ajax
    * @param  {object} params Parameter object
    * @param  {string} params.method  HTTP method, i.e. GET, POST
    * @param  {string} params.data  post data
    * @param  {Map} params.headers  request header attributes
    * @param  {string} params.url config url
    * @param  {boolean} params.async load mode
    * @param  {function} params.loaded Loaded event handler,use to callback
    * @param  {function} params.success Success event handler
    * @param  {function} params.error Error event handler
    * @param  {object} params.context loading event context
    * @param  {function} params.complete Complete event handler
    * @param  {object} params.loadedContext Loading complete event context
    */
    this.ajax = function (params) {
        try {
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
                        Clouber.log("Clouber.Sys.Core.Document#ajax#complete " +
                            textStatus + "(" + params.url + ")");
                    }
                }, params.loadedContext),
                error: jQuery.proxy(function (jqXHR, textStatus, errorThrown) {
                    if ((typeof params.error !== "undefined") &&
                            (typeof params.error === "function")) {
                        params.error(textStatus, errorThrown, params.url,
                            jqXHR.responseText);
                    } else {
                        Clouber.log("Clouber.Sys.Core.Document#ajax#error " +
                            textStatus + "(" + params.url + ")");
                    }
                }, params.context)
            });
        } catch (e) {
            Clouber.log("<Clouber.Sys.Core.Document#ajax> " + Clouber.dump(e));
        }
    };

};
Clouber.extend(Clouber.Sys.Core.Document, Clouber.BaseObject);

/**
* Window and DOM event utility.
* @class  Clouber.Sys.Core.Event
* @namespace Clouber.Sys.Core
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.Sys.Core.Event = function () {
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
Clouber.extend(Clouber.Sys.Core.Event, Clouber.BaseObject);

/**
* Clouber object initialization.
*/
Clouber.document = new Clouber.Sys.Core.Document();
Clouber.event = new Clouber.Sys.Core.Event();
