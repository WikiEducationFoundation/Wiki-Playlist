# Wiki Playlist

<img src='https://travis-ci.org/WikiEducationFoundation/Wiki-Playlist.svg?branch=master'/>

## Project Setup

1. Install Ruby 2.3.0 using [RVM](https://rvm.io/rvm/install)
2. Install [Node](https://nodejs.org/en/)
3. Install [Postgres App](http://postgresapp.com/) or [install PostgreSQL some other way](http://www.postgresql.org/download/)
4. Clone this repository and cd into directory
5. Run `bundle install`
6. Run `npm install`
7. Run `npm install babel -g`
8. Setup Local Postgres Database
  1. In a new terminal window type `psql` to start the Postgres cli
  2. Enter `CREATE USER craig WITH PASSWORD 'Password';`
  3. Enter `CREATE DATABASE wiki_playlist_development;`
  4. Enter `GRANT ALL PRIVILEGES ON DATABASE wiki_playlist_development to craig;` (replace craig with username)
  5. Repeat steps 3 and 4 for the test database `wiki_playlist_test`.
9. Setup OAuth
  1. Run `cp config/application.sample.yml config/application.yml`
  2. Update `config/application.yml` with your wikimedia oauth token and secret. [See here](https://github.com/WikiEducationFoundation/WikiEduDashboard/blob/master/docs/oauth.md) for details on obtaining these credentials.
  3. Update `config/application.yml` with Facebook and Twitter app key and secret values
    * See [devise wiki](https://github.com/plataformatec/devise/wiki) for troubleshooting.
  4. Run `cp config/database.sample.yml config/application.yml`
  5. Update `config/database.yml` with your postgres development username and password.
10. Run `rake db:migrate`
  1. If this fails because of postgres authentication, you may need to switch the local authentication method to `md5`. [See here.](http://stackoverflow.com/questions/17443379/psql-fatal-peer-authentication-failed-for-user-dev)
11. Kapow! You should be ready to roll


## Start the Rails App and Front End Build

`npm start` or `foreman start -f Procfile.dev`

## Deploy

* Deploy code via Capistrano: `cap production deploy`
* You can create an initial nginx configuration using capistrano-puma: `cap production puma:nginx_config`
* Copy `config/puma.rb` to `APP_DIRECTORY/shared/puma.rb` on the server.
* Start and stop puma with `cap production puma:stop` and `cap production puma:start`

## References

**Wiki API**

- [OpenSearch API](https://www.mediawiki.org/wiki/API:Opensearch)
- [Query API](https://www.mediawiki.org/wiki/API:Query)


**Gems**

- [Rails Admin](https://github.com/sferik/rails_admin)
- [Devise](https://github.com/plataformatec/devise)
- [ReactWebpackRails](https://github.com/netguru/react_webpack_rails)
- [Media Wiki API Gem](https://github.com/wikimedia/mediawiki-ruby-api)
- [Heroku, Ruby on Rails and PhantomJS](https://gist.github.com/edelpero/9257311)
TODO Add Que Gem

**Social Media**

- [Sharing Tumblr Photo Post](https://www.tumblr.com/examples/share/sharing-images.html)

**Frontend**

 - [React Icons](http://dmfrancisco.github.io/react-icons/)

**Travis CI**

- [Using PostgreSQL in Builds](https://docs.travis-ci.com/user/using-postgresql/#Using-PostgreSQL-in-your-Builds)

**Testing**

- [Rspec Model Testing Template](https://gist.github.com/kyletcarlson/6234923)


**Misc Heroku**

- [Upgrade Postgres](https://devcenter.heroku.com/articles/upgrading-heroku-postgres-databases)
