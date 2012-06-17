/**
* @fileOverview Clouber Portlet interfaces' declaration, refer to WSPR 2.0.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @requires Clouber.* Clouber.Sys.Core.* Clouber.Sys.Portlet.*
*/

Clouber.namespace("WSRP");

/**
* The Service Description interface (WSRP 2.0), a required interface, defines
* an operation for acquiring the Producer's metadata.
* @interface
* @class
*/
WSRP.ServiceDescription = function () {
    'use strict';

    /**
    * This operation allows a Producer to provide information about its
    * capabilities in a context-sensitive manner (e.g. registration may be
    * required to discover the full capabilities of a Producer)
    * @function getServiceDescription
    * @param {RegistrationContext} registrationContext 4.1.27.
    * @param {desiredLocales} desireLocales 4.1.28
    * @param {Handle} portletHandles 4.1.2.
    * @param {UserContext} userContext 5.1.33.
    * @return {ServiceDescription} 4.1.24.
    */
    this.getServiceDescription = function (registrationContext, desireLocales,
        portletHandles, userContext) {};
};

/**
* The Markup interface(WSRP 2.0), a required interface, defines operations for
* getting the markup from a Portlet as well as processing user interactions
* with that markup. This interface also contains the operation for Consumer
* assistance in pre-initializing HTTP cookies. Having this operation in this
* interface avoids the problems associated with moving cookies between
* bindings.
* @class
* @interface
*/
WSRP.Markup = function () {
    'use strict';

    /**
    * The Consumer requests the markup for rendering the current state of a
    * Portlet by invoking. This operation's semantics are that the Consumer
    * is aggregating a page which includes the Portlet's markup.
    * @function getMarkup
    * @param {RegistrationContext} registrationContext 4.1.27
    * @param {PortletContext} portletContext 5.1.4
    * @param {RuntimeContext} runtimeContext 5.1.3
    * @param {UserContext} userContext 5.1.33
    * @param {MarkupParams} markupParams 5.1.14
    * @return {MarkupResponse} 5.1.20
    */
    this.getMarkup = function (registrationContext, portletContext,
        runtimeContext, userContext, markupParams) {};

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
    * @param {RegistrationContext} registrationContext
    * @param {PortletContext} portletContext
    * @param {RuntimeContext} runtimeContext
    * @param {UserContext} userContext
    * @param {MarkupParams} markupParams
    * @param {InteractionParams} interactionParams
    * @return {BlockingInteractionResponse} BlockingInteractionResponse.
    */
    this.performBlockingInteraction = function (registrationContext,
        portletContext, runtimeContext, userContext, markupParams,
        interactionParams) {};

    /**
    * A useful way of describing the distinction between an interaction and an
    * event is that an interaction is an encodable event (i.e. can be
    * referenced by presentation markup) with an opaque payload which the
    * Consumer will always attempt to deliver to the Portlet that generated
    * the markup. This differences result in the need for a different
    * signature that the Consumer uses to distribute events to a Portlet;
    * @function handleEvents
    * @param {RegistrationContext} registrationContext
    * @param {PortletContext} portletContext
    * @param {RuntimeContext} runtimeContext
    * @param {UserContext} userContext
    * @param {MarkupParams} markupParams
    * @param {EventParams} eventParams
    * @return {HandleEventsResponse} handleEventsResponse.
    */
    this.handleEvents = function (registrationContext, portletContext,
        runtimeContext, userContext, markupParams, eventParams) {};

};

/**
* The Registration interface (WSRP 2.0), an optional interface, defines
* operations for establishing, updating and destroying a registration. Each
* registration reflects a particular relationship between a Consumer and a
* Producer.
* @interface
* @class
*/
WSRP.Registration = function () {
    'use strict';

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
    * @param {RegistrationData} registrationData
    * @param {Lifetime} lifetime
    * @param {UserContext} userContext
    * @return {RegistrationContext} RegistrationContext.
    */
    this.register = function (registrationData, lifetime, userContext) {};

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
    this.deregister = function (registrationContext, userContext) {};

};



/**
* 4.1.1 Extension Type
* The Extension structure contains the payload extension mechanism for vendor
* and application extensions. These arbitrary elements are required to be from
* namespaces other than the WSRP "types" namespace (urn:oasis:names:tc:wsrp:v2:
* types) and extend their containing data structure.
* @type WSRP.Extension
* @class WSRP.Extension
*/
WSRP.Extension = function () {
    'use strict';
    /** @type object */
    this._any = {};
};

/**
* 4.1.2 Handle Type
* Handles are opaque references that are passed between the Consumer and
* Producer.
* @type WSRP.Handle
* @class WSRP.Handle
*/
WSRP.Handle = function () {
    'use strict';
    /**
    * handle restricts string (maximum length = 255)
    * @type string
    */
    this.handle = "";
};

/**
* 4.1.3 Key Type
* Keys are similar to Handles except that they are not opaque references. They
* are used for keying data and therefore need to support efficient comparisons.
* As a result their length is restricted to 255 characters.
* @type WSRP.Key
* @class WSRP.Key
*/
WSRP.Key = function () {
    'use strict';
    /**
    * handle restricts string (maximum length = 255)
    * @type string
    */
    this.key = "";
};

/**
* 4.1.4 ID Type
* IDs are used to refer to something, but are unlikely to be used as keys. As
* a result the length restriction is relaxed to 4096 characters.
* @type WSRP.ID
* @class WSRP.ID
*/
WSRP.ID = function () {
    'use strict';
    /**
    * handle restricts string (maximum length = 4096)
    * @type string
    */
    this.id = "";
};

/**
* 4.1.5 LocalizedString Type
* The LocalizedString structure describes both the value for a particular
* locale and the name that can be used to extract the value for other locales
* from a ResourceList.
* @type WSRP.LocalizedString
* @class WSRP.LocalizedString
*/
WSRP.LocalizedString = function () {
    'use strict';
    /**
    * The locale for this supplied localized value. This is carried in the
    * WSDL using the xml:lang attribute.
    * @type string
    */
    this.xmlLang = "";

    /**
    * The value for this localized string in the declared locale.
    * @type string
    */
    this.value = "";

    /**
    * The name assigned to this localized string for dereferencing into a
    * ResourceList for values from other locales. When the resourceName is not
    * supplied, there are no values for additional locales available in the
    * ResourceList.
    * @type string
    */
    this.resourceName = "";
};

/**
* 4.1.6 ResourceValue Type
* This structure provides the value of a resource for a locale.
* @type WSRP.ResourceValue
* @class WSRP.ResourceValue
*/
WSRP.ResourceValue = function () {
    'use strict';
    /**
    * The locale for this localized value. This is carried in the WSDL using
    * the xml:lang attribute.
    * @type string
    */
    this.xmlLang = "";

    /** The value for this localized string in the declared locale.
    * @type string
    */
    this.value = "";

    /**
    * The extensions field MAY be used to extend this structure. Extension
    * elements MUST be from namespaces other than WSRP.
    * @type array(Extension)
    */
    this.extensions = [];
};

/**
* 4.1.7 Resource Type
* The Resource structure carries the values for a resource in a set of locales.
* @type WSRP.Resource
* @class WSRP.Resource
*/
WSRP.Resource = function () {
    'use strict';
    /** The name of the resource for which this is a list of localized values.
    * @type string
    */
    this.resourceName = "";

    /**
    * Each member of this array provides the value for the resource in a
    * locale.
    * @type array(ResourceValue)
    */
    this.values = [];

    /**
    * The extensions field MAY be used to extend this structure. Extension
    * elements MUST be from namespaces other than WSRP.
    *  @type array(Extension)
    */
    this.extensions = [];
};

/**
* 4.1.8 ResourceList Type
* This is an array of Resource structure, each of which carries the values for
* a localized resource in various locales.
* @type WSRP.ResourceList
* @class WSRP.ResourceList
*/
WSRP.ResourceList = function () {
    'use strict';
    /**
    * Each member of this array provides the localized values for a resource.
    * @type array(Resource)
    */
    this.resources = [];

    /**
    * The extensions field MAY be used to extend this structure. Extension
    * elements MUST be from namespaces other than WSRP.
    *  @type array(Extension)
    */
    this.extensions = [];
};

/**
* 4.1.9 ItemDescription Type
* This structure is used to describe custom items a Consumer is allowed to use
* when interacting with the Portlets at the Producer.
* @type WSRP.ItemDescription
* @class WSRP.ItemDescription
*/
WSRP.ItemDescription = function () {
    'use strict';
    /**
    * The name for this item. The preferred form is a URI such that it is
    * definitively namespaced.
    * @type string
    */
    this.itemName = "";

    /**
    * A localized, free form description of the item. Expected use of this
    * field is for display at the Consumer to someone who will provide a
    * mapping to Consumer information.
    * @type LocalizedString
    */
    this.description = new WSRP.LocalizedString();

    /**
    * A localized name for the item. Expected use of this field is for display
    * to someone when there is no direct mapping to Consumer information for
    * this item.
    * @type LocalizedString
    */
    this.displayName = new WSRP.LocalizedString();

    /**
    * The extensions field MAY be used to extend this structure. Extension
    * elements MUST be from namespaces other than WSRP.
    * @type array(Extension)
    */
    this.extensions = [];
};

/**
* 4.1.10 MarkupType Type
* The MarkupType data structure is used to carry Portlet metadata that is
* mimeType specific.
* @type WSRP.MarkupType
* @class WSRP.MarkupType
*/
WSRP.MarkupType = function () {
    'use strict';
    /**
    * A mime type supported by the Portlet (e.g. text/html,
    * application/xhtml+xml, text/vnd.wap.wml) for which the remainder of this
    * structure applies.
    * @type string
    */
    this.mimeType = "";

    /**
    * The modes (defined in [Section 5.9]) that are supported by the Portlet
    * for this mimeType.
    * @type array(string)
    */
    this.modes = [];

    /**
    * The windowStates (defined in [Section 5.10]) that are supported by the
    * Portlet for this mimeType.
    * @type array(string)
    */
    this.windowStates = [];

    /**
    * An optional array of locales or which this mimeType is available (e.g.
    * "en-US"). If this array is not supplied, the Consumer can assume the
    * Portlet will attempt to generate markup for any requested locale.
    * @type array(string)
    */
    this.locales = [];

    /**
    * The extensions field MAY be used to extend this structure. Extension
    * elements MUST be from namespaces other than WSRP.
    * @type array(Extension)
    */
    this.extensions = [];
};

/**
* 4.1.11 EventDescription Type
* The EventDescription structure provides the information needed to describe a
* Portlet's events.
* @type WSRP.EventDescription
* @class WSRP.EventDescription
*/
WSRP.EventDescription = function () {
    'use strict';
    /** @type QName*/
    this.name = "";

    /** @type array(QName) */
    this.aliases = [];

    /** @type QName */
    this.type = "";

    /** @type anyURI string */
    this.schemaLocation = "";

    /** @type ModelTypes */
    this.schemaType = new WSRP.ModelTypes();

    /** @type LocalizedString */
    this.description = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.hint = new WSRP.LocalizedString();

    /** @type LocalizedString} label */
    this.label = new WSRP.LocalizedString();

    /** @type array(Extension) */
    this.extensions = [];
};

/**
* 4.1.12 PropertyDescription Type
* Each property of a Portlet is described using the following structure.
* @type WSRP.PropertyDescription
* @class WSRP.PropertyDescription
*/
WSRP.PropertyDescription = function () {
    'use strict';
    /**
    * Name of the property being described. If this property's value is not
    * carried within the stringValue alternative of the Property structure,
    * this name also becomes the name of the XML element carrying the
    * property's value with the type field defining the type of this element.
    * @type QName
    */
    this.name = "";

    /** @type QName */
    this.type = "";

    /** @type anyURI */
    this.schemaLocation = "";

    /** @type LocalizedString */
    this.description = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.label = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.hint = new WSRP.LocalizedString();

    /** @type array(string) */
    this.usage = [];

    /** @type array(QName) */
    this.aliases = [];

    /** @type array(Extension) */
    this.extensions = [];
};

/**
* 4.1.13 ModelTypes Type
* The ModelTypes structure contains the payload mechanism for declaring the
* types referenced by the description types.
* @type WSRP.ModelTypes
* @class WSRP.ModelTypes
*/
WSRP.ModelTypes = function () {
    'use strict';
    /** @type array(Object) */
    this.any = [];
};

/**
* 4.1.14 ModelDescription Type
* The set of properties of a Portlet are described in its metadata using the
* following structure.
* @type WSRP.ModelDescription
* @class WSRP.ModelDescription
*/
WSRP.ModelDescription = function () {
    'use strict';
    /** @type array(PropertyDescription) */
    this.propertyDescriptions = [];

    /** @type ModelTypes */
    this.modelTypes = new WSRP.ModelTypes();

    /** @type array(Extension) */
    this.extensions = [];
};

/**
* 4.1.15 ParameterDescription Type
* Portlet parameters are modeled as an array of strings, such that type
* information does not need to be declared, and are described using the
* following structure.
* @type WSRP.ParameterDescription
* @class WSRP.ParameterDescription
*/
WSRP.ParameterDescription = function () {
    'use strict';
    /** @type string */
    this.identifier = "";

    /** @type array(QName) */
    this.names = [];

    /** @type LocalizedString */
    this.description = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.label = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.hint = new WSRP.LocalizedString();

    /** @type array(Extension) */
    this.extensions = [];
};

/**
* 4.1.16 PortletDescription Type
* The PortletDescription structure contains a set of fields that provide the
* metadata to describe the Portlet as well as any clones of the Portlet.
* @type WSRP.PortletDescription
* @class WSRP.PortletDescription
*/
WSRP.PortletDescription = function () {
    'use strict';
    /** @type Handle */
    this.portletHandle = new WSRP.Handle();

    /** @type array(MarkupType) */
    this.markupTypes = [];

    /** @type ID */
    this.groupID = new WSRP.ID();

    /** @type LocalizedString */
    this.description = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.shortTitle = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.title = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.displayName = new WSRP.LocalizedString();

    /** @type array(LocalizedString) */
    this.keywords = [];

    /** @type ID */
    this.portletID = new WSRP.ID();

    /** @type array(QName) */
    this.publishedEvents = [];

    /** @type array(QName) */
    this.handledEvents = [];

    /** @type array(ParameterDescription)*/
    this.navigationalParameterDescriptions = [];

    /** @type array(string) */
    this.userCategories = [];

    /** @type array(string) */
    this.userProfileItems = [];

    /** @type array(string) */
    this.portletManagedModes = [];

    /** @type boolean */
    this.usesMethodGet = true;

    /** @type boolean */
    this.defaultMarkupSecure = true;

    /** @type boolean */
    this.onlySecure = true;

    /** @type boolean */
    this.userContextStoredInSession = true;

    /** @type boolean */
    this.templatesStoredInSession = true;

    /** @type boolean */
    this.hasUserSpecificState = true;

    /** @type boolean */
    this.doesUrlTemplateProcessing = true;

    /** @type boolean */
    this.mayReturnPortletState = true;

    /** @type array(Extension) */
    this.extensions = [];
};
Clouber.extend(WSRP.PortletDescription, Clouber.BaseObject);

/**
* 4.1.17 Property Type
* The Property data structure is used to carry typed information between the
* Consumer and the Producer. Each property includes a name and type (carried
* using the xsi:type attribute) [A505] [A507].
* @type WSRP.Property
* @class WSRP.Property
*/
WSRP.Property = function () {
    'use strict';
    /** @type QName */
    this.name = "";

    /** @type QName */
    this.type = "";

    /** @type string */
    this.xmlLang = "";

    /** @type Array(Object) */
    this.value = [];
};

/**
* 4.1.18 ResetProperty Type
* The ResetProperty data structure carries the name of a Property for which the
* Consumer wants the value reset to the default.
* @type WSRP.ResetProperty
* @class WSRP.ResetProperty
*/
WSRP.ResetProperty = function () {
    'use strict';
    /** @type QName */
    this.name = "";
};

/**
* 4.1.19 PropertyList Type
* A PropertyList gathers a set of Property structures together for transmitting
* between the Consumer and Producer.
* @type WSRP.PropertyList
* @class WSRP.PropertyList
*/
WSRP.PropertyList = function () {
    'use strict';
    /** @type array(Property) */
    this.properties = [];

    /** @type array(ResetProperty) */
    this.resetProperties = [];

    /** @type array(Extension) */
    this.extensions = [];
};

/**
* 4.1.20 CookieProtocol Type
* This type is a restriction on the string type that is constrained to the
* values "none", "perUser" or "perGroup".
* @type WSRP.CookieProtocol
* @class WSRP.CookieProtocol
*/
WSRP.CookieProtocol = function () {
    'use strict';
    /** @type string */
    this.none = "none";

    /** @type string */
    this.perUser = "perUser";

    /** @type string */
    this.perGroup = "perGroup";
};

/**
* 4.1.21 ExtensionPart Type
* The ExtensionPart structure contains a set of fields for describing one part
* of a protocol extension.
* @type WSRP.ExtensionPart
* @class WSRP.ExtensionPart
*/
WSRP.ExtensionPart = function () {
    'use strict';
    /** @type QName */
    this.name = "";

    /** @type QName */
    this.type = "";

    /** @type anyURI */
    this.schemaLocation = {};

    /** @type ModelTypes */
    this.schemaType = new WSRP.ModelTypes();

    /** @type Array(string) */
    this.extendedTypes = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 4.1.22 ExtensionDescription Type
* The ExtensionDescription structure contains a set of fields for describing a
* protocol extension.
* @type WSRP.ExtensionDescription
* @class WSRP.ExtensionDescription
*/
WSRP.ExtensionDescription = function () {
    'use strict';
    /** @type QName */
    this.name = "";

    /** @type Array(ExtensionPart) */
    this.parts = [];

    /** @type Array(QName) */
    this.aliases = [];

    /** @type LocalizedString */
    this.description = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.label = new WSRP.LocalizedString();

    /** @type LocalizedString */
    this.hint = new WSRP.LocalizedString();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 4.1.23 ExportDescription Type
* The ExportDescription structure contains a set of fields for describing
* export capabilities and restrictions.
* @type WSRP.ExportDescription
* @class WSRP.ExportDescription
*/
WSRP.ExportDescription = function () {
    'use strict';
    /** @type integer */
    this.recommendedExportSize = 0;

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 4.1.24 ServiceDescription Type
* The ServiceDescription structure contains a set of fields* that describe the
* offered services of the Producer.
* @type WSRP.ServiceDescription
* @class WSRP.ServiceDescription
*/
WSRP.ServiceDescription = function () {
    'use strict';
    /** @type boolean */
    this.requiresRegistration = true;

    /** @type Array(PortletDescription) */
    this.offeredPortlets = [];

    /** @type Array(ItemDescription) */
    this.userCategoryDescriptions = [];

    /** @type Array(ExtensionDescription) */
    this.extensionDescriptions = [];

    /** @type Array(ItemDescription) */
    this.customWindowStateDescriptions = [];

    /** @type Array(ItemDescription) */
    this.customModeDescriptions = [];

    /** @type CookieProtocol */
    this.requiresInitCookie = new WSRP.CookieProtocol();

    /** @type ModelDescription */
    this.registrationPropertyDescription =
        new WSRP.ModelDescription();

    /** @type Array(string) */
    this.locales = [];

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Array(EventDescription) */
    this.eventDescriptions = [];

    /** @type ModelTypes */
    this.schemaType = new WSRP.ModelTypes();

    /** @type Array(string) */
    this.supportedOptions = [];

    /** @type ExportDescription */
    this.exportDescription = new WSRP.ExportDescription();

    /** @type boolean */
    this.mayReturnRegistrationState = true;

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 4.1.25 Lifetime Type
* The Lifetime structure provides information regarding when a particular item
* is scheduled to be expunged.
* @type WSRP.Lifetime
* @class WSRP.Lifetime
*/
WSRP.Lifetime = function () {
    'use strict';
    /** @type dateTime */
    this.currentTime = new Date();

    /**
    * Default time 24h
    * @type dateTime
    */
    this.terminationTime = new Date(this.currentTime.getTime() +
        (24 * 60 * 60 * 1000));

    /**
    * Default time 24h
    * @type duration
    */
    this.refreshDuration = 24 * 60 * 60 * 1000;

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 4.1.26 RegistrationState Type
* The RegistrationState structure contains fields related to a particular
* registration of a Consumer with a Producer. It is returned by the
* modifyRegistration operation and contains the fields of a RegistrationContext
* that allow a Producer to return enduring state at registration scope to the
* Consumer and indicate any change in the scheduled destruction of the
* registration.
* @type RegistrationState
* @class RegistrationState
*/
WSRP.RegistrationState = function () {
    'use strict';
    /** @type base64Binary */
    this.registrationState = {};

    /** @type Lifetime */
    this.scheduledDestruction = new WSRP.Lifetime();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 4.1.27 RegistrationContext Type
* The RegistrationContext structure contains fields related to a particular
* registration of a Consumer with a Producer. It is returned by the register
* operation and is a required parameter on most other operations.
* @type RegistrationContext
* @class RegistrationContext
*/
WSRP.RegistrationContext = function () {
    'use strict';
    /**
    * registrationHandle
    * @type Handle
    */
    this.registrationHandle = new WSRP.Handle();

    /**
    * registrationState
    * @type base64Binary
    */
    this.registrationState = {};

    /**
    * scheduledDestruction
    * @type Lifetime
    */
    this.scheduledDestruction = new WSRP.Lifetime();

    /**
    * @type Array(Extension)
    */
    this.extensions = [];
};

/**
* 4.1.28 desiredLocales
* This parameter is used to control the locales for which localized strings are
* returned. The desiredLocales parameter is an array of strings, each of which
* specifies a single locale, whose order indicates the preference of the
* Consumer as to the locales for which values are returned.
* @type WSRP.DesiredLocales
* @class WSRP.DesiredLocales
*/
WSRP.DesiredLocales = function () {
    'use strict';
    /** @type Array() */
    this.desiredLocales = [];
};


/**
* 5.1.1 SessionContext Type
* The SessionContext structure contains the ID and expires information the
* Consumer needs to refer to the session in subsequent invocations.
* @type WSRP.SessionContext
* @class WSRP.SessionContext
*/
WSRP.SessionContext = function () {
    'use strict';
    /** @type ID */
    this.sessionID = new WSRP.ID();

    /** @type int */
    this.expires = 0;

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.2 SessionParams Type
* The SessionParams structure contains the session information the Consumer is
* supplying to the Portlet for connection to a Portlet session.
* @type WSRP.SessionParams
* @class WSRP.SessionParams
*/
WSRP.SessionParams = function () {
    'use strict';
    /** @type ID */
    this.sessionID = new WSRP.ID();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.3 RuntimeContext Type
* The RuntimeContext structure defines a collection of fields used only in
* transient interactions between the Producer and Consumer.
* @type WSRP.RuntimeContext
* @class WSRP.RuntimeContext
*/
WSRP.RuntimeContext = function () {
    'use strict';
    /** @type string */
    this.userAuthentication = "";

    /** @type Key */
    this.portletInstanceKey = new WSRP.Key();

    /** @type string */
    this.namespacePrefix = "";

    /** @type Templates */
    this.templates = new WSRP.Templates();

    /** @type SessionParams */
    this.sessionParams = new WSRP.SessionParams();

    /** @type string */
    this.pageState = "";

    /** @type string */
    this.portletStates = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.4 PortletContext Type
* The PortletContext structure is used as a parameter on many operations to
* supply the Portlet information that was returned to the Consumer.
* @type WSRP.PortletContext
* @class WSRP.PortletContext
*/
WSRP.PortletContext = function () {
    'use strict';
    /** @type Handle */
    this.portletHandle = new WSRP.Handle();

    /** @type base64Binary */
    this.portletState = {};

    /** @type Lifetime */
    this.scheduledDestruction = new WSRP.Lifetime();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.5 Standard UserScopes
* This specification defines initial values for UserScopes. UserScope is an
* open set of values where the Producer SHOULD restrict the values supplied to
* those specified in this specification or custom values the Consumer has
* indicated it supports. wsrp:perUser, wsrp:forAll
* @type WSRP.UserScopes
* @class WSRP.UserScopes
*/
WSRP.UserScopes = function () {
    'use strict';
    /** @type string */
    this.perUser = "wsrp:perUser";

    /** @type string */
    this.forAll = "wsrp:forAll";

    /**
    * get current value.
    * @function getValue
    * @return {string}
    */
    this.getValue = function () {
        return this._value;
    };
    /**
    * set current type.
    * @function setValue
    * @param {string} value
    */
    this.setValue = function (value) {
        this._value = value;
    };
};

/**
* 5.1.6 CacheControl Type
* The CacheControl structure contains a set of fields needed for the Portlet to
* manage cached markup fragments.
* @type WSRP.CacheControl
* @class WSRP.CacheControl
*/
WSRP.CacheControl = function () {
    'use strict';
    /** @type int */
    this.expires = 0;

    /** @type string */
    this.userScope = "";

    /** @type string */
    this.validateTag = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.7 Templates Type
* The Templates structure contains a set of fields that enable Producer URL
* writing.
* @type WSRP.Templates
* @class WSRP.Templates
*/
WSRP.Templates = function () {
    'use strict';
    /** @type string */
    this.defaultTemplate = "";

    /** @type string */
    this.blockingActionTemplate = "";

    /** @type string */
    this.renderTemplate = "";

    /** @type string */
    this.resourceTemplate = "";

    /** @type string */
    this.secureDefaultTemplate = "";

    /** @type string */
    this.secureBlockingActionTemplate = "";

    /** @type string */
    this.secureRenderTemplate = "";

    /** @type string */
    this.secureResourceTemplate = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.8 CCPPProfileDiff Type
* The CCPPProfileDiff structure holds the information defined by the CC/PP
* (Composite Capability/Preference Profiles) standard for declaring differences
* from the referenced profiles.
* @type WSRP.CCPPProfileDiff
* @class WSRP.CCPPProfileDiff
*/
WSRP.CCPPProfileDiff = function () {
    'use strict';
    /** @type string */
    this.diffName = "";

    /** @type string */
    this.description = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.9 CCPPHeaders Type
* The CCPPHeaders structure holds the information defined by the CC/PP
* standard.
* @type WSRP.CCPPHeaders
* @class WSRP.CCPPHeaders
*/
WSRP.CCPPHeaders = function () {
    'use strict';
    /** @type string */
    this.profile = "";

    /** @type Array(CCPPProfileDiff) */
    this.profileDiffs = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.10 ClientData Type
* The ClientData structure contains information the client supplied to Consumer
* about itself, including user-agent identification and capabilities.
* @type WSRP.ClientData
* @class WSRP.ClientData
*/
WSRP.ClientData = function () {
    'use strict';
    /** @type string */
    this.userAgent = "";

    /** @type CCPPHeaders */
    this.ccppHeaders = new WSRP.CCPPHeaders();

    /** @type string */
    this.requestVerb = "";

    /** @type Array(NamedString) */
    this.clientAttributes = new Clouber.Map();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.11 NamedString Type
* The NamedString type provides a standardized way of carrying a simple
* name/value pair.
* @type WSRP.NamedString
* @class WSRP.NamedString
*/
WSRP.NamedString = function () {
    'use strict';
    /** @type string */
    this.name = "";

    /** @type string */
    this.value = "";

};

/**
* 5.1.12 NavigationalContext Type
* The NavigationalContext type provides a means to carry both the opaque and
* public portions of the Portlet's navigational state.
* @type WSRP.NavigationalContext
* @class WSRP.NavigationalContext
*/
WSRP.NavigationalContext = function () {
    'use strict';
    /** @type string */
    this.opaqueValue = "";

    /** @type Array(NamedString) */
    this.publicValues = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.13 MimeRequest Type
* The MimeRequest structure contains information frequently used to control
* generation of items with varying mime types.
* @type WSRP.MimeRequest
* @class WSRP.MimeRequest
*/
WSRP.MimeRequest = function () {
    'use strict';
    /** @type boolean */
    this.secureClientCommuncation = true;

    /** @type Array(string) */
    this.locales = [];

    /** @type Array(string) */
    this.mimeTypes = [];

    /** @type string */
    this.mode = "";

    /** @type string */
    this.windowState = "";

    /** @type ClientData */
    this.clientData = new WSRP.ClientData();

    /** @type NavigationalContext */
    this.navigationalContext = new WSRP.NavigationalContext();

    /** @type Array(string) */
    this.markupCharacterSets = [];

    /** @type string */
    this.validateTag = "";

    /** @type Array(string) */
    this.validNewModes = [];

    /** @type Array(string) */
    this.validNewWindowStates = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.14 MarkupParams Type
* The schema definition of the MarkupParams structure extends the common
* MimeRequest definition (see [Section 5.1.13]) without any additional fields
* and provides the data needed for the Portlet to generate markup that will
* enable the End-User to visualize the state of the Portlet.
* @extends WSRP.MimeRequest
* @type WSRP.MarkupParams
* @class WSRP.MarkupParams
*/
WSRP.MarkupParams = function () {
    'use strict';

    /** @type string */
    this._type = "MarkupParams";

    /**
    * get current type.
    * @function getType
    * @param {string} code
    */
    this.getType = function () {
        return this._type;
    };
};
Clouber.extend(WSRP.MarkupParams,
    WSRP.MimeRequest);

/**
* 5.1.15 ResourceParams Type
* The schema definition of the ResourceParams structure extends the common
* MimeRequest definition (see [Section 5.1.13]) adding fields specific to
* invoking the getResource operation.
* @extends WSRP.MimeRequest
* @type WSRP.ResourceParams
* @class WSRP.ResourceParams
*/
WSRP.ResourceParams = function () {
    'use strict';
    /** @type ID */
    this.resourceID = new WSRP.ID();

    /** @type StateChange */
    this.portletStateChange = new WSRP.StateChange();

    /** @type string */
    this.resourceState = "";

    /** @type string */
    this.resourceCacheability = "";

    /** @type Array(NamedString) */
    this.formParameters = [];

    /** @type Array(UploadContext) */
    this.uploadContexts = [];
};
Clouber.extend(WSRP.ResourceParams,
    WSRP.MimeRequest);

/**
* 5.1.16 MimeResponse Type
* The MimeResponse structure contains common fields relative to returning an
* item described by a mime type.
* @type WSRP.MimeResponse
* @class WSRP.MimeResponse
*/
WSRP.MimeResponse = function () {
    'use strict';
    /** @type boolean */
    this.useCachedItem = true;

    /** @type string */
    this.mimeType = "";

    /** @type string */
    this.itemString = "";

    /** @type base64Binary */
    this.itemBinary = {};

    /** @type string */
    this.locale = "";

    /** @type boolean */
    this.requiresRewriting = true;

    /** @type CacheControl */
    this.cacheControl = new WSRP.CacheControl();

    /** @type string */
    this.ccppProfileWarning = "";

    /** @type Array(NamedString) */
    this.clientAttributes = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.17 ResourceContext Type
* The schema definition of the ResourceContext structure extends the common
* MimeResponse definition (see [Section 5.1.16]) without any additional fields.
* @extends WSRP.MimeResponse
* @type WSRP.ResourceContext
* @class WSRP.ResourceContext
*/
WSRP.ResourceContext = function () {
    'use strict';

    /** @type string */
    this._type = "ResourceContext";

    /**
    * get current code.
    * @function getValue
    * @return {string}
    */
    this.getValue = function () {
        return this._type;
    };

};
Clouber.extend(WSRP.ResourceContext,
    WSRP.MimeResponse);

/**
* 5.1.18 ResourceResponse Type
* The ResourceResponse structure contains fields for returning various
* items in response to a getResource invocation.
* @type WSRP.ResourceResponse
* @class WSRP.ResourceResponse
*/
WSRP.ResourceResponse = function () {
    'use strict';
    /** @type ResourceContext */
    this.resourceContext = new WSRP.ResourceContext();

    /** @type SessionContext */
    this.sessionContext = new WSRP.SessionContext();

    /** @type PortletContext */
    this.portletContext = new WSRP.PortletContext();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.19 MarkupContext Type
* The schema definition of the MarkupContext structure extends the common
* MimeResponse definition (see [Section 5.1.16]), adding fields relative to
* returning a Portlet's markup.
* @extends WSRP.MimeResponse
* @type WSRP.MarkupContext
* @class WSRP.MarkupContext
*/
WSRP.MarkupContext = function () {
    'use strict';
    /** @type string */
    this.preferredTitle = "";

    /** @type Array(string) */
    this.validNewModes = [];
};
Clouber.extend(WSRP.MarkupContext,
    WSRP.MimeResponse);


/**
* 5.1.20 MarkupResponse Type
* The MarkupResponse structure contains fields for returning various items in
* response to a getMarkup invocation.
* @type WSRP.MarkupResponse
* @class WSRP.MarkupResponse
*/
WSRP.MarkupResponse = function () {
    'use strict';
    /** @type MarkupContext */
    this.markupContext = new WSRP.MarkupContext();

    /** @type SessionContext */
    this.sessionContext = new WSRP.SessionContext();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.21 EventPayload Type
* The EventPayload structure provides a wrapper for the data carried by an
* event.
* @type WSRP.EventPayload
* @class WSRP.EventPayload
*/
WSRP.EventPayload = function () {
    'use strict';
    /** @type Object */
    this.any = {};
};

/**
* 5.1.22 Event Type
* The Event structure provides the references back to the QName and payload
* datatype provided by the EventDescription.
* @type WSRP.Event
* @class WSRP.Event
*/
WSRP.Event = function () {
    'use strict';
    /** @type QName */
    this.name = "";

    /** @type QName */
    this.type = "";

    /** @type EventPayload */
    this.payload = new WSRP.EventPayload();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.23 UpdateResponse Type
* The UpdateResponse structure contains the items normally returned by
* performBlockingInteraction or handleEvents.
* @type WSRP.UpdateResponse
* @class WSRP.UpdateResponse
*/
WSRP.UpdateResponse = function () {
    'use strict';
    /** @type SessionContext */
    this.sessionContext = new WSRP.SessionContext();

    /** @type PortletContext */
    this.portletContext = new WSRP.PortletContext();

    /** @type MarkupContext */
    this.markupContext = new WSRP.MarkupContext();

    /** @type Array(Event) */
    this.events = [];

    /** @type NavigationalContext */
    this.navigationalContext = new WSRP.NavigationalContext();

    /** @type string */
    this.newWindowState = "";

    /** @type string */
    this.newMode = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.24 BlockingInteractionResponse Type
* The BlockingInteractionResponse structure contains the various items
* performBlockingInteraction can return.
* @type WSRP.BlockingInteractionResponse
* @class WSRP.BlockingInteractionResponse
*/
WSRP.BlockingInteractionResponse = function () {
    'use strict';
    /** @type UpdateResponse */
    this.updateResponse = new WSRP.UpdateResponse();

    /** @type string */
    this.redirectURL = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.25 ErrorCodes
* The following is an enumerated set of QNames (the wsrp: prefix refers to the
* URI "urn:oasis:names:tc:wsrp:v2:types") defined as ErrorCodes by this
* specification for use in HandleEventsFailed, FailedPortlets and
* ImportPortletsFailed types.
* @type WSRP.ErrorCodes
* @class WSRP.ErrorCodes
*/
WSRP.ErrorCodes = function () {
    'use strict';
    /** @type string} AccessDenied Required access to the specified item
    * was denied.
    */
    this.AccessDenied = "wsrp:AccessDenied";

    /** @type string} ExportNoLongerValidAn importPortlets operation
    * referenced an exported item that is no longer available.
    */
    this.ExportNoLongerValid = "wsrp:ExportNoLongerValid";

    /** @type string} InconsistentParameters The supplied parameters do not
    * provide a consistent set of references.
    */
    this.InconsistentParameters = "wsrp:InconsistentParameters";

    /** @type string} InvalidRegistration The supplied registrationHandle
    * is invalid.*/
    this.InvalidRegistration = "wsrp:InvalidRegistration";

    /** @type string} InvalidCookie A supplied cookie was invalid for the
    * referenced items. The Consumer can try a recovery process as would be
    * used if the equivalent fault had been returned.
    */
    this.InvalidCookie = "wsrp:InvalidCookie";

    /** @type string} InvalidHandle The supplied portletHandle is not valid
    * for the operation.
    */
    this.InvalidHandle = "wsrp:InvalidHandle";

    /** @type string} InvalidSession The supplied session is no longer
    * valid. The Consumer can try a recovery process as would be used if the
    * equivalent fault had been returned.
    */
    this.InvalidSession = "wsrp:InvalidSession";

    /** @type string} InvalidUserCategory The supplied userCategory is not
    * allowed to perform the requested action on the referenced items.
    */
    this.InvalidUserCategory = "wsrp:InvalidUserCategory";

    /** @type string} ModifyRegistrationRequired The supplied
    * registrationHandle has been suspended pending appropriate changes from a
    * modifyRegistration request.
    */
    this.ModifyRegistrationRequired = "wsrp:ModifyRegistrationRequired";

    /** @type string} MissingParameters The request did not supply the full
    * set of parameters required to perform the processing on the referenced
    * items.
    */
    this.MissingParameters = "wsrp:MissingParameters";

    /** @type string} OperationFailed An attempt to process the request
    * resulted in a failure. Whether or not a retry would likely succeed is
    * unknown.
    */
    this.OperationFailed = "wsrp:OperationFailed";

    /** @type string OperationNotSupported The requested operation can not
    * be performed on the referenced items.
    */
    this.OperationNotSupported = "wsrp:OperationNotSupported";

    /** @type string} ResourceSuspended The requested operation can not be
    * performed as the referenced resources have been suspended.
    */
    this.ResourceSuspended = "wsrp:ResourceSuspended";

    /** @type string TooBusy The Producer has too many other processing
    * needs to attend to the request at this time.
    */
    this.TooBusy = "wsrp:TooBusy";

    /** @type string} TooManyRequested The request has taken all of the
    * processing time the Producer is willing to allow.
    */
    this.TooManyRequested = "wsrp:TooManyRequested";

    /**
    * get current code.
    * @function getValue
    * @return {string}
    */
    this.getValue = function () {
        return this._value;
    };

    /**
    * set current code.
    * @function setValue
    * @param {string} code
    */
    this.setValue = function (code) {
        this._value = code;
    };
};

/**
* 5.1.26 HandleEventsFailed Type
* The HandleEventsFailed structure contains the 0-based index of an event in
* the incoming events array that could not be processed fully by the Producer,
* and the reason for failure.
* @type WSRP.HandleEventsFailed
* @class WSRP.HandleEventsFailed
*/
WSRP.HandleEventsFailed = function () {
    'use strict';
    /** @type Array(int) */
    this.index = [];

    /** @type ErrorCodes */
    this.errorCode = new WSRP.ErrorCodes();

    /** @type LocalizedString */
    this.reason = new WSRP.LocalizedString();

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.27 HandleEventsResponse Type
* The HandleEventsResponse structure contains the various items handleEvents
* can return.
* @type WSRP.HandleEventsResponse
* @class WSRP.HandleEventsResponse
*/
WSRP.HandleEventsResponse = function () {
    'use strict';
    /** @type UpdateResponse */
    this.updateResponse = new WSRP.UpdateResponse();

    /** @type Array(HandleEventsFailed) */
    this.failedEvents = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.28 StateChange Type
* This type is a restriction on the string type that is constrained to the
* values "readWrite", "cloneBeforeWrite" or "readOnly", the meanings of which
* are explained in [Section 5.4.3].
* @type WSRP.StateChange
* @class WSRP.StateChange
*/
WSRP.StateChange = function () {
    'use strict';
    /** @type string */
    this.readWrite = "readWrite";

    /** @type string */
    this.cloneBeforeWrite = "cloneBeforeWrite";

    /** @type string */
    this.readOnly = "readOnly";

    /**
    * get current code.
    * @function getValue
    * @return {string}
    */
    this.getValue = function () {
        return this._value;
    };

    /**
    * set current code.
    * @function setValue
    * @param {string} code
    */
    this.setValue = function (code) {
        this._value = code;
    };
};

/**
* 5.1.29 UploadContext Type
* The UploadContext structure contains fields specific to uploading data to the
* Portlet.
* @type WSRP.UploadContext
* @class WSRP.UploadContext
*/
WSRP.UploadContext = function () {
    'use strict';
    /** @type string */
    this.mimeType = "";

    /** @type base64Binary */
    this.uploadData = {};

    /** @type Array(NamedString) */
    this.mimeAttributes = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.30 InteractionParams Type
* The InteractionParams structure contains fields specific to invoking the
* performBlockingInteraction operation.
* @type WSRP.InteractionParams
* @class WSRP.InteractionParams
*/
WSRP.InteractionParams = function () {
    'use strict';
    /** @type StateChange */
    this.portletStateChange = new WSRP.StateChange();

    /** @type string */
    this.interactionState = "";

    /** @type Array(NamedString) */
    this.formParameters = [];

    /** @type Array(UploadContext) */
    this.uploadContexts = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.31 EventParams Type
* The EventParams structure contains fields specific to invoking the
* handleEvents operation.
* @type WSRP.EventParams
* @class WSRP.EventParams
*/
WSRP.EventParams = function () {
    'use strict';
    /** @type StateChange */
    this.portletStateChange = new WSRP.StateChange();

    /** @type Array(Event) */
    this.events = [];

    /** @type Extension */
    this.extensions = [];
};

/**
* 5.1.32 User Profile Types
* The UserProfile structure is used to carry information about the End-User.
* The Portlet uses the userProfileItems in its metadata to describe the fields
* it uses to generate markup from this set and any others the Consumer
* indicated were available when it registered.
* @type WSRP.UserProfile
* @class WSRP.UserProfile
*/
WSRP.UserProfile = function () {
    'use strict';
    /** @type PersonName */
    this.name = new WSRP.PersonName();

    /** @type dateTime */
    this.bdate = new Date();

    /** @type string */
    this.gender = "";

    /** @type EmployerInfo */
    this.employerInfo = new WSRP.EmployerInfo();

    /** @type Contact */
    this.homeInfo = new WSRP.Contact();

    /** @type Contact */
    this.businessInfo = new WSRP.Contact();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.32.1 PersonName Type
* The PersonName structure carries the detailed fields for the parts of an
* End-User's name.
* @type WSRP.PersonName
* @class WSRP.PersonName
*/
WSRP.PersonName = function () {
    'use strict';
    /** @type string */
    this.prefix = "";

    /** @type string */
    this.given = "";

    /** @type string */
    this.family = "";

    /** @type string */
    this.middle = "";

    /** @type string */
    this.suffix = "";

    /** @type string */
    this.nickname = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.32.2 EmployerInfo Type
* The EmployerInfo structure contains the detailed fields concerning the
* End-User's employer.
* @type WSRP.EmployerInfo
* @class WSRP.EmployerInfo
*/
WSRP.EmployerInfo = function () {
    'use strict';
    /** @type string */
    this.employer = "";

    /** @type string */
    this.department = "";

    /** @type string */
    this.jobtitle = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.32.3 TelephoneNum Type
* The TelephoneNum structure is used to describe the subfields of a phone
* number.
* @type WSRP.TelephoneNum
* @class WSRP.TelephoneNum
*/
WSRP.TelephoneNum = function () {
    'use strict';
    /** @type string */
    this.intcode = "";

    /** @type string */
    this.loccode = "";

    /** @type string */
    this.number = "";

    /** @type string */
    this.ext = "";

    /** @type string */
    this.comment = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.32.4 Telecom Type
* The Telecom structure is used to describe the various phone contact
* information.
* @type WSRP.Telecom
* @class WSRP.Telecom
*/
WSRP.Telecom = function () {
    'use strict';
    /** @type TelephoneNum */
    this.telephone = new WSRP.TelephoneNum();

    /** @type TelephoneNum */
    this.fax = new WSRP.TelephoneNum();

    /** @type TelephoneNum */
    this.mobile = new WSRP.TelephoneNum();

    /** @type TelephoneNum */
    this.pager = new WSRP.TelephoneNum();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.32.5 Online Type
* The Online structure is used to describe various types of web-oriented
* contact information.
* @type WSRP.Online
* @class WSRP.Online
*/
WSRP.Online = function () {
    'use strict';
    /** @type string */
    this.email = "";

    /** @type string */
    this.uri = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.32.6 Postal Type
* The Postal structure carries the detailed fields describing a particular
* address.
* @type WSRP.Postal
* @class WSRP.Postal
*/
WSRP.Postal = function () {
    'use strict';
    /** @type string */
    this.name = "";

    /** @type string */
    this.street = "";

    /** @type string */
    this.city = "";

    /** @type string */
    this.stateprov = "";

    /** @type string */
    this.postalcode = "";

    /** @type string */
    this.country = "";

    /** @type string */
    this.organization = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.32.7 Contact Type
* The Contact structure is used to describe a location for the End-User.
* @type WSRP.Contact
* @class WSRP.Contact
*/
WSRP.Contact = function () {
    'use strict';
    /** @type Postal */
    this.postal = new WSRP.Postal();

    /** @type Telecom */
    this.telecom = new WSRP.Telecom();

    /** @type Online */
    this.online = new WSRP.Online();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.33 UserContext Type
* The UserContext structure supplies End-User specific data to operations. Note
* that this does not carry user credentials (e.g. userID / password) as quite
* flexible mechanisms for communicating this information are being defined
* elsewhere (e.g. WS-Security defines how to carry User Information in a SOAP
* header). There are several use cases for the application-level information
* carried in this structure, particularly in the absence of authenticated
* security-level information, namely; logging of remote invocations,
* interoperable assertions of unauthenticated information, personalization of
* the user experience, etc.
* @type WSRP.UserContext
* @class WSRP.UserContext
*/
WSRP.UserContext = function () {
    'use strict';
    /** @type Key */
    this.userContextKey = new WSRP.Key();

    /** @type Array(string) */
    this.userCategories = [];

    /** @type UserProfile */
    this.profile = new WSRP.UserProfile();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 6.1.1 RegistrationData Type
* The RegistrationData structure provides the means for the Consumer to supply
* the data required for registration with a Producer as well as protocol
* extensions that it supports [R355] [R356].
* @type WSRP.RegistrationData
* @class WSRP.RegistrationData
*/
WSRP.RegistrationData = function () {
    'use strict';
    /** @type string */
    this.consumerName = "";

    /** @type string */
    this.consumerAgent = "";

    /** @type boolean */
    this.methodGetSupported = true;

    /** @type Array(string) */
    this.consumerModes = [];

    /** @type Array(string) */
    this.consumerWindowStates = [];

    /** @type Array(string) */
    this.consumerUserScopes = [];

    /** @type Array(ExtensionDescription) */
    this.extensionDescriptions = [];

    /** @type Array(Property) */
    this.registrationProperties = [];

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.1 FailedPortlets Type
* The FailedPortlets structure contains a set of portletHandles which failed to
* be processed for the same reason and the reason for the failure.
* @type WSRP.FailedPortlets
* @class WSRP.FailedPortlets
*/
WSRP.FailedPortlets = function () {
    'use strict';
    /** @type Array(Handle) */
    this.portletHandles = [];

    /** @type ErrorCodes */
    this.errorCode = new WSRP.ErrorCodes();

    /** @type LocalizedString */
    this.reason = new WSRP.LocalizedString();

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Extension() */
    this.extensions = [];
};

/**
* 7.1.2 DestroyPortletsResponse Type
* The DestroyPortletsResponse structure carries an array of failed destroys.
* @type WSRP.DestroyPortletsResponse
* @class WSRP.DestroyPortletsResponse
*/
WSRP.DestroyPortletsResponse = function () {
    'use strict';
    /** @type Array(FailedPortlets) */
    this.failedPortlets = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.3 PortletDescriptionResponse Type
* The PortletDescriptionResponse structure contains the fields that
* getPortletDescription can return.
* @type WSRP.PortletDescriptionResponse
* @class WSRP.PortletDescriptionResponse
*/
WSRP.PortletDescriptionResponse = function () {
    'use strict';
    /** @type PortletDescription */
    this.portletDescription = new WSRP.PortletDescription();

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.4 PortletPropertyDescriptionResponse Type
* The PortletPropertyDescriptionResponse structure contains the fields that
* getPortletPropertyDescription can return.
* @type WSRP.PortletPropertyDescriptionResponse
* @class WSRP.PortletPropertyDescriptionResponse
*/
WSRP.PortletPropertyDescriptionResponse = function () {
    'use strict';
    /** @type ModelDescription */
    this.modelDescription = new WSRP.ModelDescription();

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.5 CopiedPortlet Type
* The CopiedPortlet structure provides the Consumer with the details for a
* Portlet the copyPortlets operation has generated.
* @type WSRP.CopiedPortlet
* @class WSRP.CopiedPortlet
*/
WSRP.CopiedPortlet = function () {
    'use strict';
    /** @type Handle */
    this.fromPortletHandle = new WSRP.Handle();

    /** @type PortletContext */
    this.newPortletContext = new WSRP.PortletContext();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.6 CopyPortletsResponse Type
* The CopyPortletsResponse structure contains the fields that copyPortlets can
* return.
* @type WSRP.CopyPortletsResponse
* @class WSRP.CopyPortletsResponse
*/
WSRP.CopyPortletsResponse = function () {
    'use strict';
    /** @type Array(CopiedPortlet) */
    this.copiedPortlets = [];

    /** @type Array(FailedPortlets) */
    this.failedPortlets = [];

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.7 ExportedPortlet Type
* The ExportedPortlet structure represents a single exported Portlet.
* @type WSRP.ExportedPortlet
* @class WSRP.ExportedPortlet
*/
WSRP.ExportedPortlet = function () {
    'use strict';
    /** @type Handle */
    this.portletHandle = new WSRP.Handle();

    /** @type base64Binary */
    this.exportData = {};

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.8 ExportPortletsResponse Type
* The ExportPortletsResponse structure contains the fields that exportPortlets
* can return. The exportPortlets operation can export many Portlets in a single
* invocation and this structure represents the bulk response.
* @type WSRP.ExportPortletsResponse
* @class WSRP.ExportPortletsResponse
*/
WSRP.ExportPortletsResponse = function () {
    'use strict';
    /** @type base64Binary */
    this.exportContext = {};

    /** @type Array(ExportedPortlet) */
    this.exportedPortlets = [];

    /** @type Array(FailedPortlets) */
    this.failedPortlets = [];

    /** @type Lifetime */
    this.lifetime = new WSRP.Lifetime();

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.9 ImportPortlet Type
* The ImportPortlet structure represents a single exported Portlet
* representation which the Consumer wishes to import.
* @type WSRP.ImportPortlet
* @class WSRP.ImportPortlet
*/
WSRP.ImportPortlet = function () {
    'use strict';
    /** @type ID */
    this.importID = new WSRP.ID();

    /** @type base64Binary */
    this.exportData = {};

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.10 ImportedPortlet Type
* The ImportedPortlet structure represents a single response for the import of
* a Portlet representation.
* @type WSRP.ImportedPortlet
* @class WSRP.ImportedPortlet
*/
WSRP.ImportedPortlet = function () {
    'use strict';
    /** @type ID */
    this.importID = new WSRP.ID();

    /** @type PortletContext */
    this.newPortletContext = new WSRP.PortletContext();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.11 ImportPortletsFailed Type
* The ImportPortletsFailed structure provides the Consumer with the details for
* a set of Portlets the importPortlets operation failed to process into
* reconstituted Portlets.
* @type WSRP.ImportPortletsFailed
* @class WSRP.ImportPortletsFailed
*/
WSRP.ImportPortletsFailed = function () {
    'use strict';
    /** @type Array(ID) */
    this.importIDs = [];

    /** @type ErrorCodes */
    this.errorCode = new WSRP.ErrorCodes();

    /** @type LocalizedString */
    this.reason = new WSRP.LocalizedString();

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 7.1.12 ImportPortletsResponse Type
* The ImportPortletsResponse structure contains the fields that importPortlets
* can return.
* @type WSRP.ImportPortletsResponse
* @class WSRP.ImportPortletsResponse
*/
WSRP.ImportPortletsResponse = function () {
    'use strict';
    /** @type Array(ImportedPortlet) */
    this.importedPortlets = [];

    /** @type Array(ImportPortletsFailed) */
    this.importFailed = [];

    /** @type ResourceList */
    this.resourceList = new WSRP.ResourceList();

    /** @type Array(Extension) */
    this.extensions = [];
};

