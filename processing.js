/* 
This file fulfills the logic of the Processing Service 
which is in charge of processing the user's command and with the 
help of the scraping service, returns the output to the client
*/

const scraper = require("./scraping.js");
var pos = require('pos');

var issuesTitles = scraper.getIssuesAPITitles(); // Contains all the headers for the available API calls under the Issues page in Github
var repoTitles = scraper.getRepositoriesAPITitles();  // Contains all the headers for the available API calls under the Repos page in Github
var pullsTitles = scraper.getPullsAPITitles();  // Contains all the headers for the available API calls under the Pulls page in Github


function processString(msg, uc){
    matchString(msg);
    let verb = getActionVerb(msg);
    if(verb == null){
        return null;
    }


}

/**
 * Uses the pos library to isolate the verb in the users command
 * @param msg User's command
 * @returns Action verb if found, nil otherwise
 */
function getActionVerb(msg){
    let words = new pos.Lexer().lex(msg);
    let tagger = new pos.Tagger();
    let taggedWords = tagger.tag(words);
    for (i in taggedWords) {
        let taggedWord = taggedWords[i];
        let word = taggedWord[0];
        let tag = String(taggedWord[1]);
        if(tag.startsWith("VB")){
            return word;
        }
    }
    return null;
}

/**
 * Finds the synonym for a verb
 * @param {} verb 
 */
function findSynonym(verb){

}

// matches the user's phrase to the corresponding title arrays listed above
// uses the Merriam-Webster Dictionary API
function matchString(msg){

}

module.exports.getActionVerb = getActionVerb;

