/**
 * @fileOverview Clouber core js library.
 * @author   <a href="mailto:jzhouj@gmail.com">Jon Zhou </a>
 * @version 0.1.0
 * @license
 */

Clouber.namespace("Clouber.sys.portlet");

/**
 * @class  The Portlet Producer.
 * @constructor
 * @extends Clouber.sys.core.Application
 * @param {object} params Object initial settings.
 * @param  params.app application name
 * @param  params.version application version
 * @param  params.module application module
 * @param  params.control control name
 * @param  params.theme web page theme, include htmls, CSSs, images
 * @param  params.variable variable instance name
 */
Clouber.sys.portlet.Producer = function (conf) {
    'use strict';

    /**
    * Internal configuration context
    * @type object
    * @ignore
    */
    this._conf = conf;

    /**
    * Internal portlet configuration context
    * @type PortletContext
    * @ignore
    */
    this._context = {};

    /**
     * Initialize Producer control, display the frame.
     * @param {object} params Object settings.
     * @override
     */
    this.init = function () {
        this.loadConf({async: false});
    };

    /**
     * Returns provider context object.
     * @return {object} Context Object.
     */
    this.getContext = function () {
        return this._context.context;
    };

    /**
    * Application config loaded, then initialize portlet producer.
    * @event confSuccess
    * @param {object} data PortletConfig's config object get from json object.
    * @override
    */
    this.confSuccess = function (data) {

        Clouber.log("Clouber.sys.portlet.Producer#confSuccess");

        this._context = new Clouber.sys.portlet.ProducerContext(this.getConf());
        this._context.loadConfig({
            async: false,
            base: Clouber.config.getConfig().base,
            path: this.getConf().path + "/conf",
            file: "portlet.conf"
        });

    };

    /**
    * get connected user's context.
    * @function getUserContext
    * @return {object} UserContext
    */
    this.getUserContext = function () {
        if (!(this.userContext instanceof WSRP.UserContext)) {
            this.userContext = new WSRP.UserContext();
            this.userContext.userContextKey = (new Date()).valueOf() * 1000  +
                Math.round(Math.random() * 1000);
            this.userContext.profile = new WSRP.UserProfile();
            this.userContext.extensions[0] = this._conf.Username;
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

        Clouber.log("Clouber.sys.portlet.Producer#getServiceDescription");

        try {
            var wp, pi, rtn = new WSRP.ServiceDescription();
            rtn.offeredPortlets = this.getContext().values();
            return rtn;
        } catch (e) {
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
     * @return {object} MarkupResponse.
     */
    this.getMarkup = function (registationContext, portletContext,
            runtimeContext, userContext, markupParams) {

        var pid, rsp, url, params, ns, p, script, method = "POST";

        try {
            Clouber.log("Clouber.sys.portlet.Producer#getMarkup");

            pid = portletContext.portletHandle.handle;

            // invocate portlet
            p = this.getContext().get(pid);
            if (typeof p !== "undefined") {
                ns = p.groupID + "." + p.displayName;
                url = Clouber.config.getModuleUrl(ns);
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
                runtimeContext.extensions[0].put("CLOUBER_MODE",
                    markupParams.mode);
                runtimeContext.extensions[0].put("CLOUBER_STATE",
                    markupParams.windowState);
                runtimeContext.extensions[0].put("CLOUBER_USER",
                    userContext.userContextKey);
                runtimeContext.extensions[0].put("CLOUBER_LANG",
                    markupParams.locales[0]);
                runtimeContext.extensions[0].put("CLOUBER_PORTLET",
                    ns);

                // get result
                rsp = new WSRP.MarkupResponse();
                rsp.markupContext.mimeType = "text/html";
                rsp.markupContext.locale = markupParams.locales[0];

                Clouber.document.ajax({
                    method: method,
                    async: false,
                    url: url,
                    headers: runtimeContext.extensions[0],
                    data: params,
                    dataType: "text",
                    context: this,
                    success: function (data) {
                        rsp.markupContext.itemString = data;
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
                    }
                });

                return rsp;
            }
        } catch (e) {
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
     * @return {BlockingInteractionResponse}
     */
    this.performBlockingInteraction = function (registationContext,
        portletContext, runtimeContext, userContext, markupParams,
        interactionParams) {

        var pid, params, rsp, url, ns, p, script, method = "POST";

        Clouber.log("Clouber.sys.portlet.Producer#performBlockingInteraction");

        try {
            pid = portletContext.portletHandle.handle;

            // invocate portlet
            p = this.getContext().get(pid);
            if (typeof p !== "undefined") {
                ns = p.groupID + "." + p.displayName;
                url = Clouber.config.getModuleUrl(ns);
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
                runtimeContext.extensions[0].put("CLOUBER_MODE",
                    markupParams.mode);
                runtimeContext.extensions[0].put("CLOUBER_STATE",
                    markupParams.windowState);
                runtimeContext.extensions[0].put("CLOUBER_USER",
                    userContext.userContextKey);
                runtimeContext.extensions[0].put("CLOUBER_LANG",
                    markupParams.locales[0]);
                runtimeContext.extensions[0].put("CLOUBER_PORTLET",
                    ns);

                // get result
                rsp = new WSRP.BlockingInteractionResponse();
                rsp.updateResponse.markupContext.mimeType = "text/html";
                rsp.updateResponse.markupContext.locale =
                    markupParams.locales[0];

                Clouber.document.ajax({
                    method: method,
                    async: false,
                    url: url,
                    data: params,
                    headers: runtimeContext.extensions[0],
                    dataType: "text",
                    context: this,
                    success: function (data) {
                        rsp.updateResponse.markupContext.itemString = data;
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
                    }
                });

                return rsp;
            }
        } catch (e) {
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
     * @return {HandleEventsResponse} .
     */
    this.handleEvents = function (registationContext, portletContext,
        runtimeContext, userContext, markupParams, eventParams) {

        var pid, params, rsp, url, ns, p, script, method = "POST";

        Clouber.log("Clouber.sys.portlet.Producer#handleEvents");

        try {
            pid = portletContext.portletHandle.handle;

            // invocate portlet
            p = this.getContext().get(pid);
            if (typeof p !== "undefined") {
                ns = p.groupID + "." + p.displayName;
                url = Clouber.config.getModuleUrl(ns);
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
                runtimeContext.extensions[0].put("CLOUBER_MODE",
                    markupParams.mode);
                runtimeContext.extensions[0].put("CLOUBER_STATE",
                    markupParams.windowState);
                runtimeContext.extensions[0].put("CLOUBER_USER",
                    userContext.userContextKey);
                runtimeContext.extensions[0].put("CLOUBER_LANG",
                    markupParams.locales[0]);
                runtimeContext.extensions[0].put("CLOUBER_PORTLET",
                    ns);

                // get result
                rsp = new WSRP.BlockingInteractionResponse();
                rsp.updateResponse.markupContext.mimeType = "text/html";
                rsp.updateResponse.markupContext.locale =
                    markupParams.locales[0];

                Clouber.document.ajax({
                    method: method,
                    async: false,
                    url: url,
                    data: params,
                    headers: runtimeContext.extensions[0],
                    dataType: "text",
                    context: this,
                    success: function (data) {
                        rsp.updateResponse.markupContext.itemString = data;
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
                    }
                });

                return rsp;
            }
        } catch (e) {
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
        var ctx = new WSRP.RegistrationContext();

        Clouber.log("Clouber.sys.portlet.Producer#register");

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
            Clouber.log(e);
        }
    };

    /**
     * This operation's semantics are that the client/client-agent has
     * requested additional information in a manner that utilized the Consumer
     * as a proxy for supplying that information. As the Consumer is only
     * being used as a proxy for accessing the resource, a number of
     * techniques for storing the Portlet's navigationalContext are not
     * available to it. As a result, while the Portlet's navigationalContext is
     * supplied to this operation, neither the URL nor the response are
     * permitted to change this navigationalContext. If a logical side effect
     * of the invocation is changing the Portlet's navigationalContext, either
     * the Portlet or the Producer will need to manage this change until the
     * next opportunity to return the navigationalContext to the Consumer.
     * @function
     * @param {object} registationContext
     * @param {object} portletContext
     * @param {object} runtimeContext
     * @param {object} userContext
     * @param {object} resourceParams
     * @return {object} ResourceResponse.
     */
    this.getResource = function (registationContext, portletContext,
        runtimeContext, userContext, resourceParams) {};

    /**
     * In general, the Producer completely manages its own environment,
     * including items such as the initialization of cookies when using the HTTP
     * transport. There are cases, however, when assistance from the Consumer in
     * initializing these cookies is useful. Cookies needed to manage
     * distribution of requests within a load balanced environment are an
     * example of such.
     * @function
     * @param {object} registationContext
     * @param {object} userContext
     * @return {object} ReturnAny.
     */
    this.initCookie = function (registationContext, userContext) {};

    /**
     * The Consumer MAY inform the Producer that it will no longer be using a
     * set of sessions by invoking releaseSessions (e.g. the Consumer is
     * releasing items related to the sessionIDs).
     * @function
     * @param {object} registationContext
     * @param {Array} sessionIDs
     * @param {object} userContext
     * @return {object} ReturnAny.
     */
    this.releaseSessions = function (registationContext, sessionIDs,
        userContext) {};

    /**
     * This operation provides means for the Consumer to modify a relationship
     * with a Producer [R353].
     * @function
     * @param {object} registrationContext
     * @param {object} registationData
     * @param {object} userContext
     * @return {object} RegistrationState.
     */
    this.modifyRegistration = function (registrationContext, registationData,
        userContext) {};

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
    this.deregister = function (registrationContext, userContext) {};

    /**
     * This operation allows a Consumer to refresh its understanding of the
     * scheduled destruction for a registration.
     * @function
     * @param {object} registrationContext
     * @param {object} userContext
     * @return {object} Lifetime.
     */
    this.getRegistrationLifetime = function (registrationContext, userContext) {
    };

    /**
     * This operation allows a Consumer to request a change to the scheduled
     * destruction of a registration. The Producer returns the actual change
     * that was made.
     * @function
     * @param {object} registrationContext
     * @param {object} userContext
     * @param {object} lifetime
     * @return {object} Lifetime.
     */
    this.setRegistrationLifetime = function (registrationContext, userContext,
        lifetime) {};

    /**
     * This operation allows a Producer to provide information about the
     * Portlets it offers in a context-sensitive manner.
     * @function
     * @param {object} registrationContext
     * @param {object} portletContext
     * @param {object} userContext
     * @param {array} desiredLocales
     * @return {object} PortletDescriptionResponse.
     */
    this.getPortletDescription = function (registrationContext, portletContext,
        userContext, desiredLocales) {};

    /**
     * This operation allows the Consumer to request the creation of a new
     * Portlet from an existing Portlet.
     * @function
     * @param {object} registrationContext
     * @param {object} portletContext
     * @param {object} userContext
     * @param {object} lifetime
     * @return {object} PortletContext.
     */
    this.clonePortlet = function (registrationContext, portletContext,
        userContext, lifetime) {};

    /**
     * The Consumer MUST inform the Producer that a Consumer Configured Portlet
     * which does not use leasing will no longer be used by invoking either the
     * destroyPortlets or the deregister operation and MUST NOT consider such a
     * Portlet to have been destroyed until one of these operations has been
     * successfully invoked for that Portlet.
     * @function
     * @param {object} registrationContext
     * @param {array} portletHandles
     * @param {object} userContext
     * @return {object} DestroyPortletsResponse.
     */
    this.destroyPortlets = function (registrationContext, portletHandles,
        userContext) {};

    /**
     * This operation allows a Consumer to refresh its understanding of the
     * scheduled destruction for a set of Portlet.
     * @function
     * @param {object} registrationContext
     * @param {array} portletContext
     * @param {object} userContext
     * @return {object} GetPortletsLifetimeResponse.
     */
    this.getPortletsLifetime = function (registrationContext, portletContext,
        userContext) {};

    /**
     * This operation allows a Consumer to request a change to the scheduled
     * destruction of a set of Portlets. The Producer returns the actual changes
     * that were made.
     * @function
     * @param {object} registrationContext
     * @param {array} portletContext
     * @param {object} userContext
     * @param {object} lifetime
     * @return {object} SetPortletsLifetimeResponse.
     */
    this.setPortletsLifetime = function (registrationContext, portletContext,
        userContext, lifetime) {};

    /**
     * This operation provides the means for the Consumer to make new copies of
     * a set of Portlets, potentially specifying a different registration scope
     * for the new Portlets.
     * @function
     * @param {object} toRegistrationContext
     * @param {object} toUserContext
     * @param {object} fromRegistrationContext
     * @param {object} fromUserContext
     * @param {array} fromPortletContexts
     * @param {object} lifetime
     * @return {object} CopyPortletsResponse.
     */
    this.copyPortlets = function (toRegistrationContext, toUserContext,
        fromRegistrationContext, fromUserContext, fromPortletContexts,
        lifetime) {};

    /**
     * This operation allows the Consumer to get an opaque representation of a
     * Portlet which can be supplied to the corresponding import operation to
     * reconstitute the Portlet.
     * @function
     * @param {object} registrationContext
     * @param {array} portletContext
     * @param {object} userContext
     * @param {object} lifetime
     * @param {object} exportByValueRequired
     * @return {object} ExportPortletsResponse.
     */
    this.exportPortlets = function (registrationContext, portletContext,
        userContext, lifetime, exportByValueRequired) {};

    /**
     * The importPortlets operation reconstitutes a set of previously exported
     * Portlets. Since Consumers will commonly invoke this operation when
     * reconstituting a particular configuration, this operation is a bulk
     * operation. The Consumer passes a list of Portlets which it wants to be
     * reconstituted. The Producer response MUST contain exactly one element
     * for each entry in the list supplied to importPortlets.
     * @function
     * @param {object} registrationContext
     * @param {object} importContext
     * @param {array} importPortlet
     * @param {object} userContext
     * @param {object} lifetime
     * @return {object} ImportPortletsResponse.
     */
    this.importPortlets = function (registrationContext, importContext,
        importPortlet, userContext, lifetime) {};

    /**
     * The releaseExport operation provides the means for the Consumer to
     * indicate to the Producer that it no longer needs to maintain any stored
     * artifacts relative to a particular export.
     * @function
     * @param {object} exportContext
     * @param {object} userContext
     * @return {object} ReturnAny.
     */
    this.releaseExport = function (exportContext, userContext) {};

    /**
     * The setExportLifetime operation provides the means for the Consumer to
     * request that the Lifetime of a particular export be changed.
     * @function
     * @param {object} registrationContext
     * @param {object} exportContext
     * @param {object} userContext
     * @param {object} lifetime
     * @return {object} Lifetime.
     */
    this.setExportLifetime = function (registrationContext, exportContext,
        userContext, lifetime) {};

    /**
     * The Portlet state in the previous operations was opaque to the Consumer
     * (e.g. as portletState). In addition, means are defined by which a
     * Producer may publish information about state in a Portlet-specific
     * manner. This is enabled through Properties that are declared in the
     * metadata specific to a Portlet. This operation enables the Consumer to
     * interact with this published portion of a Portlet's state.
     * @function
     * @param {object} registrationContext
     * @param {object} PortletContext.
     * @param {object} userContext
     * @param {object} propertyList
     * @return {object} PortletContext.
     */
    this.setPortletProperties = function (registrationContext, portletContext,
        userContext, propertyList) {};

    /**
     * This operation provides the means for the Consumer to fetch the current
     * values of the published Portlet's properties. The intention is to allow a
     * Consumer-generated user interface to display these for administrative
     * purposes.
     * @function
     * @param {object} registrationContext
     * @param {object} portletContext
     * @param {object} userContext
     * @param {object} names
     * @return {object} PropertyList.
     */
    this.getPortletProperties = function (registrationContext, portletContext,
        userContext, names) {};

    /**
     * This operation allows the Consumer to discover the published properties
     * of a Portlet and information (e.g. type and description) that could be
     * useful in generating a user interface for editing the Portlet's
     * configuration.
     * @function
     * @param {object} registrationContext
     * @param {object} portletContext
     * @param {object} userContext
     * @param {object} desiredLocales
     * @return {object} PortletPropertiesDescriptionResponse.
     */
    this.getPortletPropertyDescription = function (registrationContext,
        portletContext, userContext, desiredLocales) {};


};
Clouber.extend(Clouber.sys.portlet.Producer, Clouber.sys.core.Application);
