/**
* @fileOverview Clouber BaseObject
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber BaseObject
* @requires Clouber.*
*/


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




