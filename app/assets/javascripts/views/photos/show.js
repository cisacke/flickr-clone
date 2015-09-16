Capstone.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: "photo-show-wrapper",
  events: {
    "click .add-to-favorites":"addToFavorites"
  },

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
  },

  addToFavorites: function(e) {
    debugger
  }
})
