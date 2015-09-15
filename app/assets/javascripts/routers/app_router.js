Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "root"
  },

  root: function() {
    var photostream = new Capstone.Models.Photostream()
    photostream.fetch();

    var userId = photostream.escape("user_id")
    var user = new Capstone.Models.User()
    
    // debugger
    // var view = new Capstone.Views.Photostream({

    // })
  }
})
