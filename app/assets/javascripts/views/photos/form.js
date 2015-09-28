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
    this._idx = 0
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

    var files = e.currentTarget.files;
    this.$(".custom-file-uploads").attr("disabled", "disabled");
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      file.id = i;
      var reader = new FileReader();
      reader.id = i;
      var that = this;

      reader.onload = function(e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          var x = this.width;
          var y = this.height;
          that._updatePreview(e.target.result, e.target.id, x, y);
        };
        that._idx += 1;
      };

      if (file) {
        reader.readAsDataURL(file);
      } else {
        that._updatePreview("");
      }
    }
  },

  assignAlbum: function(e) {
    this.$(".selected").find(".mini-thumbnail").remove();

    var albumId = $(e.currentTarget).data("album-id");
    this.$(".selected").attr("data-album_id", albumId);
    var album = this.albums.where({id: albumId});
    var miniThumbnail = $(document.createElement("img")).addClass("mini-thumbnail");
    miniThumbnail.attr("src", album[0].escape("image_url"));
    this.$(".selected").append(miniThumbnail);
    this.clearOut();
  },

  _updatePreview: function(src, idx, x, y) {
    var previewPhoto = $(document.createElement("ul")).addClass("preview-photo");
    var thumbnail = $(document.createElement("img")).addClass("preview-photo-thumbnail");
    thumbnail.attr("src", src).attr("id", idx);
    var title = $(document.createElement("input")).addClass("input-photo-title");
    title.attr("placeholder", "title").attr("id", idx);
    title.attr("data-x", x);
    title.attr("data-y", y);
    var description = $(document.createElement("textarea")).addClass("input-photo-description");
    description.attr("placeholder", "description").attr("id", idx);
    var progressbar = $(document.createElement("p")).attr("pid", idx);

    previewPhoto.append(thumbnail);
    previewPhoto.append(progressbar);
    previewPhoto.append(title);
    previewPhoto.append(description);
    this.$el.find(".preview-photos-wrapper").append(previewPhoto);
  },

  submit: function(e) {
    e.preventDefault();
    this.$(".new-photos-save").attr("disabled", "disabled");

    var files = this.$("#input-photo-image")[0].files;
    var titles = this.$(".input-photo-title");
    var descriptions = this.$(".input-photo-description");
    var albumIds = this.$(".preview-photo");

    for (var i = 0; i < files.length; i++) {
      var title = $(titles).filter(function() {return $(this).attr("id").match(i)})
      var description = $(descriptions).filter(function() {return $(this).attr("id").match(i)})
      title.remove();
      description.remove();
      var progressbar = this.$(".preview-photos-wrapper")
                            .find("p")
                            .filter(function() {return $(this).attr("pid").match(i)});
      progressbar.attr("id", "progress");
      progressbar.progressbar();
      this.$(".ui-progressbar-value").css("background", "#f6546a");
      this.$(".ui-progressbar-value").css("height", "20px");

      var photo = new Capstone.Models.Photo();
      var data = new FormData();
      data.append("photo[title]", title.val());
      data.append("photo[description]", description.val());
      data.append("photo[image]", files[i]);
      data.append("photo[x_pixels]", title.data("x"));
      data.append("photo[y_pixels]", title.data("y"));
      var albumId = $(albumIds[i]).data("album_id");

      photo.saveFormData(data, {
        success: function(model, resp, options) {
        if (options.albumId) {
            var albumPhoto = new Capstone.Models.AlbumPhoto();
            data = {album_id: options.albumId,
                    photo_id: model.id};
            albumPhoto.save(data);
          }

          if (options.idx == (options.files - 1)) {
            Backbone.history.navigate("#/users/" + Capstone.Models.currentUser.id + "/albums", {trigger: true});
          }

      }, albumId: albumId, progress: progressbar, files: files.length, idx: i
    });
    }
  },

  toggleSelector: function(e) {
    if (!e.shiftKey) {
      this.clearOut();
    }

    $(e.currentTarget).find(".preview-photo-thumbnail").css("border", "3px solid #f6546a");
    $(e.currentTarget).addClass("selected");

  },

  clearOut: function() {
    $("img").css("border", "none");
    this.$("ul").css("background", "black");
    this.$("ul").removeClass("selected");
  }

})
