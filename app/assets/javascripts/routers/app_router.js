Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "root",
    "photos/:id": "photoShow"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  root: function() {
    var photostream = new Capstone.Models.Photostream()
    photostream.fetch();

    var photostreamShow = new Capstone.Views.PhotostreamShow({
      model: photostream
    })

    this._swapView(photostreamShow);
  },

  photoShow: function(id) {
    var photo = new Capstone.Models.Photo({id: id});
    photo.fetch();

    var photoShow = new Capstone.Views.PhotoShow({
      model: photo
    })

    this._swapView(photoShow);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }
})
