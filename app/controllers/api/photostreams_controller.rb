module Api
  class PhotostreamsController < ApiController
    def show
      # fail
      @photostream = Photostream.find(params[:id])

      render :show
    end
  end
end
