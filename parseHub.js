const { default: axios } = require('axios');

async function getPullsTitles() {
	var request = require('request');

    request({
        uri: 'https://www.parsehub.com/api/v2/runs/{RUN_TOKEN}/data',
        method: 'GET',
        gzip: true,
        qs: {
            api_key: "{API_KEY}",
            format: "json"
        }
    }, function(err, resp, body) {
            console.log(JSON.parse(body));
    });
}

exports.getPullsTitles = getPullsTitles;