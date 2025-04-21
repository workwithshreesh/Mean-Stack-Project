
# 🛒 Ecommerce Product Management API

A full-stack ready Express.js + Sequelize API for managing users, categories, and products — including image upload and role-based access.

---

## 🧠 Tech Stack

- Node.js + Express.js
- Sequelize ORM + MySQL/MariaDB
- Multer (for image uploads)
- JWT Auth Middleware
- Role-based access (`seller`)
- CORS enabled

---

## 📦 API Base URL

```
http://localhost:3000/api/
```

---

## 🧑‍💼 User Routes

| Method | Endpoint               | Access  | Description                  |
|--------|------------------------|---------|------------------------------|
| POST   | `/auth/register`       | Public  | Register a new user         |
| POST   | `/auth/login`          | Public  | Login and receive a JWT     |

---

## 📁 Category Routes

(All category routes require a valid token and `seller` role.)

| Method | Endpoint                     | Description                                  |
|--------|------------------------------|----------------------------------------------|
| POST   | `/categories/`               | Create a new category                        |
| GET    | `/categories/`               | Get all categories                           |
| GET    | `/categories/suggestion`     | Get name suggestions (for autocomplete)      |
| GET    | `/categories/:id`            | Get a specific category by ID                |
| GET    | `/categories/getall/:id`     | Get all categories created by a specific user|
| PUT    | `/categories/:id`            | Update a category                            |
| DELETE | `/categories/:id`            | Delete a category                            |

---

## 📦 Product Routes

| Method | Endpoint                    | Access         | Description                               |
|--------|-----------------------------|----------------|-------------------------------------------|
| POST   | `/products/upload`          | Seller only    | Upload new product with images (max 5)    |
| GET    | `/products/`                | Public         | Get all products                          |
| GET    | `/products/suggestion`      | Public         | Get product name suggestions              |
| GET    | `/products/:id`             | Authenticated  | Get product by ID                         |
| GET    | `/products/getall/:id`      | Seller only    | Get all products created by a user        |
| PUT    | `/products/:id`             | Seller only    | Update product (including images)         |
| DELETE | `/products/:id`             | Seller only    | Delete product                            |

---

## 📂 Image Access

Uploaded images can be accessed via:

```
GET /api/uploads/<filename>
```

Example:
```
http://localhost:3000/api/uploads/shoes.png
```

---

## 🔐 Middleware Summary

- `verifyToken`: Validates JWT token.
- `requireRole(['seller'])`: Restricts route to sellers.
- `upload.array('images', 5)`: Accepts up to 5 images per product.

---

## 🏁 Running Locally

```bash
npm install
node index.js
```

Make sure your DB config is set correctly in `models/index.js`.

---

## 💬 Notes

- Sequelize is running with `{ alter: true }` to sync models.
- If using MariaDB: ❗ Avoid using `ILIKE` — use Sequelize’s `.like` instead.

---