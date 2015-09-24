Capstone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  tagName: "ul",
  className: "user-show-bar",

  events: {
    "change #input-photo-image":"updateCoverPhoto",
    "change #input-user-avatar":"updateAvatar",
    "click .toggle-follow":"toggleFollow"
  },

  initialize: function(options) {
    this.listenTo(this.model, "sync", this.render)
    this.edit = options.edit
  },

  render: function() {
    var content = this.template({
      user: this.model,
      edit: this.edit
    });

    this.$el.html(content);
    if (this.model.escape("is_followed") === "true") {
      this.$(".toggle-follow").text("Unfollow")
    } else {
      this.$(".toggle-follow").text("Follow")
    }
    return this;
  },

  updateCoverPhoto: function(e) {
    e.preventDefault();

    var file = this.$("#input-photo-image")[0].files[0];

    var data = new FormData();
    data.append("user[cover]", file);
    var that = this;
    this.model.saveCoverPhoto(data, {
      success: function() {
        that.model.fetch();
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

  updateAvatar: function(e) {
    e.preventDefault();

    var file = this.$("#input-user-avatar")[0].files[0];

    var data = new FormData();
    data.append("user[avatar]", file);
    var that = this;
    this.model.saveCoverPhoto(data, {
      success: function() {
        that.model.fetch();
        Backbone.history.navigate("", {trigger: true});
      }
    });
  },

  toggleFollow: function(e) {
    if (!$(e.currentTarget).hasClass("toggling")) {

    $(e.currentTarget).addClass("toggling");
    var method = (this.model.escape("is_followed") === "true") ? "DELETE" : "POST";
    this.model.photostream()
              .photos()
              .where({user_id: this.model.id}).forEach(function(photo) {
                $.ajax({
                  url: "/api/photos/photostream",
                  type: method,
                  data: {photostream_id: Capstone.Models.currentUser.photostream().id,
                        photo_id: photo.id},
                  success: function(model, resp, options) {
                    $(e.currentTarget).removeClass("toggling");
                  }
                  })
                })
    }

      var method = (this.model.escape("is_followed") === "true") ? "DELETE" : "POST";
      $.ajax({
        url: "/user/follow",
        type: method,
        data: {follower_id: Capstone.Models.currentUser.id,
               followed_id: this.model.id},
        success: function(model, resp, options) {
          $(e.currentTarget).removeClass("toggling");
          Capstone.Models.currentUser.fetch();
          Backbone.history.navigate("#/users/" + this.model.id, {trigger: true})
        }.bind(this)
      })
    // }
  }
})
