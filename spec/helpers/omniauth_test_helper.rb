module OmniAuthTestHelpers
  def valid_mediawiki_login_setup
    if Rails.env.test?
      OmniAuth.config.test_mode = true;
      mediawiki_omniauth_hash = {
        'provider' => 'mediawiki',
        'uid' => '45057470',
        'info' => {
          'name' => 'Jmhudak'
        },
        'extra' => {
          'raw_info': {}
        }
      }
      OmniAuth.config.add_mock(:mediawiki, mediawiki_omniauth_hash)
    end
  end
end