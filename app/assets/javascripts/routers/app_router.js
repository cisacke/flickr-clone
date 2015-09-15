Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "root"
  },

  root: function() {
    var photostream = new Capstone.Collections.Photostream()
    photostream.fetch();
    debugger
    // var view = new Capstone.Views.Photostream({

    // })
  }
})
