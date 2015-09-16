json.extract!(@photostream, :title, :user_id)
json.photos do
  json.array!(@photostream.photos) do |photo|
    json.extract! photo, :id, :title, :description, :album_id, :image
  end
end

json.user do
  json.extract!(@photostream.user, :email, :f_name, :l_name)
end
