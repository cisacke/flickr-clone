Capstone.Models.CurrentUser = Backbone.Model.extend({
  url: "/users/current_user",

  photostream: function(resp) {
    if (!this._photostream) {
      this._photostream = new Capstone.Models.Photostream()
    }

    return this._photostream;
  },

  parse: function(resp) {
    this.photostream().set(resp.photostream);
    delete resp.photostream
    return resp
  }
})
