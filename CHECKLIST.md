## **Checklist:**

### **Progress**

- [x] ERD
- [x] Model & Migration
- [x] Tambahan Migration
- [x] Seeding
- [x] Routes
- [x] Auth
- [x] MVC
- [x] Fitur search
- [x] Static method di model
- [ ] Validasi & custom error handling
- [x] Hooks
- [x] Helper
- [x] Package

---

### **Routes**

#### **General**

- [x] `GET /`: Landing Page / Home
- [x] `GET /login`: Login page.
- [x] `POST /login`: This route serves the login page where users can enter their email and password.
- [x] `GET /logout`: Logout functionality.

#### **User Account Management**

- [x] `GET /users/create`: Register page.
- [x] `POST /users/create`: Endpoint to create a new account.

#### **Profile Management**

- [x] `GET /users/:UserId/profile/create`: Page to display form to create a new profile.
- [x] `POST /users/:UserId/profile/create`: Endpoint to create a new post for a user.
- [x] `GET /users/:UserId/profile/:profileId`: Endpoint to retrieve a specific user profile.

#### **Idol and Manager Profiles**

- [x] `GET /users/idols`: Retrieve all idol profiles.
- [x] `GET /users/managers`: Retrieve all manager profiles.

#### **Post Management**

- [x] `GET /posts`: Retrieve all posts.
- [x] `GET /users/:UserId/posts/create`: Show the create new post form for a specific user
- [x] `POST /users/:UserId/posts/create`: Create a new post for a specific user
- [x] `GET /users/:UserId/posts`: Retrieve all posts created by a specific user
- [x] `GET /posts/:PostId`: Retrieve a specific post by ID
- [x] `GET /posts/:PostId/edit`: Show the update post form
- [x] `POST /posts/:PostId/edit`: Update the post content
- [x] `GET /posts/:PostId/delete`: Delete a post

#### **Tag Management**

- [ ] `GET /tags`: Show all tags.
- [ ] `GET /posts/tags/:TagId`: Retrieve posts filtered by a tag.
- [ ] `GET /tags/:TagId/delete`: Endpoint to delete a tag.
