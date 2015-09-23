module Api
  class FavoritesController < ApiController
    def show
      @favorite = Favorite.find(params[:id])
      render :index
    end
  end
end
