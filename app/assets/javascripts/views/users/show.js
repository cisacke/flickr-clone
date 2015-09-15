Capstone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  tagName: "ul",
  className: "user-show-bar",

  render: function() {
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);
    return this;
  }
})
