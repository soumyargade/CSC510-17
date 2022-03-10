const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const nock = require("nock");

process.env.NODE_ENV = 'test'
const bot = require("../index.js");
const proc = require("../processing.js");

// Load mock data
const data = require("../mock.json")

// Turn off logging
// console.log = function(){};

///////////////////////////
// TEST SUITE FOR MOCHA
// based off of code given in HW2 and Mocking lab
///////////////////////////

describe('Tests of other index.js:', function () {
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


});