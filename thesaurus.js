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

function getSynonym(action)
{
    //need to add logic for setting word
    var syns = [];
    var syn_meta = [];
    var syn_def  = [];
    var syn_list = [];
    let options = getDefaultOptions(`/thesaurus/json/${action}?`, "GET");

    return new Promise(function(resolve,reject)
    {
		axios(options)
			.then(function (response) {
        var data = JSON.stringify(response.data)
        var HTTPverb = "Could not match action to a HTTP verb.";

        //store syns from response
        for(let i = 0, len = (data.match(/"meta"/g) || []).length; i < len; i++) {
            syns[i] = response.data[i].meta.syns;
        };

        //parse 3-level nested array to store synonym values
        for(let i = 0, len = syns.length; i < len; i++) {
            for(let j = 0, len = (syns[i].length); j < len; j++) {
                for(let k = 0, len = syns[i][j].length; k < len; k++) {
                    syn_meta[k]  = syns[i][j][k]
                }
                syn_def = syn_def.concat(syn_meta);
            }
            syn_list = syn_list.concat(syn_def);
        };

        //logic to find synonym and return word
        if (syn_list.includes("create")) {
            HTTPverb = "create";
        } else if (syn_list.includes("get")) {
            HTTPverb = "get";
        } else if (syn_list.includes("retrieve")) {
            HTTPverb = "get";
        } else if (syn_list.includes("list")) {
            HTTPverb = "get";
        }  else if (syn_list.includes("update")) {
            HTTPverb = "update";
        }  else if (syn_list.includes("edit")) {
            HTTPverb = "edit";
        } else if (syn_list.includes("delete")) {
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

// (async () => {
//     let v = await getSynonym();
//     console.log(v);
// })();