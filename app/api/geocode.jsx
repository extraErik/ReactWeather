/* global require module */
var axios = require('axios');

const GOOGLE_GEOCODE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';

module.exports = {
    getData: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${GOOGLE_GEOCODE_URL}?address=${encodedLocation}`;

        return axios.get(requestUrl, {timeout: 5000}).then(function (response) {
            if (response.data.results.length === 0 || response.data.status === 'ZERO_RESULTS') {
                throw new Error(`No results found for address "${location}"`)
            } else {
                return response;
            }
        }, function (response) {
            throw new Error(response.error);
        });
    }
}
