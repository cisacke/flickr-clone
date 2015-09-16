module Api
  class PhotostreamsController < ApiController
    def show
      @photostream = currently_signed_in.photostream

      render :show
    end
  end
end
