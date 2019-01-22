var express = require('express');
var auth_helper  = require('../helpers/auth_helper')
var url = require('url')
var exports = module.exports = {};

// app.get('/getAPIUrl' , function (req , res) {
//   console.log('API hit');
//   res.send( auth_helper.getLoginUrl());
// });

// app.get('/codes' , async function(request , res) {

//   try{

//     let authCode = url.parse(request.url , true).query.code;

//     let asd = await auth_helper.listFiles(authCode)

//     res.send(asd);

//   }catch(err) {
//     console.log(err);
//     return "gail"
//   }

// });


exports.getAuthenticationUrl  =  (req , res) => {
  res.send(auth_helper.getLoginUrl());
}

exports.getTokens = async (req , res) => {
  let authCode = url.parse(request.url , true).query.code;

  res.send(await auth_helper.listFiles(authCode));
}



