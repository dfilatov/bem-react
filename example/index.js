var bemReact = require('../lib/bemReact'),
    React = require('react'),
    ReactDOM = require('react-dom'),
    Dropdown = require('./components/dropdown');

ReactDOM.render(
    React.createElement( Dropdown, { content : 'dropdown content' } ),
    document.body);
