class Playlist < ActiveRecord::Base
  has_many :articles, dependent: :destroy
  accepts_nested_attributes_for :articles
  belongs_to :user
end
