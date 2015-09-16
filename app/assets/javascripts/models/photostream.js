Capstone.Models.Photostream = Backbone.Model.extend({
  urlRoot: "/api/photostreams",

  parse: function(resp) {
    if (resp.photos) {
      this.photos().set(resp.photos);
      delete resp.photos;
    }

    return resp
  }
})
