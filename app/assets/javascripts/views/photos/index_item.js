Capstone.Views.PhotoIndexItem = Backbone.CompositeView.extend({
  template: JST['photos/index_item'],
  tagName: "li",

  initialize: function(options) {
    this.photostream = options.photostream
  },

  render: function() {
    var content = this.template({
      photo: this.model,
      photostream: this.photostream
    })

    this.$el.html(content);
    return this;
  }
})
