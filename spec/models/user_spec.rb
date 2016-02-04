require 'rails_helper'
require 'factory_girl_rails'

describe User do
  describe 'Normal user creation' do

    it "should create a new User that isn't an admin" do
      user = build(:user)
      expect(user.admin?).to be false
    end

  end

  describe 'Admin user creation' do
    it 'should create an admin user' do
      user = build(:admin)
      expect(user.admin?).to be true
    end
  end

end