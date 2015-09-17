module Api
  class FavoritePhotosController < ApiController
    def create
      favorite_photo = FavoritesPhoto.new(favorite_photo_params)
      favorite_photo.save
      render json: favorite_photo
    end

    private

      def favorite_photo_params
        params.require(:favorite_photo).permit(:favorite_id, :photo_id)
      end
  end
end
