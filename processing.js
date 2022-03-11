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

    let action = msg[0];
    let feature = msg[1];
    let optionalCommand = msg[2];

    let searchString = findSearchString(action, feature, optionalCommand);
    await scraper.scrape(searchString, optionalCommand);



}

/**
 * Searches for the API title that will be scraped based on the users input
 * @param {} action 
 * @param {*} feature 
 * @param {*} optionalCommand 
 */
function findSearchString(action, feature, optionalCommand) {
    
}
/**
 * Finds the synonym for a verb utilizing the Merriam-Webster Dictionary API
 * @param {} verb 
 */
function findSynonym(verb){

}






