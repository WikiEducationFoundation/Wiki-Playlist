class ArticlesController < ApplicationController
  def create
    puts 'Article create'
    @article = Article.new(article_params)
    @article.user_id = current_user.id
    binding.pry
    
    respond_to do |format|
      if @article.save
        params['articles'].each do |article|
          @article.articles.create(article)
        end
        # format.html { redirect_to @article, notice: 'article was successfully created.' }
        format.json { render :show, status: :created, location: @article }
      else
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    def article_params
      # binding.pry
      params.require(:article).permit(:title, :url, :description, :pageId, :image)
    end
end
