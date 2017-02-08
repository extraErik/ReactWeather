/* global require $ Foundation */
var React = require('react');
//var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

export var ErrorModal = React.createClass({
    getDefaultProps: function () {
        return {
            title: 'Error',
            buttonText: 'Okay'
        }
    },
    propTypes: {
        title: React.PropTypes.string,
        errorGeo: React.PropTypes.string,
        errorDarkSky: React.PropTypes.string,
        buttonText: React.PropTypes.string
    },
    componentDidMount: function () {
        var {title, errorGeo, errorDarkSky, buttonText} = this.props;
        var modalMarkup = (
            <div id="error-modal" className="reveal tiny text-center" data-reveal="">
                <h4>{title}</h4>
                <p>Error getting location data: {errorGeo}</p>
                <p>Error getting weather data: {errorDarkSky}</p>
                <p>
                    <button className="button hollow" data-close="">
                        {buttonText}
                    </button>
                </p>
            </div>
        );

        var $modal = $(ReactDOMServer.renderToString(modalMarkup));
        $(this.node).html($modal);

        var modal = new Foundation.Reveal($('#error-modal'));
        modal.open();
    },
    render: function () {

        return (
            <div ref={node => this.node = node}>
            </div>
        )
    }
});

export default ErrorModal;
