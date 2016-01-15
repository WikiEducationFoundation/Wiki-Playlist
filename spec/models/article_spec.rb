require 'rails_helper'

RSpec.describe Article, type: :model do
  it { should belong_to :playlist }
end
