Capstone.Views.AlbumIndex = Backbone.CompositeView.extend({
  template: JST['albums/index'],

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, "sync add", this.render);
  },

  render: function() {
    var content = this.template({
      user: this.user
    });
    this.$el.html(content);

    var userShow = new Capstone.Views.UserShow({
      model: this.user
    });
    this.addSubview(".user-show", userShow);

    this.model.each(function(album) {
      
      var albumIndex = new Capstone.Views.AlbumIndexItem({
        model: album
      })
      this.addSubview(".album-index-list", albumIndex);
    }.bind(this))

    return this;
  }
})
