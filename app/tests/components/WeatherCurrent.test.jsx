/* global require describe it */
var React = require('react');
var ReactDOM = require('react-dom');
//var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import {WeatherCurrent} from 'WeatherCurrent';


describe('WeatherCurrent', () => {
    it('should exist', () => {
        expect(WeatherCurrent).toExist();
    });

    it('should display all the weather data passed into it', () => {
        var location = 'Frisco, TX';
        var current = {
            temp: '98.45',
            conditions: 'Cloudy',
            humidity: '38',
            pressure: '1015',
            windSpeed: '5.82',
            windDir: '220',
            visibility: '16093',
            sunriseUTC: '12345',
            sunsetUTC: '12346'
        };

        var weatherCurrent = TestUtils.renderIntoDocument(<WeatherCurrent location={location} current={current} />);
        var $el = $(ReactDOM.findDOMNode(weatherCurrent));
        var actualCurrentWeatherText = $el.text();

        expect(actualCurrentWeatherText).toInclude('Current weather in ' + location);
        expect(actualCurrentWeatherText).toInclude('Conditions: ' + current.conditions);
        expect(actualCurrentWeatherText).toInclude('Temperature: ' + current.temp);
        expect(actualCurrentWeatherText).toInclude('Humidity: ' + current.humidity);
        expect(actualCurrentWeatherText).toInclude('Pressure: ' + current.pressure);
        expect(actualCurrentWeatherText).toInclude('Wind: ' + current.windSpeed + ' mph, ' + current.windDir);
        expect(actualCurrentWeatherText).toInclude('Visibility: ' + current.visibility);
        expect(actualCurrentWeatherText).toInclude('Sunrise: ' + current.sunriseUTC);
        expect(actualCurrentWeatherText).toInclude('Sunset: ' + current.sunsetUTC);
    });
});
