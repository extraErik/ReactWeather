/* global require */
var React = require('react');

export var WeatherCurrent = React.createClass({
    render: function () {
        var {location, current} = this.props;
        var {temp, conditions, humidity, pressure, windSpeed, windDir, visibility, sunriseUTC, sunsetUTC} = current;

        return (
            <div className="current-weather callout">
                <h4 className="current-weather-heading">Current weather in {location}</h4>
                <p>Conditions: {conditions}</p>
                <p>Temperature: {temp} &deg;F</p>
                <p>Humidity: {humidity}%</p>
                <p>Pressure: {pressure} &quot;Hg</p>
                <p>Wind: {windSpeed} mph, {windDir}</p>
                <p>Visibility: {visibility} miles</p>
                <p>Sunrise: {sunriseUTC} UTC (TODO: convert to city local time)</p>
                <p>Sunset: {sunsetUTC} UTC (TODO: convert to city local time)</p>
            </div>
        )
    }
});

export default WeatherCurrent;
