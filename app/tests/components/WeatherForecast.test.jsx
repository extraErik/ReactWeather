/* global require describe it xit */
var React = require('react');
var ReactDOM = require('react-dom');
//var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import {WeatherForecast} from 'WeatherForecast';


describe('WeatherForecast', () => {
    it('should exist', () => {
        expect(WeatherForecast).toExist();
    });

    xit('should display all the weather data passed into it', () => {

    });

});
