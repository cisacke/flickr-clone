Capstone.Routers.AppRouter = Backbone.Router.extend({
  routes: {
    "": "root"
  },

  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  root: function() {
    // debugger
    var photostream = new Capstone.Models.Photostream()
    photostream.fetch();

    var photostreamShow = new Capstone.Views.PhotostreamShow({
      model: photostream
    })

    this._swapView(photostreamShow)
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this._currentView = view
    this.$rootEl.html(view.render().$el)
  }
})
