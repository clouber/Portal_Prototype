
(function () {

    QUnit.module("Module Clouber Portlet Producer", {
        setup: function () {
            this.portlet = Clouber.sys.portlet.PortletInfo();
            this.producerContext = new Clouber.sys.portlet.ProducerContext();
            this.text = "Clouber.cms.hd.search:search:Clouber.cms.hd:search:search:search:mimeType=text/html&mode=&windowStates=&locales=en/cn&extensions=default:::::::::::::::::";
            this.portlets = new Clouber.Map();
            this.producer = new Clouber.sys.portlet.Producer({username: "",
                password: "", app: "cms", version: "0.1.1"});
        },
        teardown: function () {
        }
    });

    // test PortletInfo
    QUnit.test("test PortletInfo", function () {
        QUnit.raises(function () {
            this.portlet.portletID = null;
        }, Clouber.Exception, "exception of null value");

        this.portlet.portletID = "a";
        QUnit.strictEqual(this.portlet.portletID, "a");
        this.portlet.value = "a";
        QUnit.strictEqual((typeof this.portlet.value), "undefined",
            "failure seting new property");

    });

    // test ProducerContext
    QUnit.test("test ProducerContext", function () {
        var ctx = this.producerContext, p = this.portlets, t = this.text;
        p = ctx.parse(t);
        QUnit.ok(p instanceof Clouber.Map, "portletContext is a Map object.");
        QUnit.strictEqual(p.size(), 1);
        QUnit.strictEqual(p.getByIndex(0).markupTypes.size(), 5);
        QUnit.strictEqual(p.getByIndex(0).markupTypes.get("extensions"), "default");
    });

    // test load producer config
    QUnit.asyncTest("test load producer config", function () {
        var pd = this.producer;
        pd.loadConf();

        window.setTimeout(function () {
            QUnit.start();
            QUnit.strictEqual(pd.getConf().path, "app/cms/0.1.1",
                "confirm application config loaded.");
            QUnit.stop();
        }, 300);

        window.setTimeout(function () {
            var p = pd.getContext().context;
            QUnit.start();
            QUnit.ok(p instanceof Clouber.Map,
                "portletContext is a Map object: " + (typeof p));
            QUnit.strictEqual(p.size(), 15, "confirm portlets config loaded."
                + p.size());
            QUnit.strictEqual(p.getByIndex(10).markupTypes.size(), 5,
                "portlet init parameter");
        }, 500);
    });

/*
    // test portlet config
    QUnit.test("test Pportlet config", function () {
    });

    // test portlet context
    QUnit.test("test portlet context", function () {
    });

    // test generic portlet
    QUnit.test("test generic portlet", function () {
    });
    
    // test Producer register
    QUnit.test("test Producer register", function () {
        // get user context
        this.userContext = this.producer.getUserContext();
        QUnit.ok(this.userContext instanceof
            WSRP.UserContext, "User context");
        QUnit.ok(this.userContext.userContextKey > 0, "userContextKey");

        // get portlet registration context
        this.registationData = new WSRP.RegistrationData();
        this.registationData.consumerName = "clouber";
        this.registationData.consumerAgent =
            Clouber.config.getConfig().name + "." +
            Clouber.config.getConfig().version;
        this.registationData.methodGetSupported = true;
        this.registationData.consumerModes =
            ["wsrp:view", "wsrp:edit", "wsrp:preview", "wsrp:help"];
        this.registationData.consumerWindowStates =
            ["wsrp:normal", "wsrp:minimized", "wsrp:maximized", "wsrp:solo"];

        this.lifetime = new WSRP.Lifetime();

        this.registrationContext = this.producer.register(this.registationData,
            this.lifetime, this.userContext);

        QUnit.ok(this.registrationContext instanceof
            WSRP.RegistrationContext, "RegistrationContext");
        QUnit.ok(this.registrationContext.registrationHandle.handle > 0);
    });

    // test Producer performBlockingInteraction
    QUnit.test("test Producer performBlockingInteraction", function () {
        var resp;
        // performBlockingInteraction
        this.portletContext = new WSRP.PortletContext();
        this.portletContext.portletHandle.handle = "Clouber.cms.hd.search";

        this.runtimeContext = new WSRP.RuntimeContext();
        this.runtimeContext.userAuthentication = "wsrp:password";
        this.runtimeContext.portletInstanceKey = (new Date()).valueOf();
        this.runtimeContext.namespacePrefix = "Clouber.cms.hd";

        this.markupParams = new WSRP.MarkupParams();
        this.markupParams.locales = ["en", "cn"];
        this.markupParams.mimeTypes = ["text/html"];
        this.markupParams.model = "wsrp:view";
        this.markupParams.windowState = "wsrp:normal";
        this.markupParams.markupCharacterSets = ["utf-8"];

        this.interactionParams = new WSRP.InteractionParams();
        this.interactionParams.interactionState = "performBlockingInteraction";

        resp = this.producer.performBlockingInteraction(
            this.registrationContext,
            this.portletContext,
            this.runtimeContext,
            this.userContext,
            this.markupParams,
            this.interactionParams
        );

        //this.session = resp.updateResponse.sessionContext;
        //this.portlet = resp.updateResponse.portletContext;
        //this.markup = resp.updateResponse.markupContext;
        //this.events = resp.updateResponse.events;

    });

    // test Producer getMarkup
    QUnit.test("test Producer getMarkup", function () {
    });

    // test Producer handleEvent
    QUnit.test("test Producer handleEvent", function () {
    });
*/


}());

