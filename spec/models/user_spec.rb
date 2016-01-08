require 'rails_helper'

describe User do
  describe 'Normal user creation' do
    it 'should create User objects' do
      user = build(:user)
      expect(user.admin?).to be false
    end
  end

  describe 'Admin user creation' do
    it 'should create User objects' do
      user = build(:admin)
      expect(user.admin?).to be true
    end
  end

end