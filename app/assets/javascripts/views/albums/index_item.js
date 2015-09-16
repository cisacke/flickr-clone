Capstone.Views.AlbumIndexItem = Backbone.View.extend({
  template: JST['albums/index_item'],
  tagName: "li",
  className: "album-index-item",

  render: function() {
    var content = this.template({
      album: this.model
    })

    this.$el.html(content);
    return this;
  }
})
