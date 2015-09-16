Capstone.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: "photo-show-wrapper",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {
    var content = this.template({
      photo: this.model
    })

    this.$el.html(content);
    return this;
  }
})
