# aws_serverless_api_lambda_auth_cors

## What is this repository for?

* `auth0` used to secure our API gateway using token Bearer in frontend.
* enable `CORS` for api gateway to integrate with other domain.
* include `Winston` logger to capture logs base on development environment. 

## How do I get set up?

* Setting up the Serverless function (for DEV stages only)
```bash
# NOTE: Always run the serverless function first
# one-time setup
npm install -g serverless # optional in case you have it already
npm install
# run the service in your local
npm run startwin
```
## How to implement it in frontend?
```bash
const payload = {
    code: "+63"
    country: "Philippines"
}

const config = {
    headers: {
        Authorization: `Bearer ${accessToken}`
    }
}

axios.post(`${API}\cors`, payload, config)
.then((response) => {
    console.log(JSON.stringify(response));
    return;
})
.catch((error) => {
    console.log(JSON.stringify(error));
    return;
});
```

## What is are references?
* https://www.serverless.com/blog/cors-api-gateway-survival-guide
* https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-cors.html
