class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, 
         :omniauthable, omniauth_providers: [:mediawiki, :mediawiki_signup, :twitter, :facebook],
         :authentication_keys => [:login]
  
  # Virtual attribute for authenticating by either username or email
  # This is in addition to a real persisted field like 'username'
  attr_accessor :login

  validate :validate_username
  validates :username,
  :presence => true,
  :uniqueness => {
    :case_sensitive => false
  }

  def as_json(options={})
    super(:only => [:email, :username])
  end

  def self.from_omniauth(auth)
    where( provider: auth.provider, uid: auth.uid).first_or_create do |user|
      email = auth.info.email
      email = auth.extra.raw_info.email if email.nil?
      user.username = auth.info.nickname if auth.info.nickname?
      user.provider = auth.provider
      user.uid = auth.uid
      user.email = email
      user.password = Devise.friendly_token[0,20]
    end
  end

  def self.find_first_by_auth_conditions(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      if conditions[:username].nil?
        where(conditions).first
      else
        where(username: conditions[:username]).first
      end
    end
  end

  def validate_username
    if User.where(email: username).exists?
      errors.add(:username, :invalid)
    end
  end

  after_initialize :create_login, :if => :new_record?

  def create_login
    if self.username.blank? && self.email
      email = self.email.split(/@/)
      login_taken = User.where(:username => email[0]).first
      unless login_taken
        self.username = email[0]
      else    
        self.username = self.email
      end
    end
  end

end
