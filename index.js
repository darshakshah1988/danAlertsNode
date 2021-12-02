const fs = require('fs');
const express = require('express');
var exphbs  = require('express-handlebars');
const $ = require('jquery');
const replaceAll = require('string.prototype.replaceall');

var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'alertsData'
// }); 

var connection = mysql.createConnection({
  host     : 'hashtagmails.com',
  user     : 'u266860147_alerts',
  password : 'Dan#2020',
  database : 'u266860147_danAlerts'
}); 
connection.connect();
const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/file', function (req, res) {


  fs.readFile('test.txt', 'utf8' , (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const newData = data.split(/\r?\n/);
      let myData = [];
      let i = 0;

      
      newData.forEach(x => {
        const str = JSON.stringify(x)
        connection.query('INSERT INTO pvaalerts SET ?', {text: str}, function(error, results, fields) {
          if(error) throw error;
          console.log(results.insertId);
        });      
      })

    
      res.send(JSON.stringify(newData));
    });
    
});

app.get('/data', function(req,res) {
  let data = [];
  connection.query('SELECT ?? FROM ??', ['text', 'pvaAlerts'], function(error, results, fields) {
    if(error) throw error;
    results.forEach(x => {
      const a = x.text;
      const b = a.replace(/"/g, '');
      let c = b.split(",");
      if(c.length < 7)
      {

      }
      else {
       c.forEach(k => {
         data = k;
       })      
      }

    })
  })
  console.log(data);
})
app.listen(3000,() => {
  console.log("Server running at 3000");
});