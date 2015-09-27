Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "root",
    "_=_":"root",
    "explore":"explore",
    "photos/new":"photosNew",
    "albums/new":"newAlbum",
    "users/:id/albums": "albumsIndex",
    "users/:id/favorites":"favoritesIndex",
    "photos/:id": "photoShow",
    "users/:id": "userShow",
    "albums/:id/edit": "albumEdit",
    "albums/:id": "albumShow"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl;
    this.currentUser = Capstone.Models.currentUser;
    // this.currentUser.fetch();
  },

  root: function() {
    this.currentUser.fetch( {
      success: function(model, resp, options) {
        var photostream = new Capstone.Models.Photostream({ id: model.id });
        photostream.fetch();

        var photostreamShow = new Capstone.Views.PhotostreamShow({
          user: model,
          model: photostream,
          edit: true,
          private: true
        });

        this._swapView(photostreamShow);
      }.bind(this)
    } );
  },

  userShow: function(id) {
    var user = new Capstone.Models.User({id: id});
    user.fetch();

    var photostream = new Capstone.Models.Photostream({id: id});
    photostream.fetch();

    var photostreamShow = new Capstone.Views.PhotostreamShow({
      user: user,
      model: photostream,
      edit: false,
      private: false
    });

    this._swapView(photostreamShow);
  },

  photoShow: function(id) {
    this.currentUser.fetch();
    var photo = new Capstone.Models.Photo({id: id});
    photo.fetch();

    var user = this.currentUser;

    var photoShow = new Capstone.Views.PhotoShow({
      user: this.currentUser,
      model: photo
    });

    this._swapView(photoShow);
  },

  albumShow: function(id) {
    var album = new Capstone.Models.Album({id: id});
    album.fetch();

    var albumShow = new Capstone.Views.AlbumShow({
      model: album
    });

    this._swapView(albumShow);
  },

  albumEdit: function(id) {
    var album = new Capstone.Models.Album({id: id});
    album.fetch();

    var photos = new Capstone.Collections.Photos();
    photos.fetch();

    var albumEdit = new Capstone.Views.AlbumEdit({
      model: album,
      collection: photos
    });

    this._swapView(albumEdit);
  },

  albumsIndex: function(id) {
    var user = new Capstone.Models.User({id: id});
    user.fetch();
    var albums = user.albums();

    var albumIndex = new Capstone.Views.AlbumIndex({
      user: user,
      model: albums
    });

    this._swapView(albumIndex);
  },

  photosNew: function() {
    var newPhotosForm = new Capstone.Views.PhotosForm({});
    this._swapView(newPhotosForm);
  },

  newAlbum: function() {
    var user = new Capstone.Models.CurrentUser();
    user.fetch();
    var photos = new Capstone.Collections.Photos();
    photos.fetch();

    var newAlbum = new Capstone.Views.AlbumNew({
      user: user,
      collection: photos
    });

    this._swapView(newAlbum);
  },

  favoritesIndex: function(id) {
    var user = new Capstone.Models.User({id: id});
    user.fetch({
      success: function(model, resp, options) {
        var favorite = new Capstone.Models.Favorite({id: user.escape("favorite_id")});
        favorite.fetch();
        var userFavorites = new Capstone.Views.FavoritesIndex({
          user: model,
          model: favorite
        });

        this._swapView(userFavorites);
      }.bind(this)
    });

  },

  explore: function() {
    var users = new Capstone.Collections.Users();
    users.fetch();

    var usersIndex = new Capstone.Views.UsersIndex({
      collection: users
    });

    this._swapView(usersIndex);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
