Capstone.Views.FavoritesIndex = Backbone.CompositeView.extend({
  template: JST['favorites/index'],
  className: "favorite-wrapper",

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, "sync", this.render);
  },

  render: function() {
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);

    var userShow = new Capstone.Views.UserShow({
      model: this.user
    });
    this.addSubview(".user-show", userShow);

    this.model.photos().each(function(photo) {
      var favoriteIndexItem = new Capstone.Views.FavoriteIndexItem({
        model: photo
      });
      this.addSubview(".favorite-index-item", favoriteIndexItem);
    }.bind(this))

    return this;
  }
})
