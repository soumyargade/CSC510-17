const Client = require('mattermost-client');
const processor = require("./processing.js");

let host = "chat.robotcodelab.com"
let group = "CSC510-S22"
let bot_name = "gitex";
let client = new Client(host, group, {});

async function main()
{
    let request = await client.tokenLogin(process.env.BOTTOKEN);
    client.on('message', function(msg)
    {
        let channel = msg.broadcast.channel_id;
        if (hears(msg, "gitex")){
            let validInput = validateUserInput(msg);
            if (!validInput){
                client.postMessage("Request is unclear.", channel);
                return;
            }
            // let strMsg = JSON.parse(msg.data.post.message);
            // console.log(msg.data.post);
            let resultStr = JSON.parse(msg.data.post);
            resultStr = resultStr.message;
            console.log(resultStr);
            // console.log(msg.data.post.message);
            let returnedMsg = processor.processString(resultStr.split(" "));
            // let returnedMsg = "";
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
    can be mapped to one of the three use cases.
*/
function validateUserInput(msg){
    // TODO: Add validation logic
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