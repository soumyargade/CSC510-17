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

describe('Tests of pullsTitles in scraping.js:', function () {

    //Test for getting the pulls title
    const testOfPullsTitles = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data.pull.create.title));

    it('ensure that getPullsAPITitles returns correct list', async function() {
        let returnValue = await scrap.getPullsAPITitles();
        console.log("ReturnValue: ", returnValue);
        expect(returnValue.length).to.equal(21);
    }); 

});

describe('Tests of issuesTitles in scraping.js:', function () {

    //Test for getting the issues title
    const testOfIssuesTitles = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data.issue.create.title));

    it('ensure that getIssuesAPITitle returns correct list HERE', async function() {
        let returnValue = await scrap.getIssuesAPITitles();
        console.log("ReturnValue: ", returnValue);
        expect(returnValue.length).to.equal(15);
    });

});

describe('Test hears() in index.js', function () {
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
});

describe('Testing invalid action for processString()', function () {

    const testOfPullsTitles = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data.repo.create));

    it("ensures that processString() returns error when action is invalid", async function() {
        msg = ["gitex", "eat", "repositories"];
        let returnValue = await proc.processString(msg);
        assert.equal(returnValue, "Don't have an endpoint example for the specified action");
    });

});

describe('Testing invalid feature for processString()', function () {

    const testOfPullsTitles = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data.repo.create));

    it("ensures that processString() returns error when feature is not present", async function() {
        msg = ["gitex", "create"];
        let returnValue = await proc.processString(msg);
        assert.equal(returnValue, "Please specify a feature");
    });

});

describe('Testing invalid action for processString()', function () {

    const testOfPullsTitles = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data.repo.create));

    it("ensures that processString() returns error when action is not present", async function() {
        msg = ["gitex"];
        let returnValue = await proc.processString(msg);
        assert.equal(returnValue, "Please specify an action");
    });

});

describe('Testing findSearchString() error handling for pull(s)', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that findSearchString() returns error for when no endpoint can be found - for a pull", async function() {
        let returnValue = await proc.findSearchString("eat", "pull");
        console.log("ReturnValue - processing test 4: ", returnValue);
        assert.equal(returnValue, "Don't have an endpoint example for the specified action");
    });

});

describe('Testing findSearchString() error handling for issue', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that findSearchString() returns error for when no endpoint can be found - for a issue", async function() {
        let returnValue = await proc.findSearchString("eat", "issue");
        console.log("ReturnValue - processing test 5: ", returnValue);
        assert.equal(returnValue, "Don't have an endpoint example for the specified action");
    });

});

describe('Testing findSearchString() error handling for repo', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that findSearchString() returns error for when no endpoint can be found - for repo", async function() {
        let returnValue = await proc.findSearchString("eat", "repositories");
        console.log("ReturnValue - processing test 6: ", returnValue);
        assert.equal(returnValue, "Don't have an endpoint example for the specified action");
    });

});

describe('Test delete repo endpoint', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that delete works for a repo", async function() {
        let returnValue = await proc.findSearchString("delete", "repo");
        assert.equal(returnValue, "delete /repos/{owner}/{repo}");
    });

});

describe('Test create issue endpoint', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that create works for an issue", async function() {
        let returnValue = await proc.findSearchString("create", "issue");
        assert.equal(returnValue, "post /repos/{owner}/{repo}/issues");
    });

});

describe('Test create pull request endpoint', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that create works for a pull request", async function() {
        let returnValue = await proc.findSearchString("create", "pulls");
        assert.equal(returnValue, "post /repos/{owner}/{repo}/pulls");
    });

});

describe('Test get repo shell command', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that get repo shell works", async function() {
        let returnValue = await proc.findSearchString("get", "repo", "shell");
        assert.equal(returnValue, 'curl \ -H "Accept: application/vnd.github.v3+json" \ https://api.github.com/repos/octocat/hello-world');
    });

});

describe('Test get repo javascript command', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that get repo javascript works", async function() {
        let returnValue = await proc.findSearchString("get", "repo", "javascript");
        assert.equal(returnValue, "await octokit.request('GET /repos/{owner}/{repo}', { owner: 'octocat', repo: 'hello-world' })");
    });

});

describe('Test list issue javascript command', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that list issue javascript works", async function() {
        let returnValue = await proc.findSearchString("list", "issue", "javascript");
        assert.equal(returnValue, "await octokit.request('GET /issues')");
    });

});

describe('Test list issue curl command', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that list issue curl works", async function() {
        let returnValue = await proc.findSearchString("list", "issue", "curl");
        assert.equal(returnValue, 'curl \ -H "Accept: application/vnd.github.v3+json" \ https://api.github.com/issues');
    });

});

describe('Test list issue', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that list issue works", async function() {
        let returnValue = await proc.findSearchString("list", "issue");
        assert.equal(returnValue, "get /issues");
    });

});

describe('Test list pull requests', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that list pull requests works", async function() {
        let returnValue = await proc.findSearchString("list", "pulls");
        assert.equal(returnValue, "get /repos/{owner}/{repo}/pulls");
    });

});

describe('Test list pull requests curl command', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that list pull requests curl works", async function() {
        let returnValue = await proc.findSearchString("list", "pulls", "curl");
        assert.equal(returnValue, 'curl \ -H "Accept: application/vnd.github.v3+json" \ https://api.github.com/repos/octocat/hello-world/pulls');
    });

});

describe('Test delete repo', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that delete repo works", async function() {
        let returnValue = await proc.findSearchString("delete", "repo");
        assert.equal(returnValue, "delete /repos/{owner}/{repo}");
    });

});

describe('Test list repo', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that list repo works", async function() {
        let returnValue = await proc.findSearchString("list", "repo");
        assert.equal(returnValue, "get /orgs/{org}/repos");
    });

});

describe('Test create repo', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that create repo works", async function() {
        let returnValue = await proc.findSearchString("create", "repo");
        assert.equal(returnValue, "post /orgs/{org}/repos");
    });

});

describe('Test create repo javascript', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that create repo shell javascript", async function() {
        let returnValue = await proc.findSearchString("create", "repo", "javascript");
        assert.equal(returnValue, "await octokit.request('POST /orgs/{org}/repos', { org: 'org', name: 'name' })");
    });

});

describe('Test get pull request', function () {

    const testFindSearchString = nock("https://www.parsehub.com")
    .get("/api/v2/runs/runToken/data?api_key=apiKey&format=json")
    .reply(200, JSON.stringify(data));

    it("ensures that get pull request", async function() {
        let returnValue = await proc.findSearchString("get", "pulls");
        assert.equal(returnValue, "get /repos/{owner}/{repo}/pulls/{pull_number}");
    });

});