/**
* @fileOverview Clouber crypt object.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Cache
* @requires CryptoJS Clouber.* Clouber.Sys.Core.* 
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
* @class  Clouber.Sys.Core.Crypt
* @namespace Clouber
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.Sys.Core.Crypt = function () {
    'use strict';

    /**
    * The public key of this website.
    * @property {string} publicKey
    */
    this.publicKey = "Clouber";

    /**
    * Get encrypted text.
    * @function get
    * @param {string} text Uncrypted text.
    * @param {string} key Object key.
    * @param {string} mode Object key, such as "AES"
    * @return {string} encrypted text
    */
    this.encrypt = function (text, key, mode) {
        var ct;
        if (Clouber.isEmpty(key)) {
            key = this.publicKey;
        }
        if (Clouber.isEmpty(mode)) {
            mode = "AES";
        }
        if (mode === "AES") {
            ct = CryptoJS.AES.encrypt(text, key).toString();
        }
        return ct;
    };

    /**
     * Put data object into cache.
     * @function put
    * @param {string} ct Encrypted text.
    * @param {string} key Object key.
    * @param {string} mode Object key, such as "AES"
    * @return {string} decrypted text
     */
    this.decrypt = function (ct, key, mode) {
        var dt
        if (Clouber.isEmpty(key)) {
            key = this.publicKey;
        }
        if (Clouber.isEmpty(mode)) {
            mode = "AES";
        }
        if (mode === "AES") {
            try {
                dt = CryptoJS.AES.decrypt(ct, key).toString(CryptoJS.enc.Utf8);
            } catch(e) {
                Clouber.log("Clouber.Sys.Core.Crypt#decrypt " +
                    Clouber.message.decryptError);
                dt = null;
            }
        }
        return dt
    };

    /**
    * Get MD5 hash
    * @function md5
    * @return {string} 
    */
    this.md5 = function (text) {
        return CryptoJS.MD5(text);
    };
};
Clouber.extend(Clouber.Sys.Core.Crypt, Clouber.BaseObject);

/**
* Clouber crypt object initialization.
*/
Clouber.set("crypt", new Clouber.Sys.Core.Crypt());
Clouber.lock(Clouber.crypt);

