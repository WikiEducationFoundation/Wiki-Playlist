Rails.application.routes.draw do
  

  match "/404" => "errors#error404", via: [ :get, :post, :patch, :delete ]
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks"}
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  
  get "/oauth-success" => "auth#auth_success"
  get "/auth/user_status" => "application#user_status"
  get "/csrf-token" => "application#csrf_meta"



  put "playlists/feature/:id" => "playlists#feature"
  root 'page#index'
  resources :playlists, only: [:show, :create, :edit, :update, :destroy, :delete]
  get "all" => "playlists#index"
  get "playlists/render_status/:id" => "playlists#render_status"
  get "playlists/share-image/:id" => "playlists#share_image"
  get "playlists/share-html/:id" => "playlists#get_share_html"
  get "playlists", to: "page#playlist"
  get "playlist", to: redirect('/playlists')
  get "playlists/article/search", to: "page#playlist"
  get "/playlists/login", to: "page#playlist"
  get "/playlist/:slug" => 'playlists#show'
end
