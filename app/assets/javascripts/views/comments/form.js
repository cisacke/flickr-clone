Capstone.Views.CommentForm = Backbone.View.extend({
  template: JST['comments/form'],
  className: "new-comment-form-index group",

  initialize: function(options) {
    this.user = options.user
  },

  render: function() {
    var content = this.template({
      user: this.user
    });

    this.$el.html(content);
    return this;
  }
})
