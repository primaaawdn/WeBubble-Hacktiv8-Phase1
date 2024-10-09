# **WeBubble Application**

## **Overview**

WeBubble is a social platform where users can create accounts, make posts, follow idol and manager profiles, and categorize content using tags. The app is built with **Express.js**, making it easy to scale and manage.

---

## **Routes for Accessing the Web Application**

Here are the available routes in the **WeBubble** application, categorized for easy understanding:

### **General**

- **`GET /`**: Landing Page / Home

### **User Account Management**

- **Create an Account:**
  - **`GET /users/create`**: Show the create account page
  - **`POST /users/create`**: Create a new account

- **Update Account:**
  - **`GET /users/:UserId/edit`**: Show the update profile page
  - **`POST /users/:UserId/edit`**: Update profile information

- **Delete Account:**
  - **`GET /users/:UserId/delete`**: Delete a user account

### **Profile Management**

- **Create Profile Post:**
  - **`GET /users/:UserId/profile/create`**: Show the create new post form for a specific user
  - **`POST /users/:UserId/profile/create`**: Create a new post for a specific user

- **Update Profile:**
  - **`GET /users/:UserId/profile/:ProfileId/edit`**: Show the update profile page
  - **`POST /users/:UserId/profile/:ProfileId/edit`**: Update profile information

- **View Profile:**
  - **`GET /users/:UserId/profile/:ProfileId`**: Retrieve a specific user profile

### **Idol and Manager Profiles**

- **Retrieve Idol Profiles:**
  - **`GET /users/idols`**: Retrieve all idol profiles

- **Retrieve Manager Profiles:**
  - **`GET /users/managers`**: Retrieve all manager profiles

### **Post Management**

- **Retrieve All Posts:**
  - **`GET /posts`**: Retrieve all posts

- **Create a New Post:**
  - **`GET /users/:UserId/posts/create`**: Show the create new post form for a specific user
  - **`POST /users/:UserId/posts/create`**: Create a new post for a specific user

- **Retrieve All Posts by User:**
  - **`GET /users/:UserId/posts`**: Retrieve all posts created by a specific user

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