class AddCommonsUrlToArticleModel < ActiveRecord::Migration
  def change
    add_column :articles, :commons_url, :string
  end
end
