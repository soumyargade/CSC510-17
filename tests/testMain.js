const got = require('got');
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

    this.timeout(5000);
    it("ensures that hears() returns true on a valid message input", function() {
        // CREATE TEST OBJECT
        msg = {"data": {"sender_name": "", "post": JSON.stringify({"message":"smurfy smurf"})}};
        let returnValue = bot.hears(msg, "smurf");
        console.log("ReturnValue test 1: ", returnValue);
        assert(returnValue === true);
    });

    it("ensures that hears() returns false when botName equals sender_name", function() {
        // CREATE TEST OBJECT
        // console.log("TEST: ", bot)
        msg = {"data": {"sender_name": "GitEx"}};
        let returnValue = bot.hears(msg, "boop");
        console.log("ReturnValue test 2: ", returnValue);
        assert(returnValue === false);
    });

    //Will have to be updated when validateUserInput() is complete, but this is a start for when it is
    //Test to show an invalid message will return invalid message response
    // it("ensures that validateUserInput() returns true", function() {
    //     // CREATE TEST OBJECT
    //     // console.log("TEST: ", bot)
    //     msg = {"data": {"sender_name": "", "post": JSON.stringify({"message":"smurfy smurf"})}};
    //     let returnValue = bot.validateUserInput(msg);
    //     console.log("ReturnValue test 3: ", returnValue, " datatype: ", typeof(returnValue));
    //     assert.typeOf(returnValue === true)
    // });

});

describe('Tests of processing.js:', function () {

    it("ensures that processString() returns search string", async function() {
        // CREATE TEST OBJECT
        // console.log("TEST: ", bot)
        // msg = "what is the weather?";
        msg = ["gitex", "create", "repositories"];
        let returnValue = await proc.processString(msg);
        console.log("ReturnValue - processing test 1: ", returnValue);
        assert.equal(returnValue, "Create an organization repository,Get a repository,Update a repository,Delete a repository");
    });

    it("ensures that processString() returns correct error message when no action is given", async function() {
        // CREATE TEST OBJECT
        // console.log("TEST: ", bot)
        // msg = "gitex";
        msg = ["gitex", null, "issues", "shell"]
        let returnValue = await proc.processString(msg);
        console.log("ReturnValue - processing test 2 : ", returnValue);
        assert.equal(returnValue, "Please specify an action");
    });

    it("ensures that processString() returns correct error message when no feature is given", async function() {
        // CREATE TEST OBJECT
        // console.log("TEST: ", bot)
        // msg = "gitex";
        msg = ["gitex", "pulls", null, "shell"]
        let returnValue = await proc.processString(msg);
        console.log("ReturnValue - processing test 3: ", returnValue);
        assert.equal(returnValue, "Please specify a feature");
    });

    // it("ensures that getActionVerb() returns true when a verb is found", function() {
    //     // CREATE TEST OBJECT
    //     // console.log("TEST: ", bot)
    //     // msg = {"data": {"sender_name": "GitEx"}};
    //     let returnValue = proc.getActionVerb("create branch");
    //     console.log("ReturnValue test 4: ", returnValue);
    //     assert(returnValue === "create");
    // });

    // it("ensures that getActionVerb() returns null when there are no verbs found", function() {
    //     // CREATE TEST OBJECT
    //     // console.log("TEST: ", bot)
    //     // msg = {"data": {"sender_name": "GitEx"}};
    //     let returnValue = proc.getActionVerb("smurf");
    //     console.log("ReturnValue test 5: ", returnValue);
    //     assert(returnValue === null);
    // });
    
    //test for synonyms
    
    const syn = nock("https://www.dictionaryapi.com")
      .get("/api/v3/references/thesaurus/json/make?key=your-api-key")
      .reply(200, JSON.stringify(data.syn_list_create));

    // it('Identify synonym for create', async function() {
    //     let returnValue = await proc.findSynonym("create");
    //     expect(returnValue).contains("make");
    // }); 

    it("ensures that findSearchString() returns error for when no endpoint can be found - for a pull", async function() {
        let returnValue = await proc.findSearchString("eat", "pull");
        console.log("ReturnValue - processing test 4: ", returnValue);
        assert.equal(returnValue, "Don't have an endpoint for example for the specified action");
    });

    it("ensures that findSearchString() returns error for when no endpoint can be found - for a issue", async function() {
        let returnValue = await proc.findSearchString("eat", "issue");
        console.log("ReturnValue - processing test 5: ", returnValue);
        assert.equal(returnValue, "Don't have an endpoint for example for the specified action");
    });

    it("ensures that findSearchString() returns error fro when no endpoint can be found - for repo", async function() {
        let returnValue = await proc.findSearchString("eat", "repositories");
        console.log("ReturnValue - processing test 5: ", returnValue);
        assert.equal(returnValue.length, "Don't have an endpoint for example for the specified action");
    });

});

describe('Tests of scraping.js:', function () {

    it("ensures that retrieveAPICall() returns correct path", function() {
        let returnValue = scrap.retrieveAPICall("create", "issue");
        console.log("ReturnValue test: ", returnValue);
        assert.equal(returnValue, "/repos/{owner}/{repo}/issues");
    });

    //Test for getting the pulls title
    const testOfPullsTitles = nock("https://www.parsehub.com")
    .get("/api/v2/runs/YOUR%20TOKEN%20HERE/data?api_key=YOUR%20KEY%20HERE&format=json")
    .reply(200, JSON.stringify(data.pull.create.title));

    it('ensure that getPullsAPITitles returns correct list', async function() {
        let returnValue = await scrap.getPullsAPITitles();
        console.log("ReturnValue: ", returnValue);
        expect(returnValue.length).to.equal(3);
    }); 

    //Test for getting the issues title
    const testOfIssuesTitles = nock("https://www.parsehub.com")
    .get("/api/v2/runs/YOUR%20TOKEN%20HERE/data?api_key=YOUR%20KEY%20HERE&format=json")
    .reply(200, JSON.stringify(data.issue.create.title));

    it('ensure that getIssuesAPITitle returns correct list', async function() {
        let returnValue = await scrap.getIssuesAPITitles();
        console.log("ReturnValue: ", returnValue);
        expect(returnValue.length).to.equal(3);
    }); 

    //Test for getting the shell command for create repo
    const testOfShell = nock("https://www.parsehub.com")
      .get("/api/v2/runs/{RUN_TOKEN}/data")
      .reply(200, JSON.stringify(data.repo.create.shell));

    // it('Return an example of shell command for create repo', async function() {
    //     let returnValue = await scrap.retrieveShellExample("create repo shell");
    //     expect(returnValue).to.equal("curl -X POST -H \"Accept: application/vnd.github.v3+json\" http(s)://{hostname}/api/v3/orgs/ORG/repos -d '{\"name\":\"name\"}'");
    // }); 

    //Test for getting response body for create repo
    const testOfResponse = nock("https://www.parsehub.com")
    .get("/api/v2/runs/{RUN_TOKEN}/data")
    .reply(200, JSON.stringify(data.repo.create.response));

    // it('Return an example of response body for create repo', async function() {
    //     let returnValue = await scrap.retrieveResponseBody("create repo response");
    //     expect(returnValue).to.equal("");
    // }); 

    //Test for getting Javascript command for create repo
    const testOfJavascript = nock("https://www.parsehub.com")
    .get("/api/v2/runs/{RUN_TOKEN}/data")
    .reply(200, JSON.stringify(data.repo.create.javascript));

    // it('Return an example of javascript command for create repo', async function() {
    //     let returnValue = await scrap.retrieveJSONExample("create repo javascript");
    //     expect(returnValue).to.equal("");
    // }); 

    //Test for getting endpoint for create repo
    const testOfAPI = nock("https://www.parsehub.com")
    .get("/api/v2/runs/{RUN_TOKEN}/data")
    .reply(200, JSON.stringify(data.repo.create.path));

    // it('Return an example of path command for create repo', async function() {
    //     let returnValue = await scrap.retrieveAPICall("create repo path");
    //     expect(returnValue).to.equal("");
    // });


});
