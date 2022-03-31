/* 
This file fulfills the logic of the Processing Service 
which is in charge of processing the user's command and with the 
help of the scraping service, returns the output to the client
*/
const parseHub = require("./parseHub.js");
const synonym = require("./thesaurus.js");

 async function processString(msg){
    if (msg[1].toLowerCase() == "create" || msg[1].toLowerCase() == "get" || msg[1].toLowerCase() == "update" || 
    msg[1].toLowerCase() == "delete" || msg[1].toLowerCase() == "list") {
        action = msg[1];
    } else if (msg[1].toLowerCase() == "retrieve") {
        action = "get";
    }  else if (msg[1].toLowerCase() == "edit") {
        action = "update";
    } else {
        action = await synonym.getSynonym(msg[1]).catch( 
            err => console.log("Cannot find HTTP verb. Sorry!") );
        if (action.split(" ").length > 1){
            console.log(action + " Please set your MERRIAMWEBSTERTOKEN environment variable with the appropriate token.")
            return action;
        }
        } 
    let searchString = await findSearchString(action, msg[2], msg[3]);
    console.log("Action: " + action);
    console.log('Search Query: ' + searchString);
    return searchString;
}

/**
 * Searches for the API title that will be scraped based on the users input
 * @param {} action 
 * @param {*} feature 
 * @param {*} optionalCommand 
 */
 async function findSearchString(action, feature, optionalCommand) {
    let results;
    action =action.toLowerCase();
    feature =feature.toLowerCase();
    if(optionalCommand != null){
        optionalCommand=optionalCommand.toLowerCase();
    }
    // returning pulls endpoints, assuming UC1
    if (feature == "pull" || feature == "pulls") {
        // getting info from ParseHub
        results = await parseHub.getPullsInfo();
        if (action == "get") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.getPullRequest[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.getPullRequest[0].javascript;
            } else if (optionalCommand == "response") {
                return results.getPullRequest[0].responseBody;
            } else {
                return results.getPullRequest[0].endpoint;
            }
        } else if (action == "list") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.listPullRequests[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.listPullRequests[0].javascript;
            } else if (optionalCommand == "response") {
                return results.listPullRequests[0].responseBody;
            } else {
                return results.listPullRequests[0].endpoint;
            }
        } else if (action == "create") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.createPullRequest[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.createPullRequest[0].javascript;
            } else if (optionalCommand == "response") {
                return results.createPullRequest[0].responseBody;
            } else {
                return results.createPullRequest[0].endpoint;
            }
        } else if (action == "update") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.updatePullRequest[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.updatePullRequest[0].javascript;
            } else if (optionalCommand == "response") {
                return results.updatePullRequest[0].responseBody;
            } else {
                return results.updatePullRequest[0].endpoint;
            }
        }
        else {
            return "Don't have an endpoint example for the specified action"
        }
    }
    // returning issues endpoints, assuming UC1
    else if (feature == "issue" || feature == "issues") {
        results = await parseHub.getIssuesInfo();
        if (action == "get") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.getIssue[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.getIssue[0].javascript;
            } else if (optionalCommand == "response") {
                return results.getIssue[0].responseBody;
            } else {
                return results.getIssue[0].endpoint;
            }
        } else if (action == "list") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.listIssue[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.listIssue[0].javascript;
            } else if (optionalCommand == "response") {
                return results.listIssue[0].responseBody;
            } else {
                return results.listIssue[0].endpoint;
            }
        } else if (action == "create") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.createIssue[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.createIssue[0].javascript;
            } else if (optionalCommand == "response") {
                return results.createIssue[0].responseBody;
            } else {
                return results.createIssue[0].endpoint;
            }
        } else if (action == "update") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.updateIssue[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.updateIssue[0].javascript;
            } else if (optionalCommand == "response") {
                return results.updateIssue[0].responseBody;
            } else {
                return results.updateIssue[0].endpoint;
            }
        } else {
            return "Don't have an endpoint example for the specified action"
        }
    }
    // returning repos endpoints, assuming UC1
    else if (feature.includes('repo')) {
        results = await parseHub.getReposInfo();
        if (action == "get") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.getRepo[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.getRepo[0].javascript;
            } else if (optionalCommand == "response") {
                return results.getRepo[0].responseBody;
            } else {
                return results.getRepo[0].endpoint;
            }
        } else if (action == "list") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.listRepos[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.listRepos[0].javascript;
            } else if (optionalCommand == "response") {
                return results.listRepos[0].responseBody;
            } else {
                return results.listRepos[0].endpoint;
            }
        } else if (action == "create") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.createRepo[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.createRepo[0].javascript;
            } else if (optionalCommand == "response") {
                return results.createRepo[0].responseBody;
            } else {
                return results.createRepo[0].endpoint;
            }
        } else if (action == "update") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.updateRepo[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.updateRepo[0].javscript;
            } else if (optionalCommand == "response") {
                return results.updateRepo[0].responseBody;
            } else {
                return results.updateRepo[0].endpoint;
            }
        }
        else if (action == "delete") {
            if (optionalCommand == "curl" || optionalCommand == "shell") {
                return results.deleteRepo[0].shell;
            } else if (optionalCommand == "javascript" || optionalCommand == "js") {
                return results.deleteRepo[0].javascript;
            } else if (optionalCommand == "response") {
                return results.deleteRepo[0].responseBody;
            } else {
                return results.deleteRepo[0].endpoint;
            }
        } else {
            return "Don't have an endpoint example for the specified action"
        }
    }
    return results;
}

exports.processString = processString;
exports.findSearchString = findSearchString;