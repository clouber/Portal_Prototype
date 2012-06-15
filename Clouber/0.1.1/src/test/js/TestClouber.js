TestClouber = AsyncTestCase("TestClouber");

TestClouber.prototype.testConfig = function (queue) {
    jstestdriver.console.log(new Date());

    Clouber.merge(Clouber.config.getConfig(), {base: "/test"});
    assertEquals(Clouber.config.getConfig().base, "/test");

    queue.call('1: loading clouber.', function (callbacks) {
        var myCallback1 = callbacks.add(function () {
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



