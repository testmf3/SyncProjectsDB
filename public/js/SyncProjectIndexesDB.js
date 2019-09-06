console.info("Script Start");

// var obj = JSON.parse('{ "index":[ "LKB-C01", "LPK-C01a"]}');
// alert(obj.index);

// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function() {
//   if (this.readyState == 4 && this.status == 200) {
//     var myObj = JSON.parse(this.responseText);
//     document.getElementById("demo").innerHTML = myObj.index;
//     alert(myObj.index);
//   }
// };
// xmlhttp.open("GET", "PrjIndexDB.json", true);
// xmlhttp.send();
// alert(xmlhttp.responseText);

// This code sample uses the 'request' library:
// https://www.npmjs.com/package/request

var request = new XMLHttpRequest();
var bodyData = `{
"searcherKey": "com.atlassian.jira.plugin.system.customfieldtypes:grouppickersearcher",
"name": "__New custom field",
"description": "Custom field for picking groups",
"type": "com.atlassian.jira.plugin.system.customfieldtypes:grouppicker"
}`;

var options = {
method: 'POST',
url: 'https://archimatika.atlassian.net/rest/api/3/field',
auth: { bearer: '7316F0j6LHJLP5J1TaPc11DC' },
headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
},
body: bodyData
};

request(options, function (error, response, body) {
if (error) throw new Error(error);
console.log(
    'Response: ' + response.statusCode + ' ' + response.statusMessage
);
console.log(body);
});

console.info("Script End");