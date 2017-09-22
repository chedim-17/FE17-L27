var Backbone = require('backbone');
var ListNameData = require('./listName-data');
var $ = require('jquery');

var ListNameService = Backbone.Model.extend({

    initialize: function () {
        this.listNameData = new ListNameData();
        this.data = [];
        this.getData();

    },

    toSTR: function (data) {
        return JSON.stringify(data);
    },

    getData: function () {
        var self = this;

        this.listNameData.fetch({
            success: function(data) {
                self.saveData(data);
            }
        });

    },

    setData: function (data) {
        localStorage.setItem('persons', this.toSTR(data));
    },

    saveData: function (data) {
        this.checkData(data);
        this.changeData();
        this.setData(this.data);

    },

    checkData: function (data) {
        var self = this,
            res = data.attributes;

        $.each(res, function (key, el) {
            if (el.isActive === true) {
                self.data = el.friends.map(function (el) {
                    return el;
                })
            }
        });
    },

    changeData: function () {
        var arr = [];

        this.data.forEach(function (el) {
            arr = el.name.split(' ');
            el.firstName = arr[0];
            el.lastName = arr[1];
        });
    }

});

module.exports = ListNameService;