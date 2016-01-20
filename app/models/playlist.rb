class Playlist < ActiveRecord::Base
  belongs_to :user
  has_many :articles, dependent: :destroy
  accepts_nested_attributes_for :articles
end
