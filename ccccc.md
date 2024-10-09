### **Revised Routes for Post Management**


#### **Post Management**
- **Create a New Post:**
  - **`GET /users/:userId/posts/create`**: Show the create new post form for a specific user
  - **`POST /users/:userId/posts/create`**: Create a new post for a specific user

- **Retrieve All Posts:**
  - **`GET /posts`**: Retrieve all posts

- **Retrieve All Posts by User:**
  - **`GET /users/:userId/posts`**: Retrieve all posts created by a specific user

- **Retrieve a Specific Post:**
  - **`GET /posts/:postId`**: Retrieve a specific post by ID

- **Update Post:**
  - **`GET /posts/:postId/edit`**: Show the update post form
  - **`POST /posts/:postId/edit`**: Update the post content

- **Delete Post:**
  - **`GET /posts/:postId/delete`**: Delete a post

### **Updated Summary of Routes**
- **General**: Home page.
- **User Account Management**: Create, edit, delete user accounts.
- **Profile Management**: Create, edit, and view user profile posts.
- **Idol and Manager Profiles**: View profiles of idols and managers.
- **Post Management**: 
  - Create, edit, delete, and view posts.
  - View all posts by a specific user.
- **Tag Management**: View, filter, and delete tags.
