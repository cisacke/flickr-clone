window.Capstone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#main");

    new Capstone.Routers.AppRouter({
      $rootEl: $rootEl
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Capstone.initialize();
});
