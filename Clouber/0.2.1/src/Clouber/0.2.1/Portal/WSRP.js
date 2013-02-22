

























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
* 5.1.25 ErrorCodes
* The following is an enumerated set of QNames (the  prefix refers to the
* URI "urn:oasis:names:tc:v2:types") defined as ErrorCodes by this
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
    this.AccessDenied = "AccessDenied";

    /** @type string} ExportNoLongerValidAn importPortlets operation
    * referenced an exported item that is no longer available.
    */
    this.ExportNoLongerValid = "ExportNoLongerValid";

    /** @type string} InconsistentParameters The supplied parameters do not
    * provide a consistent set of references.
    */
    this.InconsistentParameters = "InconsistentParameters";

    /** @type string} InvalidRegistration The supplied registrationHandle
    * is invalid.*/
    this.InvalidRegistration = "InvalidRegistration";

    /** @type string} InvalidCookie A supplied cookie was invalid for the
    * referenced items. The Consumer can try a recovery process as would be
    * used if the equivalent fault had been returned.
    */
    this.InvalidCookie = "InvalidCookie";

    /** @type string} InvalidHandle The supplied portletHandle is not valid
    * for the operation.
    */
    this.InvalidHandle = "InvalidHandle";

    /** @type string} InvalidSession The supplied session is no longer
    * valid. The Consumer can try a recovery process as would be used if the
    * equivalent fault had been returned.
    */
    this.InvalidSession = "InvalidSession";

    /** @type string} InvalidUserCategory The supplied userCategory is not
    * allowed to perform the requested action on the referenced items.
    */
    this.InvalidUserCategory = "InvalidUserCategory";

    /** @type string} ModifyRegistrationRequired The supplied
    * registrationHandle has been suspended pending appropriate changes from a
    * modifyRegistration request.
    */
    this.ModifyRegistrationRequired = "ModifyRegistrationRequired";

    /** @type string} MissingParameters The request did not supply the full
    * set of parameters required to perform the processing on the referenced
    * items.
    */
    this.MissingParameters = "MissingParameters";

    /** @type string} OperationFailed An attempt to process the request
    * resulted in a failure. Whether or not a retry would likely succeed is
    * unknown.
    */
    this.OperationFailed = "OperationFailed";

    /** @type string OperationNotSupported The requested operation can not
    * be performed on the referenced items.
    */
    this.OperationNotSupported = "OperationNotSupported";

    /** @type string} ResourceSuspended The requested operation can not be
    * performed as the referenced resources have been suspended.
    */
    this.ResourceSuspended = "ResourceSuspended";

    /** @type string TooBusy The Producer has too many other processing
    * needs to attend to the request at this time.
    */
    this.TooBusy = "TooBusy";

    /** @type string} TooManyRequested The request has taken all of the
    * processing time the Producer is willing to allow.
    */
    this.TooManyRequested = "TooManyRequested";

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

