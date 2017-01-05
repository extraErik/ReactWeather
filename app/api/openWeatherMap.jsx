/* global require module */
var axios = require('axios');

//TODO: get my app id off Github
const OPEN_WEATHER_MAP_CURRENT_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=abd6605f13c7834d0b0d2a747aa6fa00&units=imperial';
const OPEN_WEATHER_MAP_FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily?appid=abd6605f13c7834d0b0d2a747aa6fa00&units=imperial';


module.exports = {
    getCurrent: function (location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_CURRENT_URL}&q=${encodedLocation}`;

        return axios.get(requestUrl).then(function (res) {
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

        return axios.get(requestUrl).then(function (res) {
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
