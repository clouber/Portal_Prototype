/**
* @fileOverview Clouber portal data type.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber.Sys.Portal.Portal
* @requires Clouber.* Clouber.Sys.Core.* Clouber.Sys.UI.* Clouber.Sys.Portal.*
*/

/**
* Clouber system portal modules, using namespace Clouber.Sys.UI
* @module Clouber.Sys.Portal
* @namespace Clouber.Sys.Portal
*/
Clouber.namespace("Clouber.Sys.Portal");


/**
* Page window information type.
* @type WindowInfo
* @class WindowInfo
* @namespace Clouber.Sys.Portal
*/
Clouber.Sys.Portal.WindowInfo = function () {
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
    * Portlet script name
    * @property {string} script
    */
    this.script = null;

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
    * Portlet content expired.
    * @property {boolean} expired
    */
    this.expired = false;

    /**
    * Portlet content displayed.
    * @property {boolean} displayed
    */
    this.displayed = false;

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
* @namespace Clouber.Sys.Portal
*/
Clouber.Sys.Portal.FrameInfo = function () {
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
    this.Class = "Clouber.Sys.Portal.Frame";

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
    * Portlet border.
    * @property {string} border
    */
    this.border = false;
    
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
* @namespace Clouber.Sys.Portal
*/
Clouber.Sys.Portal.PageInfo = function () {
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

