/* global require */
var React = require('react');
import WeatherForecast from 'WeatherForecast';

export var WeatherForecastList = React.createClass({
    propTypes: {
        location: React.PropTypes.string.isRequired,
        forecast: React.PropTypes.array.isRequired
    },
    render: function () {
        var {location, forecast} = this.props;

        var renderForecast = () => {
            return forecast.map((dayData) => {
                return (
                    <WeatherForecast key={dayData.id} dayData={dayData}/>
                );
            });
        };

        return (
            <div className="forecast-weather-list callout">
                <h4 className="forecast-weather-heading">Forecast for {location}</h4>
                <div className="row small-collapse medium-uncollapse">
                    {renderForecast()}
                </div>
            </div>
        )
    }
});

export default WeatherForecastList;
