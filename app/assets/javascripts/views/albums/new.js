Capstone.Views.AlbumNew = Backbone.CompositeView.extend({
  template: JST['albums/new'],

  events: {
    "submit form":"createNewAlbum",
    "drop .droppable":"callback"
  },

  initialize: function(options) {
    this.user = options.user
    this.newAlbum = new Capstone.Models.Album()
    this.listenTo(this.user, "sync", this.render)
    this.listenTo(this, "over", this.callback)
    this.listenTo(this.collection, "sync", this.render)
  },

  callback: function(event, ui) {
    // debugger
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
    this.$(".droppable").droppable({
      drop: function(event, ui) {

        $(this).find("img").remove();
        $(this).append($(ui.helper).clone());
        $(this).find("img").removeClass("ui-draggable-helper")
        $(this).find("img").css("position", "absolute");
        $(this).find("img").css("top", 0);
        $(this).find("img").css("left", 0);

      }
    });
    return this;
  },

  createNewAlbum: function(e) {
    e.preventDefault();
    var data = $(e.currentTarget).serializeJSON();
    data.album.image_url = $(this.el).find(".droppable").find("img").attr("src");

    this.newAlbum.save(data, {success: function() {
      this.user.albums().add(this.newAlbum)
      Backbone.history.navigate("#/users/" + this.user.id + "/albums", {trigger:true})
    }.bind(this)})

  }
})
