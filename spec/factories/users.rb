# t.string   "email",                  default: "", null: false
# t.string   "encrypted_password",     default: "", null: false
# t.string   "reset_password_token"
# t.datetime "reset_password_sent_at"
# t.datetime "remember_created_at"
# t.integer  "sign_in_count",          default: 0,  null: false
# t.datetime "current_sign_in_at"
# t.datetime "last_sign_in_at"
# t.inet     "current_sign_in_ip"
# t.inet     "last_sign_in_ip"
# t.datetime "created_at",                          null: false
# t.datetime "updated_at",                          null: false
# t.string   "provider"
# t.string   "uid"

FactoryGirl.define do

  factory :user, class: User do
    username: 'joe'
    password Devise.friendly_token[0,20]
  end

  factory :user_gmail, class: User do
    email 'joe@gmail.com'
    password Devise.friendly_token[0,20]
  end

  factory :admin, class: User do
    email Faker::Internet.email
    password Devise.friendly_token[0,20]
    admin true
  end

end