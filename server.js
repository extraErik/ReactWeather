var express = require('express');
var request = require('request');
var path = require('path');
var envFile = require('node-env-file');

const PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

try {
    envFile(path.join(__dirname, 'config/' + process.env.NODE_ENV + '.env'));
} catch(e) {
    // Just log and ignore. Ain't nobody got time for errors.
    console.log('envFile error', e);
}

const DARKSKY_URL = 'https://api.darksky.net/forecast/' + process.env.DARKSKY_API_KEY;


// Create and configure sub-apps
var api = express();
var ux = express();

api.get('/', function(req, res) {
    var url = DARKSKY_URL + '/' + req.query.lat + ',' + req.query.lng;
    req.pipe(request(url)).pipe(res);
});

ux.use(express.static('public'));


// Create and configure main app, set up routing to sub apps
var app = express();

app.use('/forecast', api);
app.use('/', ux);


app.listen(PORT, function () {
    console.log('Express server is up on port ' + PORT);
});
