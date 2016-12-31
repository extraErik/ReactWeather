var React = require('react');
var ReactDOM = require('react-dom');
//var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

//var configureStore = require('configureStore');
import {Weather} from 'Weather';
//var Weather = require('Weather');
import {WeatherForm} from 'WeatherForm';
import {WeatherMessage} from 'WeatherMessage';


describe('Weather', () => {
    it('should exist', () => {
        expect(Weather).toExist();
    });

    it('should return correct wind direction values given various degrees of wind', () => {

        var windTestData = [
            { deg: 0, dir: 'N' }, { deg: 11, dir: 'N' }, { deg: 349, dir: 'N' }, { deg: 360, dir: 'N' },
            { deg: 12, dir: 'NNE' }, { deg: 33, dir: 'NNE' },
            { deg: 34, dir: 'NE' }, { deg: 56, dir: 'NE' },
            { deg: 57, dir: 'ENE' }, { deg: 78, dir: 'ENE' },
            { deg: 79, dir: 'E' }, { deg: 101, dir: 'E' },
            { deg: 102, dir: 'ESE' }, { deg: 123, dir: 'ESE' },
            { deg: 124, dir: 'SE' }, { deg: 146, dir: 'SE' },
            { deg: 147, dir: 'SSE' }, { deg: 168, dir: 'SSE' },
            { deg: 169, dir: 'S' }, { deg: 191, dir: 'S' },
            { deg: 192, dir: 'SSW' }, { deg: 213, dir: 'SSW' },
            { deg: 214, dir: 'SW' }, { deg: 236, dir: 'SW' },
            { deg: 237, dir: 'WSW' }, { deg: 258, dir: 'WSW' },
            { deg: 259, dir: 'W' }, { deg: 281, dir: 'W' },
            { deg: 282, dir: 'WNW' }, { deg: 303, dir: 'WNW' },
            { deg: 304, dir: 'NW' }, { deg: 326, dir: 'NW' },
            { deg: 327, dir: 'NNW' }, { deg: 348, dir: 'NNW' },
            { deg: -1, dir: undefined }, { deg: 361, dir: undefined }
        ];

        var windDeg, windDir;
        var dummyLocation = {'query': {}};

        var weather = TestUtils.renderIntoDocument(<Weather location={dummyLocation}/>);

        for (let test of windTestData) {
            windDir = weather.getWindDirection(test.deg);
            expect(windDir).toEqual(test.dir);
        };

    });


    /*
    it('should render WeatherForm', () => {
        TestUtils.renderIntoDocument(
            <WeatherForm/>
        );

        var weatherForm = TestUtils.scryRenderedComponentsWithType(provider, WeatherForm)[0];

        expect(weatherForm.length).toEqual(1);
    });
    */

});
