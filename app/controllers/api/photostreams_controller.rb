module Api
  class PhotostreamsController < ApiController
    def index
      @album = current_user.albums.find(1)
      # include photos
      render json: @album
    end
  end
end
