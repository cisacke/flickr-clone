Capstone.Views.PhotostreamShow = Backbone.CompositeView.extend({
  template: JST['photostream/show'],
  className: "photostream-show",
  events: {
    "click .upload-photos-link": "photostreamUpload",
    "click .exit-photo-form":"returnToPhotostream"
  },

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
  },

  returnToPhotostream: function() {
    $("html, body").css("height", "auto");
    $("html, body").css("overflow", "visible");
    this.render();
  },

  photostreamUpload: function(){
    $("html, body").css("height", "100%");
    $("html, body").css("overflow", "hidden")

    var newPhoto = new Capstone.Models.Photo();
    var photosNew = new Capstone.Views.PhotosNew({
      model: newPhoto,
      user: this.user
    })
    this.$el.append(photosNew.render().el);
  }
});
