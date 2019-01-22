const express = require('express')
const router = express.Router();
const LoginController  = require('../controllers/LoginController');


router.get('/getAuthenticationUrl' , LoginController.getAuthenticationUrl);


module.exports = router;
