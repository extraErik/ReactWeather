/* global require describe it */
var React = require('react');
//var ReactDOM = require('react-dom');
//var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

import {WeatherForm} from 'WeatherForm';


describe('WeatherForm', () => {
    it('should exist', () => {
        expect(WeatherForm).toExist();
    });

    it('should call its onSearch function with text entered', () => {
        var searchText = 'Frisco, TX';

        var spy = expect.createSpy();
        var weatherForm = TestUtils.renderIntoDocument(<WeatherForm onSearch={spy}/>);
        //var $el = $(ReactDOM.findDOMNode(weatherForm));
        var $el = $(weatherForm.node);

        weatherForm.refs.location.value = searchText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toHaveBeenCalledWith(searchText);
    });

    it('should NOT call its onSearch function if no text was entered', () => {
        var searchText = '';

        var spy = expect.createSpy();
        var weatherForm = TestUtils.renderIntoDocument(<WeatherForm onSearch={spy}/>);
        //var $el = $(ReactDOM.findDOMNode(weatherForm));
        var $el = $(weatherForm.node);

        weatherForm.refs.location.value = searchText;
        TestUtils.Simulate.submit($el.find('form')[0]);

        expect(spy).toNotHaveBeenCalled();
    });

});
