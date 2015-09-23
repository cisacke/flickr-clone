module Api
  class PhotosController < ApiController
    def show
      @photo = Photo.find(params[:id])
      @current_user = currently_signed_in
      render :show
    end

    def create
      photo = currently_signed_in.photos.create!(photo_params)
      render json: photo
    end

    def index
      @photos = currently_signed_in.photos
      render :index
    end

    def destroy
      @photo = Photo.find(params[:id])
      @photo.destroy
      render json: @photo
    end

    def update
      @photo = Photo.find(params[:id])
      if @photo.update(photo_params)
        render json: @photo
      else
        render :json => "error"
      end
    end

    def new_favorite
      @favorite_photo = FavoritesPhoto.new({ photo_id: params[:photo_id],
                                             favorite_id: params[:favorite_id]})
      if @favorite_photo.save
        render json: @favorite_photo
      else
        render :json => "error"
      end
    end

    def delete_favorite
      @favorite_photo = FavoritesPhoto.where({ photo_id: params[:photo_id],
                                             favorite_id: params[:favorite_id]})
      @favorite_photo[0].destroy
      render json: @favorite_photo
    end

    private

      def photo_params
        params.require(:photo).permit(:title, :description, :image)
      end
  end
end
