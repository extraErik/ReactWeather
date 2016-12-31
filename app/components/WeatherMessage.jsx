var React = require('react');

export var WeatherMessage = ({temp, location, conditions, humidity, pressure, windSpeed, windDir, visibility, sunriseUTC, sunsetUTC}) => {
    return (
        <div>
            <h4>Current weather in {location}</h4>
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

export default WeatherMessage;
