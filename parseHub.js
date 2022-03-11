const axios = require('axios');

// TODO: can try to condense this by passing in run_token, api_key as args
async function getPullsInfo() {
    const run_token = "YOUR TOKEN HERE";
    const api_key = "YOUR KEY HERE";
    const response = await axios.get(`https://www.parsehub.com/api/v2/runs/${run_token}/data?api_key=${api_key}&format=json`);
    return response.data;
}

async function getIssuesInfo() {
    const run_token = "YOUR TOKEN HERE";
    const api_key = "YOUR KEY HERE";
    const response = await axios.get(`https://www.parsehub.com/api/v2/runs/${run_token}/data?api_key=${api_key}&format=json`);
    return response.data;
}

async function getRepositoriesInfo() {
    const run_token = "YOUR TOKEN HERE";
    const api_key = "YOUR KEY HERE";
    const response = await axios.get(`https://www.parsehub.com/api/v2/runs/${run_token}/data?api_key=${api_key}&format=json`);
    return response.data;
}

exports.getPullsInfo = getPullsInfo;
exports.getIssuesInfo = getIssuesInfo;
exports.getRepositoriesInfo = getRepositoriesInfo;