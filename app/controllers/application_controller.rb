class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def currently_signed_in
    return nil unless session[:session_token]
    @currently_signed_in ||= User.find_by(session_token: session[:session_token])
  end

  def sign_in!(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end

  def sign_out!
    currently_signed_in.try(:reset_session_token!)
    session[:session_token] = nil
  end

  def is_signed_in?
    !!currently_signed_in
  end

  def require_not_signed_in

  end

  def require_signed_in!
    redirect_to new_session_url unless is_signed_in?
  end
end
