const Logger = require('../../lib/Logger');
const scopeCheck = require('./auth0/scopeCheck');

exports.handler = (event, context, callback) => {
  const { body: data } = event;
  const { scopes } = data;
  const { status } = scopeCheck(scopes, 'write:actor');

  const payload = {
    country_code: '+63',
    msg: 'Mabuhay! Mula sa nipahut.club Philippines.',
  };

  // https://www.serverless.com/blog/cors-api-gateway-survival-guide
  // NOTE: If you're making a request using credentials, the wildcard value is not allowed.
  // For your browser to make use of the response, the Access-Control-Allow-Origin response
  // headers must include the specific origin that made the request.
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify(payload),
  };

  if (status !== 200) {
    response.statusCode = status;
    payload.msg = 'Aunthorized! Call security.';
    Logger.error(`===>>> Error in Escope Log: ${JSON.stringify(response)}`);
    callback(null, response);
    return;
  }

  Logger.info(`===>>> Success in Escope Log: ${JSON.stringify(response)}`);
  callback(null, response);
};
