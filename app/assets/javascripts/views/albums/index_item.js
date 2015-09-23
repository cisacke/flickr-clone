Capstone.Views.AlbumIndexItem = Backbone.View.extend({
  template: JST['albums/index_item'],
  tagName: "li",
  className: "album-index-item",

  events: {
    "click .delete-album":"deleteAlbum"
  },

  render: function() {
    var content = this.template({
      album: this.model
    })

    this.$el.html(content);
    return this;
  },

  deleteAlbum: function(e) {
    this.model.destroy();
    Backbone.history.navigate("#/users/" + this.model.escape("user_id") + "/albums", {trigger: true})
  },
})
