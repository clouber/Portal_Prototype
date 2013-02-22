/**
* @fileOverview Clouber BaseObject
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber BaseObject
* @requires Clouber.*
*/

/**
* Clouber system core modules, using namespace Clouber.Core
* @class  Clouber.Core
* @module Clouber.Core
* @namespace Clouber.Core
*/
Clouber.namespace("Clouber.Core");

/**
* Clouber base exception class.
* @class Clouber.Core.Exception
* @namespace Clouber
* @extends Error
* @constructor
*/
Clouber.Core.Exception = function (e) {
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
Clouber.Core.Exception.prototype = new Error();
Clouber.Core.Exception.parent = Error.prototype;


/**
* The base class of Clouber objects.
* @class  Clouber.Core.BaseObject
* @namespace namespace Clouber
* @constructor
*/
Clouber.Core.BaseObject = function () {
    'use strict';
    
    var _uid;
    /**
    * Get object unique ID.
    * @function getId
    * @return {int} Object unique id.
    */
    this.getId = function () {
        if ((_uid === undefined) || (_uid === null)) {
            _uid = Clouber.sequence();
            // * 10000000000000 + new Date().valueOf();
        }
        return _uid;
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




