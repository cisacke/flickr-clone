Capstone.Views.AlbumNew = Capstone.Album.extend({
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

  render: function() {
    var content = this.template({
      user: this.user
    })

    this.$el.html(content);

    var photosIndex = new Capstone.Views.PhotosIndex({
      collection: this.collection
    })
    this.addSubview(".photos-index", photosIndex)

    this.addDrag();
    this.addDrop();

    return this;
  },

  createNewAlbum: function(e) {
    e.preventDefault();
    var data = $(e.currentTarget).serializeJSON();
    data.album.image_url = $(this.el).find(".album-cover-photo-preview").find("img").attr("src");
    data.album.photo_ids = this._ids;

    this.newAlbum.save(data, {success: function() {
      this.user.albums().add(this.newAlbum)
      Backbone.history.navigate("#/users/" + this.user.id + "/albums", {trigger:true})
    }.bind(this)})

  }
})
