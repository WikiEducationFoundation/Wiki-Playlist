require 'rails_helper'
require 'factory_girl_rails'

describe User do
  describe 'Normal user creation' do

    it "should create a new User that isn't an admin" do
      user = build(:user)
      expect(user.admin?).to be false
    end

    it 'should create a username based on the email (if one exists)' do
      user = build(:user)
      user.save
      expect(user.username).to eq('joe')
    end

    it 'should validate the uniqueness of the username' do
      user = FactoryGirl.create(:user)
      user.save!
      expect(user.username).to eq('joe')
      user2 = build(:user)
      expect{ user2.save! }.to raise_error(ActiveRecord::RecordInvalid)
    end

  end

  describe 'Admin user creation' do
    it 'should create an admin user' do
      user = build(:admin)
      expect(user.admin?).to be true
    end
  end

end