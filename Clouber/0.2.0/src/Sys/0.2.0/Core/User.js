/**
* @fileOverview Clouber user class.
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
* Clouber user class.
* @class  Clouber.Sys.Core.User
* @namespace Clouber
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.Sys.Core.User = function () {
    "use strict";

    /**
    * The private key of this user.
    * @property {string} _key
    * @private
    * @ignore
    */
    var _key = "CLOUBER_PRIVATE",

    /**
    * The user id.
    * @property {string} _user
    * @private
    * @ignore
    */
        _user = "public",

     /**
    * The user display name.
    * @property {string} _name
    * @private
    * @ignore
    */
        _name = "public";

    /**
    * Get private key
    * @function key
    * @param {string} text Uncrypted text.
    * @return {string} encrypted text
    */
    this.key = function (key) {
        if (!Clouber.isEmpty(key)) {
            _key = key;
        }
        return _key;
    };

    /**
    * Get user id
    * @function id
    * @param {string} text Uncrypted text.
    * @return {string} encrypted text
    */
    this.id = function (id) {
        if (!Clouber.isEmpty(id)) {
            _user = id;
        }
        return _user;
    };
    
    /**
    * Get user name
    * @function name
    * @param {string} text Uncrypted text.
    * @return {string} encrypted text
    */
    this.name = function (name) {
        if (!Clouber.isEmpty(name)) {
            _name = name;
        }
        return _name;
    };
};
Clouber.extend(Clouber.Sys.Core.User, Clouber.BaseObject);

/**
* Clouber user object initialization.
*/
Clouber.set("user", new Clouber.Sys.Core.User());
Object.defineProperty(Clouber, "user", {
    configurable: false,
    enumerable: true,
    get: function () {
        return Clouber.get("user");
    },
    set: function (value) {
        return;
    }
});

