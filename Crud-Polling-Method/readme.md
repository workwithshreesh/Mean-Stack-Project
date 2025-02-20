# Product & Category Management (Angular)

## 📌 Overview

This is an Angular-based application that allows users to efficiently manage **Products** and **Categories**. The same page dynamically handles both **Product** and **Category** management using a shared form structure.

## 📌 Preview

Project Video:


https://github.com/user-attachments/assets/9e924d60-cf9d-42c2-84be-ac1fbc5ebe6b




## ✨ Features

- 📝 **Add, Edit, and Delete Products**
- 📂 **Add, Edit, and Delete Categories**
- 📊 **Form Validation for Product Prices and Categories**
- 🎨 **Bootstrap-based UI** for a clean and responsive design

## 🛠️ Technologies Used

- **Angular** (Latest Version)
- **Reactive Forms** for form handling
- **Bootstrap 5** for styling
- **TypeScript** for development
- **RxJS** for handling asynchronous operations

## 🚀 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/product-category-management.git
   cd product-category-management
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run the Application:**
   ```bash
   ng serve
   ```
   Open `http://localhost:4200/` in your browser.

## 📁 Project Structure

```
/src
  ├── app
  │   ├── components
  │   │   ├── product-category.component.ts
  │   │   ├── product-category.component.html
  │   │   ├── product-category.component.scss
  │   ├── services
  │   │   ├── product-category.service.ts
  │   ├── app.module.ts
  ├── assets
  ├── environments
  ├── index.html
```

## 🔄 Usage

### 1️⃣ Add a New Product

- Click the **"Add Product"** button.
- Enter **Product Name, Price, and Category**.
- Click **"Save Changes"**.

### 2️⃣ Add a New Category

- Click the **"Add Category"** button.
- Enter **Category Name**.
- Click **"Save Changes"**.

### 3️⃣ Edit an Existing Product or Category

- Click the **"Edit"** button next to the product/category.
- Modify the required fields.
- Click **"Edit Changes"**.

### 4️⃣ Delete a Product or Category

- Click the **"Delete"** button next to the product/category.
- Confirm the deletion.

## ✅ Form Validations

- **Product Name:** Required.
- **Price:** Only numbers allowed, up to 2 decimal places.
- **Category:** Required for products.

## 📌 API Endpoints

### Products

- **GET** `/api/products` - Fetch all products.
- **POST** `/api/products` - Add a new product.
- **PUT** `/api/products/:id` - Update an existing product.
- **DELETE** `/api/products/:id` - Delete a product.

### Categories

- **GET** `/api/categories` - Fetch all categories.
- **POST** `/api/categories` - Add a new category.
- **PUT** `/api/categories/:id` - Update an existing category.
- **DELETE** `/api/categories/:id` - Delete a category.

## 📌 Contribution

Want to improve this project? Follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-branch`)
3. **Commit your changes** (`git commit -m "Added new feature"`)
4. **Push to the branch** (`git push origin feature-branch`)
5. **Create a Pull Request**

## 📜 License

This project is licensed under the **MIT License**.

---

💡 **Developed by Shreesh Tiwari**

