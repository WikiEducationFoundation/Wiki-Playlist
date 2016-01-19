class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.belongs_to :playlist
      t.integer :pageId
      t.string :title
      t.string :url
      t.string :description
      t.string :image
      t.timestamps null: false
    end
  end
end
