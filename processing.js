/* 
This file fulfills the logic of the Processing Service 
which is in charge of processing the user's command and with the 
help of the scraping service, returns the output to the client
*/
const scraper = require("./scraping.js");

var issuesTitles = scraper.getPullsAPITitles; // Contains all the headers for the available API calls under the Issues page in Github
var repoTitles =  scraper.getRepositoriesAPITitles;  // Contains all the headers for the available API calls under the Repos page in Github
var pullsTitles =  scraper.getPullsAPITitles;  // Contains all the headers for the available API calls under the Pulls page in Github


async function processString(msg){

    // msg[0] will be "gitex"
    let action = msg[1];
    let feature = msg[2];
    let optionalCommand = msg[3];
    let results;

    // error handling
    if (action == null) {
        results = "Please specify an action";
        return results;
    }

    if (feature == null) {
        results = "Please specify a feature";
        return results;
    }

    let searchString = await findSearchString(action, feature, optionalCommand);
    console.log(searchString);

    // results = await scraper.getIssuesAPITitles();
    // console.log(results);
    return searchString;

    // await scraper.scrape(searchString, optionalCommand);
}

/**
 * Searches for the API title that will be scraped based on the users input
 * @param {} action 
 * @param {*} feature 
 * @param {*} optionalCommand 
 */
async function findSearchString(action, feature, optionalCommand) {
    // TODO: find a way to condense, reusing practically same code in all if blocks
    let results;
    if (feature == "pull" || feature == "pulls") {

        results = await scraper.getPullsAPITitles();

        if (action == "get") {
            return results.getPullRequest[0].name;
        } else if (action == "list") {
            return results.listPullRequests[0].name;
        } else if (action == "create") {
            return results.createPullRequest[0].name;
        } else {
            return "Don't have an endpoint example for the specified action"
        }
        
        //for (let i = 0; i < results.length; i++) {
            //if (results[i].toLowerCase().includes(action.toLowerCase())) {
                //console.log(results[i]);
                //return results[i];
            //}
        //}
    }
    else if (feature == "issues") {
        results = await scraper.getIssuesAPITitles();
        for (let i = 0; i < results.length; i++) {
            if (results[i].toLowerCase().includes(action.toLowerCase())) {
                console.log(results[i]);
                return results[i];
            }
        }
    }
    else if (feature == "repositories") {
        results = await scraper.getRepositoriesAPITitles();
        for (let i = 0; i < results.length; i++) {
            if (results[i].toLowerCase().includes(action.toLowerCase())) {
                console.log(results[i]);
                return results[i];
            }
        }
    } else {
        return results;
    }
}
/**
 * Finds the synonym for a verb utilizing the Merriam-Webster Dictionary API
 * @param {} verb 
 */
function findSynonym(verb){

}

exports.processString = processString;