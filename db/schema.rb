# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160201211306) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "articles", force: :cascade do |t|
    t.integer  "playlist_id"
    t.integer  "pageId"
    t.string   "title"
    t.string   "url"
    t.string   "description"
    t.string   "image"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "position"
    t.string   "commons_url"
  end

  add_index "articles", ["playlist_id"], name: "index_articles_on_playlist_id", using: :btree

  create_table "playlists", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "title"
    t.string   "caption"
    t.boolean  "featured",                 default: false
    t.boolean  "share_image_rendered",     default: false
    t.string   "share_image"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.string   "share_image_file_name"
    t.string   "share_image_content_type"
    t.integer  "share_image_file_size"
    t.datetime "share_image_updated_at"
    t.string   "slug"
    t.string   "color"
  end

  add_index "playlists", ["slug"], name: "index_playlists_on_slug", unique: true, using: :btree
  add_index "playlists", ["user_id"], name: "index_playlists_on_user_id", using: :btree

  create_table "que_jobs", id: false, force: :cascade do |t|
    t.integer  "priority",    limit: 2, default: 100,                                        null: false
    t.datetime "run_at",                default: "now()",                                    null: false
    t.integer  "job_id",      limit: 8, default: "nextval('que_jobs_job_id_seq'::regclass)", null: false
    t.text     "job_class",                                                                  null: false
    t.json     "args",                  default: [],                                         null: false
    t.integer  "error_count",           default: 0,                                          null: false
    t.text     "last_error"
    t.text     "queue",                 default: "",                                         null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: ""
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.string   "provider"
    t.string   "uid"
    t.boolean  "admin",                  default: false
    t.string   "username"
  end

  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
