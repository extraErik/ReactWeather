var React = require('react');
//var WeatherForm = require('WeatherForm');
//var WeatherMessage = require('WeatherMessage');
import WeatherForm from 'WeatherForm';
import WeatherMessage from 'WeatherMessage';
var ErrorModal = require('ErrorModal');
var openWeatherMap = require('openWeatherMap');
var moment = require('moment');

export var Weather = React.createClass({
    getInitialState: function () {
        return {
            isLoading: false
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
            isLoading: true,
            errorMessage: undefined,
            location: undefined,
            temp: undefined,
            conditions: undefined,
            humidity: undefined,
            pressure: undefined,
            windSpeed: undefined,
            windDeg: undefined,
            visibility: undefined,
            sunriseUTC: undefined,
            sunsetUTC: undefined
        });

        openWeatherMap.getTemp(location).then(function (data) {

            var windDirection = that.getWindDirection(data.wind.deg);

            that.setState({
                location: location,
                temp: data.main.temp,
                conditions: data.weather.map(function(item){
                                return item.main;
                            }).join(),
                humidity: data.main.humidity,
                pressure: (data.main.pressure * 100 * 0.000295299830714).toFixed(2), // convert hPa to inches of Mercury
                windSpeed: data.wind.speed,
                windDir: windDirection,
                visibility: (data.visibility / 1609.344).toFixed(1),
                sunriseUTC: moment.utc(data.sys.sunrise * 1000).format('h:mm a'),
                sunsetUTC: moment.utc(data.sys.sunset * 1000).format('h:mm a'),
                isLoading: false
            });
        }, function (e) {
            that.setState({
                isLoading: false,
                errorMessage: e.message
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
        var {isLoading, temp, location, conditions, humidity, pressure, windSpeed, windDir, visibility, sunriseUTC, sunsetUTC, errorMessage} = this.state;

        function renderMessage () {
            if (isLoading) {
                return <h3>Fetching weather...</h3>;
            } else if (temp && location) {
                return <WeatherMessage location={location} temp={temp} conditions={conditions} humidity={humidity} pressure={pressure} windSpeed={windSpeed} windDir={windDir} visibility={visibility} sunriseUTC={sunriseUTC} sunsetUTC={sunsetUTC}/>;
            }
        }

        function renderError () {
            if (typeof errorMessage === 'string') {
                return (
                    <ErrorModal message={errorMessage}/>
                )
            }
        }

        return (
            <div>
                <h1 className="text-center page-title">Get Weather</h1>
                <WeatherForm onSearch={this.handleSearch}/>
                {renderMessage()}
                {renderError()}
            </div>
        )
    }
});

export default Weather;
