# Wikipedia Playlist

## Project Setup

1. Install Ruby 2.2.0 using [RVM](https://rvm.io/rvm/install)
2. Install [Node](https://nodejs.org/en/)
3. Install [Postgres App](http://postgresapp.com/)
4. Clone this repository and cd into directory
5. Run `bundle install`
6. Run `npm install`
7. Setup Local Postgres Database
  1. In a new terminal window type `psql` to start the Postgres cli
  2. Enter `CREATE USER craig WITH PASSWORD 'Password';`
  3. Enter `CREATE DATABASE wiki_playlist_development;`
  4. Enter `GRANT ALL PRIVILEGES ON DATABASE wiki_playlist_development to craig;` (replace craig with username)

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