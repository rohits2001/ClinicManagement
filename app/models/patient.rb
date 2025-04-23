class Patient < ApplicationRecord
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone, presence: true
  validates :date_of_birth, presence: true
  validates :address, presence: true
  validates :gender, presence: true, inclusion: { in: %w[male female other] }
  
  def full_name
    "#{first_name} #{last_name}"
  end
  
  def age
    ((Time.current - date_of_birth.to_time) / 1.year.seconds).floor
  end
end