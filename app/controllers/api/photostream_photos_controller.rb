module Api
  class PhotostreamPhotosController < ApiController
    def create
      photostream_photo = PhotostreamPhoto.new(photostream_photo_params)
      photostream_photo.save
      render json: photostream_photo
    end

    def destroy

    end

    private
      def photostream_photo_params
        params.require(:photostream_photo).permit(:photo_id, :photostream_id)
      end
  end
end
