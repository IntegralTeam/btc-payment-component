PAYMENTS COMPONENT
=====================

This node.js project provides api for creating payments system for marketplaces via bitcoin and admin panel on vue for managing users.

**PREREQUISITES**

Type script required  
Bitcoine Core or bitcoind required
  
First, add variables from ```example.env``` to ```.env``` file.  
Second, add **HD wallet masterPrivateKey** to ```config/default.json``` (this location is temporary while development stage continues).

Then:  
To start **backend** type 'npm run dev-ts'  
To start **frontend** type 'npm run front'  

```diff
-WARNING: Since this project is in development stage, anyone can create admin account for testing purposes via unsecured request.    
```

Create first admin account:  
url: http://localhost:3000/api/v1/admin/  
method: POST  
body (JSON):  
```json
{
	"userName":"test",
	"role":"admin",
	"email":"admin@gmail.com",
	"password":"test12345678",
	"passwordConfirmation":"test12345678"
}
```  
After authorization you can create other accounts in admin panel.

**Login endpont returns jwt token - you need to include it as `Bearer <token>` to `Authorization` header where it's needed**

Set hd seed (read this first: https://chainquery.com/bitcoin-cli/sethdseed):  
url: http://localhost:3000/api/v1/admin/btchdwallet/setseed  
method: POST  
auth required: true  
body (JSON):  
```json
{
	"newkeypool": false
}
```  
newkeypool - **optional** - default will be `true`

**REQUESTS**
***
**Check postman collection in this repository.**

1. You can create HD wallets for each expected payment.  

Create HD wallet  
url: http://localhost:3000/api/v1/admin/btchdwallet  
method: POST  
auth required: true  
body (JSON):  
```json
{
	"externalId": 1,
	"expectedAmount": 1,
	"callbackName": "test",
	"callbackArgs": "{ \"key\":\"TESTARGS\" }"
}
```
`externalId` - **required** - you can associate each wallet with any external id (`string` or `number`)  
`expectedAmount` - **required** expected amount of btc (greater than 0 `float`)  
`callbackName` - **optional** - you can set specific callback for each individual wallet. Right now there is 2 test callbacks, which   prints to terminal logs string '`THIS IS TEST CALLBACK (1 or 2 accordingly) WITH PASSED ARGUMENT:`' and passed arguments after it. Now `callbackName` value can be `test` or `test2`.  
`callbackArgs` - **optional** - you can pass some arguments to specified callback in JSON format converted to **escaped string**.  

2. There is a cron job, which checks wallets for payments from clients.  

Get job status  
url: http://localhost:3000/api/v1/admin/job/checkwallets/status  
method: GET  
auth required: true   

Start job  
url: http://localhost:3000/api/v1/admin/job/checkwallets/start  
method: PUT  
auth required: true  

Stop job  
url: http://localhost:3000/api/v1/admin/job/checkwallets/stop  
method: PUT  
auth required: true  
