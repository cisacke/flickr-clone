module Api
  class FavoritesController < ApiController
    def show
      @photos_in_favorites = User.find(params[:id]).photos_in_favorites
      render :index
    end
  end
end
