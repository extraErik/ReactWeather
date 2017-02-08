/* global require module process */
var axios = require('axios');

const DARKSKY_PROXY_URL = 'http://localhost:' + process.env.PORT + '/forecast';

module.exports = {
    getData: function (lat, lng) {
        //var requestUrl = `${DARKSKY_URL}/${lat},${lng}`;
        var requestUrl = `${DARKSKY_PROXY_URL}?lat=${lat}&lng=${lng}`;

        return axios.get(requestUrl, {timeout: 5000}).then(function (response) {
            return response;
        }, function (response) {
            throw new Error(response.error);
        });
    }
}
