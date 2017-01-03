var React = require('react');
var ReactDOM = require('react-dom');
//var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import {WeatherMessage} from 'WeatherMessage';


describe('WeatherMessage', () => {
    it('should exist', () => {
        expect(WeatherMessage).toExist();
    });

    it('should display all the weather data passed into it', () => {
        var location = 'Frisco, TX',
            conditions = 'Cloudy',
            temp = '98.45',
            humidity = '38',
            pressure = '1015',
            windSpeed = '5.82',
            windDir = '220',
            visibility = '16093',
            sunriseUTC = '12345',
            sunsetUTC = '12346';

        var weatherMessage = TestUtils.renderIntoDocument(<WeatherMessage location={location} conditions={conditions} temp={temp} humidity={humidity} pressure={pressure} windSpeed={windSpeed} windDir={windDir} visibility={visibility} sunriseUTC={sunriseUTC} sunsetUTC={sunsetUTC}/>);
        var $el = $(ReactDOM.findDOMNode(weatherMessage));
        var actualCurrentWeatherText = $el.text();

        expect(actualCurrentWeatherText).toInclude('Current weather in ' + location);
        expect(actualCurrentWeatherText).toInclude('Conditions: ' + conditions);
        expect(actualCurrentWeatherText).toInclude('Temperature: ' + temp);
        expect(actualCurrentWeatherText).toInclude('Humidity: ' + humidity);
        expect(actualCurrentWeatherText).toInclude('Pressure: ' + pressure);
        expect(actualCurrentWeatherText).toInclude('Wind: ' + windSpeed + ' mph, ' + windDir);
        expect(actualCurrentWeatherText).toInclude('Visibility: ' + visibility);
        expect(actualCurrentWeatherText).toInclude('Sunrise: ' + sunriseUTC);
        expect(actualCurrentWeatherText).toInclude('Sunset: ' + sunsetUTC);

    });

});
