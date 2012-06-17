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
            (Clouber.newer("0.1.1"))) {
        return;
    }

    /**
    * declare the gloabel object Clouber.
    */
    Clouber = {

        /**
        * Clouber's version
        * @property {String} VERSION
        */
        VERSION: "0.1.2",

        /**
        * Return true if this version is newer than the given version.
        * @function newer
        * @param {string} version Version scheme is "major.minor.stage"
        * @return {boolean}
        */
        newer: function (version) {
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
        },

        /**
        * Implement class namespace support.(JavaScript Patterns, Stoyan
        * Stefanov, 2010, O'Reilly)
        * @function namespace
        * @param {string} nameSpace Namespace splitted by ".", "/", "_", "\".
        * @return {object} nameSpace
        */
        namespace: function (nameSpace) {
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
        },

        /**
        * Create app object instance. Because of performance issues, this
        * function only use to create components which need to generate a UID,
        * not normal objects.
        * @function create
        * @param  {string} name
        * @param  {object} params  Parameter object
        * @return  new object instance.
        */
        create: function (name, params) {
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
                this.log("Clouber#create:  " + str);
                eval(str);

                return obj;
            } catch (e) {
                e.code = "Clouber#create";
                this.log(e);
            }
        },

        /**
        * Load application js module with module name.
        * @function extend
        * @param  {object} params Parameter object
        * @param  params.app   application name
        * @param  params.version  application version
        * @param  params.module  application module
        * @param  params.control  name of the control in an application module
        */
        extend: function (child, Parent) {
            if ((typeof child !== "function") ||
                    ((typeof Parent !== "function"))) {
                this.log(new Clouber.Exception({
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
        },

        /**
        * implement Interface implementation validation function.
        * @function implement
        * @param {object} Class class .
        * @param {Array} Interface Interfaces which the class implements.
        */
        implement: function (CLASS, interfaces) {
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
                            this.log(e);
                        }
                    }
                }
            }
        },

        /**
        * Clone a new object with same structure.
        * @function clone
        * @param  {object} obj Original object
        * @return {object} New object.
        */
        clone: function (obj) {
            function F() {}
            F.prototype = obj;
            return new F();
        },

        /**
        * Copy a new object with same data.
        * @function copy
        * @param  {object} object Original object
        * @return {object} New object.
        */
        copy: function (obj) {
            var cp, attr;
            try {
                if ((typeof obj !== "object") || (obj === null)) {
                    return obj;
                }
                // clone function
                cp = this.clone(obj);
                this.merge(cp, obj);
                return cp;
            } catch (e) {
                this.log(e);
            }
        },

        /**
        * Merget two objects' property into one object.
        * @function merge
        * @param  {object} object1 Object 1.
        * @param  {object} object2 Object 2.
        * @return {object} new object.
        */
        merge: function (object1, object2) {
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
                            object1[attr] = this.copy(object2[attr]);
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
                this.log(e);
            }
        },

        /**
        * Dump object's property into a string.
        * @function merge
        * @param  {object} o Object.
        * @return {string}
        */
        dump: function (o) {
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
        },

        /**
        * Log error message.
        * @function log
        */
        log: function (e) {
            if ((typeof console !== "undefined") && (console !== null)) {
                if ((Clouber.Exception !== undefined) &&
                        (e instanceof Clouber.Exception)) {
                    console.log("[Exception] " + this.dump(e));
                } else if ((Error !== undefined) && (e instanceof Error)) {
                    console.log("[Error] " + this.dump(e));
                } else {
                    if ((typeof this.config !== "undefined") &&
                            (this.config !== null) &&
                            (this.config._conf !== null)) {
                        if (this.config._conf.runtime === "development") {
                            console.log("[Message] " + this.dump(e));
                        }
                    } else {
                        console.log("[Message] " + this.dump(e));
                    }
                }
            }

            if ((typeof this.config !== "undefined") &&
                    (this.config !== null) &&
                    (this.config._conf !== null)) {
                if (this.config._conf.runtime === "development") {
                    if ((e instanceof Clouber.Exception) ||
                            (e instanceof Error)) {
                        throw e;
                    }
                }
            }
        },

        /**
        * Set a event handler of window onload event.
        * @function ready
        * @param  {function} event Window onload event handler
        */
        ready: function (event) {

            if (window.attachEvent) {
                window.attachEvent('onload', event);

            } else if (window.addEventListener) {
                window.addEventListener('load', event, false);

            } else {
                document.addEventListener('load', event, false);
            }
        },

        /**
        * Return true if the object is null or undefined.
        * @function isNull
        * @param  {object} o 
        * @return {boolean}
        */
        isNull: function (o) {
            return ((typeof o === "undefined") || (o === null));
        },

        /**
        * Return true if the object is empty.
        * @function isEmpty
        * @param  {object} o 
        * @return {boolean}
        */
        isEmpty: function (o) {
            var i, b = true;
            if (typeof o === "object") {
                for (i in o) {
                    b = false;
                }
            } else {
                b = (
                    (this.isNull(o)) ||
                    ((typeof o === "string") && (o.length === 0)) ||
                    ((typeof o === "number") && (o === 0))
                );
            }
            return b;
        },

        /**
        * Get sequence number.
        * @function sequence
        * @return {int} id
        */
        sequence: function () {
            if (typeof this.id === "undefined") {
                this.id = 0;
            } else {
                this.id = this.id + 1;
            }
            return this.id;
        }

    };
}());

/**
* @global $CB A global variable of Clouber's alias.
*/
var $CB = Clouber;
var $cb = Clouber;
Clouber.log("Clouber initialized.");

