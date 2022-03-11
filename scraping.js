const data = require("./mock.json")
const parseHub = require("./parseHub.js")

// npx run-func scraping.js getPullsAPITitles

async function getPullsAPITitles(){
    let pullsTitles = await parseHub.getPullsInfo();
    // console.log(pullsTitles.createPullRequest[4].name);
    return pullsTitles;

    // var results = data.pull;
    // var headers = new Array();
    // for (let result in results) {
        //headers.push(results[result].title);
    //}
    // console.log('headers ' + headers);
    // return headers;
}

 async function getIssuesAPITitles(){
    let issuesTitles = await parseHub.getIssuesInfo();
    // console.log(issuesTitles.createIssue[2].name)
    return issuesTitles;

    // var results = data.issue;
    // var headers = new Array();
    // for (let result in results) {
        // headers.push(results[result].title);
    // }
    // return headers;
}

async function getRepositoriesAPITitles(){
    // let repositoriesTitles = await parseHub.getRepositoriesInfo();
    let repoTitles = await parseHub.getRepositoriesInfo();
    return repoTitles;
    
    // var results = data.repo;
    // var headers = new Array();
    // for (let result in results) {
        // headers.push(results[result].title);
    // }
    // return headers;
}

 function scrape(searchString, feature, optionalCommand){

    if (!optionalCommand){
        return retrieveAPICall(searchString, feature);
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

 function retrieveAPICall(searchString, feature){
    let action = searchString.split(' ')[0].toLowerCase();
    console.log(feature);
    console.log(action)
    console.log(data[feature][action].path);
    return data[feature][action].path;

}

async function retrieveJavascriptExample(searchString){

}

async function retrieveShellExample(searchString){

}

async function retrieveResponseBody(searchString){

}

exports.getPullsAPITitles = getPullsAPITitles;
exports.scrape = scrape;
exports.getIssuesAPITitles = getIssuesAPITitles;
exports.getRepositoriesAPITitles = getRepositoriesAPITitles;
exports.retrieveAPICall = retrieveAPICall;
exports.retrieveJavascriptExample = retrieveJavascriptExample;
exports.retrieveShellExample = retrieveShellExample;
exports.retrieveResponseBody = retrieveResponseBody;