Capstone.Views.CommentIndexItem = Backbone.View.extend({
  template: JST['comments/index_item'],
  tagName: "li",
  className: "photo-comments-index-item group",

  events: {
    "click button":"deleteComment"
  },

  render: function() {
    var content = this.template({
      comment: this.model,
      author: this.author
    })
    this.$el.html(content);
    return this;
  },

  deleteComment: function() {
    this.model.destroy();
    Backbone.history.navigate("#/photos/" + this.model.escape("photo_id"), {trigger: true})
  }
})
