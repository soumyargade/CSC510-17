const got = require('got');
const chai = require("chai");
const expect = chai.expect;
const assert = chai.assert;
const nock = require("nock");

process.env.NODE_ENV = 'test'
const bot = require("../index.js");
const proc = require("../processing.js");
const parse = require("../parseHub.js");

// Testing the ParseHub webscraper functionality
describe('Tests of findSearchString() in processing.js:', function () {
    
    // Commands related to GitHub's Pulls API
    it('ensure that "get pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("get", "pull");
        expect(returnValue).equal("get /repos/{owner}/{repo}/pulls/{pull_number}");
    });

    it('ensure that "create pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("create", "pull");
        expect(returnValue).equal("post /repos/{owner}/{repo}/pulls");
    });

    it('ensure that "update pull" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("update", "pull");
        expect(returnValue).equal("patch /repos/{owner}/{repo}/pulls/{pull_number}");
    });

    // Commands related to GitHub's Issues API
    it('ensure that "update issue" returns the correct path', async function() {
        let returnValue = await proc.findSearchString("update", "issue");
        expect(returnValue).equal("patch /repos/{owner}/{repo}/issues/{issue_number}");
    });

    // Commands related to GitHub's Repos API
});