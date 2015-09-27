module Api
  class PhotostreamsController < ApiController
    def show
      @photos_in_photostream = User.find(params[:id]).photos_in_photostream
      render :show
    end
  end
end

#
