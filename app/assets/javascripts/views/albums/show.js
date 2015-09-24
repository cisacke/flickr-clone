Capstone.Views.AlbumShow = Backbone.View.extend({
  template: JST['albums/show'],
  className: "album-show-wrapper",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render)
  },

  render: function() {
    var content = this.template({
      album: this.model
    })

    this.$el.html(content)


    if (this.model.get("photos")) {
      var photos = this.model.get("photos");

      for (var i = 0; i < photos.length; i+=3) {
        // 1. get aspect ratios
        var ratios = this.aspectRatios(photos[i], photos[i+1], photos[i+2])
        // 2. create a div
        var div = $(document.createElement("div"))

        var a1 = $(document.createElement("a")).attr("href", "#/photos/" + photos[i].id)
        var img1 = $(document.createElement("img")).attr("src", photos[i].image_url)
        img1.css("width", (ratios.p1 * 100) + "%")
        a1.append(img1);

        if (photos[i+1]) {
          var a2 = $(document.createElement("a")).attr("href", "#/photos/" + photos[i+1].id)
          var img2 = $(document.createElement("img")).attr("src", photos[i+1].image_url)
          img2.css("width", (ratios.p2 * 100) + "%")
          a2.append(img2);
        } else {
          a2 = new Image();
        }

        if (photos[i+2]) {
          var a3 = $(document.createElement("a")).attr("href", "#/photos/" + photos[i+2].id)
          var img3 = $(document.createElement("img")).attr("src", photos[i+2].image_url)
          img3.css("width", (ratios.p3 * 100) + "%")
          a3.append(img3);
        } else {
          a3 = new Image();
        }

        div.append(a1).append(a2).append(a3)
        this.$(".album-photos-wrapper").append(div);
      }
    }

    // album == this.model

    // for every third image, create a new div
    // always create <img> tag: set src and width percentage

    return this;
  },

  aspectRatios: function(p1, p2, p3) {
    // debugger
    var r1 = (p1.x_pixels) / (p1.y_pixels);
    var r2 = (p2 == undefined) ? 1 : (p2.x_pixels) / (p2.y_pixels);
    var r3 = (p3 == undefined) ? 1 : (p3.x_pixels) / (p3.y_pixels);
    var ratio = r1 + r2 + r3;
    return ({ p1: (r1/ratio),
              p2: (r2/ratio),
              p3: (r3/ratio) })
  }
})
