/**
* @fileOverview Clouber base classes of UI controls:
*          Clouber.sys.ui.Controller, Clouber.sys.ui.View
*          Clouber.sys.ui.ContainerController, Clouber.sys.ui.ContainerView
*          Clouber.sys.ui.ComponentController, Clouber.sys.ui.ComponentView
* @module Clouber.sys.ui.common
* @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
* @version 0.1.1
* @requires clouber
*/


/**
* Clouber system basic ui modules.
* @class  Clouber.sys.ui
* @module Clouber.sys.ui
* @namespace Clouber.sys.ui
*/
Clouber.namespace("Clouber.sys.ui");

/**
* The base MVC based model of UI controls.
* @class  Clouber.sys.ui.Model
* @namespace Clouber.sys.ui
* @extends Clouber.BaseObject
* @constructor
* @param {object} ctx Object initial context.
*/
Clouber.sys.ui.Model = function (ctx) {
    'use strict';

    /** @constant string TYPE */
    this.TYPE = "UI_MODEL";

    /**
    * internal settings object
    * @type Object
    * @ignore
    */
    this.context = ctx;

    /**
    * UI controller object
    * @type Controller
    */
    this.controller = {};

    /** Object setting function.
    * @function setting
    * @param {object} params Object settings.
    */
    this.setting = function (params) {
        if (params !== undefined) {
            this.context = Clouber.merge(this.context, params);
        }
    };

    /**
    * Object setting function.
    * @function setting
    * @return {object} Model context.
    */
    this.getContext = function () {
        return this.context;
    };
};
Clouber.extend(Clouber.sys.ui.Model, Clouber.BaseObject);

/**
* The base MVC based controller of UI controls.
* @class  Clouber.sys.ui.Controller
* @namespace Clouber.sys.ui
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.sys.ui.Controller = function () {
    'use strict';

    /** @constant TYPE */
    this.TYPE = "UI_CONTROLLER";

    /**
    * View object of UI controls.
    * @type View
    */
    this.view = {};

    /** Object setting function.
    * @function setting
    * @param {object} params Object settings.
    * @param  params.app application name
    * @param  params.version application version
    * @param  params.module application module
    * @param  params.control control name
    * @param  params.theme web page theme, include htmls, CSSs, images
    * @param  params.target web page target tag
    * @param  params.style web page layout style
    * @param  params.title  control title
    * @param  params.variable variable instance name
    * @param  params.index index of container's components
    */
    this.setting = function (params) {
        this.model.setting(params);
    };

    /** Get control context.
    * @function setting
    * @return {object} Model context.
    */
    this.getContext = function () {
        return this.model.getContext();
    };

    /**
    * Set model object.
    * @function setModel
    * @param {Model} modelObj Set model object.
    */
    this.setModel = function (modelObj) {
        var e;
        if (modelObj instanceof Clouber.sys.ui.Model) {
            this.model = modelObj;
            this.model.controller = this;
        } else {
            e = new Clouber.Exception({
                number: 10000,
                name: "TypeCasting",
                message: Clouber.message.typeErrror,
                description: Clouber.message.typeErrror,
                code: "Clouber.sys.ui.common"
            });
            Clouber.log(e);
        }
    };

    /**
    * Set view object.
    * @function setView
    * @param {View} viewObj Set view object.
    */
    this.setView = function (viewObj) {
        var e;
        if (viewObj instanceof Clouber.sys.ui.View) {
            this.view = viewObj;
            this.view.controller = this;
        } else {
            e = new Clouber.Exception({
                number: 10000,
                name: "TypeCasting",
                message: Clouber.message.typeErrror,
                description: Clouber.message.typeErrror,
                code: "Clouber.sys.ui.common"
            });
            Clouber.log(e);
        }
    };

    /**
    * Load UI control theme, include html, css and image files.
    * @function loadTheme
    * @param {object} viewObj Set view object.
    */
    this.loadTheme = function (params) {
        this.view.loadTheme(params);
    };

    /**
    * Execute a command, can be overrided.
    * @function execute
    * @param {String} command Command name.
    * @param {Object} params Command parameters.
    */
    this.execute = function (command, params) {};

    /**
    * Destroy this object. Eliminating the circular references to avoid memory
    * leaks.
    * @function _destroy
    * @override
    */
    this._destroy = function () {
        this.model.controller = null;
        this.view.controller = null;
        this.view = null;
        this.model = null;
    };
};
Clouber.extend(Clouber.sys.ui.Controller, Clouber.BaseObject);


/**
* The base MVC based view object of UI controls.
* @class  Clouber.sys.ui.View
* @namespace Clouber.sys.ui
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.sys.ui.View = function () {
    'use strict';

    /** @constant TYPE */
    this.TYPE = "UI_VIEW";

    /**
    * control object.
    * @type  Controller
    */
    this.controller = {};

    /**
    * Object setting function.
    * @function setting
    * @param {object} params Object settings.
    */
    this.setting = function (params) {
        this.controller.model.setting(params);
    };

    /** Get view object context.
    * @function setting
    * @return {object} Model context.
    */
    this.getContext = function () {
        return this.controller.model.getContext();
    };

    /**
    * Theme loading event handler, can be overrided event
    * @event themeLoading
    */
    this.themeLoading = function (params) {};

    /**
    * Theme loaded event handler, can be overrided event
    * @event themeLoaded
    */
    this.themeLoaded = function (params) {};

    /**
    * Theme loading error event handler, can be overrided event
    * @event htmlError
    */
    this.htmlError = function (params) {
        var e = new Clouber.Exception({
            number: 10002,
            name: params.error,
            message: Clouber.message.htmlLoadErrror + " (" + params.url + ")",
            description: params.status,
            code: "Clouber.sys.ui.common"
        });
        Clouber.log(e);
    };

    /** get theme HTML through ajax, can be overrided .
    * @function getHtml
    * @param {object} params HTML getting settings.
    * @param  params.async load method.
    * @param  params.namespace application name
    * @param  params.theme web page theme, include htmls, CSSs, images
    */
    this.getHtml = function (params) {
        params = Clouber.merge({async: false}, params);

        Clouber.loader.load(
            {namespace: this.getContext().namespace,
                theme: this.getContext().theme},
            "html",
            this._loadhtml,
            this._loaderror,
            this
        );
    };

    /**
    * Html loaded event handler.
    * @event _loadhtml
    * @ignore
    */
    this._loadhtml = function (data) {
        this.setHtml(data);
        this.setting({isAjaxHtml: true});
    };

    /**
    * Html loading error event handler.
    * @event _loaderror
    * @ignore
    */
    this._loaderror = function (textStatus, errorThrown, url) {
        this.setting({isAjaxHtml: false});
        this.htmlError({
            status: textStatus,
            error: errorThrown,
            url: url
        });
    };

    /**
    * Load UI control's theme
    * @function loadTheme
    * @param {object} params theme loading settings.
    * @param  params.async load theme asynchronously
    * @param  params.namespace after html load
    * @param  params.theme web page theme, include htmls, CSSs, images
    */
    this.loadTheme = function (params) {
        this.themeLoading(params);
        this.loadCss();
        var data = this.getHtml(params);
        this.setHtml(data);
    };

    /**
    * Add CSS file link to the html document. can be overrided.
    * @function loadCss
    */
    this.loadCss = function () {
        Clouber.loader.load(
            {namespace: this.getContext().namespace,
                theme: this.getContext().theme},
            "css"
        );
    };

    /**
    * Set HTML string to DOM, and display in the browser.
    * @function setHtml
    * @ignore
    */
    this.setHtml = function (data) {
        var tag;

        if ((this.getContext().isAjaxHtml !== undefined) &&
                (this.getContext().isAjaxHtml === true)) {
            return;
        }

        if ((data !== undefined) && (data !== null)) {
            if (this.TYPE === "PAGE_VIEW") {
                tag = "body";
            } else {
                tag = this.getContext().tag;
            }

            Clouber.document.html(tag, data);
            this.themeLoaded(data);
        }
    };

};
Clouber.extend(Clouber.sys.ui.View, Clouber.BaseObject);


/**
* The base MVC based controller of UI Container
* @class  Clouber.sys.ui.ContainerController
* @namespace Clouber.sys.ui
* @extends Clouber.sys.ui.Controller
* @constructor
* @param {object} params Object initial settings.
* @param  params.app application name
* @param  params.version application version
* @param  params.module application module
* @param  params.control control name
* @param  params.theme web page theme, include htmls, CSSs, images
* @param  params.target web page target tag
* @param  params.style web page layout style
* @param  params.title  control title
* @param  params.variable variable instance name
* @param  params.index index of container's components
*/
Clouber.sys.ui.ContainerController = function () {
    'use strict';
    /** @constant TYPE */
    this.TYPE = "CONTAINER_CONTROLLER";

    /**
    * prop internal UI components.
    * @type Map
    */
    this.components = null;

    /**
    * Set a component into the container by index.
    * @function setComponent
    * @param  {object} component The component of this container.
    * @param  {int} index The component's index.
    */
    this.setComponent = function (component, index) {
        if ((component === undefined) || (component === null)) {
            return;
        }

        if (this.components === null) {
            this.components = new Clouber.Map();
        }

        this.components.put(index, component);
        component.setContainer(this);
        component.setting({index: index});
    };

    /**
    * Set a component into the container by index.
    * @function getComponent
    * @param  {int} index The component's index.
    * @return {Object} The component of this container.
    */
    this.getComponent = function (index) {
        return this.components.get(index);
    };

    /**
    * Loading js components in this container, can be overrided.
    * @function loadComponents
    * @param {object} params configuration.
    */
    this.removeComponent = function (index) {
        var comp = this.getComponent(index);
        comp.destroy();
        this.components.remove(index);
    };

    /**
    * Loading js components in this container, can be overrided.
    * @function loadComponents
    * @param {object} params configuration.
    */
    this.loadComponents = function (params) {};

    /**
    * Change container and components' theme and then load theme.
    * @function setTheme
    * @param {object} params theme loading settings.
    * @param  params.async load theme asynchronously
    * @param  params.htmlLoaded after html load
    * @param  params.base base path.
    * @param  params.app application name
    * @param  params.version application version
    * @param  params.module application module
    * @param  params.control control name
    * @param  params.theme web page theme, include htmls, CSSs, images
    */
    this.setTheme = function (params) {
        var i, leng;

        this.view.loadTheme(params);
        // reload every component's theme
        for (i = 0, leng = this.components.size(); i < leng; i++) {
            this.getComponents(i).view.loadTheme();
        }
    };

    /**
    * Destroy this object. Eliminating the circular references to avoid memory
    * leaks.
    * @function destroy
    * @override
    */
    this.destroy = function () {
        this.destroying();
        this._destroyComponents();
        this._destroy();
    };

    /**
    * Destroy this object. Eliminating the circular references to avoid memory
    * leaks.
    * @function _destroyComponents
    * @ignore
    */
    this._destroyComponents = function () {
        var keys, i, len;

        // remove all components
        if (this.components instanceof Clouber.Map) {
            keys = this.components.keys();
            len = keys.length;
        } else {
            len = 0;
        }

        for (i = 0; i < len; i++) {
            this.removeComponent(keys[i]);
        }
    };

    /**
    * Display this control. can be overrided.
    * @function display
    * @param {object} params configuration.
    */
    this.display = function (params) {};

    /**
    * Refresh this control. can be overrided.
    * @function refresh
    * @param {object} params Refreshing parameters.
    */
    this.refresh = function (params) {};

};
Clouber.extend(Clouber.sys.ui.ContainerController, Clouber.sys.ui.Controller);

/**
* The MVC based view object of UI Container
* @class  Clouber.sys.ui.ContainerView
* @namespace Clouber.sys.ui
* @extends Clouber.sys.ui.View
* @constructor
* @param {object} params Object initial settings.
* @param  params.app application name
* @param  params.version application version
* @param  params.module application module
* @param  params.control control name
* @param  params.theme web page theme, include htmls, CSSs, images
* @param  params.target web page target tag
* @param  params.style web page layout style
* @param  params.title  control title
* @param  params.variable variable instance name
* @param  params.index index of container's components
*/
Clouber.sys.ui.ContainerView = function () {
    'use strict';
    /** @constant TYPE */
    this.TYPE = "CONTAINER_VIEW";

};
/** @inherits inherit from Clouber.sys.ui.View*/
Clouber.extend(Clouber.sys.ui.ContainerView, Clouber.sys.ui.View);

/**
* The MVC based controller of UI component
* @class  Clouber.sys.ui.ComponentController
* @namespace Clouber.sys.ui
* @extends Clouber.sys.ui.ContainerController
* @constructor
* @param {object} params Object initial settings.
* @param  params.app application name
* @param  params.version application version
* @param  params.module application module
* @param  params.control control name
* @param  params.theme web page theme, include htmls, CSSs, images
* @param  params.target web page target tag
* @param  params.style web page layout style
* @param  params.title  control title
* @param  params.variable variable instance name
* @param  params.index index of container's components
*/
Clouber.sys.ui.ComponentController = function () {
    'use strict';
    /** @constant TYPE */
    this.TYPE = "COMPONENT_CONTROLLER";

    /**
    * container object.
    * @type ContainerController
    */
    this.container = null;

    /**
    * set container object
    * @function setContainer
    */
    this.setContainer = function (container) {
        if ((container !== undefined) && (container !== null)) {
            this.container = container;
        }
    };

    /**
    * Destroy this object. Eliminating the circular references to avoid memory
    * leaks.
    * @function destroy
    * @override
    */
    this.destroy = function () {
        this.destroying();
        this.container = null;
        this._destroyComponents();
        this._destroy();
    };

};
Clouber.extend(Clouber.sys.ui.ComponentController,
    Clouber.sys.ui.ContainerController);

/**
* The MVC based view object of UI component
* @class  Clouber.sys.ui.ComponentView
* @namespace Clouber.sys.ui
* @extends Clouber.sys.ui.ContainerView
* @constructor
* @param {object} params Object initial settings.
* @param  params.app application name
* @param  params.version application version
* @param  params.module application module
* @param  params.control control name
* @param  params.theme web page theme, include htmls, CSSs, images
* @param  params.target web page target tag
* @param  params.style web page layout style
* @param  params.title  control title
* @param  params.variable variable instance name
* @param  params.index index of container's components
*/
Clouber.sys.ui.ComponentView = function () {
    'use strict';
    /** @constant TYPE */
    this.TYPE = "COMPONENT_VIEW";
};
/** @inherits inherit from Clouber.sys.ui.View*/
Clouber.extend(Clouber.sys.ui.ComponentView, Clouber.sys.ui.ContainerView);


