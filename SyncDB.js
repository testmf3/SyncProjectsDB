// Имя файла: SyncDB.js

console.info("======= Script Start =======");
var date = new Date(); // Запись текущего времени.

text  = "Часов, минут и секунд сейчас: " + date.getHours() + ":"; // Текущее кол-во ЧАСОВ
text += "" + date.getMinutes() + ":"; // Текущее кол-во ЧАСОВ
text += "" + date.getSeconds() +  ""; // Текущее кол-во ЧАСОВ

// This code sample uses the 'request' library:
// https://www.npmjs.com/package/request
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xhr = new XMLHttpRequest();

var request = require('request'); //
var evt     = require('events'); //
var fs      = require('fs'); //



console.time('Файл');
// var fileJSON = './Projects-response.json'; //
var fileJSON = 'https://raw.githubusercontent.com/testmf3/SyncProjectsDB/master/Projects-response.json';
console.timeEnd('Файл');

var dataURL = 'https://armtest001.atlassian.net/rest/api/3/field/SyncProjectsDB__PPindexes/option';


var projNameJSON = new Array(); // <-- Пустой массив
var projNameWeb  = new Array(); // <-- Пустой массив
// console.log(projName); // Результат: [] (пустой массив)

var objData;
var data;


xhr.open( 'GET', dataURL, false, 'testmf3@archimatika.com', 'CpaRKhnemLWMJPhQF81yC835' );
xhr.send(null);

if (xhr.status === 200) {
  // console.log(xhr.responseText);
  data = xhr.responseText;
  objData = JSON.parse(data); //
  // for (var i = 0; i < objData.values.length; i++) {
  //   projName[i] = objData.values;
  //   // console.log(objData.d.results[i].ProjectName);
  // };
  console.log(objData.total);
  // console.log(objData.values);
  for (var i = 0; i <= objData.total-1; i++) {
    projNameWeb.push(objData.values[i].value);
  }
  // console.log(objData.length); // Длина
};
console.log("Status: " + xhr.status);
console.log(projNameWeb);

//
xhr.open( 'GET', fileJSON, false );
xhr.send(null);

if (xhr.status === 200) {
  // console.log(xhr.responseText);
  data = xhr.responseText;
  var objData = JSON.parse(data); //
  for (var i = 0; i < objData.d.results.length; i++) {
    projNameJSON[i] = objData.d.results[i].ProjectName;
    // console.log(objData.d.results[i].ProjectName);
  };
  console.log(projNameJSON);
  console.log(projNameJSON.length); // Длина массива
};

// Метод GET. Взятие значений из кастомного поля (Custom Field) PPIndexes
// ------------------------------------------------------------------------------------------------------------------------------------------ //
// for (var i = 1; i <= objData.total; i++) {
//   var options = {
//      method: 'GET',
//      url: `https://armtest001.atlassian.net/rest/api/3/field/SyncProjectsDB__PPindexes/option/${i}`,
//      auth: { username: 'testmf3@archimatika.com', password: 'CpaRKhnemLWMJPhQF81yC835' },
//      headers: {
//         'Accept': 'application/json'
//      }
//   };
//
//   request(options, function (error, response, body) {
//     // console.log(options);
//     if (error) throw new Error(error);
//     // console.log('Response: ' + response.statusCode + ' ' + response.statusMessage);
//     // console.log( body );
//     var obj = JSON.parse(body);
//     projNameWeb.push(obj.value);
//     // console.log( obj.value );
//     console.log(projNameWeb);
//   });
// };
// ------------------------------------------------------------------------------------------------------------------------------------------ //


// console.log(projName);


// Метод POST. Добавление значений из кастомного поля (Custom Field) PPIndexes
// ------------------------------------------------------------------------------------------------------------------------------------------ //
for (var i = 0; i < projNameJSON.length; i++) {
  var options = {
     method: 'POST',
     url: 'https://armtest001.atlassian.net/rest/api/3/field/SyncProjectsDB__PPindexes/option',
     auth: { username: 'testmf3@archimatika.com', password: 'CpaRKhnemLWMJPhQF81yC835' },
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: {
       // value: 'Test_Project-001'
       value: projNameJSON[i]
     },
     json: true
  };
  //
  request(options, function (error, response, body) {
     if (error) throw new Error(error);
     console.log('Response: ' + response.statusCode + ' ' + response.statusMessage);
     console.log(body);
  });
};
// ------------------------------------------------------------------------------------------------------------------------------------------ //



// Метод PUT. Обновление значений в кастомном поле (Custom Field) PPIndexes
// ------------------------------------------------------------------------------------------------------------------------------------------ //
// for (var i = 1; i <= objData.total; i++) {
//   var options = {
//      method: 'PUT',
//      url: `https://armtest001.atlassian.net/rest/api/3/field/SyncProjectsDB__PPindexes/option/${i}`,
//      auth: { username: 'testmf3@archimatika.com', password: 'CpaRKhnemLWMJPhQF81yC835' },
//      headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//      },
//      // body: bodyData
//      body: {
//        value: projNameJSON[i-1]
//      },
//      json: true
//   };
//
//   request(options, function (error, response, body) {
//      if (error) throw new Error(error);
//      console.log('Response: ' + response.statusCode + ' ' + response.statusMessage);
//      console.log(body);
//   });
// };
// ------------------------------------------------------------------------------------------------------------------------------------------ //



// Метод DELETE. Удаление значений из кастомного поля (Custom Field) PPIndexes
// ------------------------------------------------------------------------------------------------------------------------------------------ //
// for (var i = 1; i <= objData.total; i++) {
//   var options = {
//      method: 'DELETE',
//      url: `https://armtest001.atlassian.net/rest/api/3/field/SyncProjectsDB__PPindexes/option/${i}`,
//      auth: { username: 'testmf3@archimatika.com', password: 'CpaRKhnemLWMJPhQF81yC835' },
//      headers: {
//         'Accept': 'application/json'
//      }
//   };
//
//   request(options, function (error, response, body) {
//      if (error) throw new Error(error);
//      console.log('Response: ' + response.statusCode + ' ' + response.statusMessage);
//      console.log(body);
//   });
// };
// ------------------------------------------------------------------------------------------------------------------------------------------ //

console.info("======= Script End =======");
