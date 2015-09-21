Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "root",
    "photos/new":"photosNew",
    "albums/new":"newAlbum",
    "users/:id/albums": "albumsIndex",
    "users/:id/favorites":"favoritesIndex",
    "photos/:id": "photoShow",
    "users/:id": "userShow",
    "albums/:id": "albumShow"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl
    this.currentUser = Capstone.Models.currentUser;
    this.currentUser.fetch();
  },

  root: function() {
    var photostream = this.currentUser.photostream()

    var photostreamShow = new Capstone.Views.PhotostreamShow({
      user: this.currentUser,
      model: photostream
    })

    this._swapView(photostreamShow);
  },

  photoShow: function(id) {
    var photo = new Capstone.Models.Photo({id: id});
    photo.fetch();

    var user = this.currentUser;

    var photoShow = new Capstone.Views.PhotoShow({
      user: this.currentUser,
      model: photo
    })

    this._swapView(photoShow);
  },

  albumShow: function(id) {
    var album = new Capstone.Models.Album({id: id});
    album.fetch();

    var albumShow = new Capstone.Views.AlbumShow({
      model: album
    })

    this._swapView(albumShow);
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
    var newPhotosForm = new Capstone.Views.PhotosForm({})
    this._swapView(newPhotosForm);
  },

  newAlbum: function() {
    var user = new Capstone.Models.CurrentUser();
    user.fetch();
    var photos = new Capstone.Collections.Photos();
    photos.fetch()

    var newAlbum = new Capstone.Views.AlbumNew({
      user: user,
      collection: photos
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
