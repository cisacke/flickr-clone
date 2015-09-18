Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "root",
    "photos/new":"photosNew",
    "albums/new":"newAlbum",
    "users/:id/albums": "albumsIndex",
    "users/:id/favorites":"favoritesIndex",
    "photos/:id": "photoShow",
    "users/:id": "userShow",
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
    var albums = user.albums();

    var albumIndex = new Capstone.Views.AlbumIndex({
      user: user,
      model: albums
    })

    this._swapView(albumIndex);
  },

  photosNew: function() {
    debugger
  },

  newAlbum: function() {
    var user = new Capstone.Models.CurrentUser();
    user.fetch();

    var newAlbum = new Capstone.Views.AlbumNew({
      user: user
    })

    this._swapView(newAlbum);
  },

  favoritesIndex: function(id) {
    var user = new Capstone.Models.User({id: id});
    user.fetch();
    var favorites = user.favorite();

    var userFavorites = new Capstone.Views.FavoritesIndex({
      user: user,
      model: favorites
    });
    this._swapView(userFavorites)
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }
})
