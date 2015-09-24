Capstone.Album = Backbone.CompositeView.extend({
  clickLeft: function(e) {
    if (this._margin < 0) {
      var margin = this._margin + 840;
      this._margin = margin;
      this.$(".photos-index-container").css("margin-left", margin);
    }
  },

  clickRight: function(e) {
    this._photos = Math.floor((this.$(".photos-index-container").find("img").length) / 7);
    var margin = this._margin - 840;
    this._margin = margin;
    if ((this._photos * -840) <= this._margin ) {
      this.$(".photos-index-container").css("margin-left", margin);
    } else {
      this._margin += 840;
    }
  },

  removePhotoPreview: function(e) {
    var id = $(e.currentTarget).data("photo-id");
    var idx = this._ids.indexOf(id);
    this._ids.splice(idx, 1);

    var target = this.$(".album-selected-photos").find("ul").filter(function() {
      return $(this).attr('data-photo-id').match(id);
    });

    if (target.data("photo-id") === this.$(".album-cover-photo-preview").find("img").data("photo-id")) {
      this.$(".album-cover-photo-preview").find("img").remove();
      target.remove();
    } else {
      target.remove();
    }
    console.log(this._ids);
  },

  addDrag: function() {
    $(".album-photo-preview").draggable(
      {helper: 'clone',
       revert: "invalid",
       start: function(e, ui) {
         $(ui.helper).addClass("ui-draggable-helper");
       }
       }
    );
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
          this.addPhotoThumbnail(photo, photoId);
        }
      }.bind(this)
    });
  },

  addPhotoThumbnail: function(photo, photoId) {
    $(photo).removeAttr("style");
    $(photo).css("float", "left");
    $(photo).css("padding", "10px");
    $(photo).removeClass("ui-draggable-helper");

    var ul = $(document.createElement("ul"));
    var div = $(document.createElement("div"));
    div.text("x");
    ul.attr("data-photo-id", photoId);
    div.attr("data-photo-id", photoId);

    $(ul).append(div);
    $(ul).append(photo);

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
});
