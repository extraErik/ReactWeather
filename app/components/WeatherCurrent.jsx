/* global require */
var React = require('react');

export var WeatherCurrent = React.createClass({
    propTypes: {
        location: React.PropTypes.string.isRequired,
        current: React.PropTypes.object.isRequired
    },
    render: function () {
        var {location, current} = this.props;
        var {dt, temp, conditions, humidity, pressure, windSpeed, windDir, visibility, sunriseUTC, sunsetUTC} = current;

        return (
            <div className="current-weather callout" ref={node => this.node = node}>
                <h4 className="current-weather-heading">Current weather in {location}</h4>
                <p>Date: {dt}</p>
                <p>Conditions: {conditions}</p>
                <p>Temperature: {temp} &deg;F</p>
                <p>Humidity: {humidity}%</p>
                <p>Pressure: {pressure} &quot;Hg</p>
                <p>Wind: {windSpeed} mph, {windDir}</p>
                <p>Visibility: {visibility} miles</p>
                <p>Sunrise: {sunriseUTC} UTC (change this!)</p>
                <p>Sunset: {sunsetUTC} UTC (change this!)</p>
            </div>
        )
    }
});

export default WeatherCurrent;
