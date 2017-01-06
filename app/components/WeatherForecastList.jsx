/* global require */
var React = require('react');
import WeatherForecast from 'WeatherForecast';

export var WeatherForecastList = React.createClass({
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
                {renderForecast()}
            </div>
        )
    }
});

export default WeatherForecastList;
