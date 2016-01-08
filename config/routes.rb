Rails.application.routes.draw do
  devise_for :users, :controllers => { :omniauth_callbacks => "callbacks"}
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'page#index'
  get "playlist(/*all)", to: redirect('/')
end
