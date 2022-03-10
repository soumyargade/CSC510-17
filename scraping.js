const data = require("./mock.json")

async function getPullsAPITitles(){
    // let pullsTitles = await webScraper.getPullsTitles();
    var results = data.pull;
    var headers = new Array();
    for (let result in results) {
        // console.log(results[result].title);
        headers.push(results[result].title);
    }
    return headers;
}

async function getIssuesAPITitles(){
    return [];
}

async function getRepositoriesAPITitles(){
    return [];
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