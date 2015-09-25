Capstone.Views.UsersIndex = Backbone.View.extend({
  template: JST['users/index'],
  className: "users-index-wrapper",

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render)
  },

  render: function() {
    var content = this.template({
      users: this.collection
    })

    this.$el.html(content);
    return this;
  }
})
