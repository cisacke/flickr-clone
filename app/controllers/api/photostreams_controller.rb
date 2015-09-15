module Api
  class PhotostreamsController < ApiController
    def show
      @album = current_user.albums.find_by(title: "Photostream")
      # include photos
      render json: @album
    end
  end
end
