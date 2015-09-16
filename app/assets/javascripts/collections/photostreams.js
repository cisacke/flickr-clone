Capstone.Collections.Photostreams = Backbone.Collection.extend({
  url: "/api/photostream",
  model: Capstone.Models.Photostream,

  photos: function() {
    if (!this._photos) {
      this._photos = new Capstone.Collections.Photos([], { photostream: this })
    }

    return this._photos;
  },
})
