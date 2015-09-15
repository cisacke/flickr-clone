module Api
  class PhotostreamsController < ApiController
    def show
      @photostream = current_user.albums.find_by(title: "Photostream")
      # include photos
      render :show
    end
  end
end
