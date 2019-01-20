var exports = module.exports = {};

const {google} = require('googleapis')

const googleOptions = {
  clientId : '658080829144-k71ltqabr5p8cos2lf9fho0tsgqcjf8i.apps.googleusercontent.com',
  clientSecret : 'mgx0BnGXVLamAqjLGiGX9Yj4',
  redirect : 'http://localhost:3000'
}

createConnection = () => {
  return new google.auth.OAuth2(
    googleOptions.clientId,
    googleOptions.clientSecret,
    googleOptions.redirect
  );
}

const featureScope = [
  'https://www.googleapis.com/auth/drive'
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

exports.getLoginUrl = function(){
  const auth = createConnection();
  const url = getConnectionUrl(auth);

  return url;
}
