require 'rails_helper'

RSpec.describe Playlist, type: :model do
  describe 'Create' do
    it { expect(build(:playlist)).to have_many(:articles) }
  end
end
