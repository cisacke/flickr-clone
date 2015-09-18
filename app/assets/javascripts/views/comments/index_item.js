Capstone.Views.CommentIndexItem = Backbone.View.extend({
  template: JST['comments/index_item'],
  tagName: "li",
  className: "photo-comments-index-item",

  render: function() {
    var content = this.template({
      comment: this.model
    })

    this.$el.html(content);
    return this;
  }
})
