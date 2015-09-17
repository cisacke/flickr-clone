Capstone.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  photostream: function() {
    if (!this._photostream) {
      this._photostream = new Capstone.Models.Photostream([], {user: this})
    }

    return this._photostream;
  },

  favorite: function() {
    if (!this._favorite) {
      this._favorite = new Capstone.Models.Favorite([], {user: this})
    }

    return this._favorite;
  },

  albums: function() {
    if (!this._albums) {
      this._albums = new Capstone.Collections.Albums([], {user: this})
    }

    return this._albums
  },

  parse: function(resp) {

    this.photostream().set(resp.photostream);
    delete resp.photostream;

    this.favorite().set(resp.favorite);
    delete resp.favorite;

    if (resp.photostream_photos) {
      this.photostream().photos().set(resp.photostream_photos);
      delete resp.photostream_photos;
    }

    if (resp.favorite_photos) {
      this.favorite().photos().set(resp.favorite_photos);
      delete resp.favorite_photos;
    }

    if (resp.albums) {
      this.albums().set(resp.albums);
      delete resp.albums;
    }

    return resp
  }
})
