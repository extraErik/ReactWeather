/* global require window */
var React = require('react');

import WeatherForm from 'WeatherForm';
import WeatherCurrent from 'WeatherCurrent';
import WeatherForecastList from 'WeatherForecastList';
import ErrorModal from 'ErrorModal';

var geocode = require('geocode');
var darkSky = require('darkSky');
var openWeatherMap = require('openWeatherMap');

var moment = require('moment-timezone');

export var Weather = React.createClass({
    propTypes: {
        location: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            isLoadingCurrent: false,
            isLoadingForecast: false
        }
    },
    getIconFilename: function (apiName, forecastFlag) {

        // Per the DarkSky API FAQ, can treat partly-cloudy-night as aliast for 'clear-day'
        // due to some confusing logic that they plan to change. My reading indicates this
        // really only applies to forecast days, not current conditions, hence the flag here.
        if (forecastFlag === true && apiName === 'partly-cloudy-night') {
            apiName = 'clear-day';
        }

        var iconFilenameMap = {
            'clear-day': 'Sun',
            'clear-night': 'Sun',
            'rain': 'Cloud-Rain',
            'snow': 'Cloud-Snow-Alt',
            'sleet': 'Cloud-Hail-Alt',
            'wind': 'Wind',
            'fog': 'Cloud-Fog',
            'cloudy': 'Cloud',
            'partly-cloudy-day': 'Cloud-Sun',
            'partly-cloudy-night': 'Cloud-Moon'
        };

        return iconFilenameMap[apiName];
    },
    getWindDirection: function(deg) {
        // Return direction of wind given degrees, according to info found
        // here: http://climate.umn.edu/snow_fence/components/winddirectionanddegreeswithouttable3.htm

        var windDir;

        var degDirArray = [
            { min: 0, max: 11.25, dir: 'N'},
            { min: 11.25, max: 33.75, dir: 'NNE' },
            { min: 33.75, max: 56.25, dir: 'NE' },
            { min: 56.25, max: 78.75, dir: 'ENE' },
            { min: 78.75, max: 101.25, dir: 'E' },
            { min: 101.25, max: 123.75, dir: 'ESE' },
            { min: 123.75, max: 146.25, dir: 'SE' },
            { min: 146.25, max: 168.75, dir: 'SSE' },
            { min: 168.75, max: 191.25, dir: 'S' },
            { min: 191.25, max: 213.75, dir: 'SSW' },
            { min: 213.75, max: 236.25, dir: 'SW' },
            { min: 236.25, max: 258.75, dir: 'WSW' },
            { min: 258.75, max: 281.25, dir: 'W' },
            { min: 281.25, max: 303.75, dir: 'WNW' },
            { min: 303.75, max: 326.25, dir: 'NW' },
            { min: 326.25, max: 348.75, dir: 'NNW' },
            { min: 348.75, max: 360, dir: 'N' } // This range of degrees is also N
        ];

        if (deg === 0) {
            windDir = 'N'; // Edge case of exactly 0 deg, not covered other logic
        } else {
            for (let degRange of degDirArray) {
                if (deg > degRange.min && deg <= degRange.max) {
                    windDir = degRange.dir;
                }
            }
        }

        return windDir;

    },
    handleSearch: function(location) {
        var that = this;

        this.setState({
            isLoadingWeather: true,
            location: undefined,
            darkSkyCurrent: {
                dt: undefined,
                temp: undefined,
                conditions: undefined,
                iconClass: undefined,
                humidity: undefined,
                pressure: undefined,
                windSpeed: undefined,
                windDeg: undefined,
                visibility: undefined,
                sunriseUTC: undefined,
                sunsetUTC: undefined
            },
            errorGeo: undefined,
            errorDarkSky: undefined,
        });

        geocode.getData(location).then(function (httpData) {
            var lat = httpData.data.results[0].geometry.location.lat,
                lng = httpData.data.results[0].geometry.location.lng;

            that.setState({
                location
            });

            darkSky.getData(lat, lng).then(function (httpData) {

                that.setState({
                    isLoadingWeather: false,
                    darkSkyCurrent: {
                        dt: moment.utc(httpData.data.currently.time * 1000).format('ddd, M/D'),
                        temp: httpData.data.currently.temperature.toFixed(0),
                        conditions: httpData.data.currently.summary,
                        iconVal: that.getIconFilename(httpData.data.currently.icon),
                        humidity: (httpData.data.currently.humidity * 100).toFixed(0),
                        pressure: (httpData.data.currently.pressure * 100 * 0.000295299830714).toFixed(2), // convert hPa to inches of Mercury
                        windSpeed: httpData.data.currently.windSpeed.toFixed(1),
                        windDir: that.getWindDirection(httpData.data.currently.windBearing),
                        visibility: httpData.data.currently.visibility,
                        sunriseUTC: moment.utc(httpData.data.daily.data[0].sunriseTime * 1000).tz(httpData.data.timezone).format('h:mm a z'),
                        sunsetUTC: moment.utc(httpData.data.daily.data[0].sunsetTime * 1000).tz(httpData.data.timezone).format('h:mm a z')
                    },
                    darkSkyForecast: httpData.data.daily.data.map(function(item, index){
                        var processedItem = { dt: undefined, temp: {max: undefined, min: undefined }};
                        processedItem.id = index;
                        processedItem.dt = moment.utc(item.time * 1000).format('ddd, M/D'),
                        processedItem.conditions = item.summary,
                        processedItem.iconVal = that.getIconFilename(item.icon, true),
                        processedItem.temp.max = item.temperatureMax.toFixed(0);
                        processedItem.temp.min = item.temperatureMin.toFixed(0);
                        return processedItem
                    })
                });

            }, function (e) {
                that.setState({
                    isLoadingWeather: false,
                    errorDarkSky: e.message
                });
            });

        }, function (e) {
            that.setState({
                isLoadingWeather: false,
                errorGeo: e.message
            });
        });
    },
    componentDidMount: function () {
        var location = this.props.location.query.location;

        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = '#/';
        }
    },
    componentWillReceiveProps: function (newProps) {
        var location = newProps.location.query.location;

        if (location && location.length > 0) {
            this.handleSearch(location);
            window.location.hash = '#/';
        }
    },
    render: function () {
        var {isLoadingWeather, location, darkSkyCurrent, darkSkyForecast, errorGeo, errorDarkSky} = this.state;

        function renderSpinner () {
            if (isLoadingWeather) {
                return <h3>Fetching weather...</h3>
            }
        }

        function renderCurrentWeather () {
            if (location && darkSkyCurrent) {
                return <WeatherCurrent location={location} current={darkSkyCurrent}/>;
            }
        }

        function renderForecastWeather () {
            if (location && darkSkyForecast) {
                return <WeatherForecastList location={location} forecast={darkSkyForecast}/>;
            }
        }

        function renderError () {
            if (isLoadingWeather === false && (typeof errorGeo === 'string' || typeof errorDarkSky === 'string')) {
                return (
                    <ErrorModal errorGeo={errorGeo} errorDarkSky={errorDarkSky} />
                )
            }
        }

        return (
            <div ref={node => this.node = node}>
                <h1 className="text-center page-title">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderSpinner()}
                {renderCurrentWeather()}
                {renderForecastWeather()}
                {renderError()}
            </div>
        )
    }
});

export default Weather;
