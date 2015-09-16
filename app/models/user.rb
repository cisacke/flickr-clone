class User < ActiveRecord::Base

  validates :f_name, :l_name, :email, :session_token, :password_digest, presence: true
  validates :session_token, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :albums, dependent: :destroy
  has_one :photostream, dependent: :destroy
  has_one :favorite, dependent: :destroy

  attr_reader :password
  after_initialize :ensure_session_token

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email);
    return nil unless user
    user.is_password?(password) ? user : nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    password_digest.is_password?(password)
  end

  def password_digest
    BCrypt::Password.new(super)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end

  private

    def ensure_session_token
      self.session_token ||= User.generate_session_token
    end
end
