Capstone.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: "photo-show-wrapper",

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render)
    this.user = options.user
  },

  render: function() {
    var content = this.template({
      photo: this.model,
      user: this.user
    })

    this.$el.html(content);
    return this;
  }
})
