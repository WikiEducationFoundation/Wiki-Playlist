Rails.application.routes.draw do
  devise_for :users
  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  root 'page#index'
  get "playlist(/*all)", to: "page#index"
end
