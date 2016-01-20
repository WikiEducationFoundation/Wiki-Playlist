require 'spec_helper'
require 'rails_helper'

module ControllerMacros

  def login_admin
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:admin]
      sign_in FactoryGirl.create(:admin) # Using factory girl as an example
    end
  end

  def login_user
    before(:each) do
      @request.env["devise.mapping"] = Devise.mappings[:user]
      user = FactoryGirl.create(:user)
      sign_in user
    end
  end

  def login_mediawiki_user
    before(:each) do
      valid_mediawiki_login_setup
      @request.env['omniauth.auth'] = OmniAuth.config.mock_auth[:mediawiki]
      user = User.from_omniauth(request.env['omniauth.auth'])
      sign_in user
    end
  end
end