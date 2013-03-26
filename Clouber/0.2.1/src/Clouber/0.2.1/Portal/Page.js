/**
* @fileOverview Clouber base classes of UI controls.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber.Portal.Page
* @requires Clouber.* Clouber.Core.* Clouber.Core.* Clouber.Portal.*
*/

Clouber.namespace("Clouber.Portal");

/**
* The model of portal page.
* @class  Clouber.Portal.PageModel
* @namespace Clouber.Portal
* @extends Clouber.Core.Model
* @constructor
*/
Clouber.Portal.PageModel = function () {
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
Clouber.extend(Clouber.Portal.PageModel, Clouber.Core.Model);

/**
* The MVC based view object of Page controls.
* @class  Clouber.Portal.PageView
* @namespace Clouber.Portal
* @extends Clouber.Core.ContainerView
* @constructor
* @param {object} params Object initial settings.
* @param  params.app application name
* @param  params.version application version
* @param  params.module application module
* @param  params.control control name
* @param  params.theme web page theme, include htmls, CSSs, images
*/
Clouber.Portal.PageView = function () {
    'use strict';
    /**
    * class type
    * @property {string} TYPE
    */
    this.TYPE = "PAGE_VIEW";

    /**
    * Initialization
    * @function init
    * @override
    */
    this.init = function () {
        this.displayPage();
    };

    /**
    * Display Clouber portal page.
    * @function displayPage
    * @override
    */
    this.displayPage = function () {
        // load page default HTML
        Clouber.document.html("body",
            '<div id="CLOUBER_PAGE_BAR"></div><div id="CLOUBER_PAGE"></div>');

        // load page's default CSS
        Clouber.loader.load(
            {namespace: "Clouber.Portal.Page",
                theme: this.getContext().theme},
            null,
            "css"
        );
    };

    /**
    * Get HTML code from portal configuration file.
    * @function getHtml
    * @return {string} HTML code of this page
    * @override
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
Clouber.extend(Clouber.Portal.PageView, Clouber.Core.ContainerView);

/**
* The MVC based controller of Page controls.
* @class  Clouber.Portal.Page
* @namespace Clouber.Portal
* @extends Clouber.Core.ContainerController
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
Clouber.Portal.Page = function (params) {
    'use strict';
    /**
    * object type
    * @property {}
    */
    this.TYPE = "PAGE_CONTROL";

    /**
    * Page's regions.
    * @property {Map} regions
    */
    //this.regions = null;

    /**
    * Page's controls, include regions and windows.
    * @property {Map} controls
    */
    this.controls = null;

    /**
    * Page's old context, if page changed but template doesn't change,
    * only need to refresh a part of regions.
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
        this.setView(new Clouber.Portal.PageView(this.getContext()));
        this.view.init();
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

                // current page, only refresh and change a part of regions
                for (i = 0, l = context.regions.size(); i < l; i++) {
    //                    this.displayRegion(i, context.regions.getByIndex(i));
                    if (this._pageContext.regions.getByIndex(i).namespace !==
                            context.regions.getByIndex(i).namespace) {

                        this.displayRegion(i, context.regions.getByIndex(i));
                    }
                }

            } else {
                // a new page template, need to change every window.
                // display page template
                this.view.loadTheme(Clouber.portal.getConf().path);

                // create and display new regions
                for (i = 0, l = context.regions.size(); i < l; i++) {
                    this.displayRegion(i, context.regions.getByIndex(i));
                }
            }

            // set new page context.
            this._pageContext = context;

            // set page title
            this.view.setTitle();
        } catch (e) {
            e.code = "Clouber.Portal.Page#display";
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
                // refresh every Region and window.
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
            e.code = "Clouber.Portal.Page#refresh";
            Clouber.log(e);
        }
    };

    /**
    * Set page header title.
    * @function setTitle
    * @param {string} title, sub title.
    * @param {string} fid, region id.
    */
    this.setTitle = function (title, fid) {
        if (fid === this.getContext().content) {
            this.view.setTitle(title);
        }
    };

    /**
    * Display a new window.
    * @function displayRegion
    * @param {int} index Region's index in the page.
    * @param {object} conf Region's configuration information.
    */
    this.displayRegion = function (index, conf) {
        var frm, model;

        try {
            // display regions
            if (conf.Class === undefined) {
                conf.Class = "Clouber.Portal.Region";
            }
            frm = Clouber.create(conf.Class);
            model = new Clouber.Portal.RegionModel(index);
            frm.setModel(model);
            this.addRegion(index, frm);
            frm.init();
        } catch (e) {
            e.code = "Clouber.Portal.Page#displayRegion";
            Clouber.log(e);
        }
    };

    /**
    * Add a new region.
    * @function addRegion
    * @param {int} index Region index in the page context.
    * @param {Region} region Region .
    */
    this.addRegion = function (index, region) {
        //if (this.regions === null) {
        //    this.regions = new Clouber.Core.Map();
        //}
        //this.regions.set(index, region.getId());
        this.getContext().regions.get(index).instanceId = region.getId();
        this.setComponent(region, index);
        this.addControl(region);
    };

    /**
    * get a region.
    * @function getRegion
    * @param {int} index Region index in the page context.
    * @return {Region}
    */
    this.getRegion = function (index) {
        //var id = this.regions.get(index);
        var id = this.getContext().regions.get(index).instanceId;
        return this.getControl(id);
    };

    /**
    * Add a new control.
    * @function addControl
    * @param {ComponentController} control Page control.
    */
    this.addControl = function (control) {
        if (this.controls === null) {
            this.controls = new Clouber.Core.Map();
        }
        this.controls.set(control.getId(), control);
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
Clouber.extend(Clouber.Portal.Page, Clouber.Core.ContainerController);

