/* 
This file fulfills the logic of the Processing Service 
which is in charge of processing the user's command and with the 
help of the scraping service, returns the output to the client
*/
const scraper = require("./scraping.js");


async function processString(msg){

    // msg[0] will be "gitex"
    let action = msg[1];
    let feature = msg[2];
    let optionalCommand = msg[3];
    let results;

    // error handling
    if (action == null) {
        results = "Please specify an action";
        console.log("Invalid command. Missing action specifier.");
        return results;
    }

    if (feature == null) {
        results = "Please specify a feature";
        console.log("Invalid command. Missing feature specifier.");
        return results;
    }

    let searchString = await findSearchString(action, feature, optionalCommand);
    console.log('Search Query: ' + searchString);
    return searchString;

    // results = await scraper.getIssuesAPITitles();
    // console.log(results);
    // return scraper.scrape(searchString, feature, optionalCommand);

    // await scraper.scrape(searchString, optionalCommand);
}

/**
 * Searches for the API title that will be scraped based on the users input
 * @param {} action 
 * @param {*} feature 
 * @param {*} optionalCommand 
 */
 async function findSearchString(action, feature, optionalCommand) {
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
    }
    else if (feature == "issues") {
        results = scraper.getIssuesAPITitles();
    }
    else if (feature == "repositories") {
        results = scraper.getRepositoriesAPITitles();
    }
    return results;
    // return findSearchStringHelper(results, action);
}

function findSearchStringHelper(results, action) {
    for (let i = 0; i < results.length; i++) {
        if (results[i].split(" ")[0].toLowerCase() == action.toLowerCase()) { // Check if the action the user specified is equal to the action in the REST API. If not found, we use synonym API
            return results[i];
        }
    }
    // TODO: not implemented yet
    // return findSearchStringWithSynonym(action, results);
}
/**
 * Finds the synonym for a verb utilizing the Merriam-Webster Dictionary API
 * @param {} verb 
 */
function findSearchStringWithSynonym(action, results){

    return null;
}

exports.processString = processString;