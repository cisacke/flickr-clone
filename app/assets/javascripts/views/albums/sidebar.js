Capstone.Views.AlbumSidebar = Backbone.View.extend({
  template: JST['albums/sidebar'],

  initialize: function() {
    this.user = new Capstone.Models.CurrentUser();
    this.user.fetch();
    this.listenTo(this.user, "sync", this.render);
  },

  render: function() {
    var content = this.template({
      albums: this.user.albums()
    })

    this.$el.html(content);
    return this;
  }

})
