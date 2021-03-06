 /******************************************************
 * PLEASE DO NOT EDIT THIS FILE
 * the verification process may break
 * ***************************************************/

'use strict';

var fs = require('fs');
var express = require('express');
var app = express();
var time = require('./timestamp');

app.use('/public',express.static('public'));

//Redirect to TimeStamp module
app.get('/:inputDate',time);

app.route('/')
  .get(function(req, res) {
		  res.sendFile(process.cwd() + '/views/index.html');
});

// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt');
  console.log("Wrong route " + req.url);
  res.send('Not found ');
});

// Error Middleware
app.use(function(err, req, res, next) {
  if(err) {
    res.status(err.status || 500)
      .type('txt')
      .send("Handled by Error Middleware" + err.message || 'SERVER ERROR');
  }  
})

app.listen(process.env.PORT, function () {
  console.log('Node.js listening on ' + process.env.PORT);
});
