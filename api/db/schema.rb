# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_05_02_203009) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "blacklisted_tokens", force: :cascade do |t|
    t.string "token"
    t.datetime "expires_at"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_blacklisted_tokens_on_user_id"
  end

  create_table "comments", force: :cascade do |t|
    t.bigint "workout_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "text"
    t.index ["user_id"], name: "index_comments_on_user_id"
    t.index ["workout_id"], name: "index_comments_on_workout_id"
  end

  create_table "competitions", force: :cascade do |t|
    t.string "name"
    t.string "identifier", null: false
    t.boolean "public"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "icon"
    t.datetime "start_date"
    t.datetime "end_date"
    t.boolean "active"
    t.index ["identifier"], name: "index_competitions_on_identifier", unique: true
  end

  create_table "friendships", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "friend_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["friend_id"], name: "index_friendships_on_friend_id"
    t.index ["user_id"], name: "index_friendships_on_user_id"
  end

  create_table "participants", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "competition_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username"
    t.integer "user_total_points"
    t.index ["competition_id"], name: "index_participants_on_competition_id"
    t.index ["user_id"], name: "index_participants_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.bigint "competition_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.index ["competition_id"], name: "index_posts_on_competition_id"
    t.index ["user_id"], name: "index_posts_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.string "avatar"
    t.string "gender"
    t.integer "year_of_birth"
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "user_type"
  end

  create_table "workouts", force: :cascade do |t|
    t.string "activity"
    t.integer "duration"
    t.string "intensity"
    t.datetime "date"
    t.integer "avg_HR"
    t.integer "calories"
    t.integer "points"
    t.integer "claps"
    t.bigint "user_id", null: false
    t.bigint "competition_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["competition_id"], name: "index_workouts_on_competition_id"
    t.index ["user_id"], name: "index_workouts_on_user_id"
  end

  add_foreign_key "blacklisted_tokens", "users"
  add_foreign_key "comments", "users"
  add_foreign_key "comments", "workouts"
  add_foreign_key "friendships", "users"
  add_foreign_key "friendships", "users", column: "friend_id"
  add_foreign_key "participants", "competitions"
  add_foreign_key "participants", "users"
  add_foreign_key "posts", "competitions"
  add_foreign_key "posts", "users"
  add_foreign_key "workouts", "competitions"
  add_foreign_key "workouts", "users"
end
