class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.belongs_to :playlist, index: true
      t.integer :pageId
      t.string :title
      t.string :url
      t.string :description
      t.string :image
      t.timestamps null: false
    end
  end
end
