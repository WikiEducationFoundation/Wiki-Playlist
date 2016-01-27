Rails.application.routes.draw do
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  # match "/404" => "errors#error404", via: [ :get, :post, :patch, :delete ]
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks"}
  
  get "/oauth-success" => "auth#auth_success"
  get "/auth/user_status" => "application#user_status"
  get "/csrf-token" => "application#csrf_meta"

  
  root 'page#index'
  resources :playlists
  get "playlist/render_status/:id" => "playlists#render_status"
  get "playlist", to: "page#playlist"
  get "playlist/article/search", to: "page#playlist"
  get "/playlist/login", to: "page#playlist"
  get "/:id" => 'playlists#show'
end
