/* global require window */
var React = require('react');
//var WeatherForm = require('WeatherForm');
//var WeatherCurrent = require('WeatherCurrent');
import WeatherForm from 'WeatherForm';
import WeatherCurrent from 'WeatherCurrent';
import WeatherForecastList from 'WeatherForecastList';
import ErrorModal from 'ErrorModal';
var openWeatherMap = require('openWeatherMap');
var moment = require('moment');

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
            isLoadingCurrent: true,
            isLoadingForecast: true,
            location: undefined,
            current: {
                dt: undefined,
                temp: undefined,
                conditions: undefined,
                humidity: undefined,
                pressure: undefined,
                windSpeed: undefined,
                windDeg: undefined,
                visibility: undefined,
                sunriseUTC: undefined,
                sunsetUTC: undefined
            },
            errorCurrent: undefined,
            errorForecast: undefined
        });

        openWeatherMap.getCurrent(location).then(function (data) {

            var windDirection = that.getWindDirection(data.wind.deg);

            that.setState({
                isLoadingCurrent: false,
                location: location,
                current: {
                    dt: moment.utc(data.dt * 1000).format('dddd, M/D/YYYY'),
                    temp: data.main.temp.toFixed(1),
                    conditions: data.weather.map(function(item){
                                    return item.main;
                                }).join(', '),
                    humidity: data.main.humidity,
                    pressure: (data.main.pressure * 100 * 0.000295299830714).toFixed(2), // convert hPa to inches of Mercury
                    windSpeed: data.wind.speed,
                    windDir: windDirection,
                    visibility: (data.visibility / 1609.344).toFixed(1),
                    sunriseUTC: moment.utc(data.sys.sunrise * 1000).format('h:mm a'),
                    sunsetUTC: moment.utc(data.sys.sunset * 1000).format('h:mm a')
                }
            });
        }, function (e) {
            that.setState({
                isLoadingCurrent: false,
                errorCurrent: e.message
            });
        });

        openWeatherMap.getForecast(location).then(function (data) {
            that.setState({
                location: location,
                isLoadingForecast: false,
                forecast: data.list.map(function(item, index){
                   var processedItem = { dt: undefined, temp: {max: undefined, min: undefined }};
                   processedItem.id = index;
                   processedItem.dt = moment.utc(item.dt * 1000).format('dddd, M/D/YYYY'),
                   processedItem.conditions = item.weather.map(function(item){
                                   return item.main;
                               }).join(', '),
                   processedItem.temp.max = item.temp.max.toFixed(1);
                   processedItem.temp.min = item.temp.min.toFixed(1);
                   return processedItem
                })
            });
        }, function (e) {
            that.setState({
                isLoadingForecast: false,
                errorForecast: e.message
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
        var {isLoadingCurrent, isLoadingForecast, location, current, forecast, errorCurrent, errorForecast} = this.state;
        //var that = this;

        function renderSpinner () {
            if (isLoadingCurrent || isLoadingForecast) {
                return <h3>Fetching weather...</h3>
            }
        }

        function renderCurrentWeather () {
            if (location && current.temp) {
                return <WeatherCurrent location={location} current={current}/>;
            }
        }

        function renderForecastWeather () {
            if (location && forecast) {
                return <WeatherForecastList location={location} forecast={forecast}/>;
            }
        }

        function renderError () {
            if (isLoadingCurrent === false && isLoadingForecast === false && (typeof errorCurrent === 'string' || typeof errorForecast === 'string')) {
                return (
                    <ErrorModal errorCurrent={errorCurrent} errorForecast={errorForecast} />
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
