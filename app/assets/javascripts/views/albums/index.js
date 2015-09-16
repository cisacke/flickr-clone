Capstone.Views.AlbumIndex = Backbone.CompositeView.extend({
  template: JST['albums/index'],

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, "sync add", this.render);
  },

  render: function() {
    var content = this.template({});
    this.$el.html(content);

    var userShow = new Capstone.Views.UserShow({
      model: this.user
    });
    this.addSubview(".user-show", userShow);

    this.model.each(function(album) {
      var albumIndexView = new Capstone.Views.AlbumIndexItem({
        model: album
      })
    })

    return this;
  }
})


// this.model.photos().each(function(photo) {
//   var photoIndexView = new Capstone.Views.PhotoIndexItem({
//     model: photo,
//     photostream: this.model,
//     user: this.user
//   });
//   this.addSubview(".photostream-list", photoIndexView);
// }.bind(this))
