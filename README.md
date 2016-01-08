# Wikipedia Playlist

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

## Deploy to Heroku

1. Initialize a git repo in the current directory and commit all files.
2. Install the [heroku toolbelt](https://toolbelt.heroku.com/)
3. `heroku create`
4. `git push heroku master`

[See Heroku's guide for more information](https://devcenter.heroku.com/articles/getting-started-with-rails4)


## References

- [Rails Admin](https://github.com/sferik/rails_admin)
- [Devise](https://github.com/plataformatec/devise)
- [ReactWebpackRails](https://github.com/netguru/react_webpack_rails)
- [Media Wiki API Gem](https://github.com/wikimedia/mediawiki-ruby-api)
