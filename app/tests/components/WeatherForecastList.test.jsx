/* global require describe it xit */
var React = require('react');
var ReactDOM = require('react-dom');
//var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import {WeatherForecastList} from 'WeatherForecastList';


describe('WeatherForecastList', () => {
    it('should exist', () => {
        expect(WeatherForecastList).toExist();
    });

    xit('should render one WeatherForecast component for each weatherforecast item', () => {

    });

});
