# **WeBubble Application**

## **Overview**

WeBubble is a social platform where users can create accounts, make posts, follow idol and manager profiles, and categorize content using tags. The app is built with **Express.js**, making it easy to scale and manage.

---

## **Routes for Accessing the Web Application**

Here are the available routes in the **WeBubble** application, categorized for easy understanding:

### **General**

- **`GET /`**: Landing Page / Home
- **`GET /login`**: This route serves the login page where users can enter their email and password.
- **`POST /login`**: This route serves the login page where users can enter their email and password.
- **`GET /logout`**: Logout functionality.

### **User Account Management**

- **Create an Account:**

  - **`GET /users/create`**: Show the create account page
  - **`POST /users/create`**: Create a new account

### **Profile Management**

- **Create Profile Post:**

  - **`GET /users/:UserId/profile/create`**: Show the create new post form for a specific user
  - **`POST /users/:UserId/profile/create`**: Create a new post for a specific user

- **View Profile:**
  - **`GET /users/:UserId/profile/:ProfileId`**: Retrieve a specific user profile

### **Post Management**

- **Retrieve All Posts:**

  - **`GET /posts`**: Retrieve all posts

- **Create a New Post:**

  - **`GET /users/:UserId/posts/create`**: Show the create new post form for a specific user
  - **`POST /users/:UserId/posts/create`**: Create a new post for a specific user

- **Retrieve a Specific Post:**

  - **`GET /posts/:PostId`**: Retrieve a specific post by ID

- **Update Post:**

  - **`GET /posts/:PostId/edit`**: Show the update post form
  - **`POST /posts/:PostId/edit`**: Update the post content

- **Delete Post:**
  - **`GET /posts/:PostId/delete`**: Delete a post

### **Tag Management**

- **Show Tags:**

  - **`GET /tags`**: Show all tags

- **Filter Posts by Tags:**

  - **`GET /posts/tags/:TagId`**: Retrieve all posts filtered by a specific tag

- **Delete Tag:**
  - **`GET /tags/:TagId/delete`**: Delete a tag
