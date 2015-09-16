module Api
  class PhotosController < ApiController
    def show
      photo = Photo.find(params[:id])
      render json: photo
    end
  end
end
