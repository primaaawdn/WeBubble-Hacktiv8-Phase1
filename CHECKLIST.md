## **Checklist:**

### **Progress**
- [ ] Migration
- [ ] Seeding
- [ ] Routes
- [ ] Auth
- [ ] MVC
- [ ] Package

---
### **Routes**
#### **General**
- [ ] `GET /`: Set up the landing page for the application.

#### **User Account Management**
- [ ] `GET /users/create`: Page to display the account creation form.
- [ ] `POST /users/create`: Endpoint to create a new account.
- [ ] `GET /users/:UserId/edit`: Page to show the user profile update form.
- [ ] `POST /users/:UserId/edit`: Endpoint to update user profile information.
- [ ] `GET /users/:UserId/delete`: Endpoint to delete a user account.

#### **Profile Management**
- [ ] `GET /users/:UserId/profile/create`: Page to display form to create a new profile post.
- [ ] `POST /users/:UserId/profile/create`: Endpoint to create a new post for a user.
- [ ] `GET /users/:UserId/profile/:profileId`: Endpoint to retrieve a specific user profile.
- [ ] `GET /users/:UserId/profile/:profileId/edit`: Page to display the form to update a profile.
- [ ] `POST /users/:UserId/profile/:profileId/edit`: Endpoint to update the profile content.

#### **Idol and Manager Profiles**
- [ ] `GET /users/idols`: Retrieve all idol profiles.
- [ ] `GET /users/managers`: Retrieve all manager profiles.

#### **Post Management**
- [ ] `GET /posts`: Retrieve all posts.
- [ ] `GET /posts/create`: Page to display form to create a new post.
- [ ] `POST /posts/create`: Endpoint to create a new post.
- [ ] `GET /posts/:PostId`: Retrieve a specific post by ID.
- [ ] `GET /posts/:PostId/edit`: Page to display form to edit a post.
- [ ] `POST /posts/:PostId/edit`: Endpoint to update post content.
- [ ] `GET /posts/:PostId/delete`: Endpoint to delete a post.

#### **Tag Management**
- [ ] `GET /tags`: Show all tags.
- [ ] `GET /posts/tags/:TagId`: Retrieve posts filtered by a tag.
- [ ] `GET /tags/:TagId/delete`: Endpoint to delete a tag.