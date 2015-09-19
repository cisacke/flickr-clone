window.Capstone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("#main");
    var currentUser = new Capstone.Models.CurrentUser();
    currentUser.fetch();
    new Capstone.Routers.AppRouter({
      $rootEl: $rootEl,
      currentUser: currentUser
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Capstone.initialize();
});
