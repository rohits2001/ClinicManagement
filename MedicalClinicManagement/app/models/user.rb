class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable

  validates :name, presence: true
  validates :role, presence: true, inclusion: { in: %w[receptionist doctor] }
  
  def receptionist?
    role == 'receptionist'
  end
  
  def doctor?
    role == 'doctor'
  end
end