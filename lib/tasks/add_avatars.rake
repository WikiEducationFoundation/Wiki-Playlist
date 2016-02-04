namespace :users do
  desc "Add twitter image, verification, and "
  task :create_avatars => :environment do
    client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Figaro.env.twitter_key
      config.consumer_secret     = Figaro.env.twitter_secret
      config.access_token        = Figaro.env.twitter_access_key
      config.access_token_secret = Figaro.env.twitter_access_secret
    end
  
    User.where(:provider => 'twitter').each do |user|
      twitter_user = client.user(user.username)
      user.avatar = twitter_user.profile_image_uri_https.to_s
      user.verified = twitter_user.verified?
      user.name = twitter_user.name
      user.save!
    end
  end
end
