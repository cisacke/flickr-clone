Capstone.Views.PhotosForm = Backbone.View.extend({
  template: JST['photos/form'],

  events: {
    "change #input-photo-image":"fileInputChange"
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
        // debugger
        var previewPhoto = $(document.createElement("img"))
        previewPhoto.addClass("preview-photo-thumbnail")
        previewPhoto.attr("src", e.target.result)
        that.$el.find(".preview-photos").append(previewPhoto);
      }
      if (file) {
        reader.readAsDataURL(file);
      } else {
        that._updatePreview("");
      };
    }
  },

  _updatePreview: function(src) {
    var previewPhoto = $(document.createElement("img")).attr("src", src)
    this.$el.find(".preview-photos").append(previewPhoto);
  }

})
