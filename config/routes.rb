Rails.application.routes.draw do
  devise_for :users
  
  authenticated :user do
    root 'patients#index'
  end
  
  root 'pages#home'
  
  resources :patients
end