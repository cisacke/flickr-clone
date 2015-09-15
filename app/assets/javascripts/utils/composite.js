Backbone.CompositeView = Backbone.View.extend({
  addSubview: function(selector, subview, prepend) {
    this.subviews(selector).push(subview);
    this.attachSubview(selector, subview.render())
  },

  attachSubview: function(selector, subview, prepend) {
    this.$(selector).append(subview.$el);
    subview.delegateEvents();

    if (subview.attachSubviews) {
      subview.attachSubviews();
    }
  },

  attachSubviews: function() {
    this.subviews().each(function(selectorSubview, selector) {
      this.$(selector).empty();
    }.bind(this))
    this.eachSubview(this.attachSubview.bind(this))
  },

  eachSubview: function(callback) {
    this.subviews().each(function (selectorSubviews, selector) {
      selectorSubviews.each(function (subview) {
        callback(selector, subview);
      });
    });
  },

  remove: function() {
    Backbone.View.prototype.remove.call(this);

    this.eachSubview(function(selector, subview) {
      subview.remove();
    });
  },

  removeSubview: function(seletor, subview) {
    subview.remove();

    var subviews = this.subviews(selector);
    subviews.splice(subviews.indexOf(subView), 1);
  },

  subviews: function(selector) {
    this._subviews = this._subviews || _({});

    if (selector) {
      this._subviews[selector] = this._subviews[seletor] || _([]);
      return this._subviews[selector];
    } else {
      return this._subviews;
    }
  }
})
