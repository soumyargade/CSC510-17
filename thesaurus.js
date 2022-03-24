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
    var word = "initiate";
    var syns = [];
    let options = getDefaultOptions(`/thesaurus/json/${word}?`, "GET");

    return new Promise(function(resolve,reject)
    {
		axios(options)
			.then(function (response) {
        var data = JSON.stringify(response.data)
        var HTTPverb = "Could not match action to a HTTP verb.";

        for(let i = 0, len = (data.match(/"meta"/g) || []).length; i < len; i++) {
            syns[i] = JSON.stringify(response.data[i].meta.syns);
        };

        //!!!! add logic to find synonym and return word
        if (data.indexOf("create")>-1) {
            HTTPverb = "create";
        } else if (data.indexOf("get")>-1) {
            HTTPverb = "get";
        } else if (data.indexOf("retrieve")>-1) {
            HTTPverb = "get";
        } else if (data.indexOf("list")>-1) {
            HTTPverb = "get";
        }  else if (data.indexOf("update")>-1) {
            HTTPverb = "update";
        }  else if (data.indexOf("edit")>-1) {
            HTTPverb = "edit";
        } else if (data.indexOf("delete")>-1) {
            HTTPverb = "delete";
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