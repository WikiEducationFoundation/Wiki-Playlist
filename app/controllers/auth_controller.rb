class AuthController < ApplicationController

  def status
    render :json => {'logged_in' => user_signed_in?}
  end

  def success
    render 'auth_success', :layout => false
  end

  def logged_in
    respond_to do |format|
      format.js {}
    end
  end

  def logged_out
    respond_to do |format|
      format.js {}
    end
  end

  def failure
    redirect_to root_path
  end

end