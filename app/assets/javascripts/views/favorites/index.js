Capstone.Views.FavoritesIndex = Backbone.CompositeView.extend({
  template: JST['favorites/index'],
  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, "sync", this.render);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);

    this.model.photos().each(function(photo) {
      var favoriteIndexItem = new Capstone.Views.FavoriteIndexItem({
        model: photo
      });
      this.addSubview(".favorite-index-item", favoriteIndexItem);
    }.bind(this))

    return this;
  }
})
