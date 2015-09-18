Capstone.Views.PhotosForm = Backbone.CompositeView.extend({
  template: JST['photos/form'],

  events: {
    "change #input-photo-image":"fileInputChange",
    "submit form":"submit",
    "click .preview-photo":"toggleSelector",
    "click .album-side-bar-list li":"assignAlbum"
  },

  render: function() {
    var content = this.template()

    this.$el.html(content);

    var albumSidebar = new Capstone.Views.AlbumSidebar()
    this.addSubview(".album-side-bar", albumSidebar)
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

  assignAlbum: function(e) {
    this.$(".selected").attr("data-album_id", $(e.currentTarget).data("album-id"))
    this.clearOut();
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
    var albumIds = this.$(".preview-photo");

    for (var i = 0; i < files.length; i++) {

      var photo = new Capstone.Models.Photo();
      var data = new FormData();
      data.append("photo[title]", $(titles[i]).val());
      data.append("photo[description]", $(descriptions[i]).val());
      data.append("photo[image]", files[i]);
      var albumId = $(albumIds[i]).data("album_id")

      photo.saveFormData(data, {
        success: function(model, resp, options) {
          debugger

        if (options.albumId) {
            var albumPhoto = new Capstone.Models.AlbumPhoto();
            data = {album_id: options.albumId,
                    photo_id: model.id}
            albumPhoto.save(data);
          }
        }, albumId: albumId
      })
    }
  },

  toggleSelector: function(e) {
    // reset all js settings first
    if (!e.shiftKey) {
      this.clearOut();
    }

    // add pink border around the edge
    $(e.currentTarget).find(".preview-photo-thumbnail").css("border", "3px solid #f6546a");
    $(e.currentTarget).css("background", "gray")
    // add a 'selected' class to the element
    $(e.currentTarget).addClass("selected")
    // add an album show view side bar
  },

  clearOut: function() {
    this.$(".preview-photo-thumbnail").css("border", "none");
    this.$("ul").css("background", "white");
    this.$("ul").removeClass("selected");
  }

})
