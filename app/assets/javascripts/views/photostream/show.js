Capstone.Views.PhotostreamShow = Backbone.CompositeView.extend({
  template: JST['photostream/show'],
  className: "photostream-show",
  events: {
    "click .upload-photos-link": "photostreamUpload",
    "click .exit-photo-form":"returnToPhotostream"
  },

  initialize: function(options) {
    this.user = options.user
    this.edit = options.edit
    this.private = options.private
    this.listenTo(this.user, "sync", this.render)
    this.listenTo(this.user.photostream().photos(), "sync add", this.render)
    this.listenTo(Capstone.Models.currentUser, "sync change add remove", this.render)
  },

  render: function() {
    var content = this.template({
      user: this.user,
      photostream: this.model

    })
    this.$el.html(content);

    var userShow = new Capstone.Views.UserShow({
      model: this.user,
      edit: this.edit
    });
    this.addSubview(".user-show", userShow);

    var photos = this.private ? this.model.photos().models : this.model.photos().where({user_id: this.user.id})
    // debugger
    photos.forEach(function(photo) {
      var photoIndexView = new Capstone.Views.PhotoIndexItem({
        model: photo,
        photostream: this.model,
        user: this.user
      });
      this.addSubview(".photostream-list", photoIndexView);
    }.bind(this))


    return this;
  },

  returnToPhotostream: function() {
    $("html, body").css("height", "auto");
    $("html, body").css("overflow", "visible");
    this.render();
  },

  photostreamUpload: function(){
    $("html, body").css("min-height", "600px");
    $("html, body").css("overflow", "hidden")

    var newPhoto = new Capstone.Models.Photo();
    var photosNew = new Capstone.Views.PhotosNew({
      model: newPhoto,
      user: this.user
    })
    this.$el.append(photosNew.render().el);
  }
});
