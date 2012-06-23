/**
* @fileOverview Clouber Cache uses HTML5 LocalStorage to cache client data.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Cache
* @requires Clouber.* Clouber.Sys.Core.*
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
    * The name of caching data object.
    * @property _name
    * @private
    * @ignore
    */
        _name,

    /**
    * Caching data object.
    * @property _data
    * @private
    * @ignore
    */
        _data,

    /**
    * Data object is encrpted.
    * @property {boolean} _encrypt
    * @private
    * @ignore
    */
        _encrypt = true,

    /**
    * Data encrption key.
    * @property {string} _key
    * @private
    * @ignore
    */
        _key = null,

    /**
    * Count of caching data times.
    * @property _count
    * @private
    * @ignore
    */
        _count;

    /**
    * Get caching data object.
    * @function get
    * @param {string} user User account, public user can be null or public.
    * @param {string} name Object name.
    * @return {object} caching data object
    */
    this.get = function (name, user) {
        var o, t;
        if ((typeof _data === "undefined") || (_data === null)) {
            // get data from localStorage
            if (typeof (window.localStorage) !== "undefined") {
                if (Clouber.isEmpty(user)) {
                    if (Clouber.isEmpty(_user)) {
                        user = "public";
                    } else {
                        user = _user;
                    }
                }
                if (Clouber.isEmpty(name)) {
                    name = _name;
                }
                try {
                    t = window.localStorage.getItem(user + ":" + name);
                    if (!Clouber.isNull(t)) {
                        Clouber.log("Clouber.Sys.Core.Cache#get ======== " +
                            user + ":" + name);
                        if (_encrypt) {
                            _data = Clouber.crypt.decrypt(t, _key);
                        } else {
                            _data = t;
                        }
                        _name = name;
                        _user = user;
                        return _data;
                    }
                } catch (e) {
                    e.code = "Clouber.Sys.Core.Cache#get";
                    Clouber.log(e);
                }
            } else {
                Clouber.log("Clouber.Sys.Core.Cache#get " +
                    Clouber.message.noLocalStorage);
            }

        } else {
            // get data from memory
            if ((typeof name === "undefined") || (name === null) ||
                    (name === _name)) {
                return _data;
            }
        }

    };

    /**
     * Put data object into cache.
     * @function put
     * @param {string} user User account, public user can be null or public.
     * @param {string} name Object name.
     * @param {object} data Caching data object.
     */
    this.put = function (name, data, user) {
        var item, t;

        if ((!Clouber.isEmpty(name)) && (!Clouber.isNull(data))) {

            // put data into memory
            _name = name;
            _data = Clouber.copy(data);
            if ((typeof user !== "string") || (user.length < 1)) {
                _user = "public";
            } else {
                _user = user;
            }

            // put data into localStorage
            if (typeof (window.localStorage) !== "undefined") {
                try {
                    if (_encrypt) {
                        t = Clouber.crypt.encrypt(_data, _key);
                    } else {
                        t = _data;
                    }
                    window.localStorage.setItem(_user + ":" + _name, t);
                    _count = this.count() + 1;
                    return true;
                } catch (e) {
                    e.code = "Clouber.Sys.Core.Cache#put";
                    Clouber.log(e);
                    window.localStorage.removeItem(_user + ":" + _name, _data);
                    return false;
                }
            } else {
                Clouber.log("Clouber.Sys.Core.Cache#put " +
                    Clouber.message.noLocalStorage);
            }
        }
    };

    /**
    * Get caching data saving times.
    * @function get
    * @return {int}
    */
    this.count = function () {
        if (Clouber.isNull(_count)) {
            _count = 0;
        }
        return _count;
    };

    /**
    * Return true if data need to encrypt.
    * @function get
    * @param {boolean} encrypt
    * @return {boolean}
    */
    this.encrypt = function (encrypt) {
        if (!Clouber.isNull(encrypt)) {
            _encrypt = encrypt;
        }
        return _encrypt;
    };

    /**
    * Set encryption key
    * @function setKey
    * @param {string} key
    */
    this.setKey = function (key) {
        if (!Clouber.isEmpty(key)) {
            _key = key;
        }
    };

};
Clouber.extend(Clouber.Sys.Core.Cache, Clouber.BaseObject);

