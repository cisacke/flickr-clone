Capstone.Views.PhotostreamShow = Backbone.CompositeView.extend({
  template: JST['photostream/show'],
  className: "photostream-show",

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {

    var content = this.template({
      user: this.user,
      photostream: this.model
    })
    this.$el.html(content);

    var userShow = new Capstone.Views.UserShow({
      model: this.model.user()
    });
    this.addSubview(".user-show", userShow);

    this.model.photos().each(function(photo) {
      var photoIndexView = new Capstone.Views.PhotoIndexItem({
        model: photo
      });
      this.addSubview(".photostream-list", photoIndexView);
    }.bind(this))


    return this;
  }
});
