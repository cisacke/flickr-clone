json.extract!(@user, :f_name, :l_name, :email)
json.photostream do
  json.extract!(@user.photostream)
end
