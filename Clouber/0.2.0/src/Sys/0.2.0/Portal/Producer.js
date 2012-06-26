/**
* @fileOverview Clouber core js library.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @requires Clouber.* Clouber.Sys.Core.* Clouber.Sys.UI.* Clouber.Sys.Portal.*
*/

Clouber.namespace("Clouber.Sys.Portal");

/**
 * @class  The Portlet Producer.
 * @constructor
 * @extends Clouber.BaseObject
 */
Clouber.Sys.Portal.Producer = function () {
    'use strict';

    /**
    * object type;
    * @type string
    */
    this.TYPE = "PORTLET_PRODUCER";

    /**
    * Internal portlet configuration context
    * @type PortletContext
    * @ignore
    */
    this._context = {};

    /**
     * Initialize Producer control, display the frame.
     * @param {object} conf Object settings.
     * @override
     */
    this.init = function (conf) {
        var c, k, p;
        try {
            Clouber.log("Clouber.Sys.Portal.Producer#init");

            // initialize context
            this._context = new Clouber.Sys.Portal.ProducerContext();
            this._context.init(conf);

            // load portlet configuration
            c = Clouber.portal.getConfig();
            if ((typeof c.portlet === "string") && (c.portlet.length > 0)) {
                p = c.portlet;
            } else {
                p = c.path + "/conf/portlet.conf";
            }
            this._context.loadConf({
                async: false,
                base: Clouber.config.getConfig().base,
                config: p
            });


        } catch (e) {
            e.code = "Clouber.Sys.Portal.Producer#init";
            Clouber.log(e);
        }
    };

    /**
     * Returns provider context object.
     * @return {object} Context Object.
     */
    this.getContext = function () {
        return this._context.context;
    };

    /**
    * get connected user's context.
    * @function getUserContext
    * @return {object} UserContext
    */
    this.getUserContext = function () {
        if (!(this.userContext instanceof Clouber.Sys.Portal.T.UserContext)) {
            this.userContext = new Clouber.Sys.Portal.T.UserContext();
            this.userContext.userContextKey = (new Date()).valueOf() * 1000  +
                Math.round(Math.random() * 1000);
            this.userContext.profile = new Clouber.Sys.Portal.T.UserProfile();
            this.userContext.extensions[0] = Clouber.user.id();
        }

        return this.userContext;
    };

    /**
     * This operation allows a Producer to provide information about its
     * capabilities in a context-sensitive manner (e.g. registration may be
     * required to discover the full capabilities of a Producer)
     * @function
     * @param {object} registationContext function settings.
     * @param {object} desireLocales function settings.
     * @param {object} portletHandles function settings.
     * @param {object} userContext function settings.
     * @return {object} ServiceDescription.
     */
    this.getServiceDescription = function (registationContext, desireLocales,
            portletHandles, userContext) {

        Clouber.log("Clouber.Sys.Portal.Producer#getServiceDescription");

        try {
            var wp, pi, rtn = new Clouber.Sys.Portal.T.ServiceDescription();
            rtn.offeredPortlets = this.getContext().values();
            return rtn;
        } catch (e) {
            e.code = "Clouber.Sys.Portal.Producer#getServiceDescription";
            Clouber.log(e);
        }
    };

    /**
     * The Consumer requests the markup for rendering the current state of a
     * Portlet by invoking. This operation's semantics are that the Consumer
     * is aggregating a page which includes the Portlet's markup.
     * @function
     * @param {object} registationContext
     * @param {object} portletContext
     * @param {object} runtimeContext
     * @param {object} userContext
     * @param {object} markupParams
     * @param {function} callback Optional asynchronous callback function
     * @return {object} MarkupResponse.
     */
    this.getMarkup = function (registationContext, portletContext,
            runtimeContext, userContext, markupParams, callback) {

        var pid, prod, rsp, url, params, ns, p, script, async, method = "POST";

        try {
            Clouber.log("Clouber.Sys.Portal.Producer#getMarkup");

            pid = portletContext.portletHandle.handle;
            prod = portletContext.extensions[0];

            // invocate portlet
            p = this.getContext().get(pid);
            if (typeof p !== "undefined") {
                ns = p.groupID + "." + p.displayName;
                url = Clouber.config.getModulePath(ns, Clouber.portal.getConfig().path);
                script = p.extensions.get("script");
                if (typeof script !== "undefined") {
                    url = url + script;
                }
                if ((typeof runtimeContext.extensions[1] !== "undefined") &&
                        (runtimeContext.extensions[1] !== "")) {
                    url = url + "?" + runtimeContext.extensions[1];
                }
                if (p.usesMethodGet) {
                    method = "GET";
                }

                // parameters
                params = Clouber.copy(p.initParameters);
                params = params.stringify();

                // set attributes, CLOUBER_EVENT, CLOUBER_REQUEST, CLOUBER_PATH
                runtimeContext.extensions[0].set("CLOUBER_MODE",
                    markupParams.mode);
                runtimeContext.extensions[0].set("CLOUBER_STATE",
                    markupParams.windowState);
                runtimeContext.extensions[0].set("CLOUBER_USER",
                    userContext.extensions[0]);
                runtimeContext.extensions[0].set("CLOUBER_LANG",
                    markupParams.locales[0]);
                runtimeContext.extensions[0].set("CLOUBER_PORTLET",
                    ns);

                // get result
                rsp = new Clouber.Sys.Portal.T.MarkupResponse();
                rsp.markupContext.mimeType = "text/html";
                rsp.markupContext.locale = markupParams.locales[0];
                rsp.extensions[0] = pid;
                rsp.extensions[1] = prod;

                async = (Clouber.isNull(callback)) ? false : true;

                Clouber.document.ajax({
                    method: method,
                    async: async,
                    url: url,
                    headers: runtimeContext.extensions[0],
                    data: params,
                    dataType: "text",
                    context: this,
                    success: function (data) {
                        rsp.markupContext.itemString = data;
                        if (!Clouber.isNull(callback)) {
                            callback(rsp);
                        }
                    },
                    error: function (status, error, url, text) {
                        rsp.extensions[0] = {
                            status: status,
                            error: error,
                            url: url,
                            message: text
                        };
                        Clouber.log(Clouber.message.ajaxCallError + " (" + url +
                            ": " + error + ")\n\t" + text);
                        if (!Clouber.isNull(callback)) {
                            callback(rsp);
                        }
                    }
                });

                return rsp;
            }
        } catch (e) {
            e.code = "Clouber.Sys.Portal.Producer#getMarkup";
            Clouber.log(e);
        }
    };

    /**
     * This operation requires that both the Consumer beginning the generation
     * of the aggregated page (because the invocation can return a redirectURL),
     * invoking other operations on Portlets and the gathering of markup from
     * other Portlets on the page (often because shared state, including state
     * shared via a database, impacts the markup of other Portlets) are blocked
     * until performBlockingInteraction either returns or communication errors
     * occur. The Portlet will receive only one invocation of
     * performBlockingInteraction per client interaction, excepting for retries.
     * @function performBlockingInteraction
     * @param {object} registationContext
     * @param {object} portletContext
     * @param {object} runtimeContext
     * @param {object} userContext
     * @param {object} markupParams
     * @param {object} interactionParams
     * @param {function} callback Optional asynchronous callback function
     * @return {BlockingInteractionResponse}
     */
    this.performBlockingInteraction = function (registationContext,
        portletContext, runtimeContext, userContext, markupParams,
        interactionParams, callback) {

        var pid, prod, params, rsp, url, ns, p, script, async, method = "POST";

        Clouber.log("Clouber.Sys.Portal.Producer#performBlockingInteraction");

        try {
            pid = portletContext.portletHandle.handle;
            prod = portletContext.extensions[0];

            // invocate portlet
            p = this.getContext().get(pid);
            if (typeof p !== "undefined") {
                ns = p.groupID + "." + p.displayName;
                url = Clouber.config.getModulePath(ns, Clouber.portal.getConfig().path);
                script = p.extensions.get("script");
                if (typeof script !== "undefined") {
                    url = url + script;
                }
                if ((typeof runtimeContext.extensions[1] !== "undefined") &&
                        (runtimeContext.extensions[1] !== "")) {
                    url = url + "?" + runtimeContext.extensions[1];
                }
                if (p.usesMethodGet) {
                    method = "GET";
                }

                params = Clouber.copy(p.initParameters);
                params = params.stringify() + "&" +
                    interactionParams.formParameters.stringify();

                // set attributes, CLOUBER_EVENT, CLOUBER_REQUEST, CLOUBER_PATH
                runtimeContext.extensions[0].set("CLOUBER_MODE",
                    markupParams.mode);
                runtimeContext.extensions[0].set("CLOUBER_STATE",
                    markupParams.windowState);
                runtimeContext.extensions[0].set("CLOUBER_USER",
                    userContext.userContextKey);
                runtimeContext.extensions[0].set("CLOUBER_LANG",
                    markupParams.locales[0]);
                runtimeContext.extensions[0].set("CLOUBER_PORTLET",
                    ns);

                // get result
                rsp = new Clouber.Sys.Portal.T.BlockingInteractionResponse();
                rsp.updateResponse.markupContext.mimeType = "text/html";
                rsp.updateResponse.markupContext.locale =
                    markupParams.locales[0];
                rsp.extensions[0] = pid;
                rsp.extensions[1] = prod;

                async = (Clouber.isNull(callback)) ? false : true;

                Clouber.document.ajax({
                    method: method,
                    async: async,
                    url: url,
                    data: params,
                    headers: runtimeContext.extensions[0],
                    dataType: "text",
                    context: this,
                    success: function (data) {
                        rsp.updateResponse.markupContext.itemString = data;
                        if (!Clouber.isNull(callback)) {
                            callback(rsp);
                        }
                    },
                    error: function (status, error, url, text) {
                        rsp.extensions[0] = {
                            status: status,
                            error: error,
                            url: url,
                            message: text
                        };
                        Clouber.log(Clouber.message.ajaxCallError + " (" + url +
                            ": " + error + ")\n\t" + text);
                        if (!Clouber.isNull(callback)) {
                            callback(rsp);
                        }
                    }
                });

                return rsp;
            }
        } catch (e) {
            e.code = "Clouber.Sys.Portal.Producer#performBlockingInteraction";
            Clouber.log(e);
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
     * @param {object} registationContext
     * @param {object} portletContext
     * @param {object} runtimeContext
     * @param {object} userContext
     * @param {object} markupParams
     * @param {object} eventParams
     * @param {function} callback Optional asynchronous callback function
     * @return {HandleEventsResponse} .
     */
    this.handleEvents = function (registationContext, portletContext,
        runtimeContext, userContext, markupParams, eventParams, callback) {

        var pid, prod, params, rsp, url, ns, p, script, async, method = "POST";

        Clouber.log("Clouber.Sys.Portal.Producer#handleEvents");

        try {
            pid = portletContext.portletHandle.handle;
            prod = portletContext.extensions[0];

            // invocate portlet
            p = this.getContext().get(pid);
            if (typeof p !== "undefined") {
                ns = p.groupID + "." + p.displayName;
                url = Clouber.config.getModulePath(ns, Clouber.portal.getConfig().path);
                script = p.extensions.get("script");
                if (typeof script !== "undefined") {
                    url = url + script;
                }
                if ((typeof runtimeContext.extensions[1] !== "undefined") &&
                        (runtimeContext.extensions[1] !== "")) {
                    url = url + "?" + runtimeContext.extensions[1];
                }
                if (p.usesMethodGet) {
                    method = "GET";
                }

                params = Clouber.copy(p.initParameters);
                params = params.stringify() + "&" +
                    eventParams.extensions[0].stringify();

                // set attributes, CLOUBER_EVENT, CLOUBER_REQUEST, CLOUBER_PATH
                runtimeContext.extensions[0].set("CLOUBER_MODE",
                    markupParams.mode);
                runtimeContext.extensions[0].set("CLOUBER_STATE",
                    markupParams.windowState);
                runtimeContext.extensions[0].set("CLOUBER_USER",
                    userContext.userContextKey);
                runtimeContext.extensions[0].set("CLOUBER_LANG",
                    markupParams.locales[0]);
                runtimeContext.extensions[0].set("CLOUBER_PORTLET",
                    ns);

                // get result
                rsp = new Clouber.Sys.Portal.T.HandleEventsResponse();
                rsp.updateResponse.markupContext.mimeType = "text/html";
                rsp.updateResponse.markupContext.locale =
                    markupParams.locales[0];
                rsp.extensions[0] = pid;
                rsp.extensions[1] = prod;

                async = (Clouber.isNull(callback)) ? false : true;

                Clouber.document.ajax({
                    method: method,
                    async: async,
                    url: url,
                    data: params,
                    headers: runtimeContext.extensions[0],
                    dataType: "text",
                    context: this,
                    success: function (data) {
                        rsp.updateResponse.markupContext.itemString = data;
                        if (!Clouber.isNull(callback)) {
                            callback(rsp);
                        }
                    },
                    error: function (status, error, url, text) {
                        rsp.extensions[0] = {
                            status: status,
                            error: error,
                            url: url,
                            message: text
                        };
                        Clouber.log(Clouber.message.ajaxCallError + " (" + url +
                            ": " + error + ")\n\t" + text);
                        if (!Clouber.isNull(callback)) {
                            callback(rsp);
                        }
                    }
                });

                return rsp;
            }
        } catch (e) {
            e.code = "Clouber.Sys.Portal.Producer#handleEvents";
            Clouber.log(e);
        }
    };

    /**
     * Registration describes how a Consumer establishes a relationship with a
     * Producer that will be referenced via an opaque handle in subsequent
     * invocations the Consumer makes of the Producer [R350] [R352]. Both the
     * Consumer and the Producer are free to end this relationship at any time
     * [R500]. When the Consumer chooses to end the relationship, it MUST
     * attempt an invocation of the deregister operation [R400], unless the
     * registration is using a scheduled destruction, so that the Producer may
     * release related items. When the Producer chooses to invalidate the
     * registration identifier, it MUST inform the Consumer of this through a
     * fault message on the next invocation specifying this registrationHandle
     * so that the Consumer may release related items.
     * @function register
     * @param {object} registationData
     * @param {object} lifetime
     * @param {object} userContext
     * @return {RegistrationContext}
     */
    this.register = function (registationData, lifetime, userContext) {
        var ctx = new Clouber.Sys.Portal.T.RegistrationContext();

        Clouber.log("Clouber.Sys.Portal.Producer#register");

        try {
            ctx.registrationHandle.handle = this.getId();
            if (userContext.userContextKey ===
                    this.userContext.userContextKey) {
                this.registationData = registationData;
                this.lifetime = lifetime;

            } else {
                ctx.scheduledDestruction.terminationTime = -1;
                ctx.scheduledDestruction.refreshDuration = -1;
            }

            this.registrationContext = ctx;
            return this.registrationContext;
        } catch (e) {
            e.code = "Clouber.Sys.Portal.Producer#register";
            Clouber.log(e);
        }
    };

    /**
     * The Consumer MUST NOT consider a relationship with a Producer ended until
     * either a successful invocation of deregister , elapsing of the scheduled
     * destruction time or receipt of an InvalidRegistration fault message from
     * the Producer on an invocation supplying the registrationHandle.
     * @function
     * @param {object} registrationContext
     * @param {object} userContext
     * @return {object} ReturnAny.
     */
    this.deregister = function (registrationContext, userContext) {
        this.registationData = null;
        this.lifetime = null;
        this.registrationContext = null;
    };

};
Clouber.extend(Clouber.Sys.Portal.Producer, Clouber.BaseObject);
