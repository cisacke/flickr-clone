module Api
  class PhotosController < ApiController
    def show
      @photo = Photo.find(params[:id])
      render :show
    end

    def create
      photo = Photo.create!(photo_params)
      render json: photo
    end

    private

      def photo_params
        params.require(:photo).permit(:title, :description, :image)
      end
  end
end
