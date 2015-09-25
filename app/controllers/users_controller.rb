class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      Photostream.create!(user_id: @user.id)
      Favorite.create!(user_id: @user.id)
      sign_in!(@user)
      redirect_to root_url
    else
      render :new
    end
  end

  def current_user
    @user = currently_signed_in
    @current_user = currently_signed_in

    if @user
      render :show
    else
      render :json => ""
    end
  end

  def index
    @users = User.all
    render :index
  end

  def show
    @user = User.find(params[:id])
    @current_user = currently_signed_in
    render :show
  end

  def update
    @user = currently_signed_in
    if @user.update(user_params)
      render json: @user
    else
      render :json => "error"
    end
  end

  def new_follow
    @following = Following.new(follower_id: params[:follower_id],
                               followed_id: params[:followed_id])
    if @following.save
      render json: @following
    else
      render :json => "error"
    end
  end

  def delete_follow
    @following = Following.where(follower_id: params[:follower_id],
                                 followed_id: params[:followed_id])
    @following[0].destroy
    render json: @following
  end

  private

    def user_params
      params.require(:user).permit(:f_name, :l_name, :email, :password, :avatar, :cover)
    end

end
