## **Checklist:**

### **Progress**

- [ ] ERD
- [ ] Model & Migration
- [ ] Tambahan Migration
- [ ] Seeding
- [ ] Routes
- [ ] Auth
- [ ] MVC
- [ ] Fitur search
- [ ] Static method di model
- [ ] Validasi & custom error handling
- [ ] Hooks
- [ ] Helper
- [ ] Package

---

### **Routes**

#### **General**

- [ ] `GET /`: Landing Page / Home
- [ ] `GET /login`: Login page.
- [ ] `POST /login`: This route serves the login page where users can enter their email and password.
- [ ] `GET /logout`: Logout functionality.

#### **User Account Management**

- [ ] `GET /users/create`: Register page.
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
- [ ] `GET /users/:UserId/posts/create`: Show the create new post form for a specific user
- [ ] `POST /users/:UserId/posts/create`: Create a new post for a specific user
- [ ] `GET /users/:UserId/posts`: Retrieve all posts created by a specific user
- [ ] `GET /posts/:PostId`: Retrieve a specific post by ID
- [ ] `GET /posts/:PostId/edit`: Show the update post form
- [ ] `POST /posts/:PostId/edit`: Update the post content
- [ ] `GET /posts/:PostId/delete`: Delete a post

#### **Tag Management**

- [ ] `GET /tags`: Show all tags.
- [ ] `GET /posts/tags/:TagId`: Retrieve posts filtered by a tag.
- [ ] `GET /tags/:TagId/delete`: Endpoint to delete a tag.
