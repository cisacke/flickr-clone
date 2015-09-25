json.array!(@users) do |user|
  json.extract! user, :f_name, :l_name, :id
  json.avatar asset_path(user.avatar.url(:original))
end
