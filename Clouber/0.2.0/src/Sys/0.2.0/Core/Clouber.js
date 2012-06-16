/**
* Clouber core js library.
* @fileOverview clouber
* @copyright Clouber.org 2012
* @author Jon Zhou
* @module clouber
* @requires jQuery
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
Clouber.log("Clouber initialized.");

/**
* Clouber base exception class.
* @class Clouber.Exception
* @namespace Clouber
* @extends Error
* @constructor
*/
Clouber.Exception = function (e) {
    'use strict';

    this.name = e.name;
    this.number = e.number;
    this.description = e.description;
    this.message = e.message;
    this.fileName = e.fileName;
    this.stack = e.stack;
    this.text = e.text;
    this.code = e.code;
};
Clouber.Exception.prototype = new Error();
Clouber.Exception.parent = Error.prototype;


/**
* The base class of Clouber objects.
* @class  Clouber.BaseObject
* @namespace namespace Clouber
* @constructor
*/
Clouber.BaseObject = function () {
    'use strict';

    this._uid = null;
    
    /**
    * Get object unique ID.
    * @function getId
    * @return {int} Object unique id.
    */
    this.getId = function () {
        if ((this._uid === undefined) || (this._uid === null)) {
            this._uid = Clouber.sequence();
            // * 10000000000000 + new Date().valueOf();
        }
        return this._uid;
    };

    /**
    * Object initializaiton, can be overrided
    * @function init
    * @param {object} params Object settings.
    */
    this.init = function (params) {};

    /**
    * Object destroy.
    * @function destroy
    * @param {object} params Object settings.
    */
    this.destroy = function (params) {
        this.destroying();
        this._destroy();
    };

    /**
    * Destroy this object, can be overrided.
    * @event destroying
    */
    this.destroying = function () {};

    /**
    * Destroy this object, can be overrided.
    * @function destroying
    */
    this._destroy = function () {};

};





/**
* An object that maps keys to values.
* @class  Clouber.BaseObject
* @namespace namespace Clouber
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.Map = function () {
    'use strict';

    this._list = [];

    /**
    * Associates the specified value with the specified key in this map.
    * @function put
    * @param {Object} key
    * @param {Object} value
    */
    this.put = function (key, value) {
        var i = this.getIndexByKey(key);
        if (i > -1) {
            this._list[i] = {key: key, value: value};
        } else {
            this._list.push({key: key, value: value});
        }
    };

    /**
    * Returns the value to which the specified key is mapped, or null if this
    * map contains no mapping for the key.
    * @function get
    * @param {object} key
    * @return {obejct} value
    */
    this.get = function (key) {
        var v, i = this.getIndexByKey(key);
        if (i > -1) {
            v = this._list[i].value;
        } else {
            v = undefined;
        }
        return v;
    };

    /**
    * Returns true if this map maps one or more keys to the specified value.
    * @function containsValue
    * @return {Boolean}
    */
    this.containsValue = function (value) {
        var i = this.getIndexByValue(value);
        return i > -1;
    };

    /**
    * Returns true if this map contains a mapping for the specified key.
    * @function containsKey
    * @return {Boolean}
    */
    this.containsKey = function (key) {
        var i = this.getIndexByKey(key);
        return i > -1;
    };

    /**
    * Removes the mapping for a key from this map if it is present.
    * @function remove
    * @param {Obejct} key
    */
    this.remove = function (key) {
        var i = this.getIndexByKey(key);
        this.removeByIndex(i);
    };

    /**
    * Removes all of the mappings from this map.
    * @function clear
    */
    this.clear = function () {
        this._list = [];
    };

    /**
    * Returns the number of key-value mappings in this map.
    * @function size
    * @return {int}
    */
    this.size = function () {
        return this._list.length;
    };

    /**
    * Returns a Array view of the values contained in this map
    * @function values
    * @return {Array}
    */
    this.values = function () {
        var i, l, v = [];
        for (i = 0, l = this._list.length; i < l; i++) {
            v.push(this._list[i].value);
        }
        return v;
    };

    /**
    * Returns a Array view of the values contained in this map
    * @function values
    * @return {Array}
    */
    this.keys = function () {
        var i, l, v = [];
        for (i = 0, l = this._list.length; i < l; i++) {
            v.push(this._list[i].key);
        }
        return v;
    };

    /**
    * Return keys by value.
    * @function getKeys
    * @return {Array} .
    */
    this.getKeys = function (value) {
        var i, l, item, keys = [];
        for (i = 0, l = this._list.length; i < l; i++) {
            item = this._list[i];
            if (item.value === value) {
                keys.push(item.key);
            }
        }
        return keys;
    };

    /**
    * Removes the mapping for a value from this map if it is present.
    * @function removeByValue
    * @param {Obejct} value
    */
    this.removeByValue = function (value) {
        var i = this.getIndexByValue(value);
        if (i >= 0) {
            this.removeByIndex(i);
        }
    };

    /**
    * Returns the value by index.
    * @function getByIndex
    * @param {int} index
    * @return {Object} value
    */
    this.getByIndex = function (index) {
        return this._list[index].value;
    };

    /**
    * Returns the key by index.
    * @function getKeyByIndex
    * @param {int} index
    * @return {Object} key
    */
    this.getKeyByIndex = function (index) {
        return this._list[index].key;
    };

    /**
    * Remove a mapping by index
    * @function removeByIndex
    * @param {int} index
    */
    this.removeByIndex = function (index) {
        if (index >= 0) {
            this._list.splice(index, 1);
        }
    };

    /**
    * Returns index by key.
    * @function getIndexByKey
    * @return {int} Index
    */
    this.getIndexByKey = function (key) {
        var item, j, l, i = -1;
        for (j = 0, l = this._list.length; j < l; j++) {
            item = this._list[j];
            if (item.key === key) {
                i = j;
                break;
            }
        }
        return i;
    };

    /**
    * Returns first index of a value
    * @function getIndexByValue
    * @param {Object} value
    * @return {Array} index
    */
    this.getIndexByValue = function (value) {
        var i = -1, j, l, item;
        for (j = 0, l = this._list.length; j < l; j++) {
            item = this._list[j];
            if (item.value === value) {
                i = j;
                break;
            }
        }
        return i;
    };

    /**
    * Returns internal array of data
    * @function data
    * @return {Array}
    */
    this.data = function () {
        return this._list;
    };

    /**
    * Returns true if object is equal
    * @function getIndexByValue
    * @param {Object} value
    * @return {boolean}
    */
    this.equals = function (obj) {
        var b = true, i = -1, j, l, item;
        if (obj instanceof Clouber.Map) {
            if (obj.size() === this._list.length) {
                for (j = 0, l = this._list.length; j < l; j++) {
                    if ((this._list[j].key !== obj.data()[j].key) ||
                            (this._list[j].value !== obj.data()[j].value)) {
                        b = false;
                        break;
                    }
                }
            } else {
                b = false;
            }
        } else {
            b = false;
        }
        return b;
    };

    /**
    * Parse string to Map.
    * @function parseString
    * @param {string} text Source string.
    * @param {string} separator Separator between mappings
    * @param {string} delimiter Delimiter between name and value.
    * @param {boolean} decode Whether text need to decode. default value is
    *         false.
    * @return {Map}
    */
    this.parseString = function (text, separator, delimiter, decode) {
        var list, i, l, pair;

        if (typeof text === "undefined") {
            return;
        }

        if ((typeof separator === "undefined") || (separator === null)
                || (separator === "")) {
            separator = "&";
        }

        if ((typeof delimiter === "undefined") || (delimiter === null)
                || (delimiter === "")) {
            delimiter = "=";
        }

        this.clear();
        list = text.split(separator);
        for (i = 0, l = list.length; i < l; i++) {
            pair = list[i].split(delimiter);
            if ((typeof pair[0] === "string") && (pair[0] !== null) &&
                    (pair[0].length > 0)) {

                if (decode) {
                    this.put(pair[0], decodeURIComponent(pair[1]));
                } else {
                    this.put(pair[0], pair[1]);
                }
            }
        }
        return this;
    };

    /**
    * encode Map to string
    * @function stringify
    * @param {string} separator Separator between mappings
    * @param {string} delimiter Delimiter between name and value.
    * @param {boolean} decode Whether text need to decode. default value is
    *         false.
    * @return {string}
    */
    this.stringify = function (separator, delimiter, encode) {
        var i, l, s, k, v;
        if ((typeof separator === "undefined") || (separator === null)
                || (separator === "")) {
            separator = "&";
        }

        if ((typeof delimiter === "undefined") || (delimiter === null)
                || (delimiter === "")) {
            delimiter = "=";
        }

        if (this._list.length > 0) {
            if (encode) {
                s = encodeURIComponent(this._list[0].key.toString()) +
                    delimiter +
                    encodeURIComponent(this._list[0].value.toString());
            } else {
                s = this._list[0].key.toString() +
                    delimiter +
                    this._list[0].value.toString();
            }
            for (i = 1, l = this._list.length; i < l; i++) {
                k = this._list[i].key;
                k = ((k === undefined) || (k === null)) ? "" : k.toString();
                v = this._list[i].value;
                v = ((v === undefined) || (v === null)) ? "" : v.toString();
                if (encode) {
                    s = s + separator + encodeURIComponent(k) +
                        delimiter + encodeURIComponent(v);
                } else {
                    s = s + separator + k +
                        delimiter + v;
                }
            }
        }
        return s;
    };

    /**
    * Returns a Array view of the unique values contained in this map.
    * @function unique
    * @return {Array}
    */
    this.unique = function () {
        var i, v = this.values();
        v.sort();
        for (i = 1; i < v.length; i++) {
            if (v[i] === v[i - 1]) {
                v.splice(i--, 1);
            }
        }
        return v;
    };

    /**
    * Append other Map into a Map object.
    * @function append
    * @param {Map} map
    * @return {Map}
    */
    this.append = function (map) {
        var i, l;
        if ((typeof map !== "undefined") && (map !== null) &&
                (map instanceof Clouber.Map)) {

            for (i = 0, l = map._list.length; i < l; i++) {
                this.put(map._list[i].key, map._list[i].value);
            }
            return this;
        }
    };

};
Clouber.extend(Clouber.Map, Clouber.BaseObject);


