module Api
  class AlbumPhotosController < ApiController
    def create
      album_photo = AlbumPhoto.new(album_photo_params)
      album_photo.save
      render json: album_photo
    end

    private

      def album_photo_params
        params.require(:photo_params).permit(:photo_id, :album_id)
      end
  end
end
