Capstone.Models.Photostream = Backbone.Model.extend({
  url: "/api/photostream",

  photos: function() {
    if (!this._photos) {
      this._photos = new Capstone.Collections.Photos([], { photostream: this })
    }

    return this._photos;
  },

  user: function() {
    if (!this._user) {
      this._user = new Capstone.Models.User()
    }
    return this._user;
  },

  parse: function(resp) {
    // debugger
    if (resp.photos) {
      this.photos().set(resp.photos);
      delete resp.photos;
    }

    if (resp.user) {
      this.user().set(resp.user);
      delete resp.user
    }

    return resp
  }
})
