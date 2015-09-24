Capstone.Models.Photo = Backbone.Model.extend({
  urlRoot: "/api/photos",

  saveFormData: function(formData, options) {
    var method = this.isNew() ? "POST" : "PUT";
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

  comments: function() {
    if (!this._comments) {
      this._comments = new Capstone.Collections.Comments([], { photo: this });
    }

    return this._comments;
  },

  parse: function(resp) {
    if (resp.comments) {
      this.comments().set(resp.comments);
      delete resp.comments;
    }

    return resp;
  }
});
