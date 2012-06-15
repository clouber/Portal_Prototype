TestClouber = AsyncTestCase("TestClouber");

TestClouber.prototype.testClouber = function (queue) {
    jstestdriver.console.log(new Date());

    queue.call('1: loading clouber.', function (callbacks) {
        var myCallback1 = callbacks.add(function () {
        Clouber.merge(Clouber.config.getConfig(), {base: "/test/src"});

            Clouber.config.loadConf();
        });
        window.setTimeout(myCallback1, 1000);
    });

    queue.call('2: config loaded.', function () {
        jstestdriver.console.log(new Date());
        jstestdriver.console.log(Clouber.config.getConfig().version);
        assertEquals(Clouber.config.getConfig().version, "0.1.1");
    });

};




/*
(function () {

    module("Module Clouber Portlet Producer", {
        setup: function () {
            this.portlet = Clouber.sys.portlet.PortletInfo();
            this.producerContext = new Clouber.sys.portlet.ProducerContext();
            this.producer = {};
            this.text = "Clouber.cms.hd.menu:Clouber.cms.hd.menu:search:" +
                "default:\r\nClouber.cms.hd.search:Clouber.cms.hd.search:" +
                "search:default:int=1&name=334sff&";
            this.portlets = new Clouber.Map();

        },
        teardown: function () {
        }
    });
    
    // test PortletInfo
    test("test PortletInfo", function () {
        raises(function () {
            this.portlet.namespace = null;
        },
            Clouber.sys.core.Exception, "exception of null value");

        this.portlet.namespace = "a";
        strictEqual(this.portlet.namespace, "a");

        this.portlet.value = "a";
        strictEqual((typeof this.portlet.value), "undefined",
            "failure seting new property");

        this.portlet.data = "a";
        strictEqual(typeof this.portlet.data, "undefined");

    });

    // test ProducerContext
    test("test ProducerContext", function () {
        var ctx = this.producerContext, p = this.portlets, t = this.text;

        p = ctx.parse(t);

        ok(p instanceof Clouber.Map, "portletContext is a Map object.");
        strictEqual(p.size(), 2);
        strictEqual(p.getByIndex(0).params.size(), 0);
        strictEqual(p.getByIndex(1).params.size(), 2);
        strictEqual(p.getByIndex(1).params.get("name"), "334sff");

    });

}());
*/
/*
TestProducer.prototype.testClouber_merge = function (queue) {
    Clouber.merge(Clouber.config.getConfig(), {test: "a"});
    assertEquals(Clouber.config.getConfig().test, "a");
};


TestProducer.prototype.testClouber_loadConf = function (queue) {
    jstestdriver.console.log(new Date());

    queue.call('1: loading clouber.', function (callbacks) {
        var myCallback1 = callbacks.add(function () {
        Clouber.merge(Clouber.config.getConfig(), {base: "http://localhost/dev/helpdesk/src"});

            Clouber.config.loadConf();
        });
        window.setTimeout(myCallback1, 1000);
    });

    queue.call('2: config loaded.', function () {
        jstestdriver.console.log(new Date());
        jstestdriver.console.log(Clouber.config.getConfig().version);
        assertEquals(Clouber.config.getConfig().version, "0.1.1");
    });

};
*/
/*
TestProducer.prototype.testLoadConfig = function (queue) {

    jstestdriver.console.log(new Date());

    queue.call('1: loading clouber.', function (callbacks) {
        var myCallback1 = callbacks.add(function () {
            jstestdriver.console.log(new Date());

            jstestdriver.console.log(Clouber.config.getConfig().version);
            this.producer = new Clouber.sys.portlet.Producer({username: "", password: "", app: "cms", version: "0.1.1", producer: "localhost"});
        });
        window.setTimeout(myCallback1, 5000);
    });

    queue.call('2: loading config.', function (callbacks) {
        assertEquals(this.producer.getConf().app, "cms");

        var myCallback2 = callbacks.add(function () {
            this.producer.init();
        });
        window.setTimeout(myCallback2, 2000);
    });

    queue.call('3: config loaded.', function () {
        assertEquals(this.producer.getConf().path, "app/cms/0.1.1");
    });

    queue.call();
};


TestProducer.prototype.testGetUserContext = function (queue) {
    var userContext = this.producer.getUserContext();
    jstestdriver.console.log("This is log message." + userContext);
    assertTypeOf("object", userContext);
};

TestProducer.prototype.testRegister = function () {
    this.registationData = new Clouber.sys.portlet.RegistrationData();
    this.registationData.consumerName = "Clouber";
    this.registationData.consumerAgent = "Clouber.0.1.1";
    this.registationData.methodGetSupported = true;
    this.registationData.consumerModes = ["wsrp:view", "wsrp:edit", "wsrp:preview",
        "wsrp:help"];
    this.registationData.consumerWindowStates = ["wsrp:normal", "wsrp:minimized",
        "wsrp:maximized", "wsrp:solo"];

    this.lifetime = new Clouber.sys.portlet.Lifetime();

    this.registrationContext = this.producer.register(this.registationData,
        this.lifetime, this.userContext);

    jstestdriver.console.log(this.registrationContext.registrationHandle.handle);
    assertNumber(this.registrationContext.registrationHandle.handle);
};

TestProducer.prototype.testRegister = function () {
};

*/