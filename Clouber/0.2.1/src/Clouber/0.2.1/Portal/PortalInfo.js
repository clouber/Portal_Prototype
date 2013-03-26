/**
* @fileOverview Clouber portal data type.
* @copyright (c) 20012 by Clouber.org. All rights reserved.
* @author Jon Zhou
* @module Clouber.Portal.Portal
* @requires Clouber.* Clouber.Core.* Clouber.Core.* Clouber.Portal.*
*/

/**
* Clouber system portal modules, using namespace Clouber.Core
* @module Clouber.Portal
* @namespace Clouber.Portal
*/
Clouber.namespace("Clouber.Portal");


/**
* Page window information type.
* @type WindowInfo
* @class WindowInfo
* @namespace Clouber.Portal
*/
Clouber.Portal.WindowInfo = function () {
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
    * position in the region, could be top, left, right, content, bottom
    * @type string
    */
    this.position = "content";

    /**
    * markup tag in the region.
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
    this.initparam = new Clouber.Core.Map();

    /**
    * Portlet's request parameters.
    * @property {Map} parameters
    */
    this.parameters = new Clouber.Core.Map();

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
* Page region information type.
* @type RegionInfo
* @class RegionInfo
* @namespace Clouber.Portal
*/
Clouber.Portal.RegionInfo = function () {
    'use strict';
    /**
    * Region ID.
    * @type string
    */
    this.fid = "";

    /**
    * Region instanceId
    * @type int
    */
    this.instanceId = -1;

    /**
    * Region's target tag.
    * @type string
    */
    this.tag = "";

    /**
    * Region's class.
    * @type string
    */
    this.Class = "Clouber.Portal.Region";

    /**
    * Region's namespace.
    * @type string
    */
    this.namespace = "";

    /**
    * Region's description.
    * @type string
    */
    this.description = "";

    /**
    * Region's theme
    * @type string
    */
    this.theme = "default";

    /**
    * Portlet border.
    * @property {string} border
    */
    this.border = false;
    
    /**
    * Style of region's top panel, could be tile, tab, accordion
    * @type string
    */
    this.top = "tile";

    /**
    * Style of region's left panel.
    * @type string
    */
    this.left = "tile";

    /**
    * Style of region's right panel.
    * @type string
    */
    this.right = "tile";

    /**
    * Style of region's content panel. only content style can be template.
    * @type string
    */
    this.content = "tile";

    /**
    * Region's content panel's template markup code.
    * @type string
    */
    this.c_code = "";

    /**
    * Region's content panel's theme.
    * @type string
    */
    this.c_theme = "default";

    /**
    * Style of region's bottom panel.
    * @type string
    */
    this.bottom = "tile";

    /**
    * Windows of the region.
    * @type array(WindowInfo)
    */
    this.windows = new Clouber.Core.Map();

};

/**
* Page information type.
* @type PageInfo
* @class PageInfo
* @namespace Clouber.Portal
*/
Clouber.Portal.PageInfo = function () {
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
    * Page's content region id.
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
    * Page's regions.
    * @type Map
    */
    this.regions = new Clouber.Core.Map();

    /**
    * Page's portlets.
    * @property {Map} portlets
    */
    this.portlets = new Clouber.Core.Map();

};

