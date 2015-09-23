Capstone.Models.Favorite = Backbone.Model.extend({
  urlRoot: "/api/favorites",

  photos: function() {
    if (!this._photos) {
      this._photos = new Capstone.Collections.Photos([], { favorite: this })
    }

    return this._photos;
  },

  parse: function(resp) {
    if (resp.photos) {
      this.photos().set(resp.photos);
      delete resp.photos;
    }
  }
})
