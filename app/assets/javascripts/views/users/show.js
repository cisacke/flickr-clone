Capstone.Views.UserShow = Backbone.View.extend({
  template: JST['users/show'],
  tagName: "ul",
  className: "user-show-bar",

  events: {
    "change #input-photo-image":"updateCoverPhoto"
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
  }


})
