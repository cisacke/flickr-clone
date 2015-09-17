Capstone.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: "photo-show-wrapper",
  events: {
    "click .add-to-favorites":"addToFavorites"
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render)
    this.user = options.user
  },

  render: function() {
    var content = this.template({
      photo: this.model,
      user: this.user
    })

    this.$el.html(content);
    return this;
  },

  addToFavorites: function(e) {
    var favoritePhoto = new Capstone.Models.FavoritePhoto()
    var data = {favorite_id: this.user.favorite().id,
                photo_id: this.model.id}
    favoritePhoto.save(data);
    $(".add-to-favorites").html("favorited!")
    debugger
  }
})
