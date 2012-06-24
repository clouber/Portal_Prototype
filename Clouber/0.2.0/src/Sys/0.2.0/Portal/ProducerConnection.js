/**
* @fileOverview Clouber core js library.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber.Sys.Portal.ProducerConnection
* @requires Clouber.* Clouber.Sys.Core.* Clouber.Sys.UI.* Clouber.Sys.Portal.*
*           Clouber.Sys.Portal.*
*/

Clouber.namespace("Clouber.Sys.Portal");



/**
* Connect is a adapt to connect portlet producer.
* @class
* @implements Clouber.Sys.Portal.ServiceDescription, Clouber.Sys.Portal.Markup,
*       Clouber.Sys.Portal.Registration, Clouber.Sys.Portal.PortletManagement.
* @constructor
* @extends Clouber.BaseObject
* @param {String} producer producer's URL.
*/
Clouber.Sys.Portal.ProducerConnection = function (producer) {
    'use strict';
    var _producer, _conf;

    /**
    * Internal connection object of a producer.
    * @property {Producer} _producer
    * @ignore
    */
    _producer = {};

    /**
    * producer's configuration.
    * @property {}object _conf
    * @ignore
    */
    _conf = {producer: producer};

    /**
    * producer's registrationContext.
    * @property {RegistrationContext} registrationContext
    */
    this.registrationContext = {};

    /**
    * get Producer name.
    * @function getProducer
    * @return {sring} Producer name.
    */
    this.getProducer = function () {
        return _conf.producer;
    };

    /**
    * Initialize a portlet producer.
    * @function init
    * @param {object} args connection information.
    */
    this.init = function (args) {
        _conf = Clouber.merge(_conf, args);
    };

    /**
    * register a portlet producer.
    * @function registerProducer
    * @param {object} args connection information.
    * @return {object}
    */
    this.registerProducer = function (args) {
        _producer = new Clouber.Sys.Portal.Producer();
        _producer.init(args);

        // get user context
        this.userContext = this.getUserContext();
        this.userContext.userContextKey = args.username;

        // get portlet registration context
        this.registationData = new Clouber.Sys.Portal.T.RegistrationData();
        this.registationData.consumerName = Clouber.portal.getConf().name;
        this.registationData.consumerAgent =
            Clouber.config.getConfig().name + "." +
            Clouber.config.getConfig().version;
        this.registationData.methodGetSupported = true;
        this.registationData.consumerModes =
            ["view", "edit", "preview", "help"];
        this.registationData.consumerWindowStates =
            ["normal", "minimized", "maximized", "solo"];

        this.lifetime = new Clouber.Sys.Portal.T.Lifetime();

        this.registrationContext = this.register(this.registationData,
            this.lifetime, this.userContext);

        return this.registrationContext.registrationHandle.handle;
    };

    /**
    * Destroy of a portlet producer.
    * @function destroy
    * @param {object} registationContext function settings.
    * @return {object} ServiceDescription.
    */
    this.destroy = function (args) {
        if (_conf.producer === "localhost") {
            _producer = null;
        } else {
            _producer = null;
        }
        return this;
    };

    /**
    * get connected user's context.
    * @function getUserContext
    * @return {object} UserContext
    */
    this.getUserContext = function () {
        return _producer.getUserContext();
    };

    /**
    * This operation allows a Producer to provide information about its
    * capabilities in a context-sensitive manner (e.g. registration may be
    * required to discover the full capabilities of a Producer)
    * @function getServiceDescription
    * @param {RegistrationContext} registationContext 4.1.27.
    * @param {desiredLocales} desireLocales 4.1.28
    * @param {Handle} portletHandles 4.1.2.
    * @param {UserContext} userContext 5.1.33.
    * @return {ServiceDescription} 4.1.24.
    */
    this.getServiceDescription = function (registationContext, desireLocales,
            portletHandles, userContext) {

        return _producer.getServiceDescription(registationContext,
            desireLocales, portletHandles, userContext);
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
    * @param {RegistrationData} registationData
    * @param {Lifetime} lifetime
    * @param {UserContext} userContext
    * @return {RegistrationContext} RegistrationContext.
    */
    this.register = function (registationData, lifetime, userContext) {
        return _producer.register(registationData, lifetime, userContext);
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
    * @param {RegistrationContext} registationContext
    * @param {PortletContext} portletContext
    * @param {RuntimeContext} runtimeContext
    * @param {UserContext} userContext
    * @param {MarkupParams} markupParams
    * @param {InteractionParams} interactionParams
    * @return {BlockingInteractionResponse} BlockingInteractionResponse.
    */
    this.performBlockingInteraction = function (registationContext,
        portletContext, runtimeContext, userContext, markupParams,
        interactionParams) {

        return _producer.performBlockingInteraction(registationContext,
            portletContext, runtimeContext, userContext, markupParams,
            interactionParams);
    };

    /**
    * A useful way of describing the distinction between an interaction and an
    * event is that an interaction is an encodable event (i.e. can be
    * referenced by presentation markup) with an opaque payload which the
    * Consumer will always attempt to deliver to the Portlet that generated
    * the markup. This differences result in the need for a different
    * signature that the Consumer uses to distribute events to a Portlet;
    * @function handleEvents
    * @param {RegistationContext} registationContext
    * @param {PortletContext} portletContext
    * @param {RuntimeContext} runtimeContext
    * @param {UserContext} userContext
    * @param {MarkupParams} markupParams
    * @param {EventParams} eventParams
    * @return {HandleEventsResponse} handleEventsResponse.
    */
    this.handleEvents = function (registationContext, portletContext,
        runtimeContext, userContext, markupParams, eventParams) {

        return _producer.handleEvents(registationContext, portletContext,
            runtimeContext, userContext, markupParams, eventParams);
    };

    /**
    * The Consumer requests the markup for rendering the current state of a
    * Portlet by invoking. This operation's semantics are that the Consumer
    * is aggregating a page which includes the Portlet's markup.
    * @function getMarkup
    * @param {RegistrationContext} registationContext 4.1.27
    * @param {PortletContext} portletContext 5.1.4
    * @param {RuntimeContext} runtimeContext 5.1.3
    * @param {UserContext} userContext 5.1.33
    * @param {MarkupParams} markupParams 5.1.14
    * @return {MarkupResponse} 5.1.20
    */
    this.getMarkup = function (registationContext, portletContext,
        runtimeContext, userContext, markupParams) {

        return _producer.getMarkup(registationContext, portletContext,
            runtimeContext, userContext, markupParams);
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
    * @function getResource
    * @param {RegistrationContext} registationContext
    * @param {PortletContext} portletContext 5.1.4
    * @param {RuntimeContext} runtimeContext 5.1.3
    * @param {UserContext} userContext
    * @param {ResourceParams} resourceParams
    * @return {ResourceResponse} 5.1.18.
    */
    this.getResource = function (registationContext, portletContext,
        runtimeContext, userContext, resourceParams) {

        return _producer.getResource(registationContext, portletContext,
            runtimeContext, userContext, resourceParams);
    };

    /**
    * In general, the Producer completely manages its own environment,
    * including items such as the initialization of cookies when using the HTTP
    * transport. There are cases, however, when assistance from the Consumer in
    * initializing these cookies is useful. Cookies needed to manage
    * distribution of requests within a load balanced environment are an
    * example of such.
    * @function initCookie
    * @param {RegistrationContext} registationContext
    * @param {UserContext} userContext
    * @return {Extension} ReturnAny.
    */
    this.initCookie = function (registationContext, userContext) {

        return _producer.initCookie(registationContext, userContext);
    };

    /**
    * The Consumer MAY inform the Producer that it will no longer be using a
    * set of sessions by invoking releaseSessions (e.g. the Consumer is
    * releasing items related to the sessionIDs).
    * @function releaseSessions
    * @param {RegistrationContext} registationContext
    * @param {Array(ID)} sessionIDs
    * @param {UserContext} userContext
    * @return {Extension} ReturnAny.
    */
    this.releaseSessions = function (registationContext, sessionIDs,
        userContext) {

        return _producer.releaseSessions(registationContext, sessionIDs,
            userContext);
    };

    /**
    * This operation provides means for the Consumer to modify a relationship
    * with a Producer [R353].
    * @function modifyRegistration
    * @param {RegistrationContext} registrationContext
    * @param {RegistationData} registationData
    * @param {UserContext} userContext
    * @return {RegistrationState} RegistrationState.
    */
    this.modifyRegistration = function (registrationContext, registationData,
        userContext) {

        return _producer.modifyRegistration(registrationContext,
            registationData, userContext);
    };

    /**
    * The Consumer MUST NOT consider a relationship with a Producer ended until
    * either a successful invocation of deregister , elapsing of the scheduled
    * destruction time or receipt of an InvalidRegistration fault message from
    * the Producer on an invocation supplying the registrationHandle.
    * @function deregister
    * @param {RegistrationContext} registrationContext
    * @param {UserContext} userContext
    * @return {Extension} ReturnAny.
    */
    this.deregister = function (registrationContext, userContext) {

        return _producer.deregister(registrationContext, userContext);
    };

    /**
    * This operation allows a Consumer to refresh its understanding of the
    * scheduled destruction for a registration.
    * @function getRegistrationLifetime
    * @param {RegistrationContext} registrationContext
    * @param {UserContext} userContext
    * @return {Lifetime} Lifetime.
    */
    this.getRegistrationLifetime = function (registrationContext, userContext) {

        return _producer.getRegistrationLifetime(registrationContext,
            userContext);

    };

    /**
    * This operation allows a Consumer to request a change to the scheduled
    * destruction of a registration. The Producer returns the actual change
    * that was made.
    * @function setRegistrationLifetime
    * @param {RegistrationContext} registrationContext
    * @param {UserContext} userContext
    * @param {Lifetime} lifetime
    * @return {Lifetime} Lifetime.
    */
    this.setRegistrationLifetime = function (registrationContext, userContext,
        lifetime) {

        return _producer.setRegistrationLifetime(registrationContext,
            userContext, lifetime);
    };

    /**
    * This operation allows a Producer to provide information about the
    * Portlets it offers in a context-sensitive manner.
    * @function getPortletDescription
    * @param {RegistrationContext} registrationContext
    * @param {PortletContext} portletContext
    * @param {UserContext} userContext
    * @param {array(string)} desiredLocales 4.1.28
    * @return {PortletDescriptionResponse} PortletDescriptionResponse.
    */
    this.getPortletDescription = function (registrationContext, portletContext,
        userContext, desiredLocales) {

        return _producer.getPortletDescription(registrationContext,
            portletContext, userContext, desiredLocales);
    };

    /**
    * This operation allows the Consumer to request the creation of a new
    * Portlet from an existing Portlet.
    * @function clonePortlet
    * @param {RegistrationContext} registrationContext
    * @param {PortletContext} portletContext
    * @param {UserContext} userContext
    * @param {Lifetime} lifetime
    * @return {PortletContext} PortletContext.
    */
    this.clonePortlet = function (registrationContext, portletContext,
        userContext, lifetime) {

        return _producer.clonePortlet(registrationContext, portletContext,
            userContext, lifetime);
    };

    /**
    * The Consumer MUST inform the Producer that a Consumer Configured Portlet
    * which does not use leasing will no longer be used by invoking either the
    * destroyPortlets or the deregister operation and MUST NOT consider such a
    * Portlet to have been destroyed until one of these operations has been
    * successfully invoked for that Portlet.
    * @function destroyPortlets
    * @param {registrationContext} registrationContext
    * @param {array(Handle)} portletHandles
    * @param {UserContext} userContext
    * @return {DestroyPortletsResponse} DestroyPortletsResponse.
    */
    this.destroyPortlets = function (registrationContext, portletHandles,
        userContext) {

        return _producer.destroyPortlets(registrationContext,
            portletHandles, userContext);
    };

    /**
    * This operation allows a Consumer to refresh its understanding of the
    * scheduled destruction for a set of Portlet.
    * @function getPortletsLifetime
    * @param {RegistrationContext} registrationContext
    * @param {array(PortletContext)} portletContext
    * @param {UserContext} userContext
    * @return {GetPortletsLifetimeResponse} GetPortletsLifetimeResponse.
    */
    this.getPortletsLifetime = function (registrationContext, portletContext,
        userContext) {

        return _producer.getPortletsLifetime(registrationContext,
            portletContext, userContext);
    };

    /**
    * This operation allows a Consumer to request a change to the scheduled
    * destruction of a set of Portlets. The Producer returns the actual changes
    * that were made.
    * @function
    * @param {RegistrationContext} registrationContext
    * @param {array(PortletContext)} portletContext
    * @param {UserContext} userContext
    * @param {Lifetime} lifetime
    * @return {SetPortletsLifetimeResponse} SetPortletsLifetimeResponse.
    */
    this.setPortletsLifetime = function (registrationContext, portletContext,
        userContext, lifetime) {

        return _producer.setPortletsLifetime(registrationContext,
            portletContext, userContext, lifetime);
    };

    /**
    * This operation provides the means for the Consumer to make new copies of
    * a set of Portlets, potentially specifying a different registration scope
    * for the new Portlets.
    * @function copyPortlets
    * @param {RegistrationContext} toRegistrationContext
    * @param {UserContext} toUserContext
    * @param {RegistrationContext} fromRegistrationContext
    * @param {UserContext} fromUserContext
    * @param {array(PortletContext)} fromPortletContexts
    * @param {Lifetime} lifetime
    * @return {CopyPortletsResponse} CopyPortletsResponse.
    */
    this.copyPortlets = function (toRegistrationContext, toUserContext,
        fromRegistrationContext, fromUserContext, fromPortletContexts,
        lifetime) {

        return _producer.copyPortlets(toRegistrationContext, toUserContext,
            fromRegistrationContext, fromUserContext, fromPortletContexts,
            lifetime);
    };

    /**
    * This operation allows the Consumer to get an opaque representation of a
    * Portlet which can be supplied to the corresponding import operation to
    * reconstitute the Portlet.
    * @function exportPortlets
    * @param {RegistrationContext} registrationContext
    * @param {array(PortletContext)} portletContext
    * @param {UserContext} userContext
    * @param {Lifetime} lifetime
    * @param {boolean} exportByValueRequired indicating whether or not the usage
    *    intended by the Consumer requires that the export not contain
    *    references to data stored at the Producer.
    * @return {ExportPortletsResponse} ExportPortletsResponse.
    */
    this.exportPortlets = function (registrationContext, portletContext,
        userContext, lifetime, exportByValueRequired) {

        return _producer.exportPortlets(registrationContext,
            portletContext, userContext, lifetime, exportByValueRequired);
    };

    /**
    * The importPortlets operation reconstitutes a set of previously exported
    * Portlets. Since Consumers will commonly invoke this operation when
    * reconstituting a particular configuration, this operation is a bulk
    * operation. The Consumer passes a list of Portlets which it wants to be
    * reconstituted. The Producer response MUST contain exactly one element
    * for each entry in the list supplied to importPortlets.
    * @function importPortlets
    * @param {registrationContext} registrationContext
    * @param {object} importContext The importContext carries the data from the
    *    exportContext field associated with the Portlet representations by a
    *    response to a single invocation of the exportPortlets operation.
    * @param {array(ImportPortlet)} importPortlet
    * @param {UserContext} userContext
    * @param {Lifetime} lifetime
    * @return {ImportPortletsResponse} ImportPortletsResponse.
    */
    this.importPortlets = function (registrationContext, importContext,
        importPortlet, userContext, lifetime) {

        return _producer.importPortlets(registrationContext, importContext,
            importPortlet, userContext, lifetime);
    };

    /**
    * The releaseExport operation provides the means for the Consumer to
    * indicate to the Producer that it no longer needs to maintain any stored
    * artifacts relative to a particular export.
    * @function releaseExport
    * @param {object} exportContext the exportContext from the original
    *       exportPortlets invocation.
    * @param {UserContext} userContext
    * @return {Extension} ReturnAny.
    */
    this.releaseExport = function (exportContext, userContext) {

        return _producer.releaseExport(exportContext, userContext);
    };

    /**
    * The setExportLifetime operation provides the means for the Consumer to
    * request that the Lifetime of a particular export be changed.
    * @function setExportLifetime
    * @param {RegistrationContext} registrationContext
    * @param {object} exportContext The Consumer indicates the particular export
    *         it is requesting the lifetime change for using the exportContext
    *         parameter.
    * @param {UserContext} userContext
    * @param {Lifetime} lifetime
    * @return {Lifetime} Lifetime.
    */
    this.setExportLifetime = function (registrationContext, exportContext,
        userContext, lifetime) {

        return _producer.setExportLifetime(registrationContext,
            exportContext, userContext, lifetime);
    };

    /**
    * The Portlet state in the previous operations was opaque to the Consumer
    * (e.g. as portletState). In addition, means are defined by which a
    * Producer may publish information about state in a Portlet-specific
    * manner. This is enabled through Properties that are declared in the
    * metadata specific to a Portlet. This operation enables the Consumer to
    * interact with this published portion of a Portlet's state.
    * @function setPortletProperties
    * @param {RegistrationContext} registrationContext
    * @param {PortletContext} PortletContext.
    * @param {UserContext} userContext
    * @param {PropertyList} propertyList
    * @return {PortletContext} PortletContext.
    */
    this.setPortletProperties = function (registrationContext, portletContext,
        userContext, propertyList) {

        return _producer.setPortletProperties(registrationContext,
            portletContext,
            userContext, propertyList);
    };

    /**
    * This operation provides the means for the Consumer to fetch the current
    * values of the published Portlet's properties. The intention is to allow a
    * Consumer-generated user interface to display these for administrative
    * purposes.
    * @function getPortletProperties
    * @param {RegistrationContext} registrationContext
    * @param {PortletContext} portletContext
    * @param {UserContext} userContext
    * @param {array(string)} names The supplied names parameter is an array of
    *        strings each of which declares a property for which the Consumer is
    *        requesting its value.
    * @return {PropertyList} PropertyList.
    */
    this.getPortletProperties = function (registrationContext, portletContext,
        userContext, names) {

        return _producer.getPortletProperties(registrationContext,
            portletContext, userContext, names);
    };

    /**
    * This operation allows the Consumer to discover the published properties
    * of a Portlet and information (e.g. type and description) that could be
    * useful in generating a user interface for editing the Portlet's
    * configuration.
    * @function getPortletPropertyDescription
    * @param {object} registrationContext
    * @param {RegistrationContext} portletContext
    * @param {UserContext} userContext
    * @param {array(string)} desiredLocales
    * @return {PortletPropertiesDescriptionResponse}
    *         PortletPropertiesDescriptionResponse.
    */
    this.getPortletPropertyDescription = function (registrationContext,
        portletContext, userContext, desiredLocales) {

        return _producer.getPortletPropertyDescription(registrationContext,
            portletContext, userContext, desiredLocales);
    };

};
Clouber.extend(Clouber.Sys.Portal.ProducerConnection,
    Clouber.BaseObject);


