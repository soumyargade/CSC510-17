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
    // returning pulls endpoints, assuming UC1
    if (feature == "pull" || feature == "pulls") {
        // getting info from ParseHub
        results = await scraper.getPullsAPITitles();
        if (action == "get") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.getPullRequest[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.getPullRequest[2].name;
            } else if (optionalCommand == "response") {
                return results.getPullRequest[4].name;
            } else {
                return results.getPullRequest[0].name;
            }
        } else if (action == "list") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.listPullRequests[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.listPullRequests[2].name;
            } else if (optionalCommand == "response") {
                return results.listPullRequests[4].name;
            } else {
                return results.listPullRequests[0].name;
            }
        } else if (action == "create") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.createPullRequest[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.createPullRequest[2].name;
            } else if (optionalCommand == "response") {
                return results.createPullRequest[4].name;
            } else {
                return results.createPullRequest[0].name;
            }
        } else {
            return "Don't have an endpoint example for the specified action"
        }
    }
    // returning issues endpoints, assuming UC1
    else if (feature == "issue" || feature == "issues") {
        results = await scraper.getIssuesAPITitles();
        if (action == "get") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.getIssue[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.getIssue[2].name;
            } else if (optionalCommand == "response") {
                return results.getIssue[4].name;
            } else {
                return results.getIssue[0].name;
            }
        } else if (action == "list") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.listIssue[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.listIssue[2].name;
            } else if (optionalCommand == "response") {
                return results.listIssue[4].name;
            } else {
                return results.listIssue[0].name;
            }
        } else if (action == "create") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.createIssue[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.createIssue[2].name;
            } else if (optionalCommand == "response") {
                return results.createIssue[4].name;
            } else {
                return results.createIssue[0].name;
            }
        } else if (action == "update") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.updateIssue[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.updateIssue[2].name;
            } else if (optionalCommand == "response") {
                return results.updateIssue[4].name;
            } else {
                return results.updateIssue[0].name;
            }
        } else {
            return "Don't have an endpoint example for the specified action"
        }
    }
    // returning repos endpoints, assuming UC1
    else if (feature == "repo" || feature == "repository" || feature == "repositories") {
        results = await scraper.getRepositoriesAPITitles();
        if (action == "get") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.getRepository[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.getRepository[2].name;
            } else if (optionalCommand == "response") {
                return results.getRepository[4].name;
            } else {
                return results.getRepository[0].name;
            }
        } else if (action == "list") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.listRepositories[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.listRepositories[2].name;
            } else if (optionalCommand == "response") {
                return results.listRepositories[4].name;
            } else {
                return results.listRepositories[0].name;
            }
        } else if (action == "create") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.createRepository[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.createRepository[2].name;
            } else if (optionalCommand == "response") {
                return results.createRepository[4].name;
            } else {
                return results.createRepository[0].name;
            }
        } else if (action == "delete") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.deleteRepository[1].name;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.deleteRepository[2].name;
            } else if (optionalCommand == "response") {
                return results.deleteRepository[4].name;
            } else {
                return results.deleteRepository[0].name;
            }
        } else {
            return "Don't have an endpoint example for the specified action"
        }
    }
    return results;
}

// function findSearchStringHelper(results, action) {
    // for (let i = 0; i < results.length; i++) {
        // if (results[i].split(" ")[0].toLowerCase() == action.toLowerCase()) { // Check if the action the user specified is equal to the action in the REST API. If not found, we use synonym API
            // return results[i];
        // }
    // }
    // TODO: not implemented yet
    // return findSearchStringWithSynonym(action, results);
// }
/**
 * Finds the synonym for a verb utilizing the Merriam-Webster Dictionary API
 * @param {} verb 
 */
// function findSearchStringWithSynonym(action, results){

    // return null;
// }

exports.processString = processString;
exports.findSearchString = findSearchString;