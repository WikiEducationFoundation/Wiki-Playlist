Rails.application.routes.draw do
  
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks"}
  get "/current-user" => "application#get_current_user"
  get "/oauth-success" => "auth#success"
  get "/auth/logged_in" => "auth#logged_in"
  get "/auth/logged_out" => "auth#logged_out"

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'page#index'
  get "playlist(/*all)", to: redirect('/')
end
