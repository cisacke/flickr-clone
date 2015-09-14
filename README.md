# Flickr Clone

[Heroku link][heroku]

[heroku]: http://github.com/cisacke/flickr-clone-plan

## Minimum Viable Product
This Flickr clone is built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [ ] Create an account
- [ ] Log in
- [ ] Create albums
- [ ] Upload photos to an album
- [ ] Upload photo to photostream
- [ ] View photos in a photostream
- [ ] View photos in an album
- [ ] Follow other users
- [ ] 'Favorite' a photo and comment on it
- [ ] View favorited photos
- [ ] Search for users
- [ ] Search for photos by keyword

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Photo Upload, Push to Heroku (~2 days)
First, I will implement user authentication. Users will be able to sign up and
create a new session.

Users will be able to upload pictures for four purposes:
1. Profile picture.
2. Cover photo.
3. Single photostream photo.
4. Multiple album photos.

App will be pushed to Heroku by end of day.

[Details][phase-one]

### Phase 2: Albums (~2 days)
Users can create albums. All users have two default albums - 'favorites' and
'photostream'. Single photos uploaded to the photostream go in the latter.
Multiple photo uploads must be assigned to an album.

[Details][phase-two]

### Phase 3: View Pages (~2 days)
Users can view the photos in their photostream, albums, and favorites. Users can
view other user's photostream, albums, and favorites. Selecting a single photo
takes a user to the photo show page.

[Details][phase-three]

### Phase 4: Following Users, Favoriting Photos, Photo Comments (~2 days)
Users can follow and unfollow other users. Users can 'favorite' photos.
Favorited photos will be added to the 'favorites' album. Users can comment on
photos. Comments will appear on the photo show page.

[Details][phase-four]

### Phase 5: Search (~2 days)
Users can search for people and photos by keyword.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Add a location to photos
- [ ] Add a map page which shows photos by location
- [ ] Search for photos by location
- [ ] Tag photos
- [ ] Search for photos by tag
- [ ] Advanced photo editing - rotation, cropping etc.
- [ ] Pagination/ infinite scrolling


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
