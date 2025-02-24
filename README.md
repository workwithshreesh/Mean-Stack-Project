# MEAN Stack Mini Projects

## 📌 Overview

This repository contains multiple **mini-projects** built using the **MEAN stack** (MongoDB, Express.js, Angular, Node.js). Each project showcases different functionalities and real-world use cases, making it an excellent resource for learning and mastering full-stack development.

## 🏗️ Tech Stack

- **MongoDB** - NoSQL database for data storage
- **SQL & PostgreSQL** - Additional database options for flexibility
- **Express.js** - Backend framework for API development
- **Angular** - Frontend framework for UI development
- **Node.js** - Runtime environment for server-side execution
- **Bootstrap** - Used for responsive UI design
- **RxJS** - Handling asynchronous data streams in Angular

## 📂 Project List

### 1️⃣ **User Authentication System**

- **Features:**
  - JWT-based authentication
  - User login/logout
  - Role-based access control
- **API Endpoints:**
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Login with credentials
  - `GET /api/auth/profile` - Fetch user details

### 2️⃣ **E-Commerce Product Management**

- **Features:**
  - Add, update, and delete products
  - Category-based filtering
  - Image upload
- **API Endpoints:**
  - `GET /api/products` - Fetch all products
  - `POST /api/products` - Add a product
  - `PUT /api/products/:id` - Update product details
  - `DELETE /api/products/:id` - Remove a product

### 3️⃣ **Task Management System**

- **Features:**
  - Create, edit, and delete tasks
  - Assign tasks to users
  - Status tracking
- **API Endpoints:**
  - `GET /api/tasks` - Fetch all tasks
  - `POST /api/tasks` - Add a new task
  - `PUT /api/tasks/:id` - Update task details
  - `DELETE /api/tasks/:id` - Delete a task

### 4️⃣ **Real-Time Chat Application**

- **Features:**
  - Socket.io for real-time communication
  - Private and group chat functionality
  - User presence tracking

More projects will be uploaded here soon.

## 🚀 Installation & Setup

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-repo/mean-stack-mini-projects.git
   cd mean-stack-mini-projects
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   cd frontend && npm install
   ```
3. **Start the Backend Server:**
   ```bash
   cd backend
   nodemon server.js
   ```
4. **Start the Frontend (Angular):**
   ```bash
   cd frontend
   ng serve
   ```
5. **Access the Application:**
   - Open `http://localhost:4200/`

## 🤝 Contribution

Want to contribute? Follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature-branch`)
3. **Commit your changes** (`git commit -m "Added new feature"`)
4. **Push to the branch** (`git push origin feature-branch`)
5. **Create a Pull Request**

## 📜 License

This project is licensed under the **MIT License**.

---

💡 **Developed by Shreesh Tiwari**
