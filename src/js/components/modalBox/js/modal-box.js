var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var Storage = require('../../../services/listName-storage');

var Modal = Backbone.View.extend ({

    storage: new Storage(),
    el: $('.modalWindow'),
    events: {
        'click #addButton': 'closeModal',
        'click .close': 'closeModal'
    },

    initialize: function () {
        this.initTemplate();
        this.render();
    },

    render: function () {
        this.$el.html(this.template);

        return this;
    },

    initTemplate: function () {
        var templateContent = $('#modalWindow');
        var templateContentTable = $('#item');

        this.template = _.template(templateContent.html());
        this.templateFilter = _.template(templateContentTable.html());
    },

    closeModal: function () {
        $('#myModal').css('display', 'none');
        this.addPerson();
    },

    addPerson: function() {
        var person = {
            id: this.storage.tempStorage.length,
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val()
        };

        if (person.firstName && person.lastName) {
            this.storage.load();
            this.storage.set(person);
            this.storage.save();
            this.renderTable();
        }

        this.resetPersonData();

    },

    renderItem: function (data) {
        return this.templateFilter(data);
    },

    renderTable: function () {
        this.storage.load();

        var res = this.storage.getData().reduce(function (sum, el) {
            return sum + this.renderItem(el);
        }.bind(this), '');

        $('#list').html(res);

        this.uniqueId = this.storage.tempStorage.length;
    },

    resetPersonData: function () {
        $('#firstName').html('');
        $('#lastName').html('');
    }

});

module.exports = Modal;
