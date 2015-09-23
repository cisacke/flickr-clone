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

    def index
      @albums = currently_signed_in.albums
      render json: @albums
    end

    def show
      @album = Album.find(params[:id])

      render :show
    end

    def destroy
      @album = Album.find(params[:id])
      @album.destroy
      render json: @album
    end

    def update
      @album = Album.find(params[:id])
      if @album.update(album_params)
        render json: @album
      else
        render :json => error
      end
    end

    private

      def album_params
        params.require(:album).permit(:title, :description, :image_url, photo_ids: [])
      end
  end
end
