Rails.application.routes.draw do
  
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks"}
  
  get "/oauth-success" => "auth#success"
  get "/auth/user" => "application#get_current_user"
  get "/auth/status" => "auth#status"
  get "/auth/login" => "auth#login"
  get "/auth/logged_in" => "auth#logged_in"
  get "/auth/logged_out" => "auth#logged_out"
  get "/csrf-token" => "application#csrf_meta"

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'page#index'
  resources :playlists
  get "playlist(/*all)", to: redirect('/')
end
