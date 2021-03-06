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
        expect(returnValue === true);
    });

    it("ensures that validateUserInput() returns true to valid request with optional command", function() {
        let returnValue = bot.validateUserInput("gitex get pulls javascript");
        expect(returnValue === true);
    });

    it("ensures that validateUserInput() returns false with unspecified action", function() {
        let returnValue = bot.validateUserInput("gitex ");
        expect(returnValue == false);
    });

    it("ensures that validateUserInput() returns false when action does not match a synonym", function() {
        let returnValue = bot.validateUserInput("gitex throw repo");
        expect(returnValue == false);
    });
});

describe('Tests of processString() in processing.js:', function() {
    it('ensures that correct example is returned if action used matches HTTP verb', async function() {
        let returnValue = await proc.processString("gitex create repo".split(" "));
        expect(returnValue).equal("post /orgs/{org}/repos");
    });

    it('ensures identified similar action returns correct example', async function() {
        let returnValue = await proc.processString("gitex edit issue".split(" "));
        expect(returnValue).equal("patch /repos/{owner}/{repo}/issues/{issue_number}");
    });

    it('ensures HTTP verb is identified based on synonyms of action used', async function() {
        let returnValue = await proc.processString("gitex cancel repo".split(" "));
        expect(returnValue).equal("delete /repos/{owner}/{repo}");
    });
});

// Testing the ParseHub webscraper functionality
describe('Tests of findSearchString() in processing.js:', function () {
    
    // Commands related to GitHub's Pulls API
    it('ensures that "get pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("get", "pull");
        expect(returnValue).equal("get /repos/{owner}/{repo}/pulls/{pull_number}");
    });

    it('ensures that "get pull js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("get", "pull", "js");
        expect(returnValue).equal("await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}', { owner: 'octocat', repo: 'hello-world', pull_number: 42 })");
    });

    it('ensures that "get pull curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("get", "pull", "curl");
        expect(returnValue).equal(`curl \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world/pulls/42`);
    });

    it('ensures that "get pull response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("get", "pull", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(25242);
    });

    it('ensures that "list pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("list", "pull");
        expect(returnValue).equal("get /repos/{owner}/{repo}/pulls");
    });

    it('ensures that "list pull js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("list", "pull", "js");
        expect(returnValue).equal("await octokit.request('GET /repos/{owner}/{repo}/pulls', { owner: 'octocat', repo: 'hello-world' })");
    });

    it('ensures that "list pull curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("list", "pull", "curl");
        expect(returnValue).equal(`curl \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world/pulls`);
    });

    it('ensures that "list pull response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("list", "pull", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(24460);
    });

    it('ensures that "create pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("create", "pull");
        expect(returnValue).equal("post /repos/{owner}/{repo}/pulls");
    });

    it('ensures that "create pull js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("create", "pull", "js");
        expect(returnValue).equal("await octokit.request('POST /repos/{owner}/{repo}/pulls', { owner: 'octocat', repo: 'hello-world', head: 'head', base: 'base' })");
    });

    it('ensures that "create pull curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("create", "pull", "curl");
        expect(returnValue).equal(`curl \\ -X POST \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world/pulls \\ -d '{"head":"head","base":"base"}'`);
    });

    it('ensures that "create pull response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("create", "pull", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(25242);
    });    

    it('ensures that "update pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("update", "pull");
        expect(returnValue).equal("patch /repos/{owner}/{repo}/pulls/{pull_number}");
    });

    it('ensures that "update pull js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("update", "pull", "js");
        expect(returnValue).equal("await octokit.request('PATCH /repos/{owner}/{repo}/pulls/{pull_number}', { owner: 'octocat', repo: 'hello-world', pull_number: 42, title: 'title' })");
    });

    it('ensures that "update pull curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("update", "pull", "curl");
        expect(returnValue).equal(`curl \\ -X PATCH \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world/pulls/42 \\ -d '{"title":"title"}'`);
    });

    it('ensures that "update pull response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("update", "pull", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(25242);
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

    it('ensures that "eat issue" returns error message', async function() {
        let returnValue = await proc.findSearchString("eat", "issue");
        expect(returnValue).equal("Don't have an endpoint example for the specified action");
    });

    it('ensures that "get issue js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("get", "issue", "js");
        expect(returnValue).equal("await octokit.request('GET /repos/{owner}/{repo}/issues/{issue_number}', { owner: 'octocat', repo: 'hello-world', issue_number: 42 })");
    });

    it('ensures that "list issue js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("list", "issue", "js");
        expect(returnValue).equal("await octokit.request('GET /issues')");
    });

    it('ensures that "create issue js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("create", "issue", "js");
        expect(returnValue).equal("await octokit.request('POST /repos/{owner}/{repo}/issues', { owner: 'octocat', repo: 'hello-world', title: 'title' })");
    });

    it('ensures that "update issue js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("update", "issue", "js");
        expect(returnValue).equal("await octokit.request('PATCH /repos/{owner}/{repo}/issues/{issue_number}', { owner: 'octocat', repo: 'hello-world', issue_number: 42, title: 'title' })");
    });

    it('ensures that "get issue curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("get", "issue", "curl");
        expect(returnValue).equal(`curl \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world/issues/42`);
    });

    it('ensures that "list issue curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("list", "issue", "curl");
        expect(returnValue).equal(`curl \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/issues`);
    });

    it('ensures that "create issue curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("create", "issue", "curl");
        expect(returnValue).equal(`curl \\ -X POST \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world/issues \\ -d '{"title":"title"}'`);
    });

    it('ensures that "update issue curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("update", "issue", "curl");
        expect(returnValue).equal(`curl \\ -X PATCH \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world/issues/42 \\ -d '{"title":"title"}'`);
    });

    it('ensures that "get issue response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("get", "issue", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(7243);
    });

    it('ensures that "list issue response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("list", "issue", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(12383);
    });

    it('ensures that "create issue response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("create", "issue", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(7243);
    });

    it('ensures that "update issue response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("update", "issue", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(7243);
    });

    // Commands related to GitHub's Repos API
    it('ensures that "get repo" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("get", "repo");
        expect(returnValue).equal("get /repos/{owner}/{repo}");
    });

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

    it('ensures that "eat repo" returns error message', async function() {
        let returnValue = await proc.findSearchString("eat", "repo");
        expect(returnValue).equal("Don't have an endpoint example for the specified action");
    });

    it('ensures that "delete repo response" returns the correct response', async function() {
        let returnValue = await proc.findSearchString("delete", "repo", "response");
        expect(returnValue).equal("Status: 204 No Content");
    });

    it('ensures that "delete repo js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("delete", "repo", "js");
        expect(returnValue).equal("await octokit.request('DELETE /repos/{owner}/{repo}', { owner: 'octocat', repo: 'hello-world' })");
    });

    it('ensures that "delete repo curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("delete", "repo", "curl");
        expect(returnValue).equal(`curl \\ -X DELETE \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world`);
    });

    it('ensures that "list repo javascript" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("list", "repo", "javascript");
        expect(returnValue).equal("await octokit.request('GET /orgs/{org}/repos', { org: 'org' })");
    });

    it('ensures that "list repo curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("list", "repo", "curl");
        expect(returnValue).equal(`curl \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/orgs/ORG/repos`);
    });

    it('ensures that "create repo js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("create", "repo", "js");
        expect(returnValue).equal("await octokit.request('POST /orgs/{org}/repos', { org: 'org', name: 'name' })");
    });

    it('ensures that "create repo curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("create", "repo", "curl");
        expect(returnValue).equal(`curl \\ -X POST \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/orgs/ORG/repos \\ -d '{"name":"name"}'`);
    });

    it('ensures that "update repo js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("update", "repo", "js");
        expect(returnValue).equal("await octokit.request('PATCH /repos/{owner}/{repo}', { owner: 'octocat', repo: 'hello-world', name: 'name' })");
    });

    it('ensures that "update repo curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("update", "repo", "curl");
        expect(returnValue).equal(`curl \\ -X PATCH \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world \\ -d '{"name":"name"}'`);
    });

    it('ensures that "get repo js" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("get", "repo", "js");
        expect(returnValue).equal("await octokit.request('GET /repos/{owner}/{repo}', { owner: 'octocat', repo: 'hello-world' })");
    });

    it('ensures that "get repo curl" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("get", "repo", "curl");
        expect(returnValue).equal(`curl \\ -H "Accept: application/vnd.github.v3+json" \\ https://api.github.com/repos/octocat/hello-world`);
    });

    it('ensures that "get repo response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("get", "repo", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(25866);
    });

    it('ensures that "list repo response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("list", "repo", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(5590);
    });

    it('ensures that "create repo response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("create", "repo", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(6166);
    });

    it('ensures that "update repo response" returns the correct code', async function() {
        let returnValue = await proc.findSearchString("update", "repo", "response");
        let JSONResults = JSON.stringify(returnValue);
        expect(JSONResults.length).equal(25944);
    });

});