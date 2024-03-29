/**
* @fileOverview Clouber portal js library.
* @module Clouber.sys.portal.Portal
* @author  <a href="mailto:jzhouj@gmail.com">Jon Zhou</a>
* @version 0.1.0
* @requires Clouber, Clouber.sys.core.*, Clouber.sys.ui.*
*/

/**
* Clouber system portal modules, using namespace Clouber.sys.ui
* @module Clouber.sys.portal
* @namespace Clouber.sys.portal
*/
Clouber.namespace("Clouber.sys.portal");


/**
* Portal is a portlet consumer application.
* A Consumer is an application that incorporates, in part or whole, an
* intermediary function that communicates with presentation-oriented web
* services (i.e. Producers and the Portlets they host) on behalf of its
* End-Users. It gathers and aggregates the markup delivered by the Portlets
* and other view components for presentation to the End-User. Because of this
* intermediary role, Consumers are often compared to "message switches" that
* route messages between various parties.
* 1. Consumer "discovers" the Producer.
* 2. Establishment of a relationship between the Consumer and Producer.
* 3. Consumer learning the full capabilities and services of the Producer
*    based on the now established relationship.
* 4. Establishment of a relationship between the Consumer and End-User.
* 5. Production of aggregated pages.
* 6. Request for a page.
* 7. Processing interactions.
* 8. Destruction of relationships.
* @class Clouber.sys.portal.Portal
* @namespace Clouber.sys.portal
* @extends Clouber.BaseObject
* @constructor
*/
Clouber.sys.portal.Portal = function () {
    'use strict';

    /**
    * object type;
    * @type string
    */
    this.TYPE = "PORTAL";

    /**
    * hash relates to page path
    * @type string
    */
    this.defaultPath = null;

    /**
    * Portlet context object
    * @property {PortalContext} context
    */
    this.context = {};

    /**
    * page control object
    * @type Page
    */
    this._page = null;

    /**
    * Get portal context object
    * @function getContext
    * @return {PortalContext} Poral context object
    */
    this.getContext = function () {
        return this.context;
    };

    /**
    * Initialize portal application
    * @function init
    * @override
    */
    this.init = function () {
        Clouber.log("Clouber.sys.portal.Portal#init");

        this.context = new Clouber.sys.portal.PortalContext(this);
        // set hashchange event
        var p = this;
        Clouber.event.addHandler(
            window,
            "hashchange",
            function () {
                p.load();
            }
        );
        this.load();
    };

    /**
    * load portal application
    * @function load
    */
    this.load = function () {
        var p, c, v;

        Clouber.log("Clouber.sys.portal.Portal#load");

        p = this.getPageInfo();

        // current portal app
        if ((typeof this.context.pageInfo.app !== "undefined") &&
                (this.context.pageInfo.app === p.app)) {

            this.loadPage();

        // new portal app
        } else {
            this._conf = p;
            v = Clouber.config.getVersion();
            c = Clouber.config.getAppConf(v, p.app);

            // URL doesn't exist.
            if ((typeof c === "undefined") ||
                    (typeof c.version === "undefined")) {

                Clouber.log(new Clouber.Exception({
                    number: 10007,
                    name: "PageLoadError",
                    message: Clouber.message.pageNotExist,
                    code: "Clouber.sys.portal.Portal#load"
                }));
                this.errorPage();

            } else {
                // load new portal app config
                this.context.pageInfo.app = p.app;
                this.loadConf();
            }
        }
    };


    /**
    * Display errro message on the page for nonexist pages.
    * @function errorPage
    */
    this.errorPage = function () {
        this.context.pageInfo = {};
        Clouber.document.html("body", "<h1>" +
            Clouber.message.pageNotExist + "</h1>");
        Clouber.log(Clouber.message.pageNotExist + " [" +
            window.location + "]");
    };

    /**
    * get page information according to url/hash parameters.
    * @function loadPage
    * @param {string} hash: window.location.hash
    */
    this.loadPage = function (hash) {
        var p;

        Clouber.log("Clouber.sys.portal.Portal#loadPage (" + hash + ")");

        try {
            p = this.getPageInfo(hash);

            // load language package
            if (typeof this.getParameters().get("CLOUBER_LANG") !==
                    "undefined") {
                this.context.pageInfo.lang =
                    this.getParameters().get("CLOUBER_LANG");
            }

            if ((this.context.pageInfo.lang === undefined) ||
                    (this.context.pageInfo.lang === null)) {

                this.context.pageInfo.lang = "en";
            }
            Clouber.loader.message(this.context.pageInfo.lang);

            // current page
            if ((typeof this.context.pageInfo.page !== "undefined") &&
                    (this.context.pageInfo.page === p.page)) {

                this.update();

            // new page
            } else {
                this.display(p.page);
            }

            // set page info (app name)
            this.context.pageInfo = p;
        } catch (e) {
            Clouber.log(e);
        }
    };

    /**
    * Executes portal page events.
    * @function execute
    * @params {String} uid Object UID
    * @params {String} cmd Command name.
    * @params {object} params Command parameters.
    */
    this.execute = function (uid, cmd, params) {

        Clouber.log("Clouber.sys.portal.Portal#execute (" + uid + ", " +
            cmd + ", " + params + ")");

        try {
            if (uid < 0) {
                this.change(cmd, params);
            } else {
                this._page.execute(uid, cmd, params);
            }
        } catch (e) {
            Clouber.log(e);
        }
    };

    /**
    * Change portal path (page).
    * @function changePath
    * @param {string} path New portal path.
    * @param {Array} params New parameters (Name/Value pairs).
    * @params {boolean} keep Keep query string, default value is false.
    */
    this.changePath = function (path, params, keep) {
        var s, h, i, l;

        Clouber.log("Clouber.sys.portal.Portal#changePath (" + path + ")");

        try {
            h = "#!" + path;

            // add params
            if ((typeof params !== "undefined") && (params instanceof Array)) {
                h = h + "&" + encodeURIComponent(params[0].name) + "=" +
                        encodeURIComponent(params[0].value);
                for (i = 1, l = params.length; i < l; i++) {
                    h = h + "&" +
                        encodeURIComponent(params[i].name) + "=" +
                        encodeURIComponent(params[i].value);
                }
            }

            // keep query string
            if (keep) {
                s = this.getQueryString();
                if ((typeof s !== "undefined") && (s !== "")) {
                    h = h + "&" + s;
                }
            }
            window.location.hash = h;
        } catch (e) {
            Clouber.log(e);
        }
    };

    /**
    * Update data from portlet producer
    * @function request
    * @params {Object} args Action URL
    * @params {String} args.action Action URL
    * @params {String} args.portletID Portlet ID
    * @param {Array} args.params New parameters (Name/Value pairs).
    * @params {Array} args.event Event name.
    */
    this.request = function (args) {
        var attrs, c, p, i, l, hash = window.location.hash;

        Clouber.log("Clouber.sys.portal.Portal#request");

        try {
            if ((typeof this._page !== "undefined") && (this._page !== null) &&
                    (typeof args !== "undefined") && (args !== null)) {

                attrs = new Clouber.Map();
                attrs.put("CLOUBER_PATH", this.getPagePath());

                // set parameters
                p = new Clouber.Map();
                if ((typeof args.params !== "undefined") &&
                        (args.params !== null) &&
                        ((args.params instanceof Array))) {
                    for (i = 0, l = args.params.length; i < l; i++) {
                        p.put(encodeURIComponent(args.params[i].name),
                            encodeURIComponent(args.params[i].value));
                    }
                }
                p.append(this.getParameters(hash));
                
                // handle events
                if ((typeof args.events !== "undefined") &&
                        (args.events !== null) &&
                        (args.events instanceof Array)) {
                    attrs.put("CLOUBER_EVENT", args.events);
                }
                if (typeof args.portletID !== "undefined") {
                    attrs.put("CLOUBER_REQUEST", args.portletID);
                }
                 // submit request
                this.context.request(p, attrs, this.getQueryString());

                // change URL
                if ((typeof args.action !== "undefined") &&
                        (args.action !== null) && (args.action !== "")) {
                    if ((args.method !== undefined) && (args.method !== null) &&
                            (args.method.toLowerCase() === "post")) {
                        // POST action
                        this.changePath(args.action);
                    } else {
                        // GET action
                        this.changePath(args.action, args.params);
                    }
                }
            }
        } catch (e) {
            Clouber.log(e);
        }
    };

    /**
    * display a new portal page.
    * @function display
    * @params {string} page Page name.
    */
    this.display = function (page) {
        var pname, params, attrs;

        Clouber.log("Clouber.sys.portal.Portal#display (" + page + ")");

        try {
            // get page config
            pname = ((typeof page !== "undefined") && (page !== null) &&
                    (page !== "")) ?
                    page :
                    this.context.getPortalConf().pages[0].page;

            // set page context
            if (!this.context.setPage(pname)) {
                Clouber.log(new Clouber.Exception({
                    number: 10007,
                    name: "PageLoadError",
                    message: Clouber.message.pageNotExist + " (" + page + ")",
                    code: "Clouber.sys.portal.Portal#display"
                }));
                this.errorPage();
                return;
            }
            // set page name
            this.context.pageInfo.page = pname;

            // init portlets' data
            this.request({events: ["CLOUBER_CHANGE_PATH"]});

            // create portal page
            this._page = new Clouber.sys.portal.Page();
            this._page.setModel(new Clouber.sys.portal.PageContext());
            this._page.init();
            this._page.loadComponents();
            if ((typeof this._page !== "undefined") && (this._page !== null)) {
                this._page.display();
            }

            // parameters and attributes
            params = this.getParameters();
            attrs = new Clouber.Map();
            attrs.put("CLOUBER_PATH", this.getPagePath());
            //attrs.put("CLOUBER_EVENT", "init");

            this.context.request(params, attrs, this.getQueryString());
        } catch (e) {
            Clouber.log(e);
        }
    };

    /**
    * Refresh portal components.
    * @function refresh
    * @param {string} id
    */
    this.refresh = function (id) {
        Clouber.log("Clouber.sys.portal.Portal#refresh (" + id + ")");

        this._page.refresh(id);
    };

    /**
    * Application config loaded, then initialize portal.
    * @event confSuccess
    * @param {object} data PortalConfig's config object get from json object.
    * @override
    */
    this.confSuccess = function (data) {
        Clouber.log("Clouber.sys.portal.Portal#confSuccess");

        // create a new portal config object
        this.context.loadConfig({
            base: Clouber.config.getConfig().base,
            path: this.getConf().path + "/conf",
            file: "portal.json"
        });
    };

    /**
    * get page information from url. hash pattern is "#!../../..&..=..&..=.."
    * @function getPageInfo
    * @param {string} hash: window.location.hash
    * @return {object} pageInfo.
    */
    this.getPageInfo = function (hash) {
        var path, pageInfo;

        path = this.getPath(hash).split("/");    // url[1] is '!'
        pageInfo = {};

        pageInfo.app = typeof path[0] !== "undefined" ? path[0] : null;
        pageInfo.page = typeof path[1] !== "undefined" ? path[1] : null;
        //pageInfo.version = typeof path[2] !== "undefined" ? path[2] : null;

        return pageInfo;
    };

    /**
    * get page path
    * @function getPagePath
    * @return {string} page path
    */
    this.getPagePath = function () {
        return this.context.pageInfo.app + "/" + this.context.pageInfo.page;
    };

    /**
    * get portal URL path
    * @function getPath
    * @param {string} hash: window.location.hash
    * @return {String} URL Path.
    */
    this.getPath = function (hash) {
        var end, path = hash;

        if (typeof hash === "undefined") {
            path = window.location.hash;
        }
        if ((path === undefined) || (path === "")) {
            path = window.location.search;
            path = path.replace(/\?_escaped_fragment_=/g, "#!");
        }

        path = path.replace(/\?/g, "&");
        // get path info from url
        end = path.indexOf("&") < 0 ? path.length : path.indexOf("&");
        path = path.substring(2, end);

        // get path info from default setting
        if ((path === undefined) || (path === null) || (path === "") ||
                (path === "#!") || (path === "#")) {
            path = this.defaultPath;
        }

        // get path info from Clouber configuration
        if ((path === undefined) || (path === null) || (path === "") ||
                (path === "#!") || (path === "#")) {

            path = Clouber.config.getConf().apps[0].app;
        }
        return path;
    };

    /**
    * Get URL parameters
    * Reserved parameters: CLOUBER_PATH, CLOUBER_LANG,
    *    CLOUBER_EVENT, CLOUBER_REQUEST, CLOUBER_PORTLET
    * @function getParameters
    * @param {string} hash
    * @return {Map} URL Path.
    */
    this.getParameters = function (hash) {
        var s, m = new Clouber.Map();
        s = this.getQueryString(hash);
        m.parseString(s, "&", "=", false);
        return m;
    };

    /**
    * Get URL parameters
    * @function getParameterByName
    * @param {string} name parameter name.
    * @return {string} parameter value.
    */
    this.getParameterByName = function (name) {
        var s, regex, results, r;
        s = "[\\?&]" + name + "=([^&#]*)";
        regex = new RegExp(s);
        results = regex.exec(window.location.hash);
        if (results === null) {
            r = "";
        } else {
            r = decodeURIComponent(results[1].replace(/\+/g, " "));
        }
        return r;
    };

    /**
    * Get URL parameters
    * Reserved parameters: CLOUBER_PATH, CLOUBER_LANG,
    *    CLOUBER_EVENT, CLOUBER_REQUEST, CLOUBER_PORTLET
    * @function getPath
    * @param {string} hash
    * @return {Map} URL Path.
    */
    this.getQueryString = function (hash) {
        var s, i;
        if ((hash === undefined) || (hash === null) || (hash === "")) {
            hash = window.location.hash;
        }
        hash = hash.replace(/\?/g, "&");
        i = hash.indexOf("&");
        if (i > 0) {
            s = hash.substring(i + 1, hash.length);
        }
        return s;
    };

    /**
    * Update data from portlet producer
    * @function update
    * @deprecated
    */
    this.update = function () {
        var params, attrs, hash = window.location.hash;

        Clouber.log("Clouber.sys.portal.Portal#update");

        try {
            if ((typeof this._page !== "undefined") && (this._page !== null)) {
                params = this.getParameters(hash);
                attrs = new Clouber.Map();
                attrs.put("CLOUBER_PATH", this.getPagePath());
                this.context.request(params, attrs, this.getQueryString());
            }
        } catch (e) {
            Clouber.log(e);
        }
    };

    /**
    * Change portal status
    * @function change
    * @param {string} cmd Command name
    * @params {Array} params Command parameters.
    * @deprecated
    */
    this.change = function (cmd, params) {
        var s, m;

        Clouber.log("Clouber.sys.portal.Portal#change (" +
            cmd + ", " + params + ")");

        if (!(params instanceof Array)) {
            Clouber.log(new Clouber.Exception({
                number: 10008,
                name: "paramError",
                message: Clouber.message.paramError,
                code: "Clouber.sys.portal.Portal#change"
            }));
        }

        try {
            switch (cmd.toLowerCase()) {
            case 'path':
                this.changePath(params[0]);
                break;
            case 'parameter':
                m = this.getParameters();
                m.put(params[0], params[1]);
                s = m.stringify();
                if ((s === undefined) || (s === "")) {
                    window.location.hash = "#!" + this.getPagePath();
                } else {
                    window.location.hash = "#!" + this.getPagePath() + "&" + s;
                }
                break;
            }
        } catch (e) {
            Clouber.log(e);
        }
    };

};
Clouber.extend(Clouber.sys.portal.Portal, Clouber.sys.core.Application);
