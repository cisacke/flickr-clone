module Api
  class PhotostreamsController < ApiController
    def show
      @photostream = current_user.albums.find_by(title: "Photostream")
      
      render :show
    end
  end
end
