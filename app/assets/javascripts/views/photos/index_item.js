Capstone.Views.PhotoIndexItem = Backbone.CompositeView.extend({
  template: JST['photos/index_item'],
  tagName: "li",

  initialize: function(options) {
    this.photostream = options.photostream;
    this.user = options.user;
  },

  render: function() {
    var content = this.template({
      photo: this.model,
      photostream: this.photostream,
      user: this.user
    });

    this.$el.html(content);
    return this;
  }
});
