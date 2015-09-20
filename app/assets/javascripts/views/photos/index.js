Capstone.Views.PhotosIndex = Backbone.View.extend({
  template: JST['photos/index'],

  render: function() {
    var content = this.template({
      photos: this.collection
    })

    this.$el.html(content);
    return this;
  }
})
