var exports = module.exports = {};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserCredentials = new Schema({
    refresh_token = {type : String , required : true , max : 200},
    access_token : {type : String , required : true , max : 200},
    user_id : {type : String , required : true , max : 200},
    expiry_date : {type : Long , required : true}    
});

module.exports = mongoose.model('UserCredentials' , UserCredentials);