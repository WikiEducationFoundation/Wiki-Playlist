class PageController < ApplicationController
  def auth_success
    render 'auth_success', :layout => false
  end

  def account
    respond_to do |format|
      format.js {}
    end
  end
end
