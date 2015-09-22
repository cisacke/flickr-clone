module Api
  class FavoritePhotosController < ApiController
    def create
      favorite_photo = FavoritesPhoto.new(favorite_photo_params)
      favorite_photo.save
      render json: favorite_photo
    end

    def destroy
      favorite_photo = FavoritesPhoto.find(params[:id])
      favorite_photo.destroy
      render json: favorite_photo
    end

    def show
      favorite_photo = FavoritesPhoto.find(params[:id])
      render json: favorite_photo
    end

    private

      def favorite_photo_params
        params.require(:favorite_photo).permit(:favorite_id, :photo_id)
      end
  end
end
