class AddAttributesToUserModel < ActiveRecord::Migration
  def change
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Figaro.env.twitter_key
      config.consumer_secret     = Figaro.env.twitter_secret
      config.access_token        = Figaro.env.twitter_access_key
      config.access_token_secret = Figaro.env.twitter_access_secret
    end
  
    User.where(:provider => 'twitter').each do |user|
      twitter_user = client.get(user.username)
      user.avatar = twitter_user.profile_image_uri_https.to_s
      user.verified = twitter_user.verified?
      user.save!
    end
  end
end
