var request = require('request');

request({
  uri: 'https://www.parsehub.com/api/v2/runs/tzJCJhbBxQTA/data',
  method: 'GET',
  gzip: true,
  qs: {
    api_key: "t0V54k8mSraB",
    format: "json"
  }
}, function(err, resp, body) {
  console.log(body);
});