/**
 * @fileOverview Clouber PortletInfo type.
 * @copyright Clouber.org 2012
 * @author Jon Zhou
 * @module Clouber.Sys.Portlet.PortletInfo
 * @license
 */

Clouber.namespace("Clouber.Sys.Portlet");


/**
* Define Portlet information type.
* @function Clouber.Sys.Portlet.PortletInfo
* @class Clouber.Sys.Portlet.PortletInfo
* @namespace Clouber.Sys.Portlet
*/
Clouber.Sys.Portlet.PortletInfo = function () {
    'use strict';
    var obj = new WSRP.PortletDescription();

    /**
    * 1 portlet id
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {string} portletID
    */
    obj._portletID = "";
    Object.defineProperty(obj, "portletID", {
        configurable: false,
        enumerable: true,
        get: function () {
            return this._portletID;
        },
        set: function (value) {
            if ((value === undefined) || (value === null) ||
                    (value.length === 0)) {

                Clouber.log(new Clouber.Exception({
                    number: 10000,
                    name: "ParameterError",
                    message: Clouber.message.paramError +
                        " (portletID)",
                    code: "Clouber.Sys.Portlet.PortletInfo#portletID#set"
                }));
            } else {
                this._portletID = value;
            }
        }
    });

    /**
    * 2 portlet displayName
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {string} displayName
    */
    obj._displayName = "";
    Object.defineProperty(obj, "displayName", {
        get: function () {
            return this._displayName;
        },
        set: function (value) {
            if ((value !== undefined) && (value !== null) &&
                    (typeof value === "string") && (value.length !== 0)) {

                this._displayName = value;
            }
        }
    });

    /**
    * 3 portlet groupID is namespace
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {string} name
    */
    obj._groupID = "";
    Object.defineProperty(obj, "groupID", {
        get: function () {
            return this._groupID;
        },
        set: function (value) {
            if ((value !== undefined) && (value !== null) &&
                    (typeof value === "string") && (value.length !== 0)) {
                this._groupID = value;
            }
        }
    });

    /**
    * 4 portlet title
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {string} title
    */
    obj._title = "";
    Object.defineProperty(obj, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        }
    });

    /**
    * 5 portlet description
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {string} description
    */
    obj._description = "";
    Object.defineProperty(obj, "description", {
        get: function () {
            return this._description;
        },
        set: function (value) {
            this._description = value;
        }
    });

    /**
    * 6 portlet shortTitle
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {string} shortTitle
    */
    obj._shortTitle = "";
    Object.defineProperty(obj, "shortTitle", {
        get: function () {
            return this._shortTitle;
        },
        set: function (value) {
            this._shortTitle = value;
        }
    });

    /**
    * 7 portlet markupTypes, include theme definition
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {Map} markupTypes
    */
    obj.markupTypes = new Clouber.Map();

    /**
    * 8 portlet initial parameters
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {Map} initParameters
    */
    obj.initParameters = new Clouber.Map();

    /**
    * 9 handledEvents
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {array(QName)} handledEvents
    */
    obj.handledEvents = [];

    /**
    * 10 usesMethodGet
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {boolean} usesMethodGet
    */
    obj._usesMethodGet = false;
    Object.defineProperty(obj, "usesMethodGet", {
        get: function () {
            return this._usesMethodGet;
        },
        set: function (value) {
            if (typeof value === "boolean") {
                this._usesMethodGet = value;
            } else if ((typeof value === "string") &&
                    (value.toLowerCase() === "true")) {
                this._usesMethodGet = true;
            }
        }
    });

    /**
    * 11 keywords
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {array(LocalizedString)} keywords
    */
    obj.keywords = [];

    /**
    * 12 publishedEvents
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {array(QName)} publishedEvents
    */
    obj.publishedEvents = [];

    /**
    * 13 userCategories
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {array(string)} userCategories
    */
    obj.userCategories = [];

    /**
    * 14 userProfileItems
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {array(string)} userProfileItems
    */
    obj.userProfileItems = [];

    /**
    * 15 portletManagedModes
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {array(string)} portletManagedModes
    */
    obj._portletManagedModes = ["wsrp:view", "wsrp:edit", "wsrp:help",
        "wsrp:preview"];
    Object.defineProperty(obj, "portletManagedModes", {
        get: function () {
            return this._portletManagedModes;
        },
        set: function (value) {
            var i, l, b = true;
            if (value instanceof Array) {
                for (i = 0, l = value.length; i < l; i++) {
                    if ((typeof value[i] !== "string") ||
                            (value[i].length === 0)) {
                        b = false;
                        break;
                    }
                }
                if (b) {
                    this._portletManagedModes = value;
                }
            }
        }
    });

    /**
    * 16 defaultMarkupSecure
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {boolean} defaultMarkupSecure
    */
    obj._defaultMarkupSecure = false;
    Object.defineProperty(obj, "defaultMarkupSecure", {
        get: function () {
            return this._defaultMarkupSecure;
        },
        set: function (value) {
            if (typeof "value" === "boolean") {
                this._defaultMarkupSecure = value;
            } else if ((typeof value === "string") &&
                    (value.toLowerCase() === "true")) {
                this._defaultMarkupSecure = true;
            }
        }
    });

    /**
    * 17 onlySecure
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {boolean} onlySecure
    */
    obj._onlySecure = false;
    Object.defineProperty(obj, "onlySecure", {
        get: function () {
            return this._onlySecure;
        },
        set: function (value) {
            if (typeof "value" === "boolean") {
                this._onlySecure = value;
            } else if ((typeof value === "string") &&
                    (value.toLowerCase() === "true")) {
                this._onlySecure = true;
            }
        }
    });

    /**
    * 18 userContextStoredInSession
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {boolean} userContextStoredInSession
    */
    obj._userContextStoredInSession = false;
    Object.defineProperty(obj, "userContextStoredInSession", {
        get: function () {
            return this._userContextStoredInSession;
        },
        set: function (value) {
            if (typeof "value" === "boolean") {
                this._userContextStoredInSession = value;
            } else if ((typeof value === "string") &&
                    (value.toLowerCase() === "true")) {
                this._userContextStoredInSession = true;
            }
        }
    });

    /**
    * 19 templatesStoredInSession
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {boolean} templatesStoredInSession
    */
    obj._templatesStoredInSession = false;
    Object.defineProperty(obj, "templatesStoredInSession", {
        get: function () {
            return this._templatesStoredInSession;
        },
        set: function (value) {
            if (typeof "value" === "boolean") {
                this._templatesStoredInSession = value;
            } else if ((typeof value === "string") &&
                    (value.toLowerCase() === "true")) {
                this._templatesStoredInSession = true;
            }
        }
    });

    /**
    * 20 hasUserSpecificState
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {boolean} hasUserSpecificState
    */
    obj._hasUserSpecificState = false;
    Object.defineProperty(obj, "hasUserSpecificState", {
        get: function () {
            return this._hasUserSpecificState;
        },
        set: function (value) {
            if (typeof "value" === "boolean") {
                this._hasUserSpecificState = value;
            } else if ((typeof value === "string") &&
                    (value.toLowerCase() === "true")) {
                this._hasUserSpecificState = true;
            }
        }
    });

    /**
    * 21 doesUrlTemplateProcessing
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {boolean} doesUrlTemplateProcessing
    */
    obj._doesUrlTemplateProcessing = false;
    Object.defineProperty(obj, "doesUrlTemplateProcessing", {
        get: function () {
            return this._doesUrlTemplateProcessing;
        },
        set: function (value) {
            if (typeof "value" === "boolean") {
                this._doesUrlTemplateProcessing = value;
            } else if ((typeof value === "string") &&
                    (value.toLowerCase() === "true")) {
                this._doesUrlTemplateProcessing = true;
            }
        }
    });

    /**
    * 22 mayReturnPortletState
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {boolean} mayReturnPortletState
    */
    obj._mayReturnPortletState = true;
    Object.defineProperty(obj, "mayReturnPortletState", {
        get: function () {
            return this._mayReturnPortletState;
        },
        set: function (value) {
            if (typeof "value" === "boolean") {
                this._mayReturnPortletState = value;
            } else if ((typeof value === "string") &&
                    (value.toLowerCase() === "true")) {
                this._mayReturnPortletState = true;
            }
        }
    });

    /**
    * 23 portlet inavigational Parameter Descriptions
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {Map} navigationalParameterDescriptions
    */
    obj.navigationalParameterDescriptions = [];

    /**
    * 24 extensions, include theme, titlebar, statusbar, option, thumbnail
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {array} extensions
    */
    obj.extensions = new Clouber.Map();

    /**
    * 25 portletHandle
    * @class Clouber.Sys.Portlet.PortletInfo
    * @property {string} portletHandle
    */
    Object.defineProperty(obj, "portletHandle", {
        get: function () {
            return this.getUid();
        },
        set: function (value) {
            Clouber.log(Clouber.message.typeErrror +
                " Clouber.Sys.Portlet.PortletInfo#portletHandle");
        }
    });

    Object.seal(obj);

    return obj;
};

