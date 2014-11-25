var bemReact = require('../lib/bemReact'),
    Dropdown = require('./components/dropdown');

bemReact.render(
    { block : Dropdown, children : 'dropdown content' },
    document.body);
