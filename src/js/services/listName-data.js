var Backbone = require('backbone');
var $ = require('jquery');

var ListNameData = Backbone.Model.extend({

    api: 'http://www.json-generator.com/api/json/get/cgmZpkYnYi?indent=2',

    sync: function (method, model, options) {
        var params = $.extend({
            dataType: 'jsonp',
            url: this.api
        }, options);

        return $.ajax(params);
    },

    parse: function (res) {
        return res;
    }

});

module.exports = ListNameData;
