const Logger = require('../../../lib/Logger');
const scopeCheck = require('../auth0/scopeCheck');

exports.handler = (event, context, callback) => {
  const { body: data } = event;
  const { scopes } = data;
  const { status, message } = scopeCheck(scopes, 'write:actor');

      // https://www.serverless.com/blog/cors-api-gateway-survival-guide
      // NOTE: If you're making a request using credentials, the wildcard value is not allowed.
      // For your browser to make use of the response, the Access-Control-Allow-Origin response
      // headers must include the specific origin that made the request.
      const response = {
        statusCode,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
        },
        body: JSON.stringify(result),
      };

  if (status === 200) {
    actorsTable.insertItem(data, (error, result) => {
      if (error) {
        Logger.error(JSON.stringify(error));
        callback(null, { statusCode: 500, result: error });
        return;
      }
      callback(null, { statusCode: 200, result });
    });
    return;
  }

  callback(null, { statusCode: status, result: message });
});
