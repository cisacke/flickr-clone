Capstone.Views.AlbumIndex = Backbone.View.extend({
  template: JST['albums/index'],

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, "sync add", this.render);
  },

  render: function() {
    var content = this.template({
      albums: this.user.albums
    })

    this.$el.html(content);
    return this;
  }
})
