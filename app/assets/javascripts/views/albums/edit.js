Capstone.Views.AlbumEdit = Capstone.Album.extend({
  template: JST['albums/edit'],

  events: {
    "submit form":"editAlbum",
    "click .click-left": "clickLeft",
    "click .click-right": "clickRight",
    "click .album-selected-photos div":"removePhotoPreview"
  },

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
    this._ids = [],
    this._margin = 0;
    this._photos = 0;
  },

  setIds: function() {
    var ids = []
    if (this.model.get("photos")) {
      this.model.get("photos").forEach(function(model) {
        if (this._ids.indexOf(model.id) === -1) {
          this._ids.push(model.id);
        }
      }.bind(this))
    }
  },

  render: function() {
    this.setIds();

    var content = this.template({
      album: this.model
    })

    this.$el.html(content);

    var photosIndex = new Capstone.Views.PhotosIndex({
      collection: this.collection
    })
    this.addSubview(".photos-index", photosIndex);

    this.addDrag();
    this.addDrop();

    return this;
  },

  editAlbum: function(e) {
    e.preventDefault();
    var data = $(e.currentTarget).serializeJSON();
    data.album.image_url = $(this.el).find(".album-cover-photo-preview").find("img").attr("src");
    data.album.photo_ids = this._ids;

    this.model.save(data, {success: function(model, resp, options) {
      // this.user.albums().add(this.model)
      Backbone.history.navigate("#/albums/" + model.id, {trigger:true})
    }.bind(this)})
  }


})
