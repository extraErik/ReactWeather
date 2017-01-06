/* global require */
var React = require('react');

export var WeatherForecast = React.createClass({
    propTypes: {
        dayData: React.PropTypes.object.isRequired,
    },
    render: function () {
        var {dayData} = this.props;
        var dt = dayData.dt;
        var conditions = dayData.conditions;
        var {max, min} = dayData.temp;

        return (
            <div className="forecast-weather callout">
                <p>Date: {dt}</p>
                <p>Conditions: {conditions}</p>
                <p>High: {max} &deg;F</p>
                <p>Low: {min} &deg;F</p>
            </div>
        )
    }
});

export default WeatherForecast;
