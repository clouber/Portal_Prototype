/**
* @fileOverview Clouber user class.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Cache
* @requires Clouber.* Clouber.Core.*
*/


/**
* Clouber system core modules, using namespace Clouber.Core
* @class  Clouber.Core
* @module Clouber.Core
* @namespace Clouber.Core
*/
Clouber.namespace("Clouber.Core");

/**
* Clouber user class.
* @class  Clouber.Core.User
* @namespace Clouber
* @extends Clouber.Core.BaseObject
* @constructor
*/
Clouber.Core.User = function () {
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
Clouber.extend(Clouber.Core.User, Clouber.Core.BaseObject);

/**
* Clouber user object initialization.
*/
Clouber.set("user", new Clouber.Core.User());
Clouber.lock(Clouber.user);

