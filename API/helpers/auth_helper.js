var exports = module.exports = {};
var fs = require('fs');
const {google} = require('googleapis')
const plus = google.plus('v1');


const googleOptions = {
  clientId : '658080829144-k71ltqabr5p8cos2lf9fho0tsgqcjf8i.apps.googleusercontent.com',
  clientSecret : 'xInu9yyPHJBDcEMRqj_en2xw',
  redirect : 'http://localhost:8081/codes'
}

createConnection = () => {
  return new google.auth.OAuth2(
    googleOptions.clientId,
    googleOptions.clientSecret,
    googleOptions.redirect
  );
}

const featureScope = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/plus.me'
]

function getConnectionUrl(auth){
  return auth.generateAuthUrl(
    {
      access_type : 'offline',
      prompt : 'consent',
      scope: featureScope
    }
  );
}



exports.getTokenFromCode = async function (code){
  try{
    const auth = createConnection();

    let data = await auth.getToken(code);
    const tokens = data.tokens;

    let customToken = {
      access_token : tokens.access_token,
      refresh_token : tokens.refresh_token,
      id_token : tokens.id_token,
      scope : featureScope[0],
      expiry_date : tokens.expiry_date,
      token_type:"Bearer"
    }

    auth.setCredentials(customToken);
    return auth;

  }catch(err){
    return "here is" +err;
  }
}

exports.getLoginUrl = function(){
  const auth = createConnection();
  const url = getConnectionUrl(auth);

  return url;
}



exports.listFiles = async function (authCode) {

  const auth = await exports.getTokenFromCode(authCode);

  const drive = google.drive({version: 'v3', auth});

  drive.files.list({

    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',

    }, (err, res) => {

    if (err) return console.log('The API returned an error: ' + err);

    const files = res.data.files;

    if (files.length) {

      files.map((file) => {
        console.log(file);
      });

    } else {

      console.log('No files found.');

    }


    var fileId = '1as9z5serMqhkdjZUTxYMVYEH6SO0L6Pz';

    try{
      const dest = fs.createWriteStream('./tmp/test.mp3');

      drive.files.get({fileId: fileId, alt: 'media' }, {responseType: 'stream' , Range: bytes=500-999},
      function(err, res){
          res.data
          .on('end', () => {
              console.log('Done');
          })
          .on('error', err => {
              console.log('Error', err);
          })
          .pipe(dest);
      }
  );


    }catch(err){
      console.log(err + "my error");
      return err;
    }


  });
}
