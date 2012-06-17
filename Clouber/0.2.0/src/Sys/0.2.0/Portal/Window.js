/**
* @fileOverview Clouber portal window class.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber.Sys.Portal.Window
* @requires Clouber.* Clouber.Sys.Core.* Clouber.Sys.UI.* Clouber.Sys.Portal.*
*/

Clouber.namespace("Clouber.Sys.Portal");

/**
* The model object of Portal Window.
* @class  Clouber.Sys.Portal.WindowModel
* @namespace Clouber.Sys.Portal
* @extends Clouber.Sys.UI.ComponentView
* @constructor
* @param {object} context Window context information.
*/
Clouber.Sys.Portal.WindowModel = function (index) {
    'use strict';

    /**
    * class type
    * @type string
    */
    this.TYPE = "WINDOW_MODEL";

    /**
    * Window index
    * @property index
    */
    this.index = index;

    /**
    * Get window context.
    * @function getContext
    * @override
    * @return {object}
    */
    this.getContext = function () {
        if ((typeof this.controller.container !== "undefined") &&
                (this.controller.container !== null)) {
            return this.controller.container.getContext().windows.get(index);
        }
    };

    /**
    * Get portlet context.
    * @function getPortletContext
    * @return {WindowInfo}
    */
    this.getPortletContext = function () {
        var w = this.getContext();
        return Clouber.portal.getContext().portlets.get(
            w.portletID + "@" + w.producer
        );
    };
    /**
    * Get portlet config.
    * @function getPortletConfig
    * @return {PortletInfo}
    */
    this.getPortletConfig = function () {
        var p = this.getPortletContext();
        if ((p === undefined) || (p === null)) {
            Clouber.log(new Clouber.Exception({
                number: 10008,
                name: "portletConfigNotExist",
                message: Clouber.message.portletConfigNotExist +
                    " (" + this.getPortletContext().portletID + ")",
                code: "Clouber.Sys.Portal.WindowModel#getPortletConfig"
            }));
        } else {
            return p.config;
        }
    };

    /**
    * Get portlet state (wsrp:normal, wsrp:minimized, wsrp:maximized, wsrp:solo)
    * @function getState
    * @return {String}
    */
    this.getState = function () {
        var p, s;
        if (this.getPortletContext().windowState === null) {
            p = this.getPortletConfig();
            if (p.markupTypes instanceof Clouber.Map) {
                s = p.markupTypes.get("windowStates").split("/");
                if (s[0] === undefined) {
                    s[0] = "wsrp:normal";
                }
                this.getPortletContext().windowState = s[0];
            }
        }
        return this.getPortletContext().windowState;
    };

    /**
    * Get portlet support states
    * (wsrp:normal, wsrp:minimized, wsrp:maximized, wsrp:solo)
    * @function getStates
    * @return {Array}
    */
    this.getStates = function () {
        var p, s;
        p = this.getPortletConfig();
        if (p.markupTypes instanceof Clouber.Map) {
            s = p.markupTypes.get("windowStates").split("/");
            return s;
        }
    };

    /**
    * Set portlet state (wsrp:normal, wsrp:minimized, wsrp:maximized, wsrp:solo)
    * @function setState
    * @params {String}
    */
    this.setState = function (state) {
        var i, l, s, p = this.getPortletConfig();
        if (p.markupTypes instanceof Clouber.Map) {
            s = p.markupTypes.get("windowStates").split("/");
            for (i = 0, l = s.length; i < l; i++) {
                if (state === s[i]) {
                    this.getPortletContext().windowState = state;
                }
            }
        }
    };

    /**
    * Set portlet title
    * @function setTitle
    * @params {String}
    */
    this.setTitle = function (s) {
        this.getPortletContext().title = s;
    };

    /**
    * Return true if portlet context changed.
    * @function getPortletContext
    * @return {boolean}
    */
    this.isChanged = function () {
        return this.getPortletContext().changed;
    };

    /**
    * Initialization,
    * @function init
    */
    this.init = function (context) {
    };

    /**
    * set portlet markup
    * @function stateChanged
    */
    this.getMarkup = function () {
        return null;
    };

    /**
    * Destroy this window's producer connection.
    * @event destroy
    * @override
    */
    this.destroying = function () {
        this.userContext = null;
        this.portletContext = null;
        this.context = null;
    };
};
Clouber.extend(Clouber.Sys.Portal.WindowModel, Clouber.Sys.UI.Model);


/**
* The view object of Portal Window.
* @class  Clouber.Sys.Portal.WindowView
* @namespace Clouber.Sys.Portal
* @extends Clouber.Sys.UI.ComponentView
* @constructor
* @param {object} context Window context information.
*/
Clouber.Sys.Portal.WindowView = function () {
    'use strict';

    /**
    * class type
    * @property {string} TYPE
    */
    this.TYPE = "WINDOW_VIEW";

    /**
    * get Portlet context .
    * @function getPortletContext
    * @return {object} Portlet context.
    */
    this.getPortletContext = function () {
        return this.controller.model.getPortletContext();
    };

    /** get Portlet Markup, can be overrided .
    * @function showPortlet
    * @param {object} params HTML getting settings.
    * @override
    */
    this.showPortlet = function (params) {
        Clouber.log("Clouber.Sys.Portal.WindowView#showPortlet (" +
            this.getPortletContext().portletID + ")");

        try {
            var html = this.getPortletContext().markup,
                css = this.getPortletContext().css;

            Clouber.document.html(this.getContext().tag +
                    " .Clouber_Window .W_COMPONENT", html);
            Clouber.loader.loadCss(this.getPortletContext().css);

            this.getPortletContext().changed = false;
        } catch (e) {
            e.text = this.getPortletContext().portletID;
            e.code = "Clouber.Sys.Portal.WindowView#showPortlet";
            Clouber.log(e);
        }
    };

    /** get theme HTML through ajax, can be overrided .
    * @function getHtml
    * @param {object} params HTML getting settings.
    * @override
    */
    this.getHtml = function (params) {
        var min = "", max = "", nor = "", solo = "", s, i, l;

        s = this.controller.model.getStates();
        for (i = 0, l = s.length; i < l; i++) {
            switch (s[i]) {
            case "wsrp:minimized":
                min = ' <div class="minimized"></div>';
                break;
            case "wsrp:maximized":
                max = ' <div class="maximized"></div>';
                break;
            case "wsrp:solo":
                solo = ' <div class="solo"></div>';
                break;
            case "wsrp:normal":
                nor = ' <div class="normal"></div>';
                break;
            }
        }

        return '<div class="Clouber_Window" id="' +
            this.controller.getId() +
            '"><div class="Clouber_Window_b WB_S1">' +
            '<div class="Clouber_Window_b WB_S2">' +
            '<div class="Clouber_Window_b WB_S3">' +
            '<div class="Clouber_Window_b WB_S4">' +
            '<div class="W_CONTENT">' +
            '<div class="W_TITLEBAR">' +
            ' <div class="thumbnail"></div>' +
            ' <div class="captionBtn">' +
            ' <div class="option"></div>' + min + max + nor + solo +
            ' <div class="close"></div>' +
            ' </div>' +
            ' <div class="title">' +
            ' <h4></h4>' +
            ' </div>' +
            ' <div class="menu"></div>' +
            ' </div>' +
            '<div class="W_COMPONENT"></div>' +
            '<div class="W_FOOTER"><div class="W_STATUSBAR">' +
            '<div class="statusInfo"></div></div></div>' +
            '</div></div></div></div>';
    };

    /**
    * Add CSS file link to the html document. can be overrided.
    * @function loadCss
    * @override
    */
    this.loadCss = function () {
        // load window's common CSS
        Clouber.loader.load(
            {namespace: this.getPortletContext().namespace,
                theme: this.getPortletContext().theme},
            null,
            "css"
        );
    };

    /**
    * Set a window's option button in the title bar.
    * @function setOption
    * @param {object} params function settings.
    * @param {int} params.index component's index
    * @param {String} params.text component's title text
    * @param {boolean} params.display Set display status of the component
    */
    this.setOption = function (params) {
        if (params === undefined) {
            return;
        }

        if (typeof params.display !== "undefined") {
            this.setTitleBar({option: params.display});
        }

        if ((typeof params.text !== "undefined") && (params.text !== null)) {
            this.setTitleBar({option: {text: params.text}});
        }

        if ((typeof params.css !== "undefined") && (params.css !== null)) {
            this.setTitleBar({option: {css: params.css}});
        }
    };


    /**
    * Set a Title bar.
    * @function setTitleBar
    * @param {object} params function settings.
    * @param {boolean} params.display Display title bar.
    * @param {object} params.css Border's CSS string(params.css.name/value).
    * @param {boolean} params.thumbnail Display thumbnail.
    * @param {object} params.thumbnail.css Border's CSS(params.css.name/value).
    * @param {string} params.thumbnail.html Border's html string.
    * @param {string} params.title Title text.
    * @param {boolean} params.option Display option butten.
    * @param {string} params.option.text Display option text.
    * @param {object} params.option.css Display option css. (name/value)
    * @param {string} params.option.event Display option event handler.
    * @param {boolean} params.minimized Display minimized butten.
    * @param {boolean} params.maximized Display maximized butten.
    * @param {boolean} params.close Display close butten.
    * @param {boolean} params.solo Display solo butten.
    * @param {boolean} params.normal Display normal butten.
    * @param {boolean} params.option Display option butten.
    */
    this.setTitleBar = function (params) {
        var s, tag = this.getContext().tag;

        // set title bar
        if ((typeof params.display !== "undefined") &&
                (params.display === true)) {

            if (params.index < 0) {
                Clouber.document.show(tag);
            } else {
                Clouber.document.show(tag + " .W_TITLEBAR");
            }
        }

        if ((typeof params.display !== "undefined") &&
                (params.display === false)) {

            if (params.index < 0) {
                Clouber.document.hide(tag);
            } else {
                Clouber.document.hide(tag + " .W_TITLEBAR");
            }
        }

        // set title bar css
        if ((typeof params.css !== "undefined") && (params.css !== null)) {
            Clouber.document.css(tag + " .W_TITLEBAR", params.css.name,
                params.css.value);
        }

        // set thumbnail
        if ((typeof params.thumbnail !== "undefined") &&
                (params.thumbnail === true)) {
            Clouber.document.show(tag + " .W_TITLEBAR .thumbnail");
        }

        if ((typeof params.thumbnail !== "undefined") &&
                (params.thumbnail === false)) {
            Clouber.document.hide(tag + " .W_TITLEBAR .thumbnail");
        }

        if ((typeof params.thumbnail !== "undefined") &&
                (typeof params.thumbnail.css !== "undefined")) {
            Clouber.document.css(tag + " .W_TITLEBAR .thumbnail",
                    params.thumbnail.css.name, params.thumbnail.css.value);
        }

        if ((typeof params.thumbnail !== "undefined") &&
                (typeof params.thumbnail.html !== "undefined")) {
            Clouber.document.html(tag + " .W_TITLEBAR .thumbnail",
                    params.thumbnail.html);
        }

        // set title text
        if ((typeof params.title !== "undefined") && (params.title !== null)) {
            s = tag + " .W_TITLEBAR  .title h4";
            Clouber.document.text(s, params.title);
        }

        // set option
        if (typeof params.option !== "undefined") {

            if (params.option === true) {
                Clouber.document.show(tag + " .W_TITLEBAR .option");
            }

            if (params.option === false) {
                Clouber.document.hide(tag + " .W_TITLEBAR .option");
            }

            if ((typeof params.option.text !== "undefined") &&
                    (params.option.text !== null)) {
                Clouber.document.text(tag + " .W_TITLEBAR .option",
                        params.option.text);
            }

            if ((typeof params.option.event !== "undefined") &&
                    (params.option.event !== null)) {

                Clouber.document.attr(tag + " .W_TITLEBAR .option",
                        "onclick", "Clouber.portal.execute(" +
                            this.controller.getId() + " , option);");
            }

            if ((typeof params.option.css !== "undefined") &&
                    (params.option.css !== null)) {
                Clouber.document.css(tag + " .W_TITLEBAR .option",
                        params.option.css.name, params.option.css.value);
            }
        }

        if ((typeof params.normal !== "undefined") &&
                (params.normal === true)) {
            Clouber.document.show(tag + " .W_TITLEBAR .normal");
            Clouber.document.attr(tag + " .W_TITLEBAR .normal", "onclick",
                "Clouber.portal.execute(" + this.controller.getId() +
                " , 'normal');");
        }

        if ((typeof params.normal !== "undefined") &&
                (params.normal === false)) {

            Clouber.document.hide(tag + " .W_TITLEBAR .normal");
        }

        if ((typeof params.minimized !== "undefined") &&
                (params.minimized === true)) {
            Clouber.document.show(tag + " .W_TITLEBAR .minimized");
            Clouber.document.attr(tag + " .W_TITLEBAR .minimized",
                "onclick",
                "Clouber.portal.execute(" + this.controller.getId() +
                    " , 'minimized');"
                );
        }

        if ((typeof params.minimized !== "undefined") &&
                (params.minimized === false)) {
            Clouber.document.hide(tag + " .W_TITLEBAR .minimized");
        }

        if ((typeof params.maximized !== "undefined") &&
                (params.maximized === true)) {
            Clouber.document.show(tag + " .W_TITLEBAR .maximized");
            Clouber.document.attr(tag + " .W_TITLEBAR .maximized", "onclick",
                "Clouber.portal.execute(" + this.controller.getId() +
                " , 'maximized');");
        }
        if ((typeof params.maximized !== "undefined") &&
                (params.maximized === false)) {
            Clouber.document.hide(tag + " .W_TITLEBAR .maximized");
        }

        if ((typeof params.solo !== "undefined") && (params.solo === true)) {
            Clouber.document.show(tag + " .W_TITLEBAR .solo");
            Clouber.document.attr(tag + " .W_TITLEBAR .solo", "onclick",
                "Clouber.portal.execute(" + this.controller.getId() +
                " , 'solo');");
        }

        if ((typeof params.solo !== "undefined") && (params.solo === false)) {
            Clouber.document.hide(tag + " .W_TITLEBAR .solo");
        }

        if ((typeof params.close !== "undefined") && (params.close === true)) {
            Clouber.document.show(tag + " .W_TITLEBAR  .close");

            Clouber.document.attr(tag + " .W_TITLEBAR  .close", "onclick",
                "Clouber.portal.execute(" + this.controller.getId() +
                " , 'close');");
        }

        if ((typeof params.close !== "undefined") && (params.close === false)) {
            Clouber.document.hide(tag + " .W_TITLEBAR  .close");
        }

    };

    /**
    * Set a window's status bar.
    * @function
    * @param {object} params Function settings.
    * @param {int} params.index Component's index
    */
    this.setStatusBar = function (params) {
        var s;

        if (params === undefined) {
            return;
        }

        if ((typeof params.display !== "undefined") &&
                (params.display === true)) {
            Clouber.document.show(this.getContext().tag +
                " .W_FOOTER .W_STATUSBAR");
        }

        if ((typeof params.display !== "undefined") &&
                (params.display === false)) {
            Clouber.document.hide(this.getContext().tag +
                " .W_FOOTER .W_STATUSBAR");
        }

        // set status info
        if ((typeof params.status !== "undefined") &&
                (params.status !== null)) {
            s = this.getContext().tag + " .W_FOOTER .W_STATUSBAR .statusInfo";
            Clouber.document.text(s, params.status);
        }

        // set css
        if ((typeof params.css !== "undefined") && (params.css !== null)) {
            Clouber.document.css(this.getContext().tag +
                    " .W_FOOTER .W_STATUSBAR",
                    params.css.name, params.css.value);
        }
    };

    /**
    * Set a window's border display or hidden.
    * @function
    * @param {boolean} params Function settings.
    */
    this.setBorder = function (params) {
        if (params) {
            Clouber.document.removeClass(this.getContext().tag +
                    " .Clouber_Window_b", "Clouber_Window_b_hide");
        } else {
            Clouber.document.addClass(this.getContext().tag +
                    " .Clouber_Window_b", "Clouber_Window_b_hide");
        }
    };

    /**
    * Restore a window - exit solo status.
    * @function normal
    * @param {object} params Function settings.
    * @param {int} params.index Component's index
    */
    this.normal = function (params) {
        Clouber.document.removeClass(this.getContext().tag + " .Clouber_Window",
                "Clouber_Window_pop");

        Clouber.document.fadeOut(".Clouber_Window_locker",
                "normal", function () {
                Clouber.document.remove(".Clouber_Window_locker");
            });
        Clouber.document.show(this.getContext().tag + " .W_COMPONENT");
        this.setBorder(this.getContext().border);
        this.setTitleBar({
            normal: false,
            minimized: true,
            maximized: true,
            solo: true
        });
    };

    /**
    * popup a window.
    * @function solo
    * @param {object} params Function settings.
    * @param {int} params.index Component's index
    */
    this.solo = function (params) {
        Clouber.document.addClass(this.getContext().tag + " .Clouber_Window",
                "Clouber_Window_pop");

        Clouber.document.append("body",
                '<div class="Clouber_Window_locker"></div>');
        Clouber.document.fadeIn(".Clouber_Window_locker");
        Clouber.document.show(this.getContext().tag + " .W_COMPONENT");
        this.setBorder(true);
        this.setTitleBar({
            normal: true,
            minimized: true,
            maximized: true,
            solo: false
        });
    };

    /**
    * minimized a window.
    * @function minimized
    * @param {object} params Function settings.
    * @param {int} params.index Component's index
    */
    this.minimized = function (params) {
        Clouber.document.removeClass(this.getContext().tag + " .Clouber_Window",
                "Clouber_Window_pop");
        Clouber.document.fadeOut(".Clouber_Window_locker",
                "normal", function () {
                Clouber.document.remove(".Clouber_Window_locker");
            });
        Clouber.document.hide(this.getContext().tag + " .W_COMPONENT");
        this.setBorder(this.getContext().border);
        this.setTitleBar({
            normal: true,
            minimized: false,
            maximized: true,
            solo: true
        });
    };

    /**
    * Maximize a window , must be overrided.
    * @function maximized
    * @param {object} params Function settings.
    * @param {int} params.index Component's index
    */
    this.maximized = function (params) {
        Clouber.document.addClass(this.getContext().tag + " .Clouber_Window",
                "Clouber_Window_pop");
        this.setBorder(true);
        Clouber.document.fadeOut(".Clouber_Window_locker",
                "normal", function () {
                Clouber.document.remove(".Clouber_Window_locker");
            });

        Clouber.document.show(this.getContext().tag + " .W_COMPONENT");
        this.setTitleBar({
            normal: true,
            minimized: true,
            maximized: false,
            solo: true
        });
    };

    /**
    * Close a window.
    * @function close
    * @override
    * @param {object} params Function settings.
    * @param {int} params.index Component's index
    */
    this.close = function (params) {
        Clouber.document.remove(this.getContext().tag);

        Clouber.document.fadeOut(".Clouber_Window_locker", "normal");

        Clouber.document.remove(".Clouber_Window_locker");
    };

};
Clouber.extend(Clouber.Sys.Portal.WindowView, Clouber.Sys.UI.ComponentView);


/**
* The MVC based view object of Page controls.
* @class  Clouber.Sys.Portal.PageView
* @namespace Clouber.Sys.Portal
* @extends Clouber.Sys.UI.ContainerView
* @constructor
* @param {int} index Window index.
*/
Clouber.Sys.Portal.Window = function (index) {
    'use strict';

    /**
    * class type
    * @property {string} TYPE
    */
    this.TYPE = "WINDOW_CONTROLLER";

    /**
    * window's title.
    * @property {string} title
    */
    this.title = "";

    /**
    * Initialization.
    * @function init
    * @override
    */
    this.init = function () {
        var s, i, l;
        this.model.init();

        this.setView(new Clouber.Sys.Portal.WindowView());

        this.view.loadTheme(Clouber.portal.getConf().path);
        this.showWindow();
        this.view.showPortlet();
    };

    /**
    * Destroy this window object.
    * @event destroying
    * @override
    */
    this.destroying = function () {
        this.model.destroy();
    };

    /**
    * Execute a command.
    * @function execute
    * @param {String} command Command name.
    * @param {Object} params Command parameters.
    * @override
    */
    this.execute = function (command, params) {
        switch (command) {
        case "close":
            this.close(params);
            break;
        case "active":
            this.active(params);
            break;
        case "normal":
            this.normal(params);
            break;
        case "minimized":
            this.minimized(params);
            break;
        case "maximized":
            this.maximized(params);
            break;
        case "solo":
            this.solo(params);
            break;
        case "event":
            this.event(params);
            break;
        default:
        }
    };

    /**
    * Refresh the window, can be overrided.
    * @function refresh
    * @param {string} id Component id
    * @override
    */
    this.refresh = function (id) {
        var w;

        if (id === undefined) {
            // refresh window
            this.showWindow();

            // refresh portlet
            if (this.model.isChanged()) {
                // display portlet
                this.view.showPortlet();
            }

        } else if (typeof id === "string") {
            // refresh by portletID
            w = this.getContext();
            if (id === w.portletID + "@" + w.producer) {
                this.view.showPortlet();
            }
        }
    };

    /**
    * Show the window.
    * @function showWindow
    * @param {string} id Component id
    */
    this.showWindow = function (id) {
        var p;

        // initialize the window
        switch (this.model.getState()) {
        case "wsrp:minimized":
            this.minimized();
            break;
        case "wsrp:maximized":
            this.maximized();
            break;
        case "wsrp:solo":
            this.solo();
            break;
        default:
            this.normal();
        }
        p = this.getPortletContext();
        // set window style
        this.view.setTitleBar({close: p.close});
        this.view.setTitleBar({thumbnail: p.thumbnail});
        this.view.setTitleBar({option: p.option});
        this.view.setBorder(p.border);
        this.view.setTitleBar({display: p.titleBar});

        // set window information
        this.view.setTitleBar({title: p.title});
        this.view.setStatusBar({status: p.status});

    };

    /**
    * Close the window.
    * @function close
    */
    this.close = function (params) {
        this.view.close();
        if ((typeof this.container !== "undefined") &&
                (this.container !== null)) {
            this.container.removeWindow(this.model.index);
        }
    };

    /**
    * Active the window.
    * @function active
    */
    this.active = function () {
        if ((typeof this.container !== "undefined") &&
                (this.container !== null)) {
            this.container.active(this.model.index);
        }
    };

    /**
    * normal the window.
    * @function normal
    */
    this.normal = function () {
        this.view.normal();
        this.model.setState("wsrp:normal");
    };

    /**
    * minimized the window.
    * @function normal
    */
    this.minimized = function () {
        this.view.minimized();
        this.model.setState("wsrp:minimized");
    };

    /**
    * maximized the window.
    * @function maximized
    */
    this.maximized = function () {
        this.view.maximized();
        this.model.setState("wsrp:maximized");
    };

    /**
    * solo the window.
    * @function solo
    */
    this.solo = function () {
        this.view.solo();
        this.model.setState("wsrp:solo");
    };

    /**
    * set the window's Title
    * @function setTitle
    * @param {String} title
    */
    this.setTitle = function (title) {
        Clouber.log("Clouber.Sys.Portal.Window#setTitle (" + title + " " +
            this.getPortletContext().portletID + ")");

        this.view.setTitleBar({title: title});

        if ((typeof this.container !== "undefined") &&
                (this.container !== null)) {
            this.container.setTitle(this.model.index, title);
        }
        this.getPortletContext().title = title;
    };

    /**
    * set the window's status
    * @function setStatus
    * @param {String} status
    */
    this.setStatus = function (status) {
        Clouber.log("Clouber.Sys.Portal.Window#setStatus (" + status + " " +
            this.getPortletContext().portletID + ")");
        this.view.setStatusBar({status: status});
        this.getPortletContext().status = status;
    };

    /**
    * set the window's Border
    * @function setBorder
    * @param (boolean) b
    */
    this.setBorder = function (b) {
        if (typeof b === "boolean") {
            this.getPortletContext().border = b;
            this.view.setBorder(b);
            Clouber.log("Clouber.Sys.Portal.Window#setBorder " + b + " (" +
                this.getPortletContext().portletID + ")");
        }
    };

    /**
    * set the window's TitleBar
    * @function setTitleBar
    * @param (boolean) b
    */
    this.setTitleBar = function (b) {
        if (typeof b === "boolean") {
            this.getPortletContext().titleBar = b;
            this.view.setTitleBar({display: b});
            Clouber.log("Clouber.Sys.Portal.Window#setTitleBar " + b + " (" +
                this.getPortletContext().portletID + ")");
        }
    };

    /**
    * set the window's StatusBar
    * @function setStatus
    * @param (boolean) b
    */
    this.setStatusBar = function (b) {
        if (typeof b === "boolean") {
            this.getPortletContext().statusBar = b;
            //this.view.setStatusBar({display: b});
            Clouber.log("Clouber.Sys.Portal.Window#setStatusBar " + b + " (" +
                this.getPortletContext().portletID + ")");
        }
    };

    /**
    * get Portlet context .
    * @function getPortletContext
    * @return {object} Portlet context.
    */
    this.getPortletContext = function () {
        return this.model.getPortletContext();
    };


};
Clouber.extend(Clouber.Sys.Portal.Window, Clouber.Sys.UI.ComponentController);

