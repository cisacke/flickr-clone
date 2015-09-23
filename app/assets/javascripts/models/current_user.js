Capstone.Models.CurrentUser = Backbone.Model.extend({
  url: "/users/current_user",

  photostream: function() {
    if (!this._photostream) {
      this._photostream = new Capstone.Models.Photostream([], {user: this})
    }

    return this._photostream;
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

    if (resp.photostream_photos) {
      this.photostream().photos().set(resp.photostream_photos);
      delete resp.photostream_photos;
    }

    if (resp.albums) {
      this.albums().set(resp.albums);
      delete resp.albums;
    }

    return resp
  },

  saveCoverPhoto: function(formData, options) {
    var method = "PUT";
    var model = this;

    $.ajax({
      url: _.result(model, "url"),
      type: method,
      data: formData,
      processData: false,
      contentType: false,
      success: function(resp){
        model.set(model.parse(resp));
        model.trigger('sync', model, resp, options);
        options.success && options.success(model, resp, options);
      },
      error: function(resp){
        options.error && options.error(model, resp, options);
      }
    });
  },

})

Capstone.Models.currentUser = new Capstone.Models.CurrentUser();
