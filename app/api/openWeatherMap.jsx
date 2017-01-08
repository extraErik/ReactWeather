/* global require module */
var axios = require('axios');

const OPEN_WEATHER_MAP_CURRENT_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=' + process.env.WEATHER_API_KEY + '&units=imperial';
const OPEN_WEATHER_MAP_FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=' + process.env.WEATHER_API_KEY + '&units=imperial';

module.exports = {
    getCurrent: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_CURRENT_URL}&q=${encodedLocation}`;

        return axios.get(requestUrl, {timeout: 5000}).then(function (res) {
            if (((res.data.cod && res.data.cod !== 200) || !res.data.name) && res.data.message) {
                throw new Error(res.data.message);
            } else {
                return res.data;
            }
        }, function (res) {
            throw new Error(res.message);
        });
    },
    getForecast: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_FORECAST_URL}&q=${encodedLocation}`;

        return axios.get(requestUrl, {timeout: 5000}).then(function (res) {
            if (((res.data.cod && res.data.cod !== '200') || !res.data.city) && res.data.message) {
                throw new Error(res.data.message);
            } else {
                return res.data;
            }
        }, function (res) {
            throw new Error(res.message);
        });
    }
}
