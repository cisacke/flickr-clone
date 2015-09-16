Capstone.Views.PhotostreamShow = Backbone.CompositeView.extend({
  template: JST['photostream/show'],
  className: "photostream-show",

  initialize: function(options) {
    this.user = options.user
    this.listenTo(this.user, "sync", this.render)
  },

  render: function() {

    var content = this.template({
      user: this.user,
      photostream: this.model
    })
    this.$el.html(content);

    var userShow = new Capstone.Views.UserShow({
      model: this.user
    });
    this.addSubview(".user-show", userShow);

    this.model.photos().each(function(photo) {
      var photoIndexView = new Capstone.Views.PhotoIndexItem({
        model: photo,
        photostream: this.model,
        user: this.user
      });
      this.addSubview(".photostream-list", photoIndexView);
    }.bind(this))


    return this;
  }
});
