Capstone.Views.AlbumNew = Backbone.View.extend({
  template: JST['albums/new'],

  events: {
    "submit form":"createNewAlbum"
  },

  initialize: function(options) {
    this.user = options.user
    this.newAlbum = new Capstone.Models.Album()
    this.listenTo(this.user, "sync", this.render)
  },

  render: function() {
    var content = this.template({
      user: this.user
    })

    this.$el.html(content);
    return this;
  },

  createNewAlbum: function(e) {
    e.preventDefault();
    var data = $(e.currentTarget).serializeJSON();

    this.newAlbum.save(data, {success: function() {
      this.user.albums().add(this.newAlbum)
      Backbone.history.navigate("#/users/" + this.user.id + "/albums", {trigger:true})
    }.bind(this)})

  }
})
