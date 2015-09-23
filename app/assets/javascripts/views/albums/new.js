Capstone.Views.AlbumNew = Backbone.CompositeView.extend({
  template: JST['albums/new'],
  className: "new-album-wrapper",

  events: {
    "submit form":"createNewAlbum",
    "click .click-left": "clickLeft",
    "click .click-right": "clickRight",
    "click .album-selected-photos div":"removePhotoPreview"
  },

  initialize: function(options) {
    this.user = options.user
    this.newAlbum = new Capstone.Models.Album()
    this.listenTo(this.user, "sync", this.render)
    this.listenTo(this.collection, "sync", this.render)
    this._ids = []
    this._margin = 0
    this._photos = 0
  },

  clickLeft: function(e) {
    if (this._margin < 0) {
      var margin = this._margin + 720
      this._margin = margin
      this.$(".photos-index-container").css("margin-left", margin);
    }
  },

  clickRight: function(e) {
    this._photos = Math.floor((this.$(".photos-index-container").find("img").length) / 7)
    var margin = this._margin - 720
    this._margin = margin
    if ((this._photos * -720) <= this._margin ) {
      this.$(".photos-index-container").css("margin-left", margin);
    } else {
      this._margin += 720
    }
  },

  removePhotoPreview: function(e) {
    var id = $(e.currentTarget).data("photo-id");
    var idx = this._ids.indexOf(id);
    this._ids.splice(idx, 1);

    var target = this.$(".album-selected-photos").find("ul").filter(function() {
      return $(this).attr('data-photo-id').match(id);
    })

    if (target.data("photo-id") === this.$(".album-cover-photo-preview").find("img").data("photo-id")) {
      this.$(".album-cover-photo-preview").find("img").remove();
      target.remove();
    } else {
      target.remove();
    }
  },

  render: function() {
    var content = this.template({
      user: this.user
    })

    this.$el.html(content);

    this.$(".droppable").droppable();

    var photosIndex = new Capstone.Views.PhotosIndex({
      collection: this.collection
    })
    this.addSubview(".photos-index", photosIndex)

    this.addDrag();
    this.addDrop();

    return this;
  },

  addDrag: function() {
    $(".album-photo-preview").draggable(
      {helper: 'clone',
       revert: "invalid",
       start: function(e, ui) {
         $(ui.helper).addClass("ui-draggable-helper")
       }
       }
    );
  },

  addPhotoThumbnail: function(photo, photoId) {
    $(photo).removeAttr("style");
    $(photo).css("float", "left");
    $(photo).css("padding", "10px");
    $(photo).removeClass("ui-draggable-helper");

    var ul = $(document.createElement("ul"))
    var div = $(document.createElement("div"))
    div.text("x");
    ul.attr("data-photo-id", photoId);
    div.attr("data-photo-id", photoId);

    $(ul).append(div);
    $(ul).append(photo)

    this._ids.push($(photo).data("photo-id"));

    $(this.el).find(".album-selected-photos").append(ul);
  },

  swapAlbumCover: function(event, ui) {
    $(event.target).find("img").remove();
    var photo = $(ui.helper).clone();

    photo.removeClass("ui-draggable-helper");
    photo.css("position", "absolute");
    photo.css("top", 0);
    photo.css("left", 0);

    $(event.target).append(photo);
  },

  addDrop: function() {
    this.$(".album-cover-photo-preview").droppable({
      drop: function(event, ui) {
        var photo = $(ui.helper).clone();
        var photoId = $(photo).data("photo-id");

        if (this._ids.indexOf(photoId) === -1 ) {
          this.addPhotoThumbnail(photo, photoId);
        }

        this.swapAlbumCover(event, ui);
      }.bind(this)
    });

    this.$(".album-selected-photos").droppable({
      drop: function(event, ui) {
        var photo = $(ui.helper).clone();

        var photoId = $(photo).data("photo-id");
        if (this._ids.indexOf(photoId) === -1) {
          this.addPhotoThumbnail(photo, photoId)
        }
      }.bind(this)
    });
  },

  createNewAlbum: function(e) {
    e.preventDefault();
    debugger
    var data = $(e.currentTarget).serializeJSON();
    data.album.image_url = $(this.el).find(".album-cover-photo-preview").find("img").attr("src");
    data.album.photo_ids = this._ids;

    this.newAlbum.save(data, {success: function() {
      this.user.albums().add(this.newAlbum)
      Backbone.history.navigate("#/users/" + this.user.id + "/albums", {trigger:true})
    }.bind(this)})

  }
})
