Capstone.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: "photo-show-wrapper",
  events: {
    "click .favorite-button":"toggleFavorites"
  },

  initialize: function(options) {
    this.user = options.user
    this.listenTo(this.user, "sync", this.render)
    this.listenTo(this.model, "sync add", this.render)
  },

  render: function() {
    var content = this.template({
      photo: this.model,
      user: this.user
    })
    this.$el.html(content);
    if (this.isFavorited()) {
      this.$(".favorite-button-pic").addClass("favorited")
    } else {
      this.$(".favorite-button-pic").addClass("add-to-favorites")
    };

    this.model.comments().each(function(comment) {
      var commentIndexItem = new Capstone.Views.CommentIndexItem({
        model: comment
      })
      this.addSubview(".photo-comments-wrapper", commentIndexItem);
    }.bind(this))

    var newCommentForm = new Capstone.Views.CommentForm({
      user: this.user,
      model: this.model
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

  toggleFavorites: function(e) {
    if (!$(e.currentTarget).hasClass("toggling")) {
      debugger

      if (this.model.escape("is_favorite") === "true") {
        debugger
      }



      if (this.isFavorited()) {
        debugger
        $(e.currentTarget).addClass("toggling");
        var delFavoritePhoto = this.user.favoritePhotos().findWhere({photo_id: this.model.id});
        this.user.favoritePhotos().remove(delFavoritePhoto);
        delFavoritePhoto.destroy({
          success: function() {
            $(e.currentTarget).removeClass("toggling");
            this.user.fetch();
          }.bind(this)
        })

      } else {
        debugger
        $(e.currentTarget).addClass("toggling");
        var favoritePhoto = new Capstone.Models.FavoritePhoto()
        var data = {favorite_id: this.user.favorite().id,
                    photo_id: this.model.id}
        // this.user.favorite().photos().add(this.favoritePhoto);
        favoritePhoto.save(data, {success: function(model, resp, options) {
            this.user.favoritePhotos().add(model);
            this.user.fetch();
            $(e.currentTarget).removeClass("toggling");
          }.bind(this)
        });
      }
    }

  }
})
