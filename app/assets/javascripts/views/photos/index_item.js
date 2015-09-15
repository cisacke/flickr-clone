Capstone.Views.PhotoIndexItem = Backbone.CompositeView.extend({
  template: JST['photos/index_item'],
  tagName: "li",

  render: function() {
    var content = this.template({
      photo: this.model
    })

    this.$el.html(content);
    return this;
  }
})
