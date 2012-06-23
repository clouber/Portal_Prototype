/**
* @fileOverview Clouber portal Configuration object.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber.Sys.Portal.PortalConfig
* @requires Clouber.* Clouber.Sys.Core.* Clouber.Sys.UI.* Clouber.Sys.Portal.*
*/

/**
* Clouber system portal modules, using namespace Clouber.Sys.UI
* @module Clouber.Sys.Portal
* @namespace Clouber.Sys.Portal
*/
Clouber.namespace("Clouber.Sys.Portal");

/**
* The portal configuration loader.
* @class  Clouber.Sys.Portal.PortalConfig
* @namespace Clouber.Sys.Portal
* @extends Clouber.Sys.Core.AppConfig
* @constructor
* @param {object} conf application configuration object, refer to conf.json.
* @param  conf.name application name
* @param  conf.base application version
* @param  conf.description application module
* @param  conf.versions Application's version.
* @param  conf.page Application's default page name.
*/
Clouber.Sys.Portal.PortalConfig = function (portal) {
    'use strict';

    /** @constant string TYPE */
    this.TYPE = "PORTAL_CONFIG";
    
    /**
    * internal portal instance.
    * @type Portal
    * @ignore
    */
    this.portal = portal;

    /**
    * Get portal configuration object.
    * @function getPortalConf
    * @return {object} portalConf object
    */
    this.getPortalConf = function () {
        return this.config;
    };

    /**
    * Portal config loaded success event.
    * @event portalConfLoading
    * @param {object} data portal config
    * @override
    */
    this.loadSuccess = function (data) {
        // page controller
        this.portal.loadPage();
    };

    /**
    * Parse config data to js object, can be override.
    * @function parse
    * @param {object} data portal config data.
    * @override
    */
    this.parse = function (data) {
        // page controller
    };

    /**
    * Decode portal page information from portal config file(portal.json).
    * @function getPageConf
    * @ignore
    * @param {string} page Page name.
    * @param {object} portalConf Portal configuration object.
    * @return {object} Page Information object.
    */
    this.getPageConf = function (page, portalConf) {
        var i, j, k, l, pageInfo, f, frg, leng1, leng2, leng3, leng4, frm;

        for (i = 0, leng1 = portalConf.pages.length; i < leng1; i++) {

            if (page  ===  portalConf.pages[i].page) {
                // get page information
                pageInfo = new Clouber.Sys.Portal.PageInfo();
                Object.preventExtensions(pageInfo);
                pageInfo.pid = portalConf.pages[i].page;
                pageInfo.description = portalConf.pages[i].description;
                pageInfo.content = portalConf.pages[i].content;
                pageInfo.keywords = portalConf.pages[i].keywords;
                pageInfo.robots = portalConf.pages[i].robots;
                pageInfo.title = portalConf.pages[i].title;
                pageInfo.namespace = portalConf.pages[i].namespace;
                pageInfo.theme = portalConf.pages[i].theme;
                pageInfo.template = portalConf.pages[i].template;

                // get template code
                for (j = 0, leng2 = portalConf.templates.length;
                        j < leng2; j++) {

                    if (pageInfo.template ===
                            portalConf.templates[j].template) {
                        pageInfo.code = portalConf.templates[j].code;
                        break;
                    }
                }

                // get page frames
                for (j = 0, leng2 = portalConf.pages[i].frames.length;
                        j < leng2; j++) {

                    frm = new Clouber.Sys.Portal.FrameInfo();
                    Object.preventExtensions(frm);
                    frm.tag = portalConf.pages[i].frames[j].tag;
                    frm.fid = portalConf.pages[i].frames[j].frame;

                    // get frames configuration information
                    for (k = 0, leng3 = portalConf.frames.length;
                            k < leng3; k++) {

                        if (frm.fid === portalConf.frames[k].frame) {

                            frm.namespace = portalConf.frames[k].namespace;
                            frm.Class = portalConf.frames[k].Class;
                            frm.description = portalConf.frames[k].description;
                            frm.top = portalConf.frames[k].topStyle;
                            frm.content = portalConf.frames[k].contentStyle;
                            frm.left = portalConf.frames[k].leftStyle;
                            frm.right = portalConf.frames[k].rightStyle;
                            frm.bottom = portalConf.frames[k].bottomStyle;
                            frm.c_theme = portalConf.frames[k].c_theme;

                            // get frame template code
                            for (l = 0, leng4 = portalConf.templates.length;
                                     l < leng4; l++) {
                                if (frm.namespace ===
                                        portalConf.templates[l].template) {
                                    frm.c_code = portalConf.templates[l].code;
                                    break;
                                }
                            }

                            // get windows information
                            leng4 = portalConf.frames[k].windows.length;
                            for (l = 0; l < leng4; l++) {
                                f = portalConf.frames[k].windows[l];
                                frg = new Clouber.Sys.Portal.WindowInfo();
                                Object.preventExtensions(frg);

                                frg.portletID = f.portletID;
                                frg.producer = f.producer;
                                frg.tag = f.tag;
                                frg.namespace = f.namespace;
                                frg.theme = f.theme;
                                frg.param = f.param;
                                frg.position = f.position;

                                frm.windows.put(l, frg);
                            }

                            break;
                        }
                    }
                    pageInfo.frames.put(j, frm);
                }

                break;
            }
        }

        return pageInfo;
    };
};
Clouber.extend(Clouber.Sys.Portal.PortalConfig, Clouber.Sys.Core.AppConfig);

