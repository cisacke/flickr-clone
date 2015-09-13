# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
f_name          | string    | not null
l_name          | string    | not null
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique

## albums
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user)
title       | string    | not null
description | text      |

## photos
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
album_id    | integer   | not null, foreign key (references album)
title       | string    | not null
description | text      |

## followings
column name      | data type | details
-----------------|-----------|-----------------------
id               | integer   | not null, primary key
follower_id      | integer   | not null, foreign key (references user)
followed_user_id | integer   | not null, foreign key (references user)

## favorites
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references user)
photo_id    | integer   | not null, foreign key (references photo)

## comments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
photo_id        | integer   | not null, foreign key (references photo)
author_id       | integer   | not null, foreign key (references author)
body            | string    | not null
