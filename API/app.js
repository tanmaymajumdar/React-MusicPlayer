const express = require('express')
var app = express();
const AuthenticationRouter = require('./routes/authenticate_route')


app.use('/authenticate' , AuthenticationRouter);

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
 