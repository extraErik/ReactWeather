/* global require */
var React = require('react');

export var WeatherForecast = React.createClass({
    render: function () {
        var {location, forecast} = this.props;
        var count = forecast.count;

        return (
            <div className="forecast-weather callout">
                <h4>Forecast data for a future date will go here</h4>
                <h4>Soon a List component will display data for {count} days</h4>
            </div>
        )
    }
});

export default WeatherForecast;
