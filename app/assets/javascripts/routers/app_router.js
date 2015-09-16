Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "root",
    "users/:id/albums": "albumsIndex",
    "photos/:id": "photoShow",
    "users/:id": "userShow"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  root: function() {
    var user = new Capstone.Models.CurrentUser()
    user.fetch();
    var photostream = user.photostream()

    var photostreamShow = new Capstone.Views.PhotostreamShow({
      user: user,
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

  userShow: function(id) {

    var user = new Capstone.Models.User({id: id});
    user.fetch();

    var photostream = user.photostream();

    var photostreamShow = new Capstone.Views.PhotostreamShow({
      user: user,
      model: photostream
    })

    this._swapView(photostreamShow);
  },

  albumsIndex: function(id) {
    var user = new Capstone.Models.User({id: id});
    user.fetch();

    var albumIndex = new Capstone.Views.AlbumIndex({
      user: user
    })

    this._swapView(albumIndex);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }
})
