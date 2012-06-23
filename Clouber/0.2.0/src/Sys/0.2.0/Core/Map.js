/**
* @fileOverview Clouber Map class
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber.Map
* @requires Clouber.* Clouber.Sys.Core.*
*/


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
    * @function set
    * @param {Object} key
    * @param {Object} value
    */
    this.set = function (key, value) {
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
    * Returns the number of key-value mappings in this map.
    * @function size
    * @return {int}
    */
    this.size = function () {
        return this._list.length;
    };

    /**
    * Removes the mapping for a key from this map if it is present.
    * @function delete
    * @param {Obejct} key
    */
    this.delete = function (key) {
        var i = this.getIndexByKey(key);
        this.removeByIndex(i);
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
    * Removes all of the mappings from this map.
    * @function clear
    */
    this.clear = function () {
        this._list = [];
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

    /**
    * Associates the specified value with the specified key in this map.
    * @function put
    * @param {Object} key
    * @param {Object} value
    * @deprecated
    */
    this.put = function (key, value) {
        this.set(key, value);
    };

    /**
    * Removes the mapping for a key from this map if it is present.
    * @function remove
    * @param {Obejct} key
    * @deprecated
    */
    this.remove = function (key) {
        this.delete(key);
    };

};
Clouber.extend(Clouber.Map, Clouber.BaseObject);


