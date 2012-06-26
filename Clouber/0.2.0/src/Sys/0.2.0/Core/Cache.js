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
        _key,

    /**
    * Put time.
    * @property {Date} _time
    * @private
    * @ignore
    */
        _time,

    /**
    * Cache interval (seconds).
    * @property {int} _interval
    * @private
    * @ignore
    */
        _interval,

    /**
    * Count of caching data times.
    * @property _count
    * @private
    * @ignore
    */
        _count;

    /**
     * Put data object into cache.
     * @function set
     * @param {string} user User account, public user can be null or public.
     * @param {string} name Object name.
     * @param {object} data Caching data object.
     */
    this.set = function (name, data, user) {
        var item, t, l, d = {};

        if ((!Clouber.isEmpty(name)) && (!Clouber.isNull(data))) {

            // set data into memory
            _name = name;
            _data = Clouber.copy(data);
            _time = new Date();
            if ((typeof user !== "string") || (user.length < 1)) {
                _user = "public";
            } else {
                _user = user;
            }

            // put data into localStorage
            if (typeof (window.localStorage) !== "undefined") {
                l = Clouber.location;
                try {
                    if (_encrypt) {
                        t = Clouber.crypt.encrypt(_data, _key);
                    } else {
                        t = _data;
                    }
                    // get storage object with timestamp
                    d.value = t;
                    d.timestamp = _time.getTime();
                    t = JSON.stringify(d);
                    
                    window.localStorage.setItem(_user + "@" + l + ":" + _name, t);
                    _count = this.count() + 1;
                    return true;
                } catch (e) {
                    e.code = "Clouber.Sys.Core.Cache#set";
                    Clouber.log(e);
                    window.localStorage.removeItem(_user + "@" + l + ":" + _name);
                    return false;
                }
            } else {
                Clouber.log("Clouber.Sys.Core.Cache#set " +
                    Clouber.message.noLocalStorage);
            }
        }
    };

    /**
    * Get caching data object.
    * @function get
    * @param {string} user User account, public user can be null or public.
    * @param {string} name Object name.
    * @return {object} caching data object
    */
    this.get = function (name, user) {
        var o, t, d, l;
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
                    l = Clouber.location;
                    t = window.localStorage.getItem(user + "@" + l + ":" + name);

                    if (!Clouber.isNull(t)) {
                        d = JSON.parse(t);
                        _time = d.timestamp; 
                        t = d.value;
                    }
                  
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
                        _time = new Date();
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
    * Get caching data saving times.
    * @function count
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
    * @function encrypt
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

    /**
    * Return or set cache interval.
    * @function interval
    * @param {number} interval
    * @return {number}
    */
    this.interval = function (interval) {
        if (!Clouber.isNull(interval)) {
            _interval = interval;
        }
        return _interval;
    };

    /**
    * Return true if data need to encrypt.
    * @function get
    * @param {boolean} b
    * @return {boolean}
    */
    this.expired = function (b) {
        var r = false;
        if (Clouber.isNull(b)) {
            r = ((new Date() - _time) > (_interval * 1000)) ? true : false;
        } else {
            if (b) {
                _time = new Date() - _interval * 1000;
            } else {
                _time = new Date();
            }
            r = b;
        }
        return r;
    };

};
Clouber.extend(Clouber.Sys.Core.Cache, Clouber.BaseObject);

