class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  require Rails.root.join("lib/custom_public_exceptions")
  config.exceptions_app = CustomPublicExceptions.new(Rails.public_path)

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to main_app.root_path, :alert => exception.message
  end

  def csrf_meta
    respond_to do |format|
      format.json do
        render json: {
          param: request_forgery_protection_token,
          token: form_authenticity_token
        }
      end
    end
  end

  def user_status
    @user = current_user
    render :json => {
      'logged_in' => user_signed_in?,
      'user' => @user.as_json()
    }
  end

  def after_sign_in_path_for(resource)
    oauth_success_path
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:username, :email, :password, :password_confirmation, :remember_me, :uid, :provider) }
    devise_parameter_sanitizer.for(:sign_in) { |u| u.permit(:login, :username, :email, :password, :remember_me, :uid, :provider) }
    devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:username, :email, :password, :password_confirmation, :current_password, :uid, :provider) }
  end
end
