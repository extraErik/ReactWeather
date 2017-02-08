var React = require('react');

var About = (props) => {
    return (
        <div>
            <h1 className="text-center page-title">About</h1>
            <p>
                This is a weather application built on React. It was originally built based
                on instruction from The Complete React Web App Developer Course on Udemy, but
                I've continued to add to it since then.
            </p>
            <p>
                Here are some of the tools I've used:
            </p>
            <ul>
                <li>
                    <a href="https://facebook.github.io/react">React</a> - JavaScript library for user interfaces.
                </li>
                <li>
                    <a href="http://foundation.zurb.com/">Foundation</a> - responsive front end framework.
                </li>
                <li>
                    <a href="https://developers.google.com/maps/documentation/geocoding/start">Google Maps Geocoding API</a> - I used API to obtain latitude/longitude for the location typed in by the user.
                </li>
                <li>
                    <a href="https://darksky.net/dev/">Dark Sky API</a> - I used the Dark Sky API to search for weather data by latitude/longitude.
                </li>
                <li>
                    <a href="http://adamwhitcroft.com/climacons/">Climacons</a> - I used selected icons from this weather icon library.
                </li>

            </ul>
        </div>
    )
};

module.exports = About;
