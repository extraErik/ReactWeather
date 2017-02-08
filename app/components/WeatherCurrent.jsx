/* global require */
var React = require('react');

export var WeatherCurrent = React.createClass({
    propTypes: {
        location: React.PropTypes.string.isRequired,
        current: React.PropTypes.object.isRequired
    },
    render: function () {
        var {location, current} = this.props;
        var {dt, temp, conditions, iconVal, humidity, pressure, windSpeed, windDir, visibility, sunriseUTC, sunsetUTC} = current;

        var iconSrc = iconVal ? `/svg/${iconVal}.svg` : '';

        return (
            <div className="current-weather callout clearfix" ref={node => this.node = node}>
                <h2 className="current-weather-heading">Currently in {location}</h2>
                <p>{dt}</p>
                <div className="cond-and-temp clearfix">
                    <div className="condImg float-right">
                        <img className="current-weather-icon" src={iconSrc} />
                    </div>
                    <p className="cond">{conditions}</p>
                    <p className="temp">{temp} &deg;F</p>
                </div>
                <div className="other-info clearfix">
                    <div className="air float-left">
                        <p>Wind: {windSpeed} mph, {windDir}</p>
                        <p>Humidity: {humidity}%</p>
                        <p>Pressure: {pressure} &quot;Hg</p>
                        <p>Visibility: {visibility} miles</p>
                    </div>
                    <div className="sun float-right">
                        <p>Sunrise: {sunriseUTC} <span className="tz"></span></p>
                        <p>Sunset: {sunsetUTC} <span className="tz"></span></p>
                    </div>
                </div>
                <a className="float-right" href="https://darksky.net/poweredby/" target="_blank">Powered by DarkSky</a>
            </div>
        )
    }
});

export default WeatherCurrent;
