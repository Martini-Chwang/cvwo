Rails.application.routes.draw do
  get 'pages/index'
  root 'pages#index'

  namespace :api do
    namespace :v1 do
      resources :tasks
    end
  end

  get '*path', to: 'pages#index', via: :all
end
