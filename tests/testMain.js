const got = require('got');
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const nock = require("nock");

process.env.NODE_ENV = 'test'
const bot = require("../index.js");
const proc = require("../processing.js");
const parse = require("../parseHub.js");

// Testing Mattermost integration functionality
describe('Tests of hears() in index.js', function () {
    // this.timeout(5000);
    it("ensures that hears() returns true on a valid message input", function() {
        // CREATE TEST OBJECT
        msg = {"data": {"sender_name": "", "post": JSON.stringify({"message":"smurfy smurf"})}};
        let returnValue = bot.hears(msg, "smurf");
        // console.log("ReturnValue test 1: ", returnValue);
        assert(returnValue === true);
    });

    it("ensures that hears() returns false when botName equals sender_name", function() {
        // CREATE TEST OBJECT
        msg = {"data": {"sender_name": "GitEx"}};
        let returnValue = bot.hears(msg, "boop");
        // console.log("ReturnValue test 2: ", returnValue);
        assert(returnValue === false);
    });
});

describe('Tests of validateUserInput() in index.js', function () {
    it("ensures that validateUserInput() returns true with valid request", function() {
        let returnValue = bot.validateUserInput("gitex get pull");
        assert(returnValue === true);
    });

    it("ensures that validateUserInput() returns false with unspecified action", function() {
        let returnValue = bot.validateUserInput("gitex ");
        assert(returnValue == false);
    });
});

// Testing the ParseHub webscraper functionality
describe('Tests of findSearchString() in processing.js:', function () {
    
    // Commands related to GitHub's Pulls API
    it('ensures that "get pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("get", "pull");
        expect(returnValue).equal("get /repos/{owner}/{repo}/pulls/{pull_number}");
    });

    it('ensures that "create pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("create", "pull");
        expect(returnValue).equal("post /repos/{owner}/{repo}/pulls");
    });

    it('ensures that "update pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("update", "pull");
        expect(returnValue).equal("patch /repos/{owner}/{repo}/pulls/{pull_number}");
    });

    // Commands related to GitHub's Issues API
    it('ensures that "get issue" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("get", "issue");
        expect(returnValue).equal("get /repos/{owner}/{repo}/issues/{issue_number}");
    });

    it('ensures that "create issue" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("create", "issue");
        expect(returnValue).equal("post /repos/{owner}/{repo}/issues");
    });

    it('ensures that "update issue" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("update", "issue");
        expect(returnValue).equal("patch /repos/{owner}/{repo}/issues/{issue_number}");
    });

    it('ensures that "list issue" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("list", "issue");
        expect(returnValue).equal("get /issues");
    });

    // Commands related to GitHub's Repos API
    it('ensures that "create repo" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("create", "repo");
        expect(returnValue).equal("post /orgs/{org}/repos");
    });

    it('ensures that "list repo" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("list", "repo");
        expect(returnValue).equal("get /orgs/{org}/repos");
    });

    it('ensures that "update repo" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("update", "repo");
        expect(returnValue).equal("patch /repos/{owner}/{repo}");
    });

    it('ensures that "delete repo" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("delete", "repo");
        expect(returnValue).equal("delete /repos/{owner}/{repo}");
    });

    it('ensures that "eat repo" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("eat", "repo");
        expect(returnValue).equal("Don't have an endpoint example for the specified action");
    });

    it('ensures that "delete repo response" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("delete", "repo", "response");
        expect(returnValue).equal("Status: 204 No Content");
    });

    it('ensures that "delete repo js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("delete", "repo", "js");
        expect(returnValue).equal("await octokit.request('DELETE /repos/{owner}/{repo}', { owner: 'octocat', repo: 'hello-world' })");
    });
});