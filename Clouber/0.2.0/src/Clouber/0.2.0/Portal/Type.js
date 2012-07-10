/**
* @fileOverview Clouber Portlet interfaces' declaration, refer to WSPR 2.0.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @requires Clouber.* Clouber.Core.* Clouber.Sys.Portlet.*
*/

Clouber.namespace("Clouber.Portal.T.");

/**
* 4.1.2 Handle Type
* Handles are opaque references that are passed between the Consumer and
* Producer.
* @type Clouber.Portal.T.Handle
* @class Clouber.Portal.T.Handle
*/
Clouber.Portal.T.Handle = function () {
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
* @type Clouber.Portal.T.Key
* @class Clouber.Portal.T.Key
*/
Clouber.Portal.T.Key = function () {
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
* @type Clouber.Portal.T.ID
* @class Clouber.Portal.T.ID
*/
Clouber.Portal.T.ID = function () {
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
* @type Clouber.Portal.T.LocalizedString
* @class Clouber.Portal.T.LocalizedString
*/
Clouber.Portal.T.LocalizedString = function () {
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
* 4.1.8 ResourceList Type
* This is an array of Resource structure, each of which carries the values for
* a localized resource in various locales.
* @type Clouber.Portal.T.ResourceList
* @class Clouber.Portal.T.ResourceList
*/
Clouber.Portal.T.ResourceList = function () {
    'use strict';
    /**
    * Each member of this array provides the localized values for a resource.
    * @type array(Resource)
    */
    this.resources = [];

    /**
    * The extensions field MAY be used to extend this structure. Extension
    * elements MUST be from namespaces other than Clouber.Portal.T.
    *  @type array(Extension)
    */
    this.extensions = [];
};

/**
* 4.1.13 ModelTypes Type
* The ModelTypes structure contains the payload mechanism for declaring the
* types referenced by the description types.
* @type Clouber.Portal.T.ModelTypes
* @class Clouber.Portal.T.ModelTypes
*/
Clouber.Portal.T.ModelTypes = function () {
    'use strict';
    /** @type array(Object) */
    this.any = [];
};

/**
* 4.1.14 ModelDescription Type
* The set of properties of a Portlet are described in its metadata using the
* following structure.
* @type Clouber.Portal.T.ModelDescription
* @class Clouber.Portal.T.ModelDescription
*/
Clouber.Portal.T.ModelDescription = function () {
    'use strict';
    /** @type array(PropertyDescription) */
    this.propertyDescriptions = [];

    /** @type ModelTypes */
    this.modelTypes = new Clouber.Portal.T.ModelTypes();

    /** @type array(Extension) */
    this.extensions = [];
};

/**
* 4.1.16 PortletDescription Type
* The PortletDescription structure contains a set of fields that provide the
* metadata to describe the Portlet as well as any clones of the Portlet.
* @type Clouber.Portal.T.PortletDescription
* @class Clouber.Portal.T.PortletDescription
*/
Clouber.Portal.T.PortletDescription = function () {
    'use strict';
    /** @type Handle */
    this.portletHandle = new Clouber.Portal.T.Handle();

    /** @type array(MarkupType) */
    this.markupTypes = [];

    /** @type ID */
    this.groupID = new Clouber.Portal.T.ID();

    /** @type LocalizedString */
    this.description = new Clouber.Portal.T.LocalizedString();

    /** @type LocalizedString */
    this.shortTitle = new Clouber.Portal.T.LocalizedString();

    /** @type LocalizedString */
    this.title = new Clouber.Portal.T.LocalizedString();

    /** @type LocalizedString */
    this.displayName = new Clouber.Portal.T.LocalizedString();

    /** @type array(LocalizedString) */
    this.keywords = [];

    /** @type ID */
    this.portletID = new Clouber.Portal.T.ID();

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
Clouber.extend(Clouber.Portal.T.PortletDescription, Clouber.Core.BaseObject);

/**
* 4.1.20 CookieProtocol Type
* This type is a restriction on the string type that is constrained to the
* values "none", "perUser" or "perGroup".
* @type Clouber.Portal.T.CookieProtocol
* @class Clouber.Portal.T.CookieProtocol
*/
Clouber.Portal.T.CookieProtocol = function () {
    'use strict';
    /** @type string */
    this.none = "none";

    /** @type string */
    this.perUser = "perUser";

    /** @type string */
    this.perGroup = "perGroup";
};

/**
* 4.1.23 ExportDescription Type
* The ExportDescription structure contains a set of fields for describing
* export capabilities and restrictions.
* @type Clouber.Portal.T.ExportDescription
* @class Clouber.Portal.T.ExportDescription
*/
Clouber.Portal.T.ExportDescription = function () {
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
* @type Clouber.Portal.T.ServiceDescription
* @class Clouber.Portal.T.ServiceDescription
*/
Clouber.Portal.T.ServiceDescription = function () {
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
    this.requiresInitCookie = new Clouber.Portal.T.CookieProtocol();

    /** @type ModelDescription */
    this.registrationPropertyDescription =
        new Clouber.Portal.T.ModelDescription();

    /** @type Array(string) */
    this.locales = [];

    /** @type ResourceList */
    this.resourceList = new Clouber.Portal.T.ResourceList();

    /** @type Array(EventDescription) */
    this.eventDescriptions = [];

    /** @type ModelTypes */
    this.schemaType = new Clouber.Portal.T.ModelTypes();

    /** @type Array(string) */
    this.supportedOptions = [];

    /** @type ExportDescription */
    this.exportDescription = new Clouber.Portal.T.ExportDescription();

    /** @type boolean */
    this.mayReturnRegistrationState = true;

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 4.1.25 Lifetime Type
* The Lifetime structure provides information regarding when a particular item
* is scheduled to be expunged.
* @type Clouber.Portal.T.Lifetime
* @class Clouber.Portal.T.Lifetime
*/
Clouber.Portal.T.Lifetime = function () {
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
* 4.1.27 RegistrationContext Type
* The RegistrationContext structure contains fields related to a particular
* registration of a Consumer with a Producer. It is returned by the register
* operation and is a required parameter on most other operations.
* @type RegistrationContext
* @class RegistrationContext
*/
Clouber.Portal.T.RegistrationContext = function () {
    'use strict';
    /**
    * registrationHandle
    * @type Handle
    */
    this.registrationHandle = new Clouber.Portal.T.Handle();

    /**
    * registrationState
    * @type base64Binary
    */
    this.registrationState = {};

    /**
    * scheduledDestruction
    * @type Lifetime
    */
    this.scheduledDestruction = new Clouber.Portal.T.Lifetime();

    /**
    * @type Array(Extension)
    */
    this.extensions = [];
};

/**
* 5.1.1 SessionContext Type
* The SessionContext structure contains the ID and expires information the
* Consumer needs to refer to the session in subsequent invocations.
* @type Clouber.Portal.T.SessionContext
* @class Clouber.Portal.T.SessionContext
*/
Clouber.Portal.T.SessionContext = function () {
    'use strict';
    /** @type ID */
    this.sessionID = new Clouber.Portal.T.ID();

    /** @type int */
    this.expires = 0;

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.4 PortletContext Type
* The PortletContext structure is used as a parameter on many operations to
* supply the Portlet information that was returned to the Consumer.
* @type Clouber.Portal.T.PortletContext
* @class Clouber.Portal.T.PortletContext
*/
Clouber.Portal.T.PortletContext = function () {
    'use strict';
    /** @type Handle */
    this.portletHandle = new Clouber.Portal.T.Handle();

    /** @type base64Binary */
    this.portletState = {};

    /** @type Lifetime */
    this.scheduledDestruction = new Clouber.Portal.T.Lifetime();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.6 CacheControl Type
* The CacheControl structure contains a set of fields needed for the Portlet to
* manage cached markup fragments.
* @type Clouber.Portal.T.CacheControl
* @class Clouber.Portal.T.CacheControl
*/
Clouber.Portal.T.CacheControl = function () {
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
* 5.1.9 CCPPHeaders Type
* The CCPPHeaders structure holds the information defined by the CC/PP
* standard.
* @type Clouber.Portal.T.CCPPHeaders
* @class Clouber.Portal.T.CCPPHeaders
*/
Clouber.Portal.T.CCPPHeaders = function () {
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
* @type Clouber.Portal.T.ClientData
* @class Clouber.Portal.T.ClientData
*/
Clouber.Portal.T.ClientData = function () {
    'use strict';
    /** @type string */
    this.userAgent = "";

    /** @type CCPPHeaders */
    this.ccppHeaders = new Clouber.Portal.T.CCPPHeaders();

    /** @type string */
    this.requestVerb = "";

    /** @type Array(NamedString) */
    this.clientAttributes = new Clouber.Core.Map();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.12 NavigationalContext Type
* The NavigationalContext type provides a means to carry both the opaque and
* public portions of the Portlet's navigational state.
* @type Clouber.Portal.T.NavigationalContext
* @class Clouber.Portal.T.NavigationalContext
*/
Clouber.Portal.T.NavigationalContext = function () {
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
* @type Clouber.Portal.T.MimeRequest
* @class Clouber.Portal.T.MimeRequest
*/
Clouber.Portal.T.MimeRequest = function () {
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
    this.clientData = new Clouber.Portal.T.ClientData();

    /** @type NavigationalContext */
    this.navigationalContext = new Clouber.Portal.T.NavigationalContext();

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
* @extends Clouber.Portal.T.MimeRequest
* @type Clouber.Portal.T.MarkupParams
* @class Clouber.Portal.T.MarkupParams
*/
Clouber.Portal.T.MarkupParams = function () {
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
Clouber.extend(Clouber.Portal.T.MarkupParams,
    Clouber.Portal.T.MimeRequest);

/**
* 5.1.16 MimeResponse Type
* The MimeResponse structure contains common fields relative to returning an
* item described by a mime type.
* @type Clouber.Portal.T.MimeResponse
* @class Clouber.Portal.T.MimeResponse
*/
Clouber.Portal.T.MimeResponse = function () {
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
    this.cacheControl = new Clouber.Portal.T.CacheControl();

    /** @type string */
    this.ccppProfileWarning = "";

    /** @type Array(NamedString) */
    this.clientAttributes = [];

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.19 MarkupContext Type
* The schema definition of the MarkupContext structure extends the common
* MimeResponse definition (see [Section 5.1.16]), adding fields relative to
* returning a Portlet's markup.
* @extends Clouber.Portal.T.MimeResponse
* @type Clouber.Portal.T.MarkupContext
* @class Clouber.Portal.T.MarkupContext
*/
Clouber.Portal.T.MarkupContext = function () {
    'use strict';
    /** @type string */
    this.preferredTitle = "";

    /** @type Array(string) */
    this.validNewModes = [];
};
Clouber.extend(Clouber.Portal.T.MarkupContext,
    Clouber.Portal.T.MimeResponse);

/**
* 5.1.20 MarkupResponse Type
* The MarkupResponse structure contains fields for returning various items in
* response to a getMarkup invocation.
* @type Clouber.Portal.T.MarkupResponse
* @class Clouber.Portal.T.MarkupResponse
*/
Clouber.Portal.T.MarkupResponse = function () {
    'use strict';
    /** @type MarkupContext */
    this.markupContext = new Clouber.Portal.T.MarkupContext();

    /** @type SessionContext */
    this.sessionContext = new Clouber.Portal.T.SessionContext();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.23 UpdateResponse Type
* The UpdateResponse structure contains the items normally returned by
* performBlockingInteraction or handleEvents.
* @type Clouber.Portal.T.UpdateResponse
* @class Clouber.Portal.T.UpdateResponse
*/
Clouber.Portal.T.UpdateResponse = function () {
    'use strict';
    /** @type SessionContext */
    this.sessionContext = new Clouber.Portal.T.SessionContext();

    /** @type PortletContext */
    this.portletContext = new Clouber.Portal.T.PortletContext();

    /** @type MarkupContext */
    this.markupContext = new Clouber.Portal.T.MarkupContext();

    /** @type Array(Event) */
    this.events = [];

    /** @type NavigationalContext */
    this.navigationalContext = new Clouber.Portal.T.NavigationalContext();

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
* @type Clouber.Portal.T.BlockingInteractionResponse
* @class Clouber.Portal.T.BlockingInteractionResponse
*/
Clouber.Portal.T.BlockingInteractionResponse = function () {
    'use strict';
    /** @type UpdateResponse */
    this.updateResponse = new Clouber.Portal.T.UpdateResponse();

    /** @type string */
    this.redirectURL = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.27 HandleEventsResponse Type
* The HandleEventsResponse structure contains the various items handleEvents
* can return.
* @type Clouber.Portal.T.HandleEventsResponse
* @class Clouber.Portal.T.HandleEventsResponse
*/
Clouber.Portal.T.HandleEventsResponse = function () {
    'use strict';
    /** @type UpdateResponse */
    this.updateResponse = new Clouber.Portal.T.UpdateResponse();

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
* @type Clouber.Portal.T.StateChange
* @class Clouber.Portal.T.StateChange
*/
Clouber.Portal.T.StateChange = function () {
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
* 5.1.30 InteractionParams Type
* The InteractionParams structure contains fields specific to invoking the
* performBlockingInteraction operation.
* @type Clouber.Portal.T.InteractionParams
* @class Clouber.Portal.T.InteractionParams
*/
Clouber.Portal.T.InteractionParams = function () {
    'use strict';
    /** @type StateChange */
    this.portletStateChange = new Clouber.Portal.T.StateChange();

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
* @type Clouber.Portal.T.EventParams
* @class Clouber.Portal.T.EventParams
*/
Clouber.Portal.T.EventParams = function () {
    'use strict';
    /** @type StateChange */
    this.portletStateChange = new Clouber.Portal.T.StateChange();

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
* @type Clouber.Portal.T.UserProfile
* @class Clouber.Portal.T.UserProfile
*/
Clouber.Portal.T.UserProfile = function () {
    'use strict';
    /** @type PersonName */
    this.name = new Clouber.Portal.T.PersonName();

    /** @type dateTime */
    this.bdate = new Date();

    /** @type string */
    this.gender = "";

    /** @type EmployerInfo */
    this.employerInfo = new Clouber.Portal.T.EmployerInfo();

    /** @type Contact */
    this.homeInfo = new Clouber.Portal.T.Contact();

    /** @type Contact */
    this.businessInfo = new Clouber.Portal.T.Contact();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.32.1 PersonName Type
* The PersonName structure carries the detailed fields for the parts of an
* End-User's name.
* @type Clouber.Portal.T.PersonName
* @class Clouber.Portal.T.PersonName
*/
Clouber.Portal.T.PersonName = function () {
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
* @type Clouber.Portal.T.EmployerInfo
* @class Clouber.Portal.T.EmployerInfo
*/
Clouber.Portal.T.EmployerInfo = function () {
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
* @type Clouber.Portal.T.TelephoneNum
* @class Clouber.Portal.T.TelephoneNum
*/
Clouber.Portal.T.TelephoneNum = function () {
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
* @type Clouber.Portal.T.Telecom
* @class Clouber.Portal.T.Telecom
*/
Clouber.Portal.T.Telecom = function () {
    'use strict';
    /** @type TelephoneNum */
    this.telephone = new Clouber.Portal.T.TelephoneNum();

    /** @type TelephoneNum */
    this.fax = new Clouber.Portal.T.TelephoneNum();

    /** @type TelephoneNum */
    this.mobile = new Clouber.Portal.T.TelephoneNum();

    /** @type TelephoneNum */
    this.pager = new Clouber.Portal.T.TelephoneNum();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.32.5 Online Type
* The Online structure is used to describe various types of web-oriented
* contact information.
* @type Clouber.Portal.T.Online
* @class Clouber.Portal.T.Online
*/
Clouber.Portal.T.Online = function () {
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
* @type Clouber.Portal.T.Postal
* @class Clouber.Portal.T.Postal
*/
Clouber.Portal.T.Postal = function () {
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
* @type Clouber.Portal.T.Contact
* @class Clouber.Portal.T.Contact
*/
Clouber.Portal.T.Contact = function () {
    'use strict';
    /** @type Postal */
    this.postal = new Clouber.Portal.T.Postal();

    /** @type Telecom */
    this.telecom = new Clouber.Portal.T.Telecom();

    /** @type Online */
    this.online = new Clouber.Portal.T.Online();

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
* @type Clouber.Portal.T.UserContext
* @class Clouber.Portal.T.UserContext
*/
Clouber.Portal.T.UserContext = function () {
    'use strict';
    /** @type Key */
    this.userContextKey = new Clouber.Portal.T.Key();

    /** @type Array(string) */
    this.userCategories = [];

    /** @type UserProfile */
    this.profile = new Clouber.Portal.T.UserProfile();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 6.1.1 RegistrationData Type
* The RegistrationData structure provides the means for the Consumer to supply
* the data required for registration with a Producer as well as protocol
* extensions that it supports [R355] [R356].
* @type Clouber.Portal.T.RegistrationData
* @class Clouber.Portal.T.RegistrationData
*/
Clouber.Portal.T.RegistrationData = function () {
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
    this.resourceList = new Clouber.Portal.T.ResourceList();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.2 SessionParams Type
* The SessionParams structure contains the session information the Consumer is
* supplying to the Portlet for connection to a Portlet session.
* @type Clouber.Portal.T.SessionParams
* @class Clouber.Portal.T.SessionParams
*/
Clouber.Portal.T.SessionParams = function () {
    'use strict';
    /** @type ID */
    this.sessionID = new Clouber.Portal.T.ID();

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.3 RuntimeContext Type
* The RuntimeContext structure defines a collection of fields used only in
* transient interactions between the Producer and Consumer.
* @type Clouber.Portal.T.RuntimeContext
* @class Clouber.Portal.T.RuntimeContext
*/
Clouber.Portal.T.RuntimeContext = function () {
    'use strict';
    /** @type string */
    this.userAuthentication = "";

    /** @type Key */
    this.portletInstanceKey = new Clouber.Portal.T.Key();

    /** @type string */
    this.namespacePrefix = "";

    /** @type Templates */
    this.templates = new Clouber.Portal.T.Templates();

    /** @type SessionParams */
    this.sessionParams = new Clouber.Portal.T.SessionParams();

    /** @type string */
    this.pageState = "";

    /** @type string */
    this.portletStates = "";

    /** @type Array(Extension) */
    this.extensions = [];
};

/**
* 5.1.7 Templates Type
* The Templates structure contains a set of fields that enable Producer URL
* writing.
* @type Clouber.Portal.T.Templates
* @class Clouber.Portal.T.Templates
*/
Clouber.Portal.T.Templates = function () {
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


