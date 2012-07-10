/**
* @fileOverview Clouber core js library.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber.Portal.ProducerConnection
* @requires Clouber.* Clouber.Core.* Clouber.Core.* Clouber.Portal.*
*           Clouber.Portal.*
*/

Clouber.namespace("Clouber.Portal");



/**
* Connect is a adapt to connect portlet producer.
* @class
* @implements Clouber.Portal.ServiceDescription, Clouber.Portal.Markup,
*       Clouber.Portal.Registration, Clouber.Portal.PortletManagement.
* @constructor
* @extends Clouber.Core.BaseObject
* @param {String} producer producer's URL.
*/
Clouber.Portal.ProducerConnection = function (producer) {
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
        _producer = new Clouber.Portal.Producer();
        _producer.init(args);

        // get user context
        this.userContext = this.getUserContext();
        this.userContext.userContextKey = args.username;

        // get portlet registration context
        this.registationData = new Clouber.Portal.T.RegistrationData();
        this.registationData.consumerName = Clouber.portal.getConf().name;
        this.registationData.consumerAgent =
            Clouber.config.getConfig().name + "." +
            Clouber.config.getConfig().version;
        this.registationData.methodGetSupported = true;
        this.registationData.consumerModes =
            ["view", "edit", "preview", "help"];
        this.registationData.consumerWindowStates =
            ["normal", "minimized", "maximized", "solo"];

        this.lifetime = new Clouber.Portal.T.Lifetime();

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
    * @param {function} callback Optional asynchronous callback function 
    * @return {BlockingInteractionResponse} BlockingInteractionResponse.
    */
    this.performBlockingInteraction = function (registationContext,
        portletContext, runtimeContext, userContext, markupParams,
        interactionParams, callback) {

        return _producer.performBlockingInteraction(registationContext,
            portletContext, runtimeContext, userContext, markupParams,
            interactionParams, callback);
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
    * @param {function} callback Optional asynchronous callback function 
    * @return {HandleEventsResponse} handleEventsResponse.
    */
    this.handleEvents = function (registationContext, portletContext,
        runtimeContext, userContext, markupParams, eventParams, callback) {

        return _producer.handleEvents(registationContext, portletContext,
            runtimeContext, userContext, markupParams, eventParams, callback);
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
    * @param {function} callback Optional asynchronous callback function 
    * @return {MarkupResponse} 5.1.20
    */
    this.getMarkup = function (registationContext, portletContext,
        runtimeContext, userContext, markupParams, callback) {

        return _producer.getMarkup(registationContext, portletContext,
            runtimeContext, userContext, markupParams, callback);
    };


};
Clouber.extend(Clouber.Portal.ProducerConnection,
    Clouber.Core.BaseObject);


