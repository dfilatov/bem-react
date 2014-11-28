var bemReact = require('../lib/bemReact'),
    Dropdown = require('./components/dropdown');

bemReact.render(
    { block : Dropdown, props : { content : 'dropdown content' } },
    document.body);
