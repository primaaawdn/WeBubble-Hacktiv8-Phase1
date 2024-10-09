# WeBubble-Hacktiv8-Phase1
### README for **WeBubble** - Idol-Fan Social Media Platform

---

#### Project Description

**WeBubble** is a social media platform designed to connect **Idols** with their **Fans**. This platform enables idols to share posts (images, videos, and text) and lets fans engage with the content through organized tags and relationships. The project focuses on providing a scalable, structured platform that is easy to manage and extend.

The **WeBubble** ERD (Entity Relationship Diagram) shows the relationships between key entities such as Idols, Profiles, Posts, and Tags.

---

#### Database Structure

The database consists of the following tables:

1. **Idols**
    - Stores information about the idols on the platform.
    - Fields:
      - `id`: Primary Key, unique identifier for each idol.
      - `name`: Idol’s name.
      - `email`: Idol’s email (used for login).
      - `password`: Encrypted password.
      - `role`: The role of the user, which can be 'idol' or 'fan'.

2. **Profiles**
    - Contains additional details about idols.
    - Fields:
      - `id`: Primary Key, unique identifier for the profile.
      - `gender`: Gender of the idol.
      - `bio`: A short biography.
      - `agency`: The idol's management agency.
      - `photo`: URL to the idol's profile picture.
      - `debutDate`: The idol’s debut date.
      - `IdolId`: Foreign Key referencing the `Idols` table.

3. **Posts**
    - Represents posts created by idols (images, videos, and text).
    - Fields:
      - `id`: Primary Key, unique identifier for the post.
      - `imageUrl`: URL to the image or media shared in the post.
      - `UserId`: Foreign Key referencing the `Idols` table (the user who created the post).
      - `content`: Text content of the post.

4. **Tags**
    - A list of tags that categorize and label posts.
    - Fields:
      - `id`: Primary Key, unique identifier for each tag.
      - `tags`: The name of the tag (e.g., #music, #performance).

5. **PostTags**
    - A join table used to create many-to-many relationships between `Posts` and `Tags`.
    - Fields:
      - `id`: Primary Key, unique identifier for the relationship entry.
      - `PostId`: Foreign Key referencing the `Posts` table.
      - `TagsId`: Foreign Key referencing the `Tags` table.

---

#### Relationships Overview

1. **One-to-One Relationship**:  
   - **Idols to Profiles**: Each idol has one profile, and each profile belongs to exactly one idol.

2. **One-to-Many Relationship**:  
   - **Idols to Posts**: Each idol can create multiple posts, but each post belongs to only one idol.

3. **Many-to-Many Relationship**:  
   - **Posts to Tags**: Each post can have multiple tags, and each tag can be associated with multiple posts (handled via the `PostTags` join table).

---

#### ERD (Entity Relationship Diagram)

The provided ERD for **WeBubble** outlines the following relationships:
- **Idols** are connected to **Profiles** in a one-to-one relationship.
- **Idols** are related to **Posts** in a one-to-many relationship.
- **Posts** and **Tags** share a many-to-many relationship through the **PostTags** table.

---

#### Checklist

Ensure you complete the following tasks for a successful setup:

- Node.js and npm installed
- PostgreSQL or MySQL installed
- Git installed
- Repository cloned
- Dependencies installed with npm install
- Database created (webubble)
- Environment variables set in .env file
- Database migrations run successfully

    Application started without errors

#### Routes for Accessing the Web Application

The following are the key routes available in the WeBubble application:

    Idols:
        GET /api/idols - Retrieve all idols
        POST /api/idols - Create a new idol
        GET /api/idols/:id - Retrieve a specific idol by ID
        PUT /api/idols/:id - Update idol information
        DELETE /api/idols/:id - Delete an idol

    Profiles:
        GET /api/profiles - Retrieve all idol profiles
        POST /api/profiles - Create a new idol profile
        GET /api/profiles/:id - Retrieve a specific profile by ID
        PUT /api/profiles/:id - Update profile information
        DELETE /api/profiles/:id - Delete a profile

    Posts:
        GET /api/posts - Retrieve all posts
        POST /api/posts - Create a new post
        GET /api/posts/:id - Retrieve a specific post by ID
        PUT /api/posts/:id - Update post content
        DELETE /api/posts/:id - Delete a post

    Tags:
        GET /api/tags - Retrieve all tags
        POST /api/tags - Create a new tag
        GET /api/tags/:id - Retrieve a specific tag by ID
        PUT /api/tags/:id - Update tag information
        DELETE /api/tags/:id - Delete a tag

    PostTags:
        GET /api/posttags - Retrieve all post-tag relationships
        POST /api/posttags - Create a new post-tag relationship
        DELETE /api/posttags/:id - Delete a post-tag relationship

---

#### MVP Features

- **Idol Profiles**: Idols can create and manage their profiles.
- **Post Creation**: Idols can create posts with text, images, and media.
- **Tagging System**: Posts can be tagged with categories using a many-to-many relationship.
- **Basic Authentication**: Users can register, login, and manage sessions.

---

#### Future Enhancements

- **Follow Feature**: Fans can follow their favorite idols to receive updates.
- **Real-Time Notifications**: Notify fans when an idol creates a new post.
- **Comments and Likes**: Fans can engage with idols' posts through comments and likes.
- **Private Messaging**: Direct communication between idols and fans.
- **Analytics**: Provide idols with insights into their post engagement.

---

#### Contact

For questions or issues, contact the project maintainers via GitHub Issues or email.

--- 

