var Backbone = require('backbone');

var ListNameStorage = Backbone.Model.extend ({

    tempStorage: [],
    storage: window.localStorage,

    toSTR: function (data) {
        return JSON.stringify(data);
    },

    toJSON: function (data) {
        return JSON.parse(data);
    },

    set: function (value) {
        this.tempStorage.push(value);
    },

    getData: function () {
        return this.tempStorage;
    },

    getById: function (id) {
        var result, key;

        this.tempStorage.some(function (el, index) {
            var isValidId = el.id == id;

            if (isValidId) {
                result = el;
                key = index;
            }
            return isValidId;
        });
        this.key = key;

        return result;
    },

    removeRow: function(key) {
        this.tempStorage.splice(this.key, 1);
    },

    save: function () {
        this.storage.setItem('persons', this.toSTR(this.tempStorage));
    },

    load: function () {
        var data = localStorage.getItem('persons');

        if (data) {
            this.tempStorage = this.toJSON(data);
        } else {
            this.tempStorage = [];
        }
    }

});

module.exports = ListNameStorage;
