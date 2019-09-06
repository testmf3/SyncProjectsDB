// This code sample uses the 'request' library:
// https://www.npmjs.com/package/request
function MainTest(){
    var request = require('request');

    var options = {
    method: 'GET',
    url: '/rest/api/3/issue/{issueIdOrKey}/worklog',
    headers: {
        'Authorization': 'Bearer <access_token>',
        'Accept': 'application/json'
    }
    };

    request(options, function (error, response, body) {
    if (error) throw new Error(error);
    alert('Response: ' + response.statusCode + ' ' + response.statusMessage);
    console.log(
        'Response: ' + response.statusCode + ' ' + response.statusMessage
    );
    console.log(body);
    });
};