Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "root",
    "photos/new":"photosNew",
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

    var user = new Capstone.Models.CurrentUser()
    user.fetch();

    var photoShow = new Capstone.Views.PhotoShow({
      user: user,
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
    var albums = user.albums()

    var albumIndex = new Capstone.Views.AlbumIndex({
      user: user,
      model: albums
    })

    this._swapView(albumIndex);
  },

  photosNew: function() {
    var user = new Capstone.Models.CurrentUser();
    user.fetch();

    var newPhoto = new Capstone.Models.Photo();
    var photosNew = new Capstone.Views.PhotosNew({
      model: newPhoto,
      user: user
    })

    this._swapView(photosNew);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }
})
