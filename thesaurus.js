const axios = require('axios');
const chalk = require('chalk');

config = {}
config.token = process.env.MERRIAMWEBSTERTOKEN;
var urlRoot = "https://dictionaryapi.com/api/v3/references";

function getDefaultOptions(endpoint, method)
{
	var options = {
		url: urlRoot + endpoint + `&key=${config.token}`,
		method: method,
		headers: {
			"User-Agent": "GitEx",
			"content-type": "application/json",
		}
	};
	return options;
}

function getSynonym()
{
    //need to add logic for setting word
    var word = "test";
    let options = getDefaultOptions(`/thesaurus/json/${word}?`, "GET");

    return new Promise(function(resolve,reject)
    {
		axios(options)
			.then(function (response) {
        var data = JSON.stringify(response.data)
        var HTTPverb = "Could not match action used to a HTTP verb.";

        // for (element in response){
        //   if (response.hasOwnProperty(element)){  // Filter out prototypes' (parents') properties
        //     console.log(element)
        //   }
        // }
        // console.log('headers: ' + JSON.stringify(response.headers));
        // console.log('data: ' + JSON.stringify(data));

        //!!!! add logic to find synonym and return word
        if (data.includes("essay")) {
            HTTPverb = "create"
        };
        var v = HTTPverb;
        resolve(v);
			})
			.catch(function (error) {
				console.log(chalk.red(error));
				reject(error);
				return; // Terminate execution.
		});
  });
}
exports.getSynonym = getSynonym;

(async () => {
    let v = await getSynonym();
    console.log(v);
})();