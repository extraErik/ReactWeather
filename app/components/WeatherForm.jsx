/* global require */
var React = require('react');

export var WeatherForm = React.createClass({
    propTypes: {
        onSearch: React.PropTypes.func.isRequired
    },
    onFormSubmit: function(e) {
        e.preventDefault();

        var location = this.refs.location.value;

        if (location.length > 0) {
            this.refs.location.value = '';
            this.props.onSearch(location);
        }
    },
    render: function () {
        return (
            <div ref={node => this.node = node}>
                <form onSubmit={this.onFormSubmit}>
                    <input type="search" ref="location" placeholder="Search weather by city"/>
                    <button className="expanded hollow button">Get Weather</button>
                </form>
            </div>
        )
    }
});

export default WeatherForm;
