// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();
var axios = require('axios');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint...
app.get('/api/whoami', async function (req, res) {
  const ipaddress = await axios.get("https://api.ipify.org/?format=json")
  console.log(ipaddress.data)
  
  const rq = req.headers;
  const forwarded =  req.socket.remoteAddress
  console.log(forwarded)
   res.json({
    ipaddress : ipaddress.data.ip,
    language : rq['accept-language'],
    software : rq['user-agent'],
    
   })
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
