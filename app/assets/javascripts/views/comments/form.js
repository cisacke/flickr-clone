Capstone.Views.CommentForm = Backbone.View.extend({
  template: JST['comments/form'],
  className: "new-comment-form-index group",

  events: {
    "submit form":"uploadComment"
  },

  initialize: function(options) {
    this.newComment = new Capstone.Models.Comment()
    this.user = options.user
  },

  render: function() {
    var content = this.template({
      user: this.user
    });

    this.$el.html(content);
    return this;
  },

  uploadComment: function(e) {
    e.preventDefault();
    var data = $(e.currentTarget).serializeJSON();
    data.comment.photo_id = this.model.id

    this.newComment.save(data, {success: function() {
      this.model.comments().add(this.model);
    }.bind(this)})
  }
})
