const data = require("./mock.json")
const parseHub = require("./parseHub.js")

// npx run-func scraping.js getPullsAPITitles

async function getPullsAPITitles(){
    let pullsTitles = await parseHub.getPullsTitles();
    console.log(pullsTitles)
    //var results = data.pull;
    //var headers = new Array();
    //for (let result in results) {
        //headers.push(results[result].title);
    //}
    //return headers;
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

async function scrape(searchString, optionalCommand){

    if(!optionalCommand){
        return retrieveAPICall(searchString);
    }
    else if(optionalCommand == 'Shell'){
        return retrieveShellExample(searchString);
    }
    else if(optionalCommand == 'Javascript'){
        return retrieveJavascriptExample(searchString);
    }
    else if(optionalCommand == 'Response'){
        return retrieveResponseBody(searchString);
    }



}
async function retrieveAPICall(searchString){

}

async function retrieveJavascriptExample(searchString){

}

async function retrieveShellExample(searchString){

}

async function retrieveResponseBody(searchString){

}

exports.getPullsAPITitles = getPullsAPITitles;
exports.getIssuesAPITitles = getIssuesAPITitles;
exports.getRepositoriesAPITitles = getRepositoriesAPITitles;
exports.retrieveAPICall = retrieveAPICall;
exports.retrieveJavascriptExample = retrieveJavascriptExample;
exports.retrieveShellExample = retrieveShellExample;
exports.retrieveResponseBody = retrieveResponseBody;