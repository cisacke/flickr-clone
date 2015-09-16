Capstone.Views.PhotosNew = Backbone.View.extend({
  template: JST['photos/new'],
  events: {
    "submit form": "submit"
  },

  initialize: function(options) {
    this.user = options.user
  },

  render: function() {
    var content = this.template({

    });

    this.$el.html(content);
    return this;
  },

  submit: function(e) {
    e.preventDefault();

    var title = this.$("#input-photo-title").val();
    var description = this.$("#input-photo-description");
    var file = this.$("#input-photo-image")[0].files[0];

    var data = new FormData();
    data.append("photo[title]", title);
    data.append("photo[description]", description);
    data.append("photo[image]", file);
    var that = this;
    this.model.saveFormData(data, {
      success: function() {
        that.user.photostream().add(that.model);
        Backbone.history.navigate("", {trigger: true});
      }
    });
  }
})
