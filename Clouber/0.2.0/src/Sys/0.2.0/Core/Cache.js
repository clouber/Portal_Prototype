/**
* @fileOverview Clouber Cache uses HTML5 LocalStorage to cache client data.
* @copyright Clouber.org 2012
* @author Jon Zhou
* @module clouber
* @requires Clouber
*/


/**
* Clouber system core modules, using namespace Clouber.Sys.Core
* @class  Clouber.Sys.Core
* @module Clouber.Sys.Core
* @namespace Clouber.Sys.Core
*/
Clouber.namespace("Clouber.Sys.Core");

/**
* Clouber Cache object. it uses HTML5 LocalStorage to cache client data.
* @class  Clouber.Sys.Core.Cache
* @namespace Clouber
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.Sys.Core.Cache = function () {
    'use strict';

    /**
    * The user account of caching data object.
    * @property _user
    * @private
    * @ignore
    */
    var _user,

    /**
    * The key of caching data object.
    * @property _key
    * @private
    * @ignore
    */
        _key,

    /**
    * Caching data object.
    * @property _data
    * @private
    * @ignore
    */
        _data;

    /**
    * Get caching data object.
    * @function get
    * @param {string} user User account, public user can be null or public.
    * @param {string} key Object key.
    * @return {object} caching data object
    */
    this.get = function (key, user) {
        var o;
        if ((typeof _key === "undefined") || (_key === null)) {
            // get data from localStorage
            if ((typeof key === "string") && (key.length > 0)) {
                if (typeof (window.localStorage) !== "undefined") {
                    try {
                        if ((typeof user !== "string") || (user.length < 1)) {
                            o = window.localStorage.getItem("public:" + key);
                        } else {
                            o = window.localStorage.getItem(user + ":" + key);
                        }
                        return o;
                    } catch (e) {
                        e.code = "Clouber.Sys.Core.Cache#get";
                        Clouber.log(e);
                    }
                }
            } else {
                Clouber.log("Clouber.Sys.Core.Cache#get " +
                    Clouber.message.noLocalStorage);
            }

        } else {
            // get data from memory
            if ((typeof key === "undefined") || (key === null) ||
                    (key === _key)) {
                return _data;
            }
        }

    };

    /**
     * Put data object into cache.
     * @function put
     * @param {string} user User account, public user can be null or public.
     * @param {string} key Object key.
     * @param {object} data Caching data object.
     */
    this.put = function (key, data, user) {
        var item;

        if ((typeof key === "string") && (key.length > 0) &&
                (typeof data !== 'undefined') && (data !== null)) {

            // put data into memory
            if ((typeof user !== "string") || (user.length < 1)) {
                _user = "public";
            } else {
                _user = user;
            }
            _key = key;
            _data = Clouber.copy(data);

            // put data into localStorage
            if (typeof (window.localStorage) !== "undefined") {
                try {
                    window.localStorage.setItem(_user + ":" + _key, _data);
                    return true;
                } catch (e) {
                    e.code = "Clouber.Sys.Core.Cache#get";
                    Clouber.log(e);
                    return false;
                }
            } else {
                Clouber.log("Clouber.Sys.Core.Cache#get " +
                    Clouber.message.noLocalStorage);
            }
        }
    };

};
Clouber.extend(Clouber.Sys.Core.Cache, Clouber.BaseObject);

