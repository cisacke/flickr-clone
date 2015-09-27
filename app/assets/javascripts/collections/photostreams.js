Capstone.Collections.Photostreams = Backbone.Collection.extend({
  url: function() {
    return "/api/photostream";
  },
  model: Capstone.Models.Photos
});
