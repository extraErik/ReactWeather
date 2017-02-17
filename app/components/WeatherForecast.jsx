/* global require */
var React = require('react');

export var WeatherForecast = React.createClass({
    propTypes: {
        dayData: React.PropTypes.object.isRequired,
    },
    render: function () {
        var {dayData} = this.props;
        var {dt, conditions, iconVal} = dayData;
        var {max, min} = dayData.temp;

        var iconSrc = iconVal ? `/svg/${iconVal}.svg` : '';

        return (
            <div className="columns small-12 medium-6 large-4">
                <div className="forecast-weather callout clearfix ">
                    <div className="condImg float-right">
                        <img className="forecast-weather-icon" src={iconSrc} />
                    </div>
                    <p>{dt}</p>
                    <p>{conditions}</p>
                    <p>High: {max} &deg;F</p>
                    <p>Low: {min} &deg;F</p>
                </div>
            </div>
        )
    }
});

export default WeatherForecast;
