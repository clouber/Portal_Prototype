/**
* @fileOverview Clouber base classes of UI controls.
* @copyright Clouber.org 2012
* @author Jon Zhou
* @module Clouber.Sys.Portal.Page
* @requires Clouber, Clouber.Sys.UI.common, Clouber.Sys.Portal.Portal
*/

Clouber.namespace("Clouber.Sys.Portal");

/**
* The model of portal page.
* @class  Clouber.Sys.Portal.PageContext
* @namespace Clouber.Sys.Portal
* @extends Clouber.Sys.UI.Model
* @constructor
*/
Clouber.Sys.Portal.PageContext = function () {
    'use strict';

    /**
    * @constant TYPE
    */
    this.TYPE = "PAGE_CONTEXT";

    /**
    * Get page context.
    * @function getContext
    * @override
    * @return {object}
    */
    this.getContext = function () {
        return Clouber.portal.context.pageContext;
    };


};
Clouber.extend(Clouber.Sys.Portal.PageContext, Clouber.Sys.UI.Model);

/**
* The MVC based view object of Page controls.
* @class  Clouber.Sys.Portal.PageView
* @namespace Clouber.Sys.Portal
* @extends Clouber.Sys.UI.ContainerView
* @constructor
* @param {object} params Object initial settings.
* @param  params.app application name
* @param  params.version application version
* @param  params.module application module
* @param  params.control control name
* @param  params.theme web page theme, include htmls, CSSs, images
*/
Clouber.Sys.Portal.PageView = function () {
    'use strict';
    /**
    * class type
    * @property {string} TYPE
    */
    this.TYPE = "PAGE_VIEW";

    /**
    * Get HTML code from portal configuration file.
    * @function getHtml
    * @override
    * @return {string} HTML code of this page
    */
    this.getHtml = function () {
        return this.getContext().code;
    };

    /**
    * Set page header title.
    * @function setTitle
    * @param {string} title, sub title.
    */
    this.setTitle = function (title) {
        if (typeof title !== "undefined") {
            document.title = this.getContext().title + " - " +
                title;
        } else {
            document.title = this.getContext().title;
        }
    };
};
Clouber.extend(Clouber.Sys.Portal.PageView, Clouber.Sys.UI.ContainerView);

/**
* The MVC based controller of Page controls.
* @class  Clouber.Sys.Portal.Page
* @namespace Clouber.Sys.Portal
* @extends Clouber.Sys.UI.ContainerController
* @constructor
* @param {object} params Object initial settings.
* @param {object} params.portalApp Page's model object.
* @param  params.app application name
* @param  params.version application version
* @param  params.module application module
* @param  params.control control name
* @param  params.theme web page theme, include htmls, CSSs, images
* @param  params.title  control title
*/
Clouber.Sys.Portal.Page = function (params) {
    'use strict';
    /**
    * object type
    * @property {}
    */
    this.TYPE = "PAGE_CONTROL";

    /**
    * Page's frames.
    * @property {Map} frames
    */
    //this.frames = null;

    /**
    * Page's controls, include frames and windows.
    * @property {Map} controls
    */
    this.controls = null;

    /**
    * Page's old context, if page changed but template doesn't change,
    * only need to refresh a part of frames.
    * @property _pageContext
    * @ignore
    */
    this._pageContext = {};

    /**
    * Object initialization, loading controls in this page.
    * @function init
    * @override
    */
    this.init = function () {
         // Page's view object.
        this.setView(new Clouber.Sys.Portal.PageView(this.getContext()));
    };

    /**
    * Loading js components in this page, it will be invocated by model object.
    * @function loadComponents
    * @override
    */
    this.loadComponents = function () {
        this.setting(this.getContext());
        this.display();
    };

    /**
    * Display a new portal page.
    * @function display
    * @param {Map} params The URL parameters
    * @override
    */
    this.display = function () {
        var i, l, frm, context = this.getContext();

        try {
            // compare current page with page context's template.
            if ((typeof this._pageContext !== "undefined") &&
                    (context.template === this._pageContext.template)) {

                // current page, only refresh and change a part of frames
                for (i = 0, l = context.frames.size(); i < l; i++) {
    //                    this.displayFrame(i, context.frames.getByIndex(i));
                    if (this._pageContext.frames.getByIndex(i).namespace !==
                            context.frames.getByIndex(i).namespace) {

                        this.displayFrame(i, context.frames.getByIndex(i));
                    }
                }

            } else {
                // a new page template, need to change every window.
                // display page template
                this.view.loadTheme(Clouber.portal.getConf().path);  

                // create and display new frames
                for (i = 0, l = context.frames.size(); i < l; i++) {
                    this.displayFrame(i, context.frames.getByIndex(i));
                }
            }

            // set new page context.
            this._pageContext = context;

            // set page title
            this.view.setTitle();
        } catch (e) {
            e.code = "Clouber.Sys.Portal.Page#display";
            Clouber.log(e);
        }
    };

    /**
    * Update every control's data and refresh the portal page.
    * @function refresh
    * @param {string} id Component id
    * @override
    */
    this.refresh = function (id) {
        var i, l, c;

        try {
            if (id === undefined) {
                // refresh every Frame and window.
                for (i = 0, l = this.components.size(); i < l; i++) {
                    this.components.getByIndex(i).refresh();
                }

            } else if (typeof id === "number") {
                // refresh by instanceID
                c = this.getControl(id);
                if (typeof c !== "undefined") {
                    c.refresh();
                }

            } else if (typeof id === "string") {
                // refresh by portletID
                for (i = 0, l = this.components.size(); i < l; i++) {
                    this.components.getByIndex(i).refresh(id);
                }
            }

            // set page title
            this.view.setTitle();
        } catch (e) {
            e.code = "Clouber.Sys.Portal.Page#refresh";
            Clouber.log(e);
        }
    };

    /**
    * Set page header title.
    * @function setTitle
    * @param {string} title, sub title.
    * @param {string} fid, frame id.
    */
    this.setTitle = function (title, fid) {
        if (fid === this.getContext().content) {
            this.view.setTitle(title);
        }
    };

    /**
    * Display a new window.
    * @function displayFrame
    * @param {int} index Frame's index in the page.
    * @param {object} conf Frame's configuration information.
    */
    this.displayFrame = function (index, conf) {
        var frm, model;

        try {
            // display frames
            if (conf.Class === undefined) {
                conf.Class = "Clouber.Sys.Portal.Frame";
            }
            frm = Clouber.create(conf.Class);
            model = new Clouber.Sys.Portal.FrameContext(index);
            frm.setModel(model);
            this.addFrame(index, frm);
            frm.init();
        } catch (e) {
            e.code = "Clouber.Sys.Portal.Page#displayFrame";
            Clouber.log(e);
        }
    };

    /**
    * Add a new frame.
    * @function addFrame
    * @param {int} index Frame index in the page context.
    * @param {Frame} frame Frame .
    */
    this.addFrame = function (index, frame) {
        //if (this.frames === null) {
        //    this.frames = new Clouber.Map();
        //}
        //this.frames.put(index, frame.getId());
        this.getContext().frames.get(index).instanceId = frame.getId();
        this.setComponent(frame, index);
        this.addControl(frame);
    };

    /**
    * get a frame.
    * @function getFrame
    * @param {int} index Frame index in the page context.
    * @return {Frame}
    */
    this.getFrame = function (index) {
        //var id = this.frames.get(index);
        var id = this.getContext().frames.get(index).instanceId;
        return this.getControl(id);
    };

    /**
    * Add a new control.
    * @function addControl
    * @param {ComponentController} control Page control.
    */
    this.addControl = function (control) {
        if (this.controls === null) {
            this.controls = new Clouber.Map();
        }
        this.controls.put(control.getId(), control);
    };

    /**
    * Remove a new control.
    * @function removeControl
    * @param {ComponentController} control Page control.
    */
    this.removeControl = function (control) {
        this.controls.remove(control.getId());
    };

    /**
    * get a control.
    * @function getControl
    * @param {int} id control id in the page context.
    * @return {ComponentController}
    */
    this.getControl = function (id) {
        return this.controls.get(id);
    };

    /**
    * get a control.
    * @function getControl
    * @param {int} id control id in the page context.
    * @return {ComponentController}
    */
    this.execute = function (id, name, params) {
        this.getControl(id).execute(name, params);
    };

};
Clouber.extend(Clouber.Sys.Portal.Page, Clouber.Sys.UI.ContainerController);

