const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const nock = require("nock");

process.env.NODE_ENV = 'test'
const bot = require("../index.js");
const proc = require("../processing.js");
const scrap = require("../scraping.js");

// Load mock data
const data = require("../mock.json")

// Turn off logging
// console.log = function(){};

///////////////////////////
// TEST SUITE FOR MOCHA
// based off of code given in HW2 and Mocking lab
///////////////////////////

describe('Tests of index.js:', function () {
    // MOCK SERVICE
    // var mockService = nock("https://api.github.com")
    // // .log(console.log)
    // .persist() // This will persist mock interception for lifetime of program.
    // .get("/repos/testuser/Hello-World/issues")
    // .reply(200, JSON.stringify(data.pull.path))

    this.timeout(5000);
    it("ensures that hears() returns true on a valid message input", function() {
        // CREATE TEST OBJECT
        msg = {"data": {"sender_name": "", "post": JSON.stringify({"message":"smurfy smurf"})}};
        let returnValue = bot.hears(msg, "smurf");
        console.log("ReturnValue test 0: ", returnValue);
        assert(returnValue === true);
    });

    it("ensures that hears() returns false when botName equals sender_name", function() {
        // CREATE TEST OBJECT
        // console.log("TEST: ", bot)
        msg = {"data": {"sender_name": "GitEx"}};
        let returnValue = bot.hears(msg, "boop");
        console.log("ReturnValue test 1: ", returnValue);
        assert(returnValue === false);
    });
});

describe('Tests of processing.js:', function () {
    //Will have to be updated when validateUserInput() is complete, but this is a start for when it is
    //Test to show an invalid message will return invalid message response
    // it("ensures that validateUserInput() returns false", function() {
    //     // CREATE TEST OBJECT
    //     // console.log("TEST: ", bot)
    //     msg = {"data": {"sender_name": "", "post": JSON.stringify({"message":"smurfy smurf"})}};
    //     let returnValue = bot.validateUserInput(msg);
    //     console.log("ReturnValue test 3: ", returnValue, " datatype: ", typeof(returnValue));
    //     // assert.typeOf(returnValue, Symbol)
    // });

    it("ensures that getActionVerb() returns true when a verb is found", function() {
        // CREATE TEST OBJECT
        // console.log("TEST: ", bot)
        // msg = {"data": {"sender_name": "GitEx"}};
        let returnValue = proc.getActionVerb("create branch");
        console.log("ReturnValue test 4: ", returnValue);
        assert(returnValue === "create");
    });

    it("ensures that getActionVerb() returns null when there are no verbs found", function() {
        // CREATE TEST OBJECT
        // console.log("TEST: ", bot)
        // msg = {"data": {"sender_name": "GitEx"}};
        let returnValue = proc.getActionVerb("smurf");
        console.log("ReturnValue test 5: ", returnValue);
        assert(returnValue === null);
    });

    it("ensures that processString() returns null when there are no verbs in the message", function() {
        // CREATE TEST OBJECT
        // console.log("TEST: ", bot)
        // msg = {"data": {"sender_name": "GitEx"}};
        let returnValue = proc.processString("smurf", null);
        console.log("ReturnValue test 6: ", returnValue);
        assert(returnValue === null);
    });

});

describe('Tests of scraping.js:', function () {
    //Test for getting the shell command for create repo
    const testOfShell = nock("https://api.github.com")
      .get("/repo/create/shell")
      .reply(200, JSON.stringify(data.repo.create.shell));

    // it('Return an example of shell command for create repo', async function() {
    //     let returnValue = await scrap.retrieveShellExample("create repo shell");
    //     expect(returnValue).to.equal("");
    // }); 

    //Test for getting response body for create repo
    const testOfResponse = nock("https://api.github.com")
    .get("/repo/create/response")
    .reply(200, JSON.stringify(data.repo.create.response));

    // it('Return an example of response body for create repo', async function() {
    //     let returnValue = await scrap.retrieveResponseBody("create repo response");
    //     expect(returnValue).to.equal("");
    // }); 

    //Test for getting Javascript command for create repo
    const testOfJavascript = nock("https://api.github.com")
    .get("/repo/create/javascript")
    .reply(200, JSON.stringify(data.repo.create.javascript));

    // it('Return an example of javascript command for create repo', async function() {
    //     let returnValue = await scrap.retrieveJSONExample("create repo javascript");
    //     expect(returnValue).to.equal("");
    // }); 

    //Test for getting Javascript command for create repo
    const testOfAPI = nock("https://api.github.com")
    .get("/repo/create/path")
    .reply(200, JSON.stringify(data.repo.create.path));

    // it('Return an example of path command for create repo', async function() {
    //     let returnValue = await scrap.retrieveAPICall("create repo path");
    //     expect(returnValue).to.equal("");
    // });


});