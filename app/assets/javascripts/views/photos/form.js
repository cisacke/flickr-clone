Capstone.Views.PhotosForm = Backbone.View.extend({
  template: JST['photos/form'],

  events: {
    "change #input-photo-image":"fileInputChange",
    "submit form":"submit"
  },

  render: function() {
    var content = this.template()

    this.$el.html(content);
    return this;
  },

  fileInputChange: function(e) {

    // debugger
    var files = e.currentTarget.files
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var reader = new FileReader();
      var that = this

      reader.onload = function(e) {
        that._updatePreview(e.target.result)
        // console.log(e.timeStamp);
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        that._updatePreview("");
      };
    }
  },

  _updatePreview: function(src) {
    var previewPhoto = $(document.createElement("ul")).addClass("preview-photo");
    var thumbnail = $(document.createElement("img")).addClass("preview-photo-thumbnail")
    thumbnail.attr("src", src);
    var title = $(document.createElement("input")).addClass("input-photo-title");
    var description = $(document.createElement("textarea")).addClass("input-photo-description")

    previewPhoto.append(thumbnail);
    previewPhoto.append(title);
    previewPhoto.append(description);    // debugger
    this.$el.find(".preview-photos-wrapper").append(previewPhoto);
  },

  submit: function(e) {
    e.preventDefault();
    
    var files = this.$("#input-photo-image")[0].files;
    var titles = this.$(".input-photo-title");
    var descriptions = this.$(".input-photo-description");

    for (var i = 0; i < files.length; i++) {
      var photo = new Capstone.Models.Photo();
      var data = new FormData();
      data.append("photo[title]", $(titles[i]).val());
      data.append("photo[description]", $(descriptions[i]).val());
      data.append("photo[image]", files[i])

      photo.saveFormData(data, {
        success: function() {

        }
      })
    }
  }

})
