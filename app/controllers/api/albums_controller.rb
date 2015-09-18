module Api
  class AlbumsController < ApiController
    def create
      @album = currently_signed_in.albums.new(album_params)

      if @album.save
        render json: @album
      else
        render json: "unsuccessful"
      end

    end

    private

      def album_params
        params.require(:album).permit(:title, :description)
      end
  end
end
