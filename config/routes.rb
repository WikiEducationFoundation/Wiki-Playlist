Rails.application.routes.draw do
  
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks"}
  
  get "/oauth-success" => "auth#auth_success"
  get "/auth/user_status" => "application#user_status"
  get "/csrf-token" => "application#csrf_meta"

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  root 'page#index'
  get '/styleguide' => 'page#styleguide'
  resources :playlists
  get '/playlist/preview/:id' => "playlists#preview"
  get "playlist/render_status/:id" => "playlists#render_status"
  get "playlist/render_share_image/:id" => "playlists#render_share_image"
  get "playlist(/*all)", to: redirect('/')
end
