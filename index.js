const Client = require('mattermost-client');
const processor = require("./processing.js");

let host = "chat.robotcodelab.com"
let group = "CSC510-S22"
let bot_name = "gitex";
let client = new Client(host, group, {});

async function main()
{
    let request = await client.tokenLogin(process.env.BOTTOKEN);
    client.on('message', async function(msg)
    {
        let channel = msg.broadcast.channel_id;
        if (hears(msg, "gitex")){
            let validInput = validateUserInput(msg);
            if (!validInput){
                console.log("User's command passed initial validation")
                sendInvalidMessage(channel);
                return;
            }
            let resultStr = JSON.parse(msg.data.post);
            resultStr = resultStr.message;
            console.log("User's command: "+ resultStr)
            let returnedMsg = await processor.processString(resultStr.split(" "));
            if (returnedMsg == null){
                sendInvalidMessage(channel);
                return;
            }
            else {
                // handling if returnedMsg is an object, array, etc.
                if (typeof returnedMsg != 'string') {
                    client.postMessage(JSON.stringify(returnedMsg), channel);
                } else {
                    client.postMessage(returnedMsg, channel);
                }
            }
        }
    });
}

function sendInvalidMessage(channel){
    client.postMessage("Request is unclear.", channel);
    client.postMessage("Please enter a command in the following format: gitex {CRUD keyword or synonym} {Pulls/Repositories/Issues}\
     {Optional: Javascript/Shell/Response}\nExample: gitex get Issues Javascript", channel);
}

function sendMessageToClient(msg, channel){
    client.postMessage(msg, channel);
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
    can be mapped to one of the three use cases.
*/
function validateUserInput(msg){
    let msgArray = msg.split(" ");
    if(msgArray.length != 3 || msgArray.length != 4){
        return false;
    }

    let features = ['pulls', 'repos', 'issues'];
    let optionalCommands = ['javascript, shell', 'response'];

    let action = msgArray[1].toLowerCase();
    let feature = msgArray[2].toLowerCase();
    let optionalCommand = msgArray[3].toLowerCase();

    // error handling
    if (action == null) {
        results = "Please specify an action";
        sendMessageToClient(results, channel)
        console.log("Invalid command. Missing action specifier.");
        return false;
    }

    if (feature == null) {
        results = "Please specify a feature";
        sendMessageToClient(results, channel)
        console.log("Invalid command. Missing feature specifier.");
        return false;
    }

    let validFeature = false;
    features.forEach(element => {
        if(element.includes(feature){
            validFeature = true;
        }
    });

    if(!validFeature){
        return false;
    }


    return true
}

(async () => 
{
    if (process.env.NODE_ENV != 'test') {
        await main();
    }
})()

module.exports.hears = hears;
module.exports.main = main;