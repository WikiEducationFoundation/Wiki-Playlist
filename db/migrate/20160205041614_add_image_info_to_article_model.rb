class AddImageInfoToArticleModel < ActiveRecord::Migration
  def change
    add_column :articles, :image_license, :string
    add_column :articles, :image_license_url, :string
  end
end
