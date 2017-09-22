var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var Storage = require('../../../services/listName-storage');

var ListNameManager = Backbone.View.extend ({
    storage: new Storage(),
    el: $('.list'),
    events: {
        'click .deleteButton': 'deleteDataRow'
    },

    initialize: function () {
        this.storage.load();
        this.initTemplate();
        this.render();
        this.setNextId();
    },

    initTemplate: function () {
        var templateContent = document.getElementById('item');

        this.template = _.template(templateContent.innerHTML);
    },

    render: function () {
        this.el.innerHTML = this.storage.getData().reduce(function (sum, el) {
            return sum + this.renderItem(el);
        }.bind(this), '');
    },

    renderItem: function (data) {
        return this.template(data);
    },

    setNextId: function () {
        this.uniqueId = this.storage.tempStorage.length;
    },

    saveItems: function () {
        this.storage.save();
    },

    setItems: function (data) {
        this.storage.set(data);
    },

    deleteDataRow: function (e) {
        if (e.target.className === 'deleteButton') {
            this.id = e.target.getAttribute('data-id');
            this.tempStr = this.storage.getById(this.id);
            this.storage.removeRow(this.tempStr);
            this.render();
        }
    }

});

module.exports = ListNameManager;
