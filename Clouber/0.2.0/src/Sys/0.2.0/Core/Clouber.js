/**
* Clouber core js library.
* @fileOverview clouber
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @requires Clouber.*
*/

/**
* @global Clouber The root namespace.
*/
var Clouber = Clouber || {};

/**
* The core class of Clouber system. Main role of Clouber is to
* implement OOP function, such as namespace, interface, inheritance,
* object factory, uid generating.
* @class   Clouber
* @singleton
*/
(function () {
    'use strict';

    if ((typeof Clouber !== "undefined") &&
            (typeof Clouber.newer === "function") &&
            (Clouber.newer("0.2.0"))) {
        return;
    }

    /**
    * declare the gloabel object Clouber.
    */
    Clouber = (function () {
        var _instance = {},

        /**
        * Clouber's internal objects
        * @property {array} _objs
        * @ignore
        */
            _objs = [];

        /**
        * Clouber's version
        * @property {String} VERSION
        */
        _instance.VERSION = "0.2.0";

        /**
        * Return true if this version is newer than the given version.
        * @function newer
        * @param {string} version Version scheme is "major.minor.stage"
        * @return {boolean}
        */
        _instance.newer = function (version) {
            var major, minor, stage, v;
            v = version.split(".");
            if (parseInt(v[0], 10) <= 0) {
                if (parseInt(v[1], 10) <= 1) {
                    if (parseInt(v[2], 10) <= 2) {
                        return true;
                    }
                }
            }
            return false;
        };

        /**
        * Return object instance of Clouber if object setting is successful.
        * @function set
        * @param {string} name Clouber's object name.
        * @param {object} obj Clouber's object instance.
        * @return {object}
        */
        _instance.set = function (name, obj) {
            if (typeof _objs[name] === "undefined") {
                _objs[name] = obj;
            } else {
                return;
            }
            return _objs[name];
        };

        /**
        * Return object instance of Clouber by given name.
        * @function get
        * @param {string} name Clouber's object name.
        * @return {object}
        */
        _instance.get = function (name) {
            return _objs[name];
        };

        /**
        * Implement class namespace support.(JavaScript Patterns, Stoyan
        * Stefanov, 2010, O'Reilly)
        * @function namespace
        * @param {string} nameSpace Namespace splitted by ".", "/", "_", "\".
        * @return {object} nameSpace
        */
        _instance.namespace = function (nameSpace) {
            var parts = nameSpace.split('.'),
                parent = Clouber,
                i;

            nameSpace = nameSpace.replace(/\//g, ".");  // replace /
            nameSpace = nameSpace.replace(/\_/g, ".");  // replace _
            nameSpace = nameSpace.replace(/\\/g, ".");  // replace \

            // strip redundant leading global
            if (parts[0] !== "Clouber") {
                if (window[parts[0]] === undefined) {
                    window[parts[0]] = {};
                }
            }

            for (i = 1; i < parts.length; i += 1) {
                // create a property if it doesn't exist
                if (parent[parts[i]] === undefined) {
                    parent[parts[i]] = {};
                }

                parent = parent[parts[i]];
            }
            return parent;
        };

        /**
        * Create app object instance. Because of performance issues, this
        * function only use to create components which need to generate a UID,
        * not normal objects.
        * @function create
        * @param  {string} name
        * @param  {object} params  Parameter object
        * @return  new object instance.
        */
        _instance.create = function (name, params) {
            var str, obj, uid;

            try {
                name = name.replace(/\//g, ".");  // replace /
                name = name.replace(/\_/g, ".");  // replace .
                name = name.replace(/\\/g, ".");  // replace \\

                if (params === undefined) {
                    str = "";
                } else {
                    str = JSON.stringify(params);
                }

                str = "obj = new " + name + "(" + str + ")";
                _instance.log("Clouber#create:  " + str);
                eval(str);

                return obj;
            } catch (e) {
                e.code = "Clouber#create";
                _instance.log(e);
            }
        };

        /**
        * Load application js module with module name.
        * @function extend
        * @param  {object} params Parameter object
        * @param  params.app   application name
        * @param  params.version  application version
        * @param  params.module  application module
        * @param  params.control  name of the control in an application module
        */
        _instance.extend = function (child, Parent) {
            if ((typeof child !== "function") ||
                    ((typeof Parent !== "function"))) {
                _instance.log(new Clouber.Exception({
                    number: 10001,
                    name: "typeErrror",
                    message: Clouber.message.typeErrror,
                    description: Clouber.message.typeErrror,
                    code: "Clouber.sys.portlet.Clouber#extend",
                    text: "Child's type is " + (typeof child) +
                        ", Parent's type is " + (typeof Parent)
                }));
            }
            child.prototype = new Parent();
            child.prototype.constructor = child;

            child.parent = Parent.prototype;
            if (Parent.prototype.constructor === Object.prototype.constructor) {
                Parent.prototype.constructor = Parent;
            }
        };

        /**
        * implement Interface implementation validation function.
        * @function implement
        * @param {object} Class class .
        * @param {Array} Interface Interfaces which the class implements.
        */
        _instance.implement = function (CLASS, interfaces) {
            var i, len, funi, interf, obj, e;

            if (arguments.length < 2) {
                e = new Clouber.Exception({
                    number: 10000,
                    name: "ParameterError",
                    message: Clouber.message.paramError + " (" +
                        arguments.length + " arguments)",
                    code: "Clouber#implement"
                });
                Clouber.log(e);
            }

            for (i = 1, len = arguments.length; i < len; i++) {
//                interf = arguments[i];
                obj = new arguments[i]();

                for (funi in obj) {
                    if ((obj.hasOwnProperty(funi)) &&
                            (typeof obj[funi] === 'function')) {

                        if (!CLASS[funi] ||
                                typeof CLASS[funi] !== 'function') {

                            e = new Clouber.Exception({
                                number: 10000,
                                name: "ParameterError",
                                message: Clouber.message.typeErrror + " (" +
                                    arguments.length + " arguments)",
                                description: "Function Clouber.implement: " +
                                    " object does't implement the interface." +
                                    " Method " + funi + " was not found.",
                                code: "Clouber#implement"
                            });
                            _instance.log(e);
                        }
                    }
                }
            }
        };

        /**
        * Clone a new object with same structure.
        * @function clone
        * @param  {object} obj Original object
        * @return {object} New object.
        */
        _instance.clone = function (obj) {
            function F() {}
            F.prototype = obj;
            return new F();
        };

        /**
        * Copy a new object with same data.
        * @function copy
        * @param  {object} object Original object
        * @return {object} New object.
        */
        _instance.copy = function (obj) {
            var cp, attr;
            try {
                if ((typeof obj !== "object") || (obj === null)) {
                    return obj;
                }
                // clone function
                cp = _instance.clone(obj);
                _instance.merge(cp, obj);
                return cp;
            } catch (e) {
                _instance.log(e);
            }
        };

        /**
        * Merget two objects' property into one object.
        * @function merge
        * @param  {object} object1 Object 1.
        * @param  {object} object2 Object 2.
        * @return {object} new object.
        */
        _instance.merge = function (object1, object2) {
            //return jQuery.extend(object1, object2);
            var attr;
            try {
                if ((typeof object1 !== "object") || (object1 === null)) {
                    object1 = {};
                }
                // copy property value
                for (attr in object2) {
                    if (object2.hasOwnProperty(attr)) {
                        switch (typeof object2[attr]) {
                        case "object":
                            object1[attr] = _instance.copy(object2[attr]);
                            break;
                        case "number":
                            object1[attr] = object2[attr];
                            break;
                        case "string":
                            object1[attr] = object2[attr];
                            break;
                        case "boolean":
                            object1[attr] = object2[attr];
                            break;
                        case "function":
                            object1[attr] = object2[attr];
                            break;
                        default:
                            break;
                        }
                    }
                }
                return object1;
            } catch (e) {
                _instance.log(e);
            }
        };

        /**
        * Dump object's property into a string.
        * @function merge
        * @param  {object} o Object.
        * @return {string}
        */
        _instance.dump = function (o) {
            //return jQuery.extend(object1, object2);
            var attr, s;

            if ((typeof o === "undefined") || (o === null)) {
                s = typeof o;

            } else if (typeof o === "object") {
                s = o.toString();
                // copy property value
                for (attr in o) {
                    if (o.hasOwnProperty(attr)) {
                        switch (typeof o[attr]) {
                        case "function":
                            s += "\n\t<" + attr + "> [function]";
                            break;
                        default:
                            s += "\n\t<" + attr + "> " + o[attr];
                        }
                    }
                }

            } else {
                s = o.toString();
            }
            return s;
        };

        /**
        * Log error message.
        * @function log
        */
        _instance.log = function (e) {
            if ((typeof console !== "undefined") && (console !== null)) {
                if ((Clouber.Exception !== undefined) &&
                        (e instanceof Clouber.Exception)) {
                    console.log("[Exception] " + _instance.dump(e));
                } else if ((Error !== undefined) && (e instanceof Error)) {
                    console.log("[Error] " + _instance.dump(e));
                } else {
                    if ((typeof _instance.config !== "undefined") &&
                            (_instance.config !== null) &&
                            (_instance.config._conf !== null)) {
                        if (_instance.config._conf.runtime === "development") {
                            console.log("[Message] " + _instance.dump(e));
                        }
                    } else {
                        console.log("[Message] " + _instance.dump(e));
                    }
                }
            }

            if ((typeof _instance.config !== "undefined") &&
                    (_instance.config !== null) &&
                    (_instance.config._conf !== null)) {
                if (_instance.config._conf.runtime === "development") {
                    if ((e instanceof Clouber.Exception) ||
                            (e instanceof Error)) {
                        throw e;
                    }
                }
            }
        };

        /**
        * Set a event handler of window onload event.
        * @function ready
        * @param  {function} event Window onload event handler
        */
        _instance.ready = function (event) {

            if (window.attachEvent) {
                window.attachEvent('onload', event);

            } else if (window.addEventListener) {
                window.addEventListener('load', event, false);

            } else {
                document.addEventListener('load', event, false);
            }
        };

        /**
        * Return true if the object is null or undefined.
        * @function isNull
        * @param  {object} o
        * @return {boolean}
        */
        _instance.isNull = function (o) {
            return ((typeof o === "undefined") || (o === null));
        };

        /**
        * Return true if the object is empty.
        * @function isEmpty
        * @param  {object} o
        * @return {boolean}
        */
        _instance.isEmpty = function (o) {
            var i, b = true;
            if (typeof o === "object") {
                for (i in o) {
                    if (o.hasOwnProperty(i)) {
                        b = false;
                        break;
                    }
                }
            } else {
                b = (
                    (_instance.isNull(o)) ||
                    ((typeof o === "string") && (o.length === 0)) ||
                    ((typeof o === "number") && (o === 0))
                );
            }
            return b;
        };

        /**
        * Get sequence number.
        * @function sequence
        * @return {int} id
        */
        _instance.sequence = function () {
            if (typeof _instance.id === "undefined") {
                _instance.id = 0;
            } else {
                _instance.id = _instance.id + 1;
            }
            return _instance.id;
        };

        return _instance;

    }());

}());

/**
* @global $CB A global variable of Clouber's alias.
*/
var $CB = Clouber;
var $cb = Clouber;
Clouber.log("Clouber initialized.");

