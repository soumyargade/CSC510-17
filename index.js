const Client = require('mattermost-client');

let host = "chat.robotcodelab.com"
let group = "CSC510-S22"
let bot_name = "gitex";
let client = new Client(host, group, {});

async function main()
{
    let request = await client.tokenLogin(process.env.BOTTOKEN);
    client.on('message', function(msg)
    {
        console.log(msg);
        if( hears(msg, "hello") )
        {
            parseMessage(msg);            
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

async function parseMessage(msg)
{
    let channel = msg.broadcast.channel_id;
    let test = "testing gitex";
    if( test )
    {
        client.postMessage(test, channel);
    }
}

(async () => 
{
    await main();
})()