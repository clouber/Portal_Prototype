/**
 * @fileOverview Clouber PortletInfo type.
 * @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
 * @module Clouber.sys.portlet.PortletInfo
 * @version 0.1.0
 * @license
 */

Clouber.namespace("Clouber.sys.portlet");


/**
* Define Portlet information type.
* @function Clouber.sys.portlet.PortletInfo
* @class Clouber.sys.portlet.PortletInfo
* @namespace Clouber.sys.portlet
*/
Clouber.sys.portlet.PortletInfo = function () {
    'use strict';
    var obj = new WSRP.PortletDescription();

    /**
    * 1 portlet id
    * @class Clouber.sys.portlet.PortletInfo
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
                    code: "Clouber.sys.portlet.PortletInfo#portletID#set"
                }));
            } else {
                this._portletID = value;
            }
        }
    });

    /**
    * 2 portlet displayName
    * @class Clouber.sys.portlet.PortletInfo
    * @property {string} displayName
    */
    obj._displayName = "";
    Object.defineProperty(obj, "displayName", {
        get: function () {
            return this._displayName;
        },
        set: function (value) {
            if ((value === undefined) || (value === null) ||
                    (value.length === 0)) {

                Clouber.log(new Clouber.Exception({
                    number: 10000,
                    name: "ParameterError",
                    message: Clouber.message.paramError +
                        " (displayName)",
                    code: "Clouber.sys.portlet.PortletInfo#displayName#set"
                }));
            } else {
                this._displayName = value;
            }
        }
    });

    /**
    * 3 portlet groupID is namespace
    * @class Clouber.sys.portlet.PortletInfo
    * @property {string} name
    */
    obj._groupID = "";
    Object.defineProperty(obj, "groupID", {
        get: function () {
            return this._groupID;
        },
        set: function (value) {
            if ((value === undefined) || (value === null) ||
                    (value.length === 0)) {

                Clouber.log(new Clouber.Exception({
                    number: 10000,
                    name: "ParameterError",
                    message: Clouber.message.paramError +
                        " (groupID)",
                    code: "Clouber.sys.portlet.PortletInfo#groupID#set"
                }));
            } else {
                this._groupID = value;
            }
        }
    });

    /**
    * 4 portlet title
    * @class Clouber.sys.portlet.PortletInfo
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
    * @class Clouber.sys.portlet.PortletInfo
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
    * @class Clouber.sys.portlet.PortletInfo
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
    * @class Clouber.sys.portlet.PortletInfo
    * @property {Map} markupTypes
    */
    obj.markupTypes = new Clouber.Map();

    /**
    * 8 portlet initial parameters
    * @class Clouber.sys.portlet.PortletInfo
    * @property {Map} initParameters
    */
    obj.initParameters = new Clouber.Map();

    /**
    * 9 handledEvents
    * @class Clouber.sys.portlet.PortletInfo
    * @property {array(QName)} handledEvents
    */
    obj.handledEvents = [];

    /**
    * 10 usesMethodGet
    * @class Clouber.sys.portlet.PortletInfo
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
            } else {
                Clouber.log(Clouber.message.typeErrror +
                    " Clouber.sys.portlet.PortletInfo#usesMethodGet");
            }
        }
    });

    /**
    * 11 keywords
    * @class Clouber.sys.portlet.PortletInfo
    * @property {array(LocalizedString)} keywords
    */
    obj.keywords = [];

    /**
    * 12 publishedEvents
    * @class Clouber.sys.portlet.PortletInfo
    * @property {array(QName)} publishedEvents
    */
    obj.publishedEvents = [];

    /**
    * 13 userCategories
    * @class Clouber.sys.portlet.PortletInfo
    * @property {array(string)} userCategories
    */
    obj.userCategories = [];

    /**
    * 14 userProfileItems
    * @class Clouber.sys.portlet.PortletInfo
    * @property {array(string)} userProfileItems
    */
    obj.userProfileItems = [];

    /**
    * 15 portletManagedModes
    * @class Clouber.sys.portlet.PortletInfo
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
                } else {
                    Clouber.log(Clouber.message.typeErrror +
                        " Clouber.sys.portlet.PortletInfo#portletManagedModes");
                }
            } else {
                Clouber.log(Clouber.message.typeErrror +
                    " Clouber.sys.portlet.PortletInfo#portletManagedModes");
            }
        }
    });

    /**
    * 16 defaultMarkupSecure
    * @class Clouber.sys.portlet.PortletInfo
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
            } else {
                Clouber.log(Clouber.message.typeErrror +
                    " Clouber.sys.portlet.PortletInfo#defaultMarkupSecure");
            }
        }
    });

    /**
    * 17 onlySecure
    * @class Clouber.sys.portlet.PortletInfo
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
            } else {
                Clouber.log(Clouber.message.typeErrror +
                    " Clouber.sys.portlet.PortletInfo#onlySecure");
            }
        }
    });

    /**
    * 18 userContextStoredInSession
    * @class Clouber.sys.portlet.PortletInfo
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
            } else {
                Clouber.log(Clouber.message.typeErrror +
                    " Clouber.sys.portlet.PortletInfo" +
                    "#userContextStoredInSession");
            }
        }
    });

    /**
    * 19 templatesStoredInSession
    * @class Clouber.sys.portlet.PortletInfo
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
            } else {
                Clouber.log(Clouber.message.typeErrror +
                    " Clouber.sys.portlet.PortletInfo" +
                    "#templatesStoredInSession");
            }
        }
    });

    /**
    * 20 hasUserSpecificState
    * @class Clouber.sys.portlet.PortletInfo
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
            } else {
                Clouber.log(Clouber.message.typeErrror +
                    " Clouber.sys.portlet.PortletInfo#hasUserSpecificState");
            }
        }
    });

    /**
    * 21 doesUrlTemplateProcessing
    * @class Clouber.sys.portlet.PortletInfo
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
            } else {
                Clouber.log(Clouber.message.typeErrror +
                    " Clouber.sys.portlet.PortletInfo" +
                    "#doesUrlTemplateProcessing");
            }
        }
    });

    /**
    * 22 mayReturnPortletState
    * @class Clouber.sys.portlet.PortletInfo
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
            } else {
                Clouber.log(Clouber.message.typeErrror +
                    " Clouber.sys.portlet.PortletInfo#mayReturnPortletState");
            }
        }
    });

    /**
    * 23 portlet inavigational Parameter Descriptions
    * @class Clouber.sys.portlet.PortletInfo
    * @property {Map} navigationalParameterDescriptions
    */
    obj.navigationalParameterDescriptions = [];

    /**
    * 24 extensions, include theme, titlebar, statusbar, option, thumbnail
    * @class Clouber.sys.portlet.PortletInfo
    * @property {array} extensions
    */
    obj.extensions = new Clouber.Map();

    /**
    * 25 portletHandle
    * @class Clouber.sys.portlet.PortletInfo
    * @property {string} portletHandle
    */
    Object.defineProperty(obj, "portletHandle", {
        get: function () {
            return this.getUid();
        },
        set: function (value) {
            Clouber.log(Clouber.message.typeErrror +
                " Clouber.sys.portlet.PortletInfo#portletHandle");
        }
    });

    Object.seal(obj);

    return obj;
};

