const data = require("./mock.json")

// npx run-func scraping.js getPullsAPITitles

async function getPullsAPITitles(){
    // let pullsTitles = await webScraper.getPullsTitles();
    var results = data.pull;
    var headers = new Array();
    for (let result in results) {
        headers.push(results[result].title);
    }
    return headers;
}

async function getIssuesAPITitles(){
    // let issuesTitles = await webScraper.getIssuesTitles();
    var results = data.issue;
    var headers = new Array();
    for (let result in results) {
        headers.push(results[result].title);
    }
    return headers;
}

async function getRepositoriesAPITitles(){
    // let repositoriesTitles = await webScraper.getRepositoriesTitles();
    var results = data.repo;
    var headers = new Array();
    for (let result in results) {
        headers.push(results[result].title);
    }
    return headers;
}

async function retrieveAPICall(searchString){

}

async function retrieveJSONExample(searchString){

}

async function retrieveShellExample(searchString){

}

async function retrieveResponseBody(searchString){

}

exports.getPullsAPITitles = getPullsAPITitles;
exports.getIssuesAPITitles = getIssuesAPITitles;
exports.getRepositoriesAPITitles = getRepositoriesAPITitles;
exports.retrieveAPICall = retrieveAPICall;
exports.retrieveJSONExample = retrieveJSONExample;
exports.retrieveShellExample = retrieveShellExample;
exports.retrieveResponseBody = retrieveResponseBody;