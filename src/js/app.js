var Backbone = require('backbone');
var _ = require('underscore');
var ListNameService = require('./services/listName-service');
var ListNameSearch = require('./components/listName-search/js/listName-search');
var Manager = require('./components/listName-manager/js/listName-manager');
var Modal = require('./components/modalBox/js/modal-box');


var App = Backbone.View.extend ({

    initialize: function () {
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };
        var listNameService = new ListNameService();
        var listNameSearch = new ListNameSearch();
        var manager = new Manager();
        var modal = new Modal();
    }

});

var app = new App();
