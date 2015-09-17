Capstone.Views.FavoriteIndexItem = Backbone.View.extend({
  template: JST['favorites/index_item'],
  render: function() {
    var content = this.template({
      photo: this.model
    })

    this.$el.html(content);
    return this;
  }
})
