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

ActiveRecord::Schema.define(version: 20150919161513) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "album_photos", force: :cascade do |t|
    t.integer  "album_id",   null: false
    t.integer  "photo_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "album_photos", ["album_id"], name: "index_album_photos_on_album_id", using: :btree
  add_index "album_photos", ["photo_id"], name: "index_album_photos_on_photo_id", using: :btree

  create_table "albums", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.string   "title",       null: false
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "albums", ["user_id"], name: "index_albums_on_user_id", using: :btree

  create_table "comments", force: :cascade do |t|
    t.integer  "photo_id",   null: false
    t.integer  "author_id",  null: false
    t.string   "body",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree
  add_index "comments", ["photo_id"], name: "index_comments_on_photo_id", using: :btree

  create_table "favorites", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "favorites", ["user_id"], name: "index_favorites_on_user_id", using: :btree

  create_table "favorites_photos", force: :cascade do |t|
    t.integer  "favorite_id", null: false
    t.integer  "photo_id",    null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "favorites_photos", ["favorite_id"], name: "index_favorites_photos_on_favorite_id", using: :btree
  add_index "favorites_photos", ["photo_id"], name: "index_favorites_photos_on_photo_id", using: :btree

  create_table "photos", force: :cascade do |t|
    t.string   "title",              null: false
    t.string   "description"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.integer  "user_id"
  end

  add_index "photos", ["user_id"], name: "index_photos_on_user_id", using: :btree

  create_table "photostream_photos", force: :cascade do |t|
    t.integer "photostream_id", null: false
    t.integer "photo_id",       null: false
  end

  add_index "photostream_photos", ["photo_id"], name: "index_photostream_photos_on_photo_id", using: :btree
  add_index "photostream_photos", ["photostream_id"], name: "index_photostream_photos_on_photostream_id", using: :btree

  create_table "photostreams", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "photostreams", ["user_id"], name: "index_photostreams_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "f_name",          null: false
    t.string   "l_name",          null: false
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree

end
