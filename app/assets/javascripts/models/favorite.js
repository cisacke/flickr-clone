Capstone.Models.Favorite = Backbone.Model.extend({
  photos: function() {
    if (!this._photos) {
      this._photos = new Capstone.Collections.Photos([], { favorite: this })
    }

    return this._photos;
  },
})
