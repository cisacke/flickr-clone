Capstone.Views.PhotosNew = Backbone.View.extend({
  template: JST['photos/new'],
  className: "photo-add-wrapper",
  events: {
    "change #input-photo-image":"fileInputChange",
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

  fileInputChange: function(e) {

    var that = this;
    var file = e.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function() {
      that._updatePreview(reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  _updatePreview: function(src) {
    this.$el.find(".photostream-thumbnail").attr("src", src);
  },


  submit: function(e) {
    e.preventDefault();
    $("html, body").css("height", "auto");
    $("html, body").css("overflow", "visible");

    var title = this.$("#input-photo-title").val();
    var description = this.$("#input-photo-description").val();
    var file = this.$("#input-photo-image")[0].files[0];

    var data = new FormData();
    data.append("photo[title]", title);
    data.append("photo[description]", description);
    data.append("photo[image]", file);
    var that = this;
    this.model.saveFormData(data, {
      success: function() {
        that.user.photostream().createPhotostreamAssociation({
          photo: that.model
        });
        that.user.photostream().photos().add(that.model);
        that.user.fetch();

        Backbone.history.navigate("", {trigger: true});
      }
    });
  }
})
