const Client = require('mattermost-client');
const processor = require("./processing.js");
const { getSynonym } = require('./thesaurus.js');

let host = "chat.robotcodelab.com"
let group = "CSC510-S22"
let bot_name = "gitex";
let client = new Client(host, group, {});
let channel;
async function main()
{
    let request = await client.tokenLogin(process.env.BOTTOKEN);
    client.on('message', async function(msg)
        {
            channel = msg.broadcast.channel_id;
            firstMessage = false;
            if (hears(msg, "gitex")){
                let resultStr = JSON.parse(msg.data.post);
                resultStr = resultStr.message;
                let validInput = validateUserInput(resultStr);
                if (!validInput){
                    console.log("User's command failed to pass initial validation")
                }
                else{
                    console.log("User's command: "+ resultStr)
                    let returnedMsg = await processor.processString(resultStr.split(" "));
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
    let msgArray = msg.toString().split(" ");
    console.log(msg)
    let results = "";
    if(msgArray.length > 4 || msgArray.length < 3){
        results = "Too many action specifiers.";
        sendMessageToClient(results, channel);
        console.log("Invalid command. Too many action specifiers.");
        return false;
    }

    let features = ['pulls', 'repos', 'issues'];
    let optionalCommands = ['javascript', 'js', 'shell', 'response'];
    let actions = ['create', 'get', 'list', 'update', 'edit', 'delete']

    let action = msgArray[1].toLowerCase();
    let feature = msgArray[2].toLowerCase();
    let optionalCommand = "";
    if(msgArray.length == 4){
        optionalCommand = msgArray[3].toLowerCase();
    }

    if (action == null) {
        results = "Please specify an action";
        sendMessageToClient(results, channel);
        console.log("Invalid command. Missing action specifier.");
        return false;
    }

    if (feature == null) {
        results = "Please specify a feature";
        sendMessageToClient(results, channel);
        console.log("Invalid command. Missing feature specifier.");
        return false;
    }

    // let synonym = getSynonym(action);
    // if(!actions.includes(synonym)){
    //     results = "Invalid action entered. Please make sure it maps to a CRUD keyword.";
    //     sendMessageToClient(results, channel);
    //     console.log("Invalid action entered. Please make sure it maps to a CRUD keyword.");
    //     return false;
    // }

    let validFeature = false;

    for(let el of features){
        if(el.includes(feature)){
            validFeature = true;
            break;
        }
    }
    if(!validFeature){
        results = "Invalid feature. Please select one of the following features: Pulls, Repos, Issues";
        sendMessageToClient(results, channel);
        console.log(results);
        return false;
    }

    if(optionalCommand != null){
        let validCommand = false;
        for(let el of optionalCommands){
            if(el.includes(optionalCommand)){
                validCommand = true;
            }
        }
        if(!validCommand){
            results = "Invalid optional command. Please select one of the following optional commands: Javascript, Shell, Response";
            sendMessageToClient(results, channel);
            console.log(results);
            return false;
        }
    }
    return true;
}

(async () => 
{
    if (process.env.NODE_ENV != 'test') {
        await main();
    }
})()

module.exports.hears = hears;
module.exports.main = main;
module.exports.validateUserInput = validateUserInput;