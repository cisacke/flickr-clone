Capstone.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: "photo-show-wrapper",
  events: {
    "click .favorite-button":"addToFavorites"
  },

  initialize: function(options) {
    this.favoritePhoto = new Capstone.Models.FavoritePhoto()
    this.user = options.user
    this.listenTo(this.user, "sync", this.render)
    this.listenTo(this.favoritePhoto, "sync", this.render)
  },

  render: function() {
    var content = this.template({
      photo: this.model,
      user: this.user
    })
    this.$el.html(content);
    if (this.isFavorited()) {
      // debugger
      this.$(".favorite-button").text("added to favorites")
    } else {
      this.$(".favorite-button").text("add to favorites")
    };

    var newCommentForm = new Capstone.Views.CommentForm({
      user: this.user
    });
    this.addSubview(".new-comment-form", newCommentForm);

    return this;
  },

  isFavorited: function() {
    var favorited = false
    this.user.favorite().photos().each(function(photo){
      if (photo.id == this.model.id) {
        favorited = true
      };
    }.bind(this));
    return favorited;
  },

  addToFavorites: function(e) {
    var data = {favorite_id: this.user.favorite().id,
                photo_id: this.model.id}
    this.user.favorite().photos().add(this.favoritePhoto);
    this.favoritePhoto.save(data, {success: function()
      {
        this.user.fetch()
      }.bind(this)
    });
  }
})
