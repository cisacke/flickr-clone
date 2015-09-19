Capstone.Views.CommentIndexItem = Backbone.View.extend({
  template: JST['comments/index_item'],
  tagName: "li",
  className: "photo-comments-index-item group",

  render: function() {
    var content = this.template({
      comment: this.model,
      author: this.author
    })
    this.$el.html(content);
    return this;
  }
})
