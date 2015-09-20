Capstone.Views.PhotosForm = Backbone.CompositeView.extend({
  template: JST['photos/form'],
  className: "new-photos-form",

  events: {
    "change #input-photo-image":"fileInputChange",
    "submit form":"submit",
    "click .preview-photo":"toggleSelector",
    "click .album-sidebar-list li":"assignAlbum",
  },

  initialize: function() {
    this.albums = new Capstone.Collections.Albums();
    this.albums.fetch();
    this.listenTo(this.albums, "sync", this.render)
  },

  render: function() {
    var content = this.template()
    this.$el.html(content);

    var albumSidebar = new Capstone.Views.AlbumSidebar({
      collection: this.albums
    })
    this.addSubview(".album-side-bar", albumSidebar)
    return this;
  },

  fileInputChange: function(e) {
    var files = e.currentTarget.files
    for (var i = 0; i < files.length; i++) {
      var file = files[i]
      var reader = new FileReader();
      var that = this

      reader.onload = function(e) {
        that._updatePreview(e.target.result)
      }

      if (file) {
        reader.readAsDataURL(file);
      } else {
        that._updatePreview("");
      };
    }
  },

  assignAlbum: function(e) {
    var albumId = $(e.currentTarget).data("album-id")
    this.$(".selected").attr("data-album_id", albumId);
    var album = this.albums.where({id: albumId})
    var miniThumbnail = $(document.createElement("img")).addClass("mini-thumbnail");
    miniThumbnail.attr("src", album[0].escape("image_url"))
    this.$(".selected").append(miniThumbnail);
    this.clearOut();
  },

  _updatePreview: function(src) {
    var previewPhoto = $(document.createElement("ul")).addClass("preview-photo");
    var thumbnail = $(document.createElement("img")).addClass("preview-photo-thumbnail")
    thumbnail.attr("src", src);
    var title = $(document.createElement("input")).addClass("input-photo-title");
    title.attr("placeholder", "title")
    var description = $(document.createElement("textarea")).addClass("input-photo-description")
    description.attr("placeholder", "description")

    previewPhoto.append(thumbnail);
    previewPhoto.append(title);
    previewPhoto.append(description);
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
        if (options.albumId) {
            var albumPhoto = new Capstone.Models.AlbumPhoto();
            data = {album_id: options.albumId,
                    photo_id: model.id}
            albumPhoto.save(data);
          }
        Backbone.history.navigate("#/users/" + Capstone.Models.currentUser.id + "/albums", {trigger: true})
        }, albumId: albumId
      })
    }
  },

  toggleSelector: function(e) {
    if (!e.shiftKey) {
      this.clearOut();
    }

    $(e.currentTarget).find("img").css("border", "3px solid #f6546a");
    $(e.currentTarget).addClass("selected")

  },

  clearOut: function() {
    $("img").css("border", "none");
    this.$("ul").css("background", "black");
    this.$("ul").removeClass("selected");
  }

})
