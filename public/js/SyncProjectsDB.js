

function Main(){
    var IssueKeys = [];
    var JSONData_Ext = [];

    // alert("From SyncProjectDB.js -> ReadJson()");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            var myObj = JSON.parse(this.responseText);
            var arTest;
            myObj.RECORDS.forEach(element => {
                arTest += element.name + ", ";
            });
            var strTest = "Existing in DB Project indexes: " + arTest;
            //alert(strTest);
            //document.getElementById("PrjIndexes").innerHTML = myObj.index;
        }
    };
    xmlhttp.open("GET", 'json/PrjIndexDB.json', true);
    xmlhttp.send();
    
    // AP.require('request', function(request) 
    // {
    //     request(
    //     {
    //         type: 'GET',
    //       url: '/rest/api/3/field',
    //       success: function(response) 
    //       {
    //         // convert the string response to JSON
    //         response = JSON.parse(response);
      
    //         // dump out the response to the console
    //         console.log(response);
    //         alert(response);
    //       },
    //       error: function() 
    //       {
    //         console.log(arguments);
    //       }  
    //     });
    // });
    // var bodyData = {
    //     searcherKey: "com.atlassian.jira.plugin.system.customfieldtypes:multiselectsearcher",
    //     name: "Project Name",
    //     description: "Project identifier from Archimatika's Project Portfolio Database",
    //     type: "com.atlassian.jira.plugin.system.customfieldtypes:select"
    //   }; 
    // AP.require('request', function(request) 
    // {
    //     request(
    //     {
    //         contentType: 'application/json',
    //         headers: {Accept: 'application/json'},
    //         data: JSON.stringify(bodyData),
    //         type: 'POST',
    //         url: 'https://archimatika.atlassian.net/rest/api/3/field',
    //         success: function(response) 
    //         {
    //             // convert the string response to JSON
    //             //response = JSON.parse(response);
    //             // dump out the response to the console
    //             //console.log(response);
    //         },
    //         error: function(xhr, statusText, errorThrown)
    //         {
    //             //console.log(arguments);
    //         }
    //         });
    // });
    

    AP.require('request', function(request) 
    {
        request(
        {
            headers: {Accept: 'application/json'},
            type: 'GET',
            url: "/rest/api/3/search",
            success: function(response) 
            {               
                // convert the string response to JSON
                response = JSON.parse(response);
                var strTest = "Existing in JIRA Project indexes: " + response;
                response.issues.forEach(element => {
                    console.log(element.key);
                    IssueKeys.push(element.key);
                });
                //alert(IssueKeys);

                IssueKeys.forEach(element_Issue => {
                    var strURL = "/rest/api/3/issue/" + element_Issue;
                    AP.require('request', function(request) 
                    {
                        request(
                        {
                            headers: {Accept: 'application/json'},
                            type: 'GET',
                            url: strURL,
                            success: function(response) 
                            {               
                                // convert the string response to JSON
                                response = JSON.parse(response);
                                //alert(response.fields.worklog.total);
                                for (var i = 0; i < response.fields.worklog.total; i++)
                                {
                                    var rowname = element_Issue + ": User -> " + response.fields.worklog.worklogs[i].updateAuthor.displayName + " WorkLog -> " + response.fields.worklog.worklogs[i].timeSpentSeconds/3600 + "h ; " + '\n';
                                    JSONData_Ext.push(rowname);
                                    //alert(JSONData_Ext);
                                    var obj=document.getElementById("worlogs");
                                    var txt=document.createTextNode(rowname);
                                    obj.appendChild(txt);
                                    obj = obj.replace(/(\r\n|\n|\r)/gm, '<br />');
                                }
                                // response.fields.worklog.worklogs.forEach(element => 
                                // {
                                //     var rowname = element_Issue + ": User -> " + element.updateAuthor.displayName + " WorkLog -> " + element.timeSpentSeconds/3600 + "h ; " + '\n';
                                //     JSONData_Ext.push(rowname);
                                //     //alert(JSONData_Ext);
                                //     var obj=document.getElementById("worlogs");
                                //     var txt=document.createTextNode(rowname);
                                //     obj.appendChild(txt);
                                //     obj = obj.replace(/(\r\n|\n|\r)/gm, '<br />');
                                //     console.log(rowname);
                                // });
                            },
                            error: function(xhr, statusText, errorThrown)
                            {
                                console.log(arguments);
                            }
                        });
                    });
                });
                //document.forms['JSONForm']['JSONresult'].value = 'yourvalue';
                //alert(JSONData_Ext);
                // dump out the response to the console
                //console.log(response);
            },
            error: function(xhr, statusText, errorThrown)
            {
                console.log(arguments);
            }
        });
    });
    //alert(JSONData_Ext);
    return JSONData_Ext.toString();
}