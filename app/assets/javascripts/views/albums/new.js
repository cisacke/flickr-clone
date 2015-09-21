Capstone.Views.AlbumNew = Backbone.CompositeView.extend({
  template: JST['albums/new'],
  className: "new-album-wrapper",

  events: {
    "submit form":"createNewAlbum",
    "drop .droppable":"callback"
  },

  initialize: function(options) {
    this.user = options.user
    this.newAlbum = new Capstone.Models.Album()
    this.listenTo(this.user, "sync", this.render)
    this.listenTo(this.collection, "sync", this.render)
    this._ids = []
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
    $(".album-photo-preview").draggable(
      {helper: 'clone',
       revert: "invalid",
       start: function(e, ui) {
         $(ui.helper).addClass("ui-draggable-helper")
       }
       }
    );
    this.$(".album-cover-photo-preview").droppable({
      drop: function(event, ui) {
        $(this).find("img").remove();
        $(this).append($(ui.helper).clone());
        $(this).find("img").removeClass("ui-draggable-helper")
        $(this).find("img").css("position", "absolute");
        $(this).find("img").css("top", 0);
        $(this).find("img").css("left", 0);
      }
    });

    this.$(".album-selected-photos").droppable({
      drop: function(event, ui) {
        var photoId = $(ui.helper).data("photo-id");
        if (this._ids.indexOf(photoId) === -1) {
          this._ids.push(photoId);
          $(event.target).append($(ui.helper).clone());
          $(event.target).find("img").removeAttr("style");
          $(event.target).find("img").removeClass("ui-draggable-helper");
          $(event.target).find("img").css("float", "left");
        } else {
          // duplicate photo in album
        }

      }.bind(this)
    });
    return this;
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
