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
        if( hears(msg, "gitex") )
        {
            if (hears(msg, "pull") || hears(msg, "pulls")) {
                parsePulls(msg);
            } else if (hears(msg, "issue") || hears(msg, "issues")) {
                parseIssues(msg);
            } else if (hears(msg, "repository") || hears(msg, "repositories")) {
                parseRepositories(msg);
            } else {
                let channel = msg.broadcast.channel_id;
                client.postMessage("request is unclear", channel);
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

async function parsePulls(msg)
{
    let channel = msg.broadcast.channel_id;
    let test = "fetching from Pulls API...";
    if( test )
    {
        client.postMessage(test, channel);
    }
}

async function parseIssues(msg)
{
    let channel = msg.broadcast.channel_id;
    let test = "fetching from Issues API...";
    if( test )
    {
        client.postMessage(test, channel);
    }
}

async function parseRepositories(msg)
{
    let channel = msg.broadcast.channel_id;
    let test = "fetching from Repositories API...";
    if( test )
    {
        client.postMessage(test, channel);
    }
}

(async () => 
{
    await main();
})()