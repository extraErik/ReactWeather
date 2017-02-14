/* global require describe it xit setTimeout */
var React = require('react');
//var ReactDOM = require('react-dom');
//var {Provider} = require('react-redux');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

//var configureStore = require('configureStore');
import {Weather} from 'Weather';
//var Weather = require('Weather');
import {WeatherForm} from 'WeatherForm';
import {WeatherCurrent} from 'WeatherCurrent';
import {WeatherForecast} from 'WeatherForecast';
import {WeatherForecastList} from 'WeatherForecastList';
import {ErrorModal} from 'ErrorModal';


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

        var windDir;
        var dummyLocation = {'query': {}};

        var weather = TestUtils.renderIntoDocument(<Weather location={dummyLocation}/>);

        for (let test of windTestData) {
            windDir = weather.getWindDirection(test.deg);
            expect(windDir).toEqual(test.dir);
        }

    });

    it('should render WeatherForm', () => {

        var dummyLocation = {'query': {}};

        var weather = TestUtils.renderIntoDocument(<Weather location={dummyLocation}/>);
        var weatherForm = TestUtils.findRenderedComponentWithType(weather, WeatherForm);
        expect(weatherForm).toExist();
    });

    it('should display WeatherCurrent and WeatherForecastList and WeatherForecast components if handleSearch makes successful rest call', () => {
        var dummyLocation = {'query': {}};
        var myCity = 'Frisco, TX';

        var weather = TestUtils.renderIntoDocument(<Weather location={dummyLocation}/>);

        var spy = expect.spyOn(weather, 'handleSearch').andCall(function (location) {

            weather.setState({
                // fake data
                isLoadingWeather: false,
                location: location,
                displayAddress: 'Frisco, TX',
                darkSkyCurrent: {
                    dt: 123467,
                    temp: 59.34,
                    conditions: 'Clear',
                    humidity: 82,
                    iconVal: 'Sun',
                    pressure: '29.85',
                    windSpeed: 11.41,
                    windDir: 'W',
                    visibility: '10.0',
                    sunrise: '7:31 am CST',
                    sunset: '6:32 pm CST'
                },
                darkSkyForecast: [
                    {
                        id: 1,
                        dt: 123412,
                        conditions: 'Stuff, Other Stuff',
                        iconVal: 'Sun',
                        temp: {
                            max: 3,
                            min: 2
                        }
                    },
                    {
                        id: 2,
                        dt: 123415,
                        conditions: 'Stuff, More Stuff',
                        iconVal: 'Sun',
                        temp: {
                            max: 23,
                            min: 12
                        }
                    }
                ]
            });
        });

        weather.handleSearch(myCity);

        expect(spy).toHaveBeenCalledWith(myCity);

        var weatherCurrent = TestUtils.findRenderedComponentWithType(weather, WeatherCurrent);
        expect(weatherCurrent).toExist();

        var weatherForecastList = TestUtils.findRenderedComponentWithType(weather, WeatherForecastList);
        expect(weatherForecastList).toExist();

        var weatherForecast = TestUtils.scryRenderedComponentsWithType(weather, WeatherForecast);
        expect(weatherForecast.length).toBeGreaterThan(0);

        var errorModals = TestUtils.scryRenderedComponentsWithType(weather, ErrorModal);
        expect(errorModals.length).toEqual(0);
    });

    // TODO: this should check for errors on BOTH rest calls...
    it('should display an ErrorModal component if handleSearch makes failed rest call', () => {
        var dummyLocation = {'query': {}};
        var myCity = 'yabbadabbadoo';

        var weather = TestUtils.renderIntoDocument(<Weather location={dummyLocation}/>);

        var spy = expect.spyOn(weather, 'handleSearch').andCall(function () {
            weather.setState({
                errorDarkSky: 'you have failed',
                isLoadingWeather: false,
            });
        });

        weather.handleSearch(myCity);

        expect(spy).toHaveBeenCalledWith(myCity);

        var weatherCurrents = TestUtils.scryRenderedComponentsWithType(weather, WeatherCurrent);
        expect(weatherCurrents.length).toEqual(0);

        var errorModal = TestUtils.findRenderedComponentWithType(weather, ErrorModal);
        expect(errorModal).toExist();
    });

    it('should display a busy message while waiting for getCurrent rest call to return', (done) => {
        var dummyLocation = {'query': {}};
        var myCity = 'yabbadabbadoo';

        var weather = TestUtils.renderIntoDocument(<Weather location={dummyLocation}/>);

        var $el = $(weather.node);
        var weatherComponentText = $el.text();
        expect(weatherComponentText).toExclude('Fetching weather...');

        var spy = expect.spyOn(weather, 'handleSearch').andCall(function () {

            weather.setState({
                isLoadingWeather: true
            });

            var weatherComponentText = $el.text();
            expect(weatherComponentText).toInclude('Fetching weather...');

            setTimeout(function() {

                weather.setState({
                    errorDarkSky: 'you have failed',
                    isLoadingWeather: false
                });

                var weatherComponentText = $el.text();
                expect(weatherComponentText).toExclude('Fetching weather...');

                done();

            }, 1000);

        });

        weather.handleSearch(myCity);

        expect(spy).toHaveBeenCalledWith(myCity);

    });

    //TODO: this might go away if you chain promises and have just one busy message for both calls...
    xit('should display a busy message while waiting for getForecast rest call to return', () => {
    });

});
