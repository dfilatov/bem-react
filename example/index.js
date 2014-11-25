var bemReact = require('../lib/bemReact'),
    Dropdown = require('./components/dropdown');

bemReact.render(
    { block : Dropdown, content : 'dropdown content' },
    document.body);
