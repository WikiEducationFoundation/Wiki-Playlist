class AuthController < ApplicationController
  
  def success
    render 'auth_success', :layout => false
  end

  def failure
    redirect_to root_path
  end

end