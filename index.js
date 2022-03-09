const Client = require('mattermost-client');
const processor = require("./processing.js");
const UC1 = Symbol("UC1"); // Enum for Use Case 1
const UC2 = Symbol("UC2"); // Enum for Use Case 2
const UC3 = Symbol("UC3"); // Enum for Use Case 3
const Invalid = Symbol("Invalid"); // Enum for invalid input that doesn't match use cases 1-3

let host = "chat.robotcodelab.com"
let group = "CSC510-S22"
let bot_name = "gitex";
let client = new Client(host, group, {});

async function main()
{
    let request = await client.tokenLogin(process.env.BOTTOKEN);
    let channel = msg.broadcast.channel_id;
    client.on('message', function(msg)
    {
        console.log(msg);
        if(hears(msg, "gitex")){
            let uc = validateUserInput(msg);
            if(uc == Invalid){
                client.postMessage("Request is unclear.", channel);
                return;
            }
            let returnedMsg = processor.processString(msg, uc);
            if(returnedMsg == null){
                client.postMessage("Request is unclear.", channel);
            }
            else {
                client.postMessage(returnedMsg, channel);
            }
        }
    });
}

function hears(msg, text)
{
    if( msg.data.sender_name == bot_name) return false;
    if( msg.data.post )
    {
        let post = JSON.parse(msg.data.post);
        if( post.message.indexOf(text) >= 0)
        {
            return true;
        }
    }
    return false;
}
/*
    Performs initial validation of the user's command. Ensures that the user command
    can be mapped to one of the three use cases. Returns which use case the user 
    is referring to (or Invalid)
*/
function validateUserInput(msg){
    // TODO: Add validation logic
    return Invalid;
}

(async () => 
{
    if (process.env.NODE_ENV != 'test') {
        await main();
    }
})()

module.exports.hears = hears;
module.exports.parsePulls = parsePulls;
module.exports.parseIssues = parseIssues;
module.exports.parseRepositories = parseRepositories;
module.exports.main = main;