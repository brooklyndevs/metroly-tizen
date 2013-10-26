/*jslint nomen: true, unparam: true, indent: 2, browser: true */
/*global define */

define([
  'underscore',
  'backbone',
  'busesnyc'
], function (_, Backbone, MtaBusTime) {

  var MapModel = Backbone.Model.extend({
    defaults: {
      bus: undefined,
      direction: 0,
      route: {}
    },

    initialize: function () {
      var apiKey = this.get('apiKey');
      this.mta = new MtaBusTime(apiKey);
      this.busesChangedCbs = [];
      this.routeChangedCbs = [];
      this.on('change:bus', this.getBuses, this);
      this.on('change:bus', this.getRoute, this);
    },

    getBuses: function () {
      this.trigger('getBuses');
      var bus = this.get('bus'), dir = this.get('direction'), self = this;
      console.log('getting buses for ', bus, ' , direction ', dir);
      this.mta.getBuses(bus, dir, function (buses) {
        self.trigger('gotBuses', buses);
      });
    },

    getRoute: function () {
      var bus = this.get('bus'), self = this;
      this.mta.getRoute(bus, function (route) {
        route.directions = _.sortBy(route.directions, function (direction) {
          return direction.directionId;
        });
        self.set('route', route);
      });
    },

    onBusesChanged: function (cb, ctx) {
      this.busesChangedCbs.push(_.bind(cb, ctx));
    },

    notifyBusesChanged: function (buses) {
      var i, cbs = this.busesChangedCbs, cbsLength = cbs.length;
      for (i = 0; i < cbsLength; i += 1) {
        cbs[i](buses);
      }
    }

  });

  return MapModel;
});