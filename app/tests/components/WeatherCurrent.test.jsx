/* global require describe it */
var React = require('react');
//var ReactDOM = require('react-dom');
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
        var location = 'Frisco, TX',
            displayAddress = 'Frisco, TX';
        var current = {
            temp: '98',
            conditions: 'Cloudy',
            humidity: '38',
            pressure: '1015',
            windSpeed: '5.82',
            windDir: '220',
            visibility: '9.99',
            sunrise: '6:31am CST',
            sunset: '7:32pm CST'
        };

        var weatherCurrent = TestUtils.renderIntoDocument(<WeatherCurrent location={location} current={current} />);
        //var $el = $(ReactDOM.findDOMNode(weatherCurrent));
        var $el = $(weatherCurrent.node);
        var actualCurrentWeatherText = $el.text();

        expect(actualCurrentWeatherText).toInclude('Currently in ' + displayAddress);
        expect(actualCurrentWeatherText).toInclude(current.conditions);
        expect(actualCurrentWeatherText).toInclude(current.temp + ' ' + String.fromCharCode(176) + 'F');
        expect(actualCurrentWeatherText).toInclude('Humidity: ' + current.humidity + '%');
        expect(actualCurrentWeatherText).toInclude('Pressure: ' + current.pressure + ' ' + String.fromCharCode(34) + 'Hg');
        expect(actualCurrentWeatherText).toInclude('Wind: ' + current.windSpeed + ' mph, ' + current.windDir);
        expect(actualCurrentWeatherText).toInclude('Visibility: ' + current.visibility + ' miles');
        expect(actualCurrentWeatherText).toInclude('Sunrise: ' + current.sunrise);
        expect(actualCurrentWeatherText).toInclude('Sunset: ' + current.sunset);
    });
});
