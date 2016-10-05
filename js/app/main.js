requirejs.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app'
    }

});


define(function (require) {

    var Application = require('app/Application');
    var application = new Application();

});
