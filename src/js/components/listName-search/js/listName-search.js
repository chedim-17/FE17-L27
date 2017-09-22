var Backbone = require('backbone');
var _ = require('underscore');
var $ = require('jquery');
var Storage = require('../../../services/listName-storage');

var ListNameSearch = Backbone.View.extend ({

    storage: new Storage(),
    el: $('.search'),
    events: {
        'click #addModal': 'showModal',
        'click #cancelButton': 'cancelChange',
        'click #filterButton': 'getFieldFilter'
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
        var templateContent = $('#search');
        var templateContentTable = $('#item');

        this.template = _.template(templateContent.html());
        this.templateFilter = _.template(templateContentTable.html());
    },

    showModal: function () {
        $('#myModal').css('display', 'block');
    },

    renderFilter: function () {
        this.storage.load();

         var res = this.storage.getData().reduce(function (sum, el) {
            if (el[this.field] === this.itemFilter || !this.itemFilter) {
                return sum + this.renderItem(el);
            } else {
                return sum;
            }
        }.bind(this), '');

        $('#list').html(res);

        this.uniqueId = this.storage.tempStorage.length;
    },

    renderItem: function (data) {
        return this.templateFilter(data);
    },

    getFieldFilter: function () {
        this.itemFilter = $('#filterText').val();
        var select = document.getElementById('selectFieldSearch');
        this.field = select.options[select.selectedIndex].value;
        var reg = /:/;
        var index = this.itemFilter.search(reg);

        if (index !== -1) {
            this.field = this.itemFilter.slice(0, index);
            this.itemFilter = this.itemFilter.slice(index + 2);
        }

        this.renderFilter();
    },

    cancelChange: function () {
        this.storage.load();
        this.itemFilter = null;
        this.renderFilter();
        this.uniqueId = this.storage.tempStorage.length;
    }
    
});

module.exports = ListNameSearch;
