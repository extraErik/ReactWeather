var React = require('react');
var Nav = require('Nav');

var Main = (props) => {
    return (
        <div>
            <Nav/>
            <div className="row align-center">
                <div className="columns medium-10">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

module.exports = Main;
