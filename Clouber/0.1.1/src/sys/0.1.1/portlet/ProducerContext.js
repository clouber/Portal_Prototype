/**
 * @fileOverview Clouber Portlet js library.
 * @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
 * @module Clouber.sys.portlet.PortletConfig
 * @version 0.1.0
 * @license
 */

Clouber.namespace("Clouber.sys.portlet");


/**
* Porducer application Context object
* @class  Clouber.sys.portlet.ProducerContext
* @namespace Clouber.sys.portlet
* @extends Clouber.sys.core.AppConfig,
* @param  {Producer} config Producer config
* @constructor
*/
Clouber.sys.portlet.ProducerContext = function (config) {
    'use strict';

    /**
    * Internal producer config
    * @type object
    * @ignore
    */
    this.config = config;

    /**
    * Internal producer contexts
    * @property {Map} context
    */
    this.context = null;

    /**
    * Config loaded success event.
    * @event loadSuccess
    * @param {object} data config data.
    * @override
    */
    this.loadSuccess = function (data) {
        //this.context = Clouber.copy(this.config);
        this.context = this.config;
    };

    /**
    * Parse config string to object.
    * @event parse
    * @param {string} data config data.
    * @return (Map) config info.
    * @override
    */
    this.parse = function (data) {
        var lines, items, i1, len1, i2, len2, i3, len3, p, map, s;

        try {
            Clouber.log("Clouber.sys.portlet.ProducerContext#parse");

            map = new Clouber.Map();

            data = data.replace(/\r\n/g, "\n");  // replace /
            lines = data.split("\n");
            for (i1 = 0, len1 = lines.length; i1 < len1; i1++) {
                if (lines[i1].length === 0) {
                    break;
                }
                items = lines[i1].split(":");
                p = Clouber.sys.portlet.PortletInfo();
                if (items[0].length !== 0) {
                    p.portletID = decodeURIComponent(items[0]);
                    p.displayName = decodeURIComponent(items[1]);
                    p.groupID = decodeURIComponent(items[2]);
                    p.title = decodeURIComponent(items[3]);
                    p.description = decodeURIComponent(items[4]);
                    p.shortTitle = decodeURIComponent(items[5]);
                    p.markupTypes.parseString(items[6], "&", "=", true);
                    p.initParameters.parseString(items[7], "&", "=", true);
                    p.handledEvents = decodeURIComponent(items[8]).split("/");
                    p.usesMethodGet = items[9];
                    p.keywords = decodeURIComponent(items[10]).split("/");
                    p.publishedEvents =
                            decodeURIComponent(items[11]).split("/");
                    p.userCategories = decodeURIComponent(items[12]).split("/");
                    p.userProfileItems =
                            decodeURIComponent(items[13]).split("/");
                    p.portletManagedModes =
                            decodeURIComponent(items[14]).split("/");
                    p.defaultMarkupSecure = items[15];
                    p.onlySecure = items[16];
                    p.userContextStoredInSession = items[17];
                    p.templatesStoredInSession = items[18];
                    p.hasUserSpecificState = items[19];
                    p.doesUrlTemplateProcessing = items[20];
                    p.mayReturnPortletState = items[21];
                    p.navigationalParameterDescriptions =
                            decodeURIComponent(items[22]).split("/");
                    p.extensions.parseString(items[23], "&", "=", true);

                    // window style
                    s = p.extensions.get("titleBar");
                    p.extensions.put("titleBar", s === "true");
                    s = p.extensions.get("statusBar");
                    p.extensions.put("statusBar", s === "true");
                    s = p.extensions.get("border");
                    p.extensions.put("border", s === "true");
                    s = p.extensions.get("thumbnail");
                    p.extensions.put("thumbnail", s === "true");
                    s = p.extensions.get("option");
                    p.extensions.put("option", s === "true");
                    s = p.extensions.get("close");
                    p.extensions.put("close", s === "true");

                    map.put(p.portletID, p);
                }
            }
            return map;
        } catch (e) {
            Clouber.log(e);
            return null;
        }
    };

};
Clouber.extend(Clouber.sys.portlet.ProducerContext, Clouber.sys.core.AppConfig);













