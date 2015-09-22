Capstone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  tagName: "ul",
  className: "user-show-bar",

  events: {
    "change #input-photo-image":"updateCoverPhoto"
  },


  render: function() {
    var content = this.template({
      user: this.model
    });

    this.$el.html(content);
    return this;
  },

  updateCoverPhoto: function(e) {
    e.preventDefault();
    debugger

    var file = this.$("#input-photo-image")[0].files[0];

    var data = new FormData();
    data.append("photo[image]", file);
    var that = this;
    this.model.saveCoverPhoto(data, {
      success: function() {
        that.user.photostream().createPhotostreamAssociation({
          photo: that.model
        });
        that.user.photostream().photos().add(that.model);
        that.user.fetch();

        Backbone.history.navigate("", {trigger: true});
      }
    });
  }


})
