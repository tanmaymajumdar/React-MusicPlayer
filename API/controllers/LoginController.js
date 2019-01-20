var express = require('express');
var app = express();
var auth_helper  = require('../helpers/auth_helper')

app.get('/getAPIUrl' , function (req , res) {
  console.log('API hit');
  res.send( auth_helper.getLoginUrl());
});



var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})
