Capstone.Models.Photostream = Backbone.Model.extend({
  urlRoot: "/api/photostreams",

  parse: function(resp) {
    if (resp.photos) {
      this.photos().set(resp.photos);
      delete resp.photos;
    }

    return resp
  },

  createPhotostreamAssociation: function(options) {
    var data = {photostream_id: this.id, photo_id: options.photo.id}
    var photostreamPhoto = new Capstone.Models.PhotostreamPhoto()
    photostreamPhoto.save(data);
  }
})
