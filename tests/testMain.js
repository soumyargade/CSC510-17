const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const nock = require("nock");

process.env.NODE_ENV = 'test'
const bot = require("../index.js");

// Load mock data
const data = require("../mock.json")

// Turn off logging
console.log = function(){};

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
    it("ensures that hears() returns false when botName equals sender_name", function() {
        // CREATE TEST OBJECT
        // console.log("TEST: ", bot)
        // msg = {"data": {"sender_name": "GitEx"}};
        // let returnValue = bot.hears(msg, "boop");
        // assert(returnValue === false);
    });
});