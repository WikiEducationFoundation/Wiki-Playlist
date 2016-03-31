#!/usr/bin/env puma
# This should be copied to shared/puma.rb for capistrano puma commands to work

directory '/var/www/Wiki-Playlist/current'
rackup "/var/www/Wiki-Playlist/current/config.ru"
environment 'production'

pidfile "/var/www/Wiki-Playlist/shared/tmp/pids/puma.pid"
state_path "/var/www/Wiki-Playlist/shared/tmp/pids/puma.state"
stdout_redirect '/var/www/Wiki-Playlist/shared/log/puma_access.log', '/var/www/Wiki-Playlist/shared/log/puma_error.log', true


threads 2,4

bind 'unix:///var/www/Wiki-Playlist/shared/tmp/sockets/puma.sock'

workers 2



preload_app!


on_restart do
  puts 'Refreshing Gemfile'
  ENV["BUNDLE_GEMFILE"] = "/var/www/Wiki-Playlist/current/Gemfile"
end


on_worker_boot do
  ActiveSupport.on_load(:active_record) do
    ActiveRecord::Base.establish_connection
    Que.mode = :async
  end
end
