class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, 
         :omniauthable, omniauth_providers: [:mediawiki, :mediawiki_signup, :twitter, :facebook]

  def self.from_omniauth(auth)
    where( email: auth.provider, uid: auth.uid).first_or_create do |user|
      email = auth.info.email
      if email.nil?
        email = auth.extra.raw_info.email
      end

      user.provider = auth.provider
      user.uid = auth.uid
      user.email = email
      user.password = Devise.friendly_token[0,20]
    end
  end

end
