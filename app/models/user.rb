class User < ActiveRecord::Base

  validates :f_name, :l_name, :email, :session_token, :password_digest, presence: true
  validates :session_token, :email, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }

  has_many :albums, dependent: :destroy
  has_many :comments,
    foreign_key: :author_id,
    dependent: :destroy
  has_one :photostream, dependent: :destroy
  has_one :favorite, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_many :follower_users,
    class_name: "Following",
    foreign_key: :followed_id

  has_many :followed_users,
    class_name: "Following",
    foreign_key: :follower_id

  has_many :followers, through: :follower_users, source: :follower
  has_many :follows, through: :followed_users, source: :followed

  has_attached_file :cover, default_url: "missing.png"
  validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/

  has_attached_file :avatar, default_url: "missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  attr_reader :password
  after_initialize :ensure_session_token

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def self.find_or_create_by_auth_hash(auth_hash)
    user = User.find_by(
      provider: auth_hash[:provider],
      uid: auth_hash[:uid]
    )

    unless user
      user = User.create!(
        provider: auth_hash[:provider],
        uid: auth_hash[:uid],
        f_name: auth_hash[:info][:name].split.first,
        l_name: auth_hash[:info][:name].split.last,
        email: auth_hash[:info][:name],
        password: SecureRandom::urlsafe_base64)
        Photostream.create!(user_id: user.id)
        Favorite.create!(user_id: user.id)
    end

    user
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
