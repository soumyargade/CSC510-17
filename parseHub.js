const axios = require('axios');
const apiKey = "API_KEY"

// TODO: can try to condense this by passing in run_token, api_key as args
async function getPullsInfo() {
    const runToken = "YOUR_RUN_TOKEN";
    const response = await axios.get(`https://www.parsehub.com/api/v2/runs/${runToken}/data?api_key=${apiKey}&format=json`);
    return response.data;
}

async function getIssuesInfo() {
    const runToken = "YOUR_RUN_TOKEN";
    const response = await axios.get(`https://www.parsehub.com/api/v2/runs/${runToken}/data?api_key=${apiKey}&format=json`);
    return response.data;
}

async function getReposInfo() {
    const runToken = "YOUR_RUN_TOKEN";
    const response = await axios.get(`https://www.parsehub.com/api/v2/runs/${runToken}/data?api_key=${apiKey}&format=json`);
    return response.data;
}

exports.getPullsInfo = getPullsInfo;
exports.getIssuesInfo = getIssuesInfo;
exports.getReposInfo = getReposInfo;