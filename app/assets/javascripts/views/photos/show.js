Capstone.Views.PhotoShow = Backbone.CompositeView.extend({
  template: JST['photos/show'],
  className: "photo-show-wrapper",
  events: {
    "click .favorite-button":"toggleFavorites",
    "click .delete-photo-button-pic":"deletePicture",
    "click .edit-title":"addTitle",
    "click .add-a-description":"addDescription",
    "keypress .edited-description":"editDescription",
    "keypress .edited-title":"editTitle"
  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.user, "sync", this.render);
    this.listenTo(this.model, "sync add change", this.render);
  },

  render: function() {
    var content = this.template({
      photo: this.model,
      user: this.user
    });
    this.$el.html(content);
    if (this.model.escape("is_favorite") === "true") {
      this.$(".favorite-button-pic").addClass("favorited");
    } else {
      this.$(".favorite-button-pic").addClass("add-to-favorites");
    }

    this.model.comments().each(function(comment) {
      var commentIndexItem = new Capstone.Views.CommentIndexItem({
        model: comment
      });
      this.addSubview(".photo-comments-wrapper", commentIndexItem);
    }.bind(this));

    var newCommentForm = new Capstone.Views.CommentForm({
      user: this.user,
      model: this.model
    });
    this.addSubview(".new-comment-form", newCommentForm);

    return this;
  },

  addDescription: function(e) {
    $(e.currentTarget).find("p").remove();
    $(e.currentTarget).removeClass("add-a-description");
    var input = $(document.createElement("textarea"));
    input.attr("name", "photo[description]");
    input.css("border", "1px solid black");
    input.val(this.model.escape("description"));
    input.addClass("edited-description");
    $(e.currentTarget).append(input);
  },

  editDescription: function(e) {
    if(e.which == 13) {
      e.preventDefault();
      this.model.set("description", $(e.currentTarget).val());
      this.model.save();
    }
  },

  editTitle: function(e) {
    if (e.which == 13) {
      e.preventDefault();
      this.model.set("title", $(e.currentTarget).val());
      this.model.save({error: function() {
      }
    });
    }
  },

  addTitle: function(e) {
    $(e.currentTarget).find("p").remove();
    $(e.currentTarget).removeClass("edit-title");
    var input = $(document.createElement("input"));
    input.attr("name", "photo[title]");
    input.css("border", "1px solid black");
    input.val(this.model.escape("title"));
    input.addClass("edited-title");
    $(e.currentTarget).append(input);
  },

  toggleFavorites: function(e) {
    if (!$(e.currentTarget).hasClass("toggling")) {

    $(e.currentTarget).addClass("toggling");
    var method = (this.model.escape("is_favorite") === "true") ? "DELETE" : "POST";
    $.ajax({
      url: "/api/photos/favorite",
      type: method,
      data: {photo_id: this.model.id,
            user_id: this.user.id},
      success: function(model, resp, options) {
        $(e.currentTarget).removeClass("toggling");
        this.user.fetch();
        Backbone.history.navigate("#/photos/" + this.model.id, {trigger: true});
      }.bind(this)
    });
    }
  },

  deletePicture: function() {
    this.model.destroy({
      success: function() {
        Capstone.Models.currentUser.fetch();
        Backbone.history.navigate("#", {trigger:true});
      }
    });
  }
});
