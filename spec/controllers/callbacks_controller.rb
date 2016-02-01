require 'spec_helper'
require 'rails_helper'

describe CallbacksController do

  before do 
    request.env["devise.mapping"] = Devise.mappings[:user] # If using Devise
    request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:twitter] 
  end

  describe "#twitter" do
    # twitter
  end

end