Capstone.Views.AlbumSidebar = Backbone.View.extend({
  template: JST['albums/sidebar'],

  initialize: function() {

  },

  render: function() {
    var content = this.template({
      albums: this.collection
    })

    this.$el.html(content);
    return this;
  }

})
