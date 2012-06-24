/**
* @fileOverview Clouber PortletInfo type.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber.Sys.Portal.PortletInfo
* @requires Clouber.* Clouber.Sys.Core.* Clouber.Sys.Portal.*
*/

Clouber.namespace("Clouber.Sys.Portal");


/**
* Define Portlet information type.
* @function Clouber.Sys.Portal.PortletInfo
* @class Clouber.Sys.Portal.PortletInfo
* @namespace Clouber.Sys.Portal
*/
Clouber.Sys.Portal.PortletInfo = function () {
    'use strict';
    var i, obj = new Clouber.Sys.Portal.T.PortletDescription();

    /**
    * 1 portlet id
    * @class Clouber.Sys.Portal.PortletInfo
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
                    code: "Clouber.Sys.Portal.PortletInfo#portletID#set"
                }));
            } else {
                this._portletID = value;
            }
        }
    });

    /**
    * 2 portlet displayName
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {Map} markupTypes
    */
    obj.markupTypes = new Clouber.Map();

    /**
    * 8 portlet initial parameters
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {Map} initParameters
    */
    obj.initParameters = new Clouber.Map();

    /**
    * 9 handledEvents
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {array(QName)} handledEvents
    */
    obj.handledEvents = [];

    /**
    * 10 usesMethodGet
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {array(LocalizedString)} keywords
    */
    obj.keywords = [];

    /**
    * 12 publishedEvents
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {array(QName)} publishedEvents
    */
    obj.publishedEvents = [];

    /**
    * 13 userCategories
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {array(string)} userCategories
    */
    obj.userCategories = [];

    /**
    * 14 userProfileItems
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {array(string)} userProfileItems
    */
    obj.userProfileItems = [];

    /**
    * 15 portletManagedModes
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {array(string)} portletManagedModes
    */
    obj._portletManagedModes = ["view", "edit", "help",
        "preview"];
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
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
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {Map} navigationalParameterDescriptions
    */
    obj.navigationalParameterDescriptions = [];

    /**
    * 24 extensions, include theme, titlebar, statusbar, option, thumbnail
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {array} extensions
    */
    obj.extensions = new Clouber.Map();

    /**
    * 25 portletHandle
    * @class Clouber.Sys.Portal.PortletInfo
    * @property {string} portletHandle
    */
    Object.defineProperty(obj, "portletHandle", {
        get: function () {
            return this.getId();
        },
        set: function (value) {}
    });
    i = obj.portletHandle;

    Object.seal(obj);

    return obj;
};

