const axios = require('axios');
const api_key = "t0V54k8mSraB"

// TODO: can try to condense this by passing in run_token, api_key as args
async function getPullsInfo() {
    const run_token = "tteWJx56HMLW";
    const response = await axios.get(`https://www.parsehub.com/api/v2/runs/runToken/data?api_key=apiKey&format=json`);
    return response.data;
}

async function getIssuesInfo() {
    const run_token = "YOUR RUN TOKEN";
    const response = await axios.get(`https://www.parsehub.com/api/v2/runs/runToken/data?api_key=apiKey&format=json`);
    return response.data;
}

async function getRepositoriesInfo() {
    const run_token = "YOUR RUN TOKEN";
    const response = await axios.get(`https://www.parsehub.com/api/v2/runs/runToken/data?api_key=apiKey&format=json`);
    return response.data;
}

exports.getPullsInfo = getPullsInfo;
exports.getIssuesInfo = getIssuesInfo;
exports.getRepositoriesInfo = getRepositoriesInfo;