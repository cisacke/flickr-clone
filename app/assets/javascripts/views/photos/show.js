Capstone.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: "photo-show-wrapper",
  events: {
    "click .favorite-button":"toggleFavorites",
    "click .delete-photo-button-pic":"deletePicture"
  },

  initialize: function(options) {
    this.user = options.user
    this.listenTo(this.user, "sync", this.render)
    this.listenTo(this.model, "sync add change", this.render)
  },

  render: function() {
    var content = this.template({
      photo: this.model,
      user: this.user
    })
    this.$el.html(content);
    if (this.model.escape("is_favorite") === "true") {
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

  toggleFavorites: function(e) {
    if (!$(e.currentTarget).hasClass("toggling")) {

    $(e.currentTarget).addClass("toggling");
    var method = (this.model.escape("is_favorite") === "true") ? "DELETE" : "POST";
    $.ajax({
      url: "/api/photos/favorite",
      type: method,
      data: {photo_id: this.model.id,
            favorite_id: this.user.escape("favorite_id")},
      success: function(model, resp, options) {
        $(e.currentTarget).removeClass("toggling");
        Backbone.history.navigate("#/photos/" + this.model.id, {trigger: true});
      }.bind(this)
      })
    }
  },

  deletePicture: function() {
    this.model.destroy({
      success: function() {
        Capstone.Models.currentUser.fetch();
        Backbone.history.navigate("#", {trigger:true})
      }
    });
  }
})
