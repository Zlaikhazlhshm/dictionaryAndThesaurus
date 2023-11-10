const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const path = require('path');

var btnCreate = document.getElementById('btnCreate');
var btnRead = document.getElementById('btnRead');
var btnUpdate = document.getElementById('btnUpdate');
var btnDelete = document.getElementById('btnDelete');
var fileName = document.getElementById('fileName');
var fileContents = document.getElementById('fileContents');
var wordInput = document.getElementById('word');

let pathName = path.join(__dirname, 'Files');

btnCreate.addEventListener('click', function () {
  // Creating a text file when the user clicks the CREATE button
  let file = path.join(pathName, fileName.value);
  let contents = 'Word: ' + wordInput.value + '\n' + 'Meanings: ' + fileContents.value;

  fs.writeFile(file, contents, function (err) {
    if (err) {
      return console.log(err);
    }
    var txtfile = document.getElementById('fileName').value;
    alert(txtfile + ' text file was created');
    console.log('The file was created');
    fileName.value = '';
    fileContents.value = '';
    wordInput.value = ''; 
  });
});

btnRead.addEventListener('click', function () {
  let file = path.join(pathName, fileName.value);
  wordInput.value = ''; 

  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    const lines = data.split('\n'); 
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('Word: ')) {
        wordInput.value = lines[i].substring(6);
      } else if (lines[i].startsWith('Meanings: ')) {
        fileContents.value = lines[i].substring(10); 
      }
    }
    console.log('The file was read!');
  });
});

btnUpdate.addEventListener('click', function () {
  let file = path.join(pathName, fileName.value);
  let contents = 'Word: ' + wordInput.value + '\n' + 'Meanings: ' + fileContents.value;

  fs.writeFile(file, contents, function (err) {
    if (err) {
      return console.log(err);
    }
    var txtfile = document.getElementById('fileName').value;
    alert(txtfile + ' text file was updated');
    console.log('The file was updated');
    fileName.value = '';
    fileContents.value = '';
    wordInput.value = ''; // Clear the word input field
  });
});

btnDelete.addEventListener('click', function () {
  let file = path.join(pathName, fileName.value);

  fs.unlink(file, function (err) {
    if (err) {
      return console.log(err);
    }
    fileName.value = '';
    fileContents.value = '';
    wordInput.value = ''; // Clear the word input field
    console.log('The file was deleted!');
  });
});