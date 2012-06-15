/**
* @fileOverview Clouber portal data type.
* @module Clouber.sys.portal.Portal
* @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
* @version 0.1.0
* @requires Clouber
*/

/**
* Clouber system portal modules, using namespace Clouber.sys.ui
* @module Clouber.sys.portal
* @namespace Clouber.sys.portal
*/
Clouber.namespace("Clouber.sys.portal");


/**
* Page window information type.
* @type WindowInfo
* @class WindowInfo
* @namespace Clouber.sys.portal
*/
Clouber.sys.portal.WindowInfo = function () {
    'use strict';

    /**
    * window instanceId
    * @type int
    */
    this.instanceId = -1;

    /**
    * Window namespace could be portlet id.
    * @type string
    */
    this.namespace = "";

    /**
    * portlet configuration object
    * @property {object}
    */
    this.config = null;

    /**
    * window's theme
    * @type string
    */
    this.theme = "default";

    /**
    * position in the frame, could be top, left, right, content, bottom
    * @type string
    */
    this.position = "content";

    /**
    * markup tag in the frame.
    * @type string
    */
    this.tag = "";

    /**
    * Window state.
    * @type string
    */
    this.windowState = "wsrp:normal";

    /**
    * portlet mode.
    * @type string
    */
    this.mode = "wsrp:view";

    /**
    * Window title.
    * @property {string} title
    */
    this.title = null;

    /**
    * Window border.
    * @property {boolean} border
    */
    this.border = false;

    /**
    * Window titleBar.
    * @property {boolean} titleBar
    */
    this.titleBar = false;

    /**
    * Window statusBar.
    * @property {boolean} statusBar
    */
    this.statusBar = true;

    /**
    * Window statusBar information.
    * @property {string} status
    */
    this.status = null;

    /**
    * Window message.
    * @property {string} message
    */
    this.message = null;

    /**
    * Window theme.
    * @property {string} theme
    */
    this.theme = "default";

    /**
    * Window close button.
    * @property {boolean} close
    */
    this.close = false;

    /**
    * Window thumbnail image.
    * @property {boolean} thumbnail
    */
    this.thumbnail = false;

    /**
    * Window option button.
    * @property {boolean} option
    */
    this.option = false;

    /**
    * Portlet script name
    * @property {string} script
    */
    this.script = null;

    /**
    * producer url, localhost means local producer.
    * @type string
    */
    this.producer = "localhost";

    /**
    * portlet ID could be portlet id.
    * @type string
    */
    this.portletID = "";

    /**
    * Portlet's initial parameter object.
    * @property {Map} initparam
    */
    this.initparam = new Clouber.Map();

    /**
    * Portlet's request parameters.
    * @property {Map} parameters
    */
    this.parameters = new Clouber.Map();

    /**
    * Portlet content.
    * @property {boolean} changed
    */
    this.changed = false;

    /**
    * Portlet markup.
    * @property {String} markup
    */
    this.markup = "";

    /**
    * Portlet css url.
    * @property {String} css
    */
    this.css = "";

};

/**
* Page frame information type.
* @type FrameInfo
* @class FrameInfo
* @namespace Clouber.sys.portal
*/
Clouber.sys.portal.FrameInfo = function () {
    'use strict';
    /**
    * Frame ID.
    * @type string
    */
    this.fid = "";

    /**
    * Frame instanceId
    * @type int
    */
    this.instanceId = -1;

    /**
    * Frame's target tag.
    * @type string
    */
    this.tag = "";

    /**
    * Frame's class.
    * @type string
    */
    this.Class = "Clouber.sys.portal.Frame";

    /**
    * Frame's namespace.
    * @type string
    */
    this.namespace = "";

    /**
    * Frame's description.
    * @type string
    */
    this.description = "";

    /**
    * Frame's theme
    * @type string
    */
    this.theme = "default";

    /**
    * Style of frame's top panel, could be tile, tab, accordion
    * @type string
    */
    this.top = "tile";

    /**
    * Style of frame's left panel.
    * @type string
    */
    this.left = "tile";

    /**
    * Style of frame's right panel.
    * @type string
    */
    this.right = "tile";

    /**
    * Style of frame's content panel. only content style can be template.
    * @type string
    */
    this.content = "tile";

    /**
    * Frame's content panel's template markup code.
    * @type string
    */
    this.c_code = "";

    /**
    * Frame's content panel's theme.
    * @type string
    */
    this.c_theme = "default";

    /**
    * Style of frame's bottom panel.
    * @type string
    */
    this.bottom = "tile";

    /**
    * Windows of the frame.
    * @type array(WindowInfo)
    */
    this.windows = new Clouber.Map();

};

/**
* Page information type.
* @type PageInfo
* @class PageInfo
* @namespace Clouber.sys.portal
*/
Clouber.sys.portal.PageInfo = function () {
    'use strict';

    /**
    * Page id
    * @type string
    */
    this.pid = "";

    /**
    * Page language
    * @type string
    */
    this.lang = "en";

    /**
    * Page's title
    * @type string
    */
    this.title = "";

    /**
    * Page's description
    * @type string
    */
    this.description = "";

    /**
    * Page's keywords, used by search engine.
    * @type string
    */
    this.keywords = "";

    /**
    * Page's robots, used by search engine.
    * @type string
    */
    this.robots = "INDEX, FOLLOW";

    /**
    * Page's template.
    * @type string
    */
    this.template = "default";

    /**
    * Page's template's markup code.
    * @type string
    */
    this.code = "";

    /**
    * Page's content frame id.
    * @type string
    */
    this.content = "";

    /**
    * Page's namespace
    * @type string
    */
    this.namespace = "";

    /**
    * Page's theme
    * @type string
    */
    this.theme = "";

    /**
    * Page's frames.
    * @type Map
    */
    this.frames = new Clouber.Map();

    /**
    * Page's portlets.
    * @property {Map} portlets
    */
    this.portlets = new Clouber.Map();

};

