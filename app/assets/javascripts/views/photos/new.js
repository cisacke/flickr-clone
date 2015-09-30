Capstone.Views.PhotosNew = Backbone.View.extend({
  template: JST['photos/new'],
  className: "photo-add-wrapper",
  events: {
    "change #input-photo-image":"fileInputChange",
    "submit form": "submit"
  },

  initialize: function(options) {
    this.user = options.user;
    this.photostream = options.photostream;
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

    reader.onloadend = function(_file) {
      var image = new Image();
      image.src = _file.target.result;
      image.onload = function() {
        var x = this.width;
        var y = this.height;
        that._updatePreview(reader.result, x, y);
      };
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      that._updatePreview("");
    }
  },

  _updatePreview: function(src, x, y) {
    this.$el.find(".photostream-thumbnail").attr("src", src);
    this.$el.find(".photostream-thumbnail").attr("data-x", x);
    this.$el.find(".photostream-thumbnail").attr("data-y", y);
  },


  submit: function(e) {
    e.preventDefault();
    $("html, body").css("height", "auto");
    $("html, body").css("overflow", "visible");
    this.$(".new-photo-save").remove();
    progressbar = this.$(".photostream-progress-bar").attr("id", "progress");
    progressbar.progressbar();
    this.$(".ui-progressbar-value").css("background", "#f6546a");
    this.$(".ui-progressbar-value").css("height", "20px");

    var title = this.$("#input-photo-title").val();
    var description = this.$("#input-photo-description").val();
    var file = this.$("#input-photo-image")[0].files[0];
    var x_pixels = this.$("img").data("x");
    var y_pixels = this.$("img").data("y");


    var data = new FormData();
    data.append("photo[title]", title);
    data.append("photo[description]", description);
    data.append("photo[image]", file);
    data.append("photo[x_pixels]", x_pixels);
    data.append("photo[y_pixels]", y_pixels);
    var that = this;
    this.model.saveFormData(data, {
      success: function(model, resp, options) {
        $.ajax({
          url: "/api/photos/photostream",
          type: "POST",
          data: {user_id: that.user.id,
                photo_id: model.id},
        });

      that.user.get("followers").forEach(function(follower) {
        $.ajax({
          url: "/api/photos/photostream",
          type: "POST",
          data: {user_id: follower.id,
                photo_id: model.id},
        });
      });

        that.photostream.photos().add(that.model);
        that.photostream.fetch();
        Backbone.history.navigate("", {trigger: true});
      }, progress: progressbar
    });
  }
});
