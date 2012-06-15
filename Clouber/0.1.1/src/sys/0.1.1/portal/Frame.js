/**
* @fileOverview Clouber portal frame module.
* @module Clouber.sys.portal.Frame
* @author   <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
* @version 0.1.1
* @requires Clouber.*, Clouber.sys.ui.*, Clouber.sys.portal.*
*/

Clouber.namespace("Clouber.sys.portal");

/**
* The model of portal frame.
* @class  Clouber.sys.portal.FrameContext
* @namespace Clouber.sys.portal
* @extends Clouber.sys.ui.Model
* @constructor
*/
Clouber.sys.portal.FrameContext = function (index) {
    'use strict';

    /**
    * @constant TYPE
    */
    this.TYPE = "FRAME_CONTEXT";

    /**
    * Frame index
    * @property index
    */
    this.index = index;

    /**
    * Get frame context.
    * @function getContext
    * @override
    * @return {object}
    */
    this.getContext = function () {
        return Clouber.portal.context.pageContext.frames.get(this.index);
    };
};
Clouber.extend(Clouber.sys.portal.FrameContext, Clouber.sys.ui.Model);

/**
* The panel of window Frame.
* @class  Clouber.sys.portal.FramePanel
* @namespace Clouber.sys.portal
* @constructor
* @extends Clouber.BaseObject
* @param {String} tag Panel target tab.
* @param {String} type Panel type: tile, tab, accordion, free, template.
* @param {String} code Panel markup code.
* @param {String} theme Panel theme.
*/
Clouber.sys.portal.FramePanel = function (id, tag, style, code, theme) {
    'use strict';

    /**
    * panel's style, such as tile, tab, accordion, template
    * @property {string} style
    */
    this.style = (style === undefined) ? "tile" : style;

    /**
    * panel's template
    * @property {string} template
    */
    this.template = (style === "template") ? code : undefined;

    /**
    * panel's tag
    * @property {string} tag
    */
    this.tag = tag;

    /**
    * Frame's UID
    * @property {string} id
    */
    this.id = id;

    /**
    * panel's tag
    * @property {string} tag
    */
    this.theme = (theme === undefined) ? "default" : theme;

    /**
    * panel's windows
    * @property {int} windows
    */
    this.windows = [];

    /**
    * Set a tab title.
    * @function setPanelTitleBar
    * @override
    * @param {object} params Function settings.
    * @param {int} index Component's index
    */
    this.setPanelTitleBar = function (index, params) {
        var tag;

        if ((this.style !== "tab") && (this.style !== "accordion")) {
            return;
        }


        if (params === undefined) {
            return;
        }

        if ((index === undefined) || (index < 0)) {
            tag = this.tag + " .Clouber_FramePanel .CLOUBER_FRAME_NAVBAR";
            index = -1;

        } else {
            tag = this.tag +
                    " .Clouber_FramePanel .Clouber_Frame_t" +
                    index;
        }

        this.setTitle(index, params, tag);
    };

    /**
    * Set container's border.
    * @function setPanelBorder
    * @param {object} params Function settings.
    * @param {int} index Component's index
    */
    this.setPanelBorder = function (index, params) {
        var tag;

        if (params === undefined) {
            return;
        }

        if ((index === undefined) || (index < 0)) {
            tag = this.tag + " .Clouber_FramePanel";
            index = -1;

        } else {
            tag = this.tag +
                    " .Clouber_FramePanel .Clouber_Frame_t" +
                    index + " .tab";
        }

        this.border(params, tag);
    };

    /**
    * active a window in a multi-window container.
    * @function active
    * @param {int} index Component's index
    */
    this.active = function (index) {
        var i, l;

        if ((this.style !== "tab") && (this.style !== "accordion")) {
            return;
        }

        // default active tab is the first tab
        if (index === undefined) {
            index = this.windows[0];
        }
        // set current tab
        for (i = 0, l = this.windows.length; i < l; i++) {

            if (index === this.windows[i]) {
                Clouber.document.addClass(this.tag +
                        " .Clouber_FramePanel .Clouber_Frame_t" +
                        this.windows[i], "current");

                Clouber.document.css(this.tag +
                    " .Clouber_FramePanel .Clouber_Frame_c" + this.windows[i],
                    "display", "block");

            } else {
                Clouber.document.removeClass(this.tag +
                        " .Clouber_FramePanel .Clouber_Frame_t" +
                        this.windows[i], "current");

                Clouber.document.css(this.tag +
                        " .Clouber_FramePanel .Clouber_Frame_c" +
                        this.windows[i], "display", "none");
            }
        }
    };

    /**
    * Remove a window html into this frame panel.
    * @function removeWindow
    * @param {object} params function settings.
    * @param {int} index component's index.
    */
    this.removeWindow = function (index, params) {
        var i, l;
        Clouber.document.remove(this.tag +
                " .Clouber_FramePanel .Clouber_Frame_t" +
                index);
        Clouber.document.remove(this.tag +
                " .Clouber_FramePanel .Clouber_Frame_c" +
                index);
        // remove the window in this.windows
        for (i = 0, l = this.windows.length; i < l; i++) {
            if (index === this.windows[i]) {
                this.windows.splice(i, 1);
                break;
            }
        }
        this.active();
    };

    /**
    * Add a window html into this frame panel.
    * @function addWindow
    * @param {object} params function settings.
    * @param {int} index component's index.
    * @param {string} params.title component's index.
    * @param {String} params.event Window's active event
    */
    this.addWindow = function (index, params) {
        var html, h, s;

        if ((params === undefined) ||
                (index === undefined)) {
            return;
        }

        // remove tag if it exists
        h = Clouber.document.html(this.tag +
                " .Clouber_FramePanel .Clouber_Frame_t" +
                index);

        if (h !== null) {
            Clouber.document.remove(this.tag +
                    " .Clouber_FramePanel .Clouber_Frame_t" +
                    index);
            Clouber.document.remove(this.tag +
                    " .Clouber_FramePanel .Clouber_Frame_c" +
                    index);
        }

        // add new tab
        if (this.style === "tab") {
            html = '<div class="Clouber_Frame_t' + index +
                ' tab"><div class="thumbnail"></div>' +
                '<div class="close" onclick="Clouber.portal.execute(' +
                this.id.toString() + ', \'close\', ' + index.toString() +
                ');"></div><div class="title">' +
                '<h3 onclick="Clouber.portal.execute(' + this.id.toString() +
                ', \'active\', ' + index.toString() +
                ');"></h3></div>\n<div class="menu">\n</div></div>';
            Clouber.document.append(this.tag +
                " .Clouber_FramePanel .CLOUBER_FRAME_NAVBAR .CLOUBER_TAB",
                html);
        } else if (this.style === "accordion") {
            html = '<div class="Clouber_Frame_t' + index +
                ' accordion"><div class="thumbnail"></div>' +
                '<div class="close" onclick="Clouber.portal.execute(' +
                this.id.toString() + ', \'close\', ' + index.toString() +
                ');"></div><div class="title">' +
                '<h3 onclick="Clouber.portal.execute(' + this.id.toString() +
                ', \'active\', ' + index.toString() +
                ');"></h3></div>\n<div class="menu">\n</div></div>';
            Clouber.document.append(this.tag +
                " .Clouber_FramePanel .CLOUBER_FRAME_NAVBAR",
                html);
        }

         // add new component
        html = '<div class="Clouber_Frame_c' + index +
                ' comp"><div class="CLOUBER_COMP"></div></div>';

        Clouber.document.append(this.tag +
            " .Clouber_FramePanel .CLOUBER_COMPS", html);


        // set titlebar
        this.setPanelTitleBar(index, {title: params.title});

        Clouber.document.attr(this.tag +
                " .Clouber_FramePanel .Clouber_Frame_t" +
                index + " .tab .title", "onclick", params.event);

        this.windows.push(index);
        if (this.windows.length > 0) {
            this.active(this.windows[0]);
        }
    };

    /**
    * Set a window and container's border' CSS.
    * @function border
    * @param {object} params function settings.
    * @param {boolean} params.display Display border.
    * @param {string} params.css Border's CSS string.
    */
    this.border = function (params, tag) {

        if ((typeof params.display !== "undefined") &&
                (params.display === false)) {
            Clouber.document.css(tag + " .Clouber_Frame_b", "border", "none");
            Clouber.document.css(tag + " .Clouber_Frame_b", "background-color",
                "transparent");
        }

        // set css
        if ((typeof params.css !== "undefined") && (params.css !== null)) {
            Clouber.document.css(tag + " .Clouber_Frame_b",
                "border", params.css);
        }
    };

    /**
    * Set a Title bar.
    * @function setTitle
    * @param {object} params function settings.
    * @param {boolean} params.display Display title bar.
    * @param {object} params.css Border's CSS string(params.css.name/value).
    * @param {boolean} params.thumbnail Display thumbnail.
    * @param {object} params.thumbnail.css Border's CSS(params.css.name/value).
    * @param {string} params.thumbnail.html Border's html string.
    * @param {string} params.title Title text.
    * @param {boolean} params.close Display close butten.
    * @param {boolean} params.option Display option butten.
    * @param {string} params.variable Window instance variable.
    */
    this.setTitle = function (index, params, tag) {
        // set title bar
        if ((typeof params.display !== "undefined") &&
                (params.display === true)) {

            if (index < 0) {
                Clouber.document.show(tag);
            } else {
                Clouber.document.show(tag);
            }
        }

        // display titlebar
        if ((typeof params.display !== "undefined") &&
                (params.display === false)) {

            if (index < 0) {
                Clouber.document.hide(tag);
            } else {
                Clouber.document.hide(tag);
            }
        }

        // set title bar css
        if ((typeof params.css !== "undefined") && (params.css !== null)) {
            Clouber.document.css(tag,
                params.css.name, params.css.value);
        }

        // set title text
        if ((typeof params.title !== "undefined") && (params.title !== null)) {
            var s = tag + " .title h3";
            Clouber.document.text(s, params.title);
        }

        // set thumbnail
        if ((typeof params.thumbnail !== "undefined") &&
                (params.thumbnail === true)) {
            Clouber.document.show(tag + " .thumbnail");
        }

        if ((typeof params.thumbnail !== "undefined") &&
                (params.thumbnail === false)) {
            Clouber.document.hide(tag + " .thumbnail");
        }

        if ((typeof params.thumbnail !== "undefined") &&
                (typeof params.thumbnail.css !== "undefined")) {
            Clouber.document.css(tag + " .thumbnail",
                params.thumbnail.css.name, params.thumbnail.css.value);
        }

        // set close button
        if ((typeof params.close !== "undefined") && (params.close === true)) {
            Clouber.document.show(tag + " .close");
        }

        if ((typeof params.close !== "undefined") && (params.close === false)) {
            Clouber.document.hide(tag + " .close");
        }

    };

    // generate panel html;
    if (this.style === "template") {
        Clouber.document.html(this.tag, this.template);

    // tab style
    } else if (this.style === "tab") {
        Clouber.document.html(this.tag, '<div class="Clouber_FramePanel" id="' +
            this.getId() + '"><div class="CLOUBER_FRAME_NAVBAR">' +
            '<div class="CLOUBER_TAB"></div><div class="CLOUBER_TAB_F"></div>' +
            '</div><div class="CLOUBER_COMPS CLOUBER_TAB">' +
            '</div><div class="Clouber_Frame_Footer"></div></div>');

    } else if (this.style === "accordion") {
        Clouber.document.html(this.tag, '<div class="Clouber_FramePanel" id="' +
            this.getId() +
            '"><div class="CLOUBER_ACCD CLOUBER_FRAME_NAVBAR"></div>' +
            '<div class="CLOUBER_ACCD CLOUBER_COMPS"></div>' +
            '<div class="Clouber_Frame_Footer"></div></div>');

    } else {    // tile or free
        Clouber.document.html(this.tag, '<div class="Clouber_FramePanel" id="' +
            this.getId() + '"><div class="CLOUBER_COMPS">' +
            '</div><div class="Clouber_Frame_Footer"></div></div>');
    }
    this.setPanelBorder({display: false});
};
Clouber.extend(Clouber.sys.portal.FramePanel, Clouber.BaseObject);


/**
* The MVC based view object of window consumer.
* @class  Clouber.sys.portal.FrameView
* @namespace Clouber.sys.portal
* @extends Clouber.sys.ui.ComponentView
* @constructor
* @param {object} params Object initial settings.
* @param  params.app application name
* @param  params.version application version
* @param  params.module application module
* @param  params.control control name
* @param  params.theme web page theme, include htmls, CSSs, images
* @param  params.variable variable instance name
*/
Clouber.sys.portal.FrameView = function () {
    'use strict';

    /**
    * class type
    * @property {string} TYPE
    */
	this.TYPE = "FRAME_VIEW";
    /**
    * Frame's top panel
    * @property {FramePanel} top
    */
    this.top = {};

    /**
    * Frame's left panel
    * @property {FramePanel} left
    */
    this.left = {};

    /**
    * Frame's right panel
    * @property {FramePanel} right
    */
    this.right = {};

    /**
    * Frame's content panel
    * @property {FramePanel} content
    */
    this.content = {};

    /**
    * Frame's bottom panel
    * @property {FramePanel} bottom
    */
    this.bottom = {};

    /**
    * Generate  this frame' html.
    * @function
    * @override
    * @return {string} HTML string.
    */
    this.getHtml = function () {
        return '<div class="Clouber_Frame" id="' +
            this.controller.getId() +
            '">' +
            '<div class="topPANEL"></div>' +
            '<div class="leftPANEL"></div>' +
            '<div class="contentPANEL"></div>' +
            '<div class="rightPANEL"></div>' +
            '<div class="bottomPANEL"></div>' +
            '</div></div></div></div></div></div>';
    };

    /**
    * Add CSS file link to the html document. can be overrided.
    * @function loadCss
    * @override
    */
    this.loadCss = function () {
        // load frame's common CSS
        Clouber.loader.load(
            {namespace: this.getContext().Class,
                theme: this.getContext().theme},
            "css"
        );

        // load frame's customized CSS
        Clouber.loader.load(
            {namespace: this.getContext().namespace, theme:
                this.getContext().c_theme},
            "css"
        );
    };

    /**
    * After theme loading, generate frame panels.
    * @event themeLoaded
    * @override
    * @return {string} HTML string.
    */
    this.themeLoaded = function () {
        this.top = new Clouber.sys.portal.FramePanel(
            this.controller.getId(),
            this.getContext().tag + " .Clouber_Frame .topPANEL",
            this.getContext().top
        );

        this.left = new Clouber.sys.portal.FramePanel(
            this.controller.getId(),
            this.getContext().tag + " .Clouber_Frame .leftPANEL",
            this.getContext().left
        );

        this.right = new Clouber.sys.portal.FramePanel(
            this.controller.getId(),
            this.getContext().tag + " .Clouber_Frame .rightPANEL",
            this.getContext().right
        );

        if (this.getContext().content === "template") {
            this.content = new Clouber.sys.portal.FramePanel(
                this.controller.getId(),
                this.getContext().tag +
                    " .Clouber_Frame .contentPANEL",
                this.getContext().content,
                this.getContext().c_code,
                this.getContext().c_theme
            );
        } else {
            this.content = new Clouber.sys.portal.FramePanel(
                this.controller.getId(),
                this.getContext().tag +
                    " .Clouber_Frame .contentPANEL",
                this.getContext().content
            );
        }

        this.bottom = new Clouber.sys.portal.FramePanel(
            this.controller.getId(),
            this.getContext().tag + " .Clouber_Frame .bottomPANEL",
            this.getContext().bottom
        );

        // default frame setting
        this.setBorder(-1, {display: false});
    };

    /**
    * Get component target tag.
    * @function getComponentTarget
    * @param {object} params function settings.
    * @param {String} params.position Window position.
    * @param {int} index Component index.
    * @return {string} component tag selector.
    */
    this.getComponentTarget = function (index, params) {
        var tag;
        if ((typeof params.tag !== "undefined") && (params.tag.length > 0)) {
            tag = this.getContext().tag +
                " .Clouber_Frame ." + params.position + "PANEL ." + params.tag;
        } else {
            tag = this.getContext().tag +
                " .Clouber_Frame ." + params.position +
                "PANEL .Clouber_Frame_c" + index + " .CLOUBER_COMP";
        }
        return tag;
    };

    /**
    * Set a window's title in the container's title bar.
    * @function setTitleBar
    * @param {object} params function settings.
    * @param  params.position component's position
    */
    this.setTitleBar = function (index, params) {
        var c = this.getContext().windows.get(index);
        switch (c.position) {
        case "top":
            this.top.setPanelTitleBar(index, params);
            break;
        case "right":
            this.right.setPanelTitleBar(index, params);
            break;
        case "left":
            this.left.setPanelTitleBar(index, params);
            break;
        case "bottom":
            this.bottom.setPanelTitleBar(index, params);
            break;
        case "content":
            this.content.setPanelTitleBar(index, params);
            break;
        default:
            this.content.setPanelTitleBar(index, params);
        }
    };

    /**
    * Set container's border.
    * @function setBorder
    * @param {object} params function settings.
    * @param  params.position component's position
    */
    this.setBorder = function (index, params) {
        var c;

        if (index < 0) {
            this.content.border(params, this.getContext().tag +
                " .Clouber_Frame");

        } else {
            c = this.getContext().windows.get(index);
            switch (c.position) {
            case "top":
                this.top.setPanelBorder(index, params);
                break;
            case "right":
                this.right.setPanelBorder(index, params);
                break;
            case "left":
                this.left.setPanelBorder(index, params);
                break;
            case "bottom":
                this.bottom.setPanelBorder(index, params);
                break;
            default:
                this.content.setPanelBorder(index, params);
            }
        }
    };

    /**
    * Close a window.
    * @function close
    * @param {int} index component index.
    * @param  params.position component's position
    */
    this.close = function (index) {
        var params = this.getContext().windows.get(index);
        switch (params.position) {
        case "top":
            this.top.close(index, params);
            break;
        case "right":
            this.right.close(index, params);
            break;
        case "left":
            this.left.close(index, params);
            break;
        case "bottom":
            this.bottom.close(index, params);
            break;
        default:
            this.content.close(index, params);
        }
    };

    /**
    * active a window in a multi-window container.
    * @function active
    * @param {int} index component index.
    */
    this.active = function (index) {
        var params = this.getContext().windows.get(index);
        switch (params.position) {
        case "top":
            this.top.active(index);
            break;
        case "right":
            this.right.active(index);
            break;
        case "left":
            this.left.active(index);
            break;
        case "bottom":
            this.bottom.active(index);
            break;
        default:
            this.content.active(index);
        }
    };

    /**
    * Set title of a window in a multi-window container.
    * @function setTitle
    * @param {int} index component index.
    * @param {String} title component title.
    */
    this.setTitle = function (index, title) {
        var params = this.getContext().windows.get(index);
        switch (params.position) {
        case "top":
            this.top.setPanelTitleBar(index, {index: index, title: title});
            break;
        case "right":
            this.right.setPanelTitleBar(index, {index: index, title: title});
            break;
        case "left":
            this.left.setPanelTitleBar(index, {index: index, title: title});
            break;
        case "bottom":
            this.bottom.setPanelTitleBar(index, {index: index, title: title});
            break;
        default:
            this.content.setPanelTitleBar(index, {index: index, title: title});
        }
    };

    /**
    * Add a window html into this frame .
    * @function addWindow
    * @param {int} index window index
    * @param {object} params function settings.
    * @param {string} params.position component's position
    * @param {string} params.title component's index.
    */
    this.addWindow = function (index, params) {
        switch (params.position) {
        case "top":
            this.top.addWindow(index, params);
            break;
        case "right":
            this.right.addWindow(index, params);
            break;
        case "left":
            this.left.addWindow(index, params);
            break;
        case "bottom":
            this.bottom.addWindow(index, params);
            break;
        default:
            this.content.addWindow(index, params);
        }
    };

    /**
    * Remove a window html into this frame .
    * @function addWindow
    * @param {int} index window index
    * @param {object} params function settings.
    * @param {string} params.position component's position
    */
    this.removeWindow = function (index, params) {
        switch (params.position) {
        case "top":
            this.top.removeWindow(index, params);
            break;
        case "right":
            this.right.removeWindow(index, params);
            break;
        case "left":
            this.left.removeWindow(index, params);
            break;
        case "bottom":
            this.bottom.removeWindow(index, params);
            break;
        default:
            this.content.removeWindow(index, params);
        }
    };
};
Clouber.extend(Clouber.sys.portal.FrameView, Clouber.sys.ui.ComponentView);

/**
* The MVC based controller of window consumer.
* @class  Clouber.sys.portal.Frame
* @namespace Clouber.sys.portal
* @extends Clouber.sys.ui.ComponentController
* @constructor
* @param {object} params Object initial settings.
* @param  params.app application name
* @param  params.version application version
* @param  params.module application module
* @param  params.control control name
* @param  params.theme web page theme, include htmls, CSSs, images
* @param  params.variable variable instance name
*/
Clouber.sys.portal.Frame = function (params) {
    'use strict';

    /**
    * class type
    * @property {string} TYPE
    */
	this.TYPE = "FRAME_CONTROLLER";

    /**
    * frmae's title is acitve window's title.
    * @property {string} title
    */
	this.title = "";

    /**
    * Initialize Frame control, display the frame.
    * @function init
    * @param {Map} params Parameters.
    * @override
    */
    this.init = function (params) {
        var i, len, comp;

        this.setting();
        this.setView(new Clouber.sys.portal.FrameView());

        // generate frame markup
        this.view.loadTheme();

        // generate windows.
        for (i = 0, len = this.getContext().windows.size(); i < len; i++) {
            this.addWindow(i);
            // default settings of the window
            this.view.setTitleBar(i, {close: false});
            this.view.setTitleBar(i, {thumbnail: false});
            this.view.setTitleBar(i, {css: {name: "width", value: "7em"}});
        }
    };

    /**
    * Initialize Frame control, display the frame.
    * @function getComponentTarget
    * @param {int} index Component index of this frame.
    * @return {string} Component's target tag.
    */
    this.getComponentTarget = function (index) {
        var param = {};
        param.index = index;
        param = Clouber.merge(param, this.getContext().windows.get(index));
        return this.view.getComponentTarget(index, param);
    };

    /**
    * Get window's position.
    * @function getWindowPosition
    * @param {int} index Component index of this frame.
    * @return {string} Component's target tag.
    */
    this.getWindowPosition = function (index) {
        return this.getContext().windows.get(index).position;
    };

    /**
    * Add a window object into to this frame control.
    * @function addWindow
    * @param {object} component Component' object instance.
    * @return {int} Component's index.
    */
    this.addWindow = function (index) {
        var ctx,
            component = new Clouber.sys.portal.Window();
        // initialize window
        component.setModel(new Clouber.sys.portal.WindowModel(index));
        // set component
        this.setComponent(component, index);

        this.container.addControl(component);
        ctx = this.getContext().windows.get(index);
        ctx.index = index;
        ctx.tag = this.getComponentTarget(index);
        ctx.instanceId = component.getId();
        this.view.addWindow(index, ctx);

        // display window
        component.init();
    };

    /**
    * Remove a window object from to this frame control.
    * @function removeWindow
    * @param {object} component Component' object instance.
    * @return {int} Component's index.
    */
    this.removeWindow = function (index) {
        var comp = this.getComponent(index);
        this.view.removeWindow(index, comp.model.getContext());
        this.container.removeControl(comp);
        this.removeComponent(index);
        this.getContext().windows.remove(index);
    };

    /**
    * Refresh the frame.
    * @function refresh
    * @param {string} id Component id
    * @override
    */
    this.refresh = function (id) {
        var i, l;

        if (id === undefined) {
            // refresh every window.
            for (i = 0, l = this.components.size(); i < l; i++) {
                this.components.getByIndex(i).refresh();
            }

        } else if (typeof id === "string") {
            // refresh by portletID
            for (i = 0, l = this.components.size(); i < l; i++) {
                this.components.getByIndex(i).refresh(id);
            }
        }
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
            this.removeWindow(params);
            break;
        case "active":
            this.active(params);
            break;
        default:
        }
    };

    /**
    * active a window in a multi-window container.
    * @function active
    * @param {int} index index of the component.
    */
    this.active = function (index) {
        this.view.active(index);
        this.title = this.components.get(index).getContext().title;
        this.container.setTitle(this.title, this.getContext().fid);
    };

    /**
    * set Title of a window in a multi-window container.
    * @function setTitle
    * @param {int} index index of the component.
    */
    this.setTitle = function (index, title) {
        this.view.setTitle(index, title);
    };

};
Clouber.extend(Clouber.sys.portal.Frame, Clouber.sys.ui.ComponentController);
