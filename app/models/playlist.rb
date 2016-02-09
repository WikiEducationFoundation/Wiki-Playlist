class Playlist < ActiveRecord::Base
  belongs_to :user
  has_many :articles, dependent: :destroy
  extend FriendlyId
  friendly_id :title, use: :slugged
  
  accepts_nested_attributes_for :articles
  has_attached_file :share_image, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment :share_image, content_type: { content_type: ["image/jpg", "image/jpeg", "image/png", "image/gif"] }

  scope :featured, -> { where(featured: true)}
  scope :needs_image_regeneration, -> { where(needs_image_regeneration: true)}
end
