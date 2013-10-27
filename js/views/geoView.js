/*jslint nomen: true, unparam: true, indent: 2, browser: true */
/*global define */

define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'text!../../assets/templates/geoBtn.html',
], function ($, _, Backbone, H, controlsTpl) {


  var GeoView = Backbone.View.extend({
    el: '#geoContainer',
    template: H.compile(controlsTpl),

    events: {
      'click #geo-btn': 'toggleActive'
    },

    initialize: function (options) {
      var self = this;

      this.dispatcher = options.dispatcher;
      console.log("Geo view Created");
      this.model.on('change:active', this.render, this);
      this.render();

      this.dispatcher.bind("app:isHomeState", function (isHomeState) {
        if (isHomeState) {
          self.render(true);
        } else {
          self.render(false);
        }
      });
    },

    toggleActive: function (e) {
      e.preventDefault();
      this.model.toggleActive();
    },

    render: function (hidden) {
      var html, ctx = {};

      ctx.hidden = hidden;
      ctx.active = this.model.get('active');

      html = this.template(ctx);

      this.$el.html(html);

      return this;
    }
  });

  return GeoView;
});