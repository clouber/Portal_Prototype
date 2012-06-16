/**
* @fileOverview Clouber portal context object
* @copyright Clouber.org 2012
* @author Jon Zhou
* @module Clouber.Sys.Portal.PortalContext
* @requires  Clouber.*, Clouber.Sys.Core.*, Clouber.Sys.Portal.*
*/


/**
* Clouber system portal modules.
* @module Clouber.Sys.Portal
* @namespace Clouber.Sys.Portal
*/
Clouber.namespace("Clouber.Sys.Portal");

/**
* The portal configuration loader.
* @class  Clouber.Sys.Portal.PortalContext
* @namespace Clouber.Sys.Portal
* @extends Clouber.Sys.Core.Config
* @constructor
*/
Clouber.Sys.Portal.PortalContext = function () {
    'use strict';

    /** @constant string TYPE */
    this.TYPE = "PORTAL_CONTEXT";

    /**
    * internal portal instance.
    * @type Portal
    * @ignore
    */
    this.portal = null;

    /**
    * producer connection
    * @type ProducerConnection
    */
    this._connection = {};

    /**
    * Portlet producer connections
    * @property {Map} _producers
    */
    this._producers = new Clouber.Map();

    /**
    * Portlets in a page
    * @property {Map} portlets
    */
    this.portlets = null;

    /**
    * Portal context data
    * @type {Object} context
    */
    //this.context = {};

    /**
    * page info object
    * @type PageInfo
    */
    this.pageInfo = {};

    /**
    * portal page model object
    * @type PageContext
    */
    this.pageContext = null;

    /**
    * Initialize portal context.
    * @function init
    * @param {object} portal Portal instance.
    */
    this.init = function (portal) {
        this.portal = portal;

        // config file settiing
        this.setInterval(15000);
        this.setKey("CLOUBER_PORTAL_CONTEXT");
    };

    /**
    * Load a portal configuration information.
    * @function loadPortalConfig
    * @param  {object} conf Config object
    * @param  {string} conf.base Config file base path.
    * @param  {string} conf.config Config file path.
    * @param  {object} params Parameter object
    */
    this.loadPortalConfig = function (conf, params) {
        this.loadConf(conf, params);
    };

    /**
    * get portal producer by name.
    * @function getProducer
    * @param {string} name Producer name.
    * @return {object} ProducerConnection.
    */
    this.getProducer = function (name) {
        var conn, usr, pwd, rtn, e;

        try {
            // find current producer connection
            conn = this._producers.get(name);

            if ((conn === undefined) || (conn === null)) {

                // create new producer connection
                conn = new Clouber.Sys.Portal.ProducerConnection(name);
                rtn = conn.registerProducer({username: usr, password: pwd,
                    app: this.portal.getConf().name,
                    version: this.portal.getConf().version,
                    producer: name});

                if (rtn < 0) {
                    e = new Clouber.Exception({
                        number: 10002,
                        name: "portalRegisterError",
                        message: Clouber.message.producerRegisterError,
                        description: Clouber.message.producerRegisterError,
                        code: "Clouber.Sys.Core.PortalContext#getProducer"
                    });
                    Clouber.log(e);
                } else {
                    Clouber.log(Clouber.message.producerRegisterSuccess + "(" +
                        name + ")");
                }
                this._producers.put(name, conn);
            }

            return conn;
        } catch (ex) {
            Clouber.log(ex);
        }
    };

    /**
    * Initialize portlets, get portlets information, portlets' key format is
    * "portletID@producer"
    * @function initPortlets
    */
    this.initPortlets = function () {
        var i, l, list, p, prd, j, m, f, w, s, c; //, map;

        Clouber.log("Clouber.Sys.Portal.PortalContext#initPortlets");

        try {
            // get producers
            // p = this.pageContext.portlets.unique();
            this.portlets = new Clouber.Map();
            c = this.getConfig();
            for (i in c.frames) {
                if (c.frames.hasOwnProperty(i)) {
                    f = c.frames[i];
                    for (j in f.windows) {
                        if (f.windows.hasOwnProperty(j)) {
                            w = new Clouber.Sys.Portal.WindowInfo();
                            Object.seal(w);
                            Clouber.merge(w, f.windows[j]);
                            this.portlets.put(w.portletID + "@" +
                                w.producer, w);
                            this._producers.put(w.producer, null);
                        }
                    }
                }
            }

            // get portlets information by producers
            for (i = 0, l = this._producers.size(); i < l; i++) {
                prd = this.getProducer(this._producers.getKeyByIndex(i));
                list = prd.getServiceDescription(
                    prd.registrationContext,
                    ["en", "cn"],
                    this.portlets.keys(),
                    prd.userContext
                ).offeredPortlets;

//                map = new Clouber.Map();

                // initialize portlet css, mode, windowState
                for (j = 0, m = list.length; j < m; j++) {
//                    map.put(list[j].portletID, list[j]);

                    w = this.getPortletContext(list[j].portletID + "@" +
                            this._producers.getKeyByIndex(i));

                    // set portlet context of this page
                    if ((typeof w !== "undefined") && (w !== null)) {
                        // set portlet config
                        w.config = list[j];

                        // window state
                        s = list[j].markupTypes.get("windowStates").split("/");
                        if (s[0] === undefined) {
                            s[0] = "wsrp:normal";
                        }
                        w.windowState = s[0];

                        // mode
                        s = list[j].markupTypes.get("modes").split("/");
                        if (s[0] === undefined) {
                            s[0] = "wsrp:view";
                        }
                        w.mode = s[0];

                        // window extensive setting
                        w.border = list[j].extensions.get("border");
                        w.titleBar = list[j].extensions.get("titleBar");
                        w.statusBar = list[j].extensions.get("statusBar");
                        w.close = list[j].extensions.get("close");
                        w.thumbnail = list[j].extensions.get("thumbnail");
                        w.option = list[j].extensions.get("option");
                        w.theme = list[j].extensions.get("theme");
                        w.script = list[j].extensions.get("script");

                        // window css
                        if (typeof w.theme !== "undefined") {
                            s = w.theme.split("/");
                        } else {
                            s = [];
                        }
                        if (s[0] === undefined) {
                            s[0] = "default";
                        }
                        w.css = Clouber.config.getModulePath(
                            list[j].portletID,
                            this.portal.getConf().path,
                            "css",
                            s[0]
                        );
                    }

//                    this.portlets.put(p[i], map);
                }
            }
        } catch (e) {
            e.code = "Clouber.Sys.Core.PortalContext#initPortlets";
            Clouber.log(e);
        }
    };


    /**
    * Request portlet producer
    * @function request
    * @param {Map} params request parameters.
    * @param {Map} attrs Client attributes.
    * @param {String} qs URL query string.
    */
    this.request = function (params, attrs, qs) {
        var events, resq;

        try {
            resq = attrs.get("CLOUBER_REQUEST");
            events = attrs.get("CLOUBER_EVENT");

            // portlet requst
            if ((typeof resq !== "undefined") && (resq !== null) &&
                    (resq !== "")) {
                this.performBlockingInteraction(params, attrs, qs);
            }

            // portlet events
            if ((typeof events !== "undefined") && (events !== null)) {
                this.handleEvents(params, attrs, qs);
            }

            // get portlet markup
            this.getMarkup(params, attrs, qs);
            //this.performBlockingInteraction(params, attrs, qs);
        } catch (ex) {
            Clouber.log(ex);
        }
    };

    /**
    * get theme HTML through ajax, can be overrided .
    * @function getMarkup
    * @param {Map} params Request parameters.
    * @param {Map} attrs Client attributes.
    * @param {String} qs URL query string.
    */
    this.getMarkup = function (params, attrs, qs) {
        var port, i, l, j, m, pro, p, portletCtx, rtctx, mkp,
            prd, rtn, w, ws, b = false;

        Clouber.log("Clouber.Sys.Portal.PortalContext#getMarkup");

        try {
            port = attrs.get("CLOUBER_PORTLET");

            for (i = 0, l = this.pageContext.frames.size(); i < l; i++) {
                ws = this.pageContext.frames.getByIndex(i).windows;
                for (j = 0, m = ws.size(); j < m; j++) {

                    w = ws.getByIndex(j);
                    p = this.portlets.get(w.portletID + "@" + w.producer);
                    pro = p.producer;

                    if ((port === undefined) || (port === p.portletID)) {
                        w = this.getPortletContext(p.portletID + "@" + pro);

                        if ((typeof w !== "undefined") &&
                                ((w.markup === undefined) ||
                                (w.markup === null) || (w.markup === ""))) {

                            prd = this.getProducer(pro);

                            portletCtx = new WSRP.PortletContext();
                            portletCtx.portletHandle.handle = p.portletID;
                            rtctx = new WSRP.RuntimeContext();
                            rtctx.extensions[0] = attrs;
                            rtctx.extensions[1] = qs;
                            mkp = new WSRP.MarkupParams();
                            mkp.mode = w.mode;
                            mkp.windowState = w.windowState;

                            // get portlet markup
                            rtn = prd.getMarkup(
                                prd.registationContext,
                                portletCtx,
                                rtctx,
                                prd.userContext,
                                mkp
                            );
                            // markup updated, need to refesh page.
                            b = true;
                            // get result markup
                            if ((typeof rtn.extensions !== "undefined") &&
                                    (typeof rtn.extensions[0] !==
                                        "undefined") &&
                                    (typeof rtn.extensions[0].error !==
                                        "undefined")
                                    ) {
                                // failure
                                w.status = Clouber.message.portletInvocateError;
                                w.message = rtn.extensions[0].status;
                                w.changed = false;
                                Clouber.log(
                                    Clouber.message.portletInvocateError +
                                        " (" + w.portletID + ", " +
                                        w.message + ")"
                                );

                            } else {
                                // success
                                w.markup = rtn.markupContext.itemString;
                                w.changed = true;
                                if (w.statusBar) {
                                    w.status = Clouber.message.portletUpdated;
                                } else {
                                    w.status = "";
                                }

                            }
                            /*
                            // refresh window
                            this.portal.refresh(
                                this.getPortletContext(
                                    this.portlets.getKeyByIndex(i)
                                ).instanceId
                            );
                            */
                        }
                    }
                }
            }
            if (b) {
                this.portal.refresh();
            }
        } catch (ex) {
            Clouber.log(ex);
        }
    };

    /**
    * This operation requires that both the Consumer beginning the generation
    * of the aggregated page, invoking other operations on Portlets and the
    * gathering of markup from other Portlets on the page are blocked
    * until performBlockingInteraction either returns or communication errors
    * occur.
    * @function performBlockingInteraction
    * @param {Map} params Request parameters.
    * @param {Map} attrs Client attributes.
    * @param {String} qs URL query string.
    */
    this.performBlockingInteraction = function (params, attrs, qs) {
        var port, i, l, pro, p, portletCtx, rtctx, mkp, ip,
            prd, rtn;

        Clouber.log(
            "Clouber.Sys.Portal.PortalContext#performBlockingInteraction"
        );

        try {
            port = attrs.get("CLOUBER_REQUEST");

            for (i = 0, l = this.portlets.size(); i < l; i++) {
                p = this.portlets.getByIndex(i);
                pro = p.producer;

                if ((port === undefined) ||
                        (port === p.portletID + "@" + pro)) {

                    portletCtx = new WSRP.PortletContext();
                    portletCtx.portletHandle.handle = p.portletID;
                    rtctx = new WSRP.RuntimeContext();
                    rtctx.extensions[0] = attrs;
                    rtctx.extensions[1] = qs;
                    mkp = new WSRP.MarkupParams();
                    mkp.mode = p.mode;
                    mkp.windowState = p.windowState;

                    ip = new WSRP.InteractionParams();
                    ip.formParameters = params;

                    prd = this.getProducer(pro);

                    // get portlet markup
                    rtn = prd.performBlockingInteraction(
                        prd.registationContext,
                        portletCtx,
                        rtctx,
                        prd.userContext,
                        mkp,
                        ip
                    );
                    // get result markup
                    if ((typeof rtn.extensions !== "undefined") &&
                            (typeof rtn.extensions[0] !== "undefined") &&
                            (typeof rtn.extensions[0].error !== "undefined")
                            ) {
                        // failure
                        p.status = Clouber.message.portletInvocateError;
                        p.message = rtn.extensions[0].status;
                        p.changed = false;
                        Clouber.log(
                            Clouber.message.portletInvocateError +
                                " (" + p.portletID + ", " +
                                p.message + ")"
                        );

                    } else {
                        // success
                        p.markup =
                            rtn.updateResponse.markupContext.itemString;
                        p.changed = true;
                        if (p.statusBar) {
                            p.status = Clouber.message.portletUpdated;
                        } else {
                            p.status = "";
                        }
                    }
                }
            }
        } catch (ex) {
            Clouber.log(ex);
        }
    };

    /**
    * A useful way of describing the distinction between an interaction and an
    * event is that an interaction is an encodable event (i.e. can be
    * referenced by presentation markup) with an opaque payload which the
    * Consumer will always attempt to deliver to the Portlet that generated
    * the markup. This differences result in the need for a different
    * signature that the Consumer uses to distribute events to a Portlet;
    * @function handleEvents
    * @param {Map} params Request parameters.
    * @param {Map} attrs Client attributes.
    * @param {String} qs URL query string.
    */
    this.handleEvents = function (params, attrs, qs) {
        var events, i, l, j, m, pro, p, k, n, portletCtx, rtctx, mkp, ep,
            prd, rtn;

        Clouber.log("Clouber.Sys.Portal.PortalContext#handleEvents");

        try {
            events = attrs.get("CLOUBER_EVENT");

            for (i = 0, l = this.portlets.size(); i < l; i++) {
                p = this.portlets.getByIndex(i);
                pro = p.producer;

                for (j = 0, m = events.length; j < m; j++) {
                    for (k = 0, n = p.config.handledEvents.length; k < n; k++) {
                        if (p.config.handledEvents[k] === events[j]) {

                            // handleEvents
                            portletCtx = new WSRP.PortletContext();
                            portletCtx.portletHandle.handle = p.portletID;
                            rtctx = new WSRP.RuntimeContext();
                            rtctx.extensions[0] = attrs;
                            rtctx.extensions[1] = qs;
                            mkp = new WSRP.MarkupParams();
                            mkp.mode = p.mode;
                            mkp.windowState = p.windowState;

                            ep = new WSRP.EventParams();
                            ep.events = events[j];
                            ep.extensions = [params];
                            prd = this.getProducer(pro);

                            rtn = prd.handleEvents(
                                prd.registationContext,
                                portletCtx,
                                rtctx,
                                prd.userContext,
                                mkp,
                                ep
                            );
                            // get result markup
                            if ((typeof rtn.extensions !== "undefined") &&
                                    (typeof rtn.extensions[0] !==
                                        "undefined") &&
                                    (typeof rtn.extensions[0].error !==
                                        "undefined")
                                    ) {
                                // failure
                                p.status =
                                    Clouber.message.portletInvocateError;
                                p.message = rtn.extensions[0].status;
                                p.changed = false;
                                Clouber.log(
                                    Clouber.message.portletInvocateError +
                                        " (" + p.portletID + ", " +
                                        p.message + ")"
                                );

                            } else {
                                // success
                                p.markup = rtn.updateResponse.markupContext.
                                        itemString;
                                p.changed = true;
                                if (p.statusBar) {
                                    p.status =
                                        Clouber.message.portletUpdated;
                                } else {
                                    p.status = "";
                                }
                            }
                        }
                    }
                }
            }
        } catch (ex) {
            Clouber.log(ex);
        }
    };

    /**
    * get portlet context .
    * @function getPortletContext
    * @param {string} portletID portlet ID (portletID@producer)
    * @return {WindowInfo}
    */
    this.getPortletContext = function (portletID) {
        return this.portlets.get(portletID);
    };

    /**
    * Get portal configuration object.
    * @function getPortalConf
    * @return {object} portalConf object
    */
    this.getPortalConf = function () {
        return this.getConfig();
    };

    /**
    * Portal config loaded success event.
    * @event confSuccess
    * @param {object} data portal config
    * @override
    */
    this.confSuccess = function (data) {
        if (typeof this._success === "undefined") {
            this._success = true;
            // initialize portlets
            this.initPortlets();
            // load page
            this.portal.loadPage();
        }
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
    * Set portal page name, and load page config inforamtion.
    * @function setPage
    * @param {string} page Page name.
    */
    this.setPage = function (page) {
        var b = false;

        Clouber.log("Clouber.Sys.Portal.PortalContext#setPage (" + page + ")");

        try {
            this.pageInfo.page = page;
            this.pageContext = this.getPageConf(page, this.getPortalConf());
            if ((typeof this.pageContext !== "undefined") &&
                    (this.pageContext instanceof Clouber.Sys.Portal.PageInfo)) {
                b = true;
            } else {
                Clouber.log(Clouber.message.pageNotExist + " (" + page + ")");
            }
            return b;
        } catch (e) {
            Clouber.log(e);
        }
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

        try {
            for (i = 0, leng1 = portalConf.pages.length; i < leng1; i++) {

                if (page  ===  portalConf.pages[i].page) {
                    // get page information
                    pageInfo = new Clouber.Sys.Portal.PageInfo();
                    Object.seal(pageInfo);
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
                        Object.seal(frm);
                        frm.tag = portalConf.pages[i].frames[j].tag;
                        frm.fid = portalConf.pages[i].frames[j].frame;

                        // get frames configuration information
                        for (k = 0, leng3 = portalConf.frames.length;
                                k < leng3; k++) {

                            if (frm.fid === portalConf.frames[k].frame) {

                                frm.namespace = portalConf.frames[k].namespace;
                                frm.Class = portalConf.frames[k].Class;
                                frm.description =
                                    portalConf.frames[k].description;
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

                                        frm.c_code =
                                            portalConf.templates[l].code;
                                        break;
                                    }
                                }

                                // get windows information
                                leng4 = portalConf.frames[k].windows.length;
                                for (l = 0; l < leng4; l++) {
                                    f = portalConf.frames[k].windows[l];
                                    if ((f.producer === undefined) ||
                                            (f.producer === "")) {
                                        f.producer = "localhost";
                                    }

                                    frm.windows.put(l, Clouber.copy(f));
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
        } catch (e) {
            Clouber.log(e);
        }

    };
};
Clouber.extend(Clouber.Sys.Portal.PortalContext, Clouber.Sys.Core.Config);


