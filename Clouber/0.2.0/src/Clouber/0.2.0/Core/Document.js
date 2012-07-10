/**
* Clouber Document library.
* @fileOverview Document
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module clouber
* @requires jQuery Clouber.* Clouber.Core.*
*/

/**
* DOM Document utility.
* @class  Clouber.Core.Document
* @namespace Clouber.Core
* @extends Clouber.Core.BaseObject
* @constructor
*/
Clouber.Core.Document = function () {
    "use strict";
    /**
    * Set document node html.
    * @function html
    * @param {string} selector DOM selector.
    * @param {string} html html markup.
    * @return {object} DOM object
    */
    this.html = function (selector, html) {
        if (!Clouber.isEmpty(selector)) {
            try {
                if ((typeof html === "string") && (html.length > 0)) {
                    jQuery(selector).html(html);
                } else {
                    return jQuery(selector).html();
                }
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#html> " +
                    Clouber.dump(e));
                return this.text(selector, html);
            }
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
        if (!Clouber.isEmpty(selector)) {
            try {
                if ((typeof text === "string") && (text.length > 0)) {
                    jQuery(selector).text(text);
                } else {
                    return jQuery(selector).text();
                }
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#text> " +
                    Clouber.dump(e));
            }
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
        if (!Clouber.isEmpty(selector)) {
            try {
                if ((typeof html === "string") && (html.length > 0)) {
                    return jQuery(selector).append(html);
                }
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#append> " +
                    Clouber.dump(e));
            }
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
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).attr(attribute, value);
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#attr> " +
                    Clouber.dump(e));
            }
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
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).size();
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#size> " +
                    Clouber.dump(e));
            }
        }
    };

    /**
    * remove document node.
    * @function remove
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.remove = function (selector) {
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).remove();
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#remove> " +
                    Clouber.dump(e));
            }
        }
    };

    /**
    * show document node.
    * @function show
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.show = function (selector) {
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).show();
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#show> " +
                    Clouber.dump(e));
            }
        }
    };

    /**
    * hide document node.
    * @function hide
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.hide = function (selector) {
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).hide();
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#hide> " +
                    Clouber.dump(e));
            }
        }
    };

    /**
    * fade In document node.
    * @function fadeIn
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.fadeIn = function (selector) {
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).fadeIn();
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#fadeIn> " +
                    Clouber.dump(e));
            }
        }
    };

    /**
    * fade Out document node.
    * @function fadeOut
    * @param {string} selector DOM selector.
    * @return {object} DOM object
    */
    this.fadeOut = function (selector) {
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).fadeOut();
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#fadeOut> " +
                    Clouber.dump(e));
            }
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
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).addClass(className);
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#addClass> " +
                    Clouber.dump(e));
            }
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
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).removeClass(className);
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#removeClass> " +
                    Clouber.dump(e));
            }
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
        if (!Clouber.isEmpty(selector)) {
            try {
                return jQuery(selector).css(name, value);
            } catch (e) {
                Clouber.log("<Clouber.Core.Document#css> " +
                    Clouber.dump(e));
            }
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
        var time = new Date();
        try {
            jQuery.ajax({
                type: params.method,
                async: params.async,
                crossDomain: params.crossDomain,
                url: params.url,
                data: params.data,
                beforeSend: function (request) {
                    var i, l;
                    if (params.headers instanceof Clouber.Core.Map) {
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
                //success: params.success,
                success: jQuery.proxy(function (jqXHR, textStatus) {
                    Clouber.log(
                        "Clouber.Core.Document#ajax#success ********** (" +
                            params.url + ", " + textStatus + ")  [" +
                            ((new Date() - time) / 1000) + "s]"
                    );
                    if (typeof params.success === "string") {
                        jQuery.proxy(
                            params.context[params.success](jqXHR, textStatus,
                                params.url),
                            params.context
                        );
                    } else if (typeof params.success === "function") {
                        params.success(jqXHR, textStatus, params.url,
                            params.context);
                    }
                }, params.context),
                error: jQuery.proxy(function (jqXHR, textStatus, errorThrown) {
                    Clouber.log("Clouber.Core.Document#ajax#error ***** (" +
                            params.url + ", " + textStatus + ")  [" +
                            ((new Date() - time) / 1000) + "s]"
                        );
                    if (typeof params.error === "function") {
                        params.error(textStatus, errorThrown, params.url,
                            jqXHR.responseText, params.context);
                    } else if (typeof params.error === "string") {
                        jQuery.proxy(
                            params.context[params.error](jqXHR, textStatus,
                                params.url, jqXHR.responseText, params.context),
                            params.context
                        );
                    }
                }, params.context),
                complete: jQuery.proxy(function (jqXHR, textStatus) {
                    if (typeof params.complete === "string") {
                        jQuery.proxy(
                            params.context[params.complete](jqXHR, textStatus,
                                params.url),
                            params.context
                        );
                    } else if (typeof params.complete === "function") {
                        params.complete(jqXHR, textStatus, params.url);
                    }
                }, params.loadedContext)
            });
        } catch (e) {
            e.code = "Clouber.Core.Document#ajax";
            Clouber.log(e);
        }
    };

};
Clouber.extend(Clouber.Core.Document, Clouber.Core.BaseObject);

/**
* Window and DOM event utility.
* @class  Clouber.Core.Event
* @namespace Clouber.Core
* @extends Clouber.Core.BaseObject
* @constructor
*/
Clouber.Core.Event = function () {
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
Clouber.extend(Clouber.Core.Event, Clouber.Core.BaseObject);

/**
* Clouber document object initialization.
*/
Clouber.set("document", new Clouber.Core.Document());
Clouber.lock(Clouber.document);

/**
* Clouber event object initialization.
*/
Clouber.set("event", new Clouber.Core.Event());
Clouber.lock(Clouber.event);

