# Flask-Angular E-commerce Cart

## Overview
This is a full-stack e-commerce application built using Flask for the backend and Angular for the frontend. The project follows the MEAN (MongoDB, Express, Angular, Node.js) stack with Flask replacing Express as the backend framework.

## Features
- User authentication (login/signup)
- Product listing and details
- Shopping cart functionality
- Order management
- REST API integration between Flask and Angular
- Image upload for products

## Technologies Used
### Backend (Flask)
- Flask (Python-based web framework)
- Flask-RESTful for API endpoints
- SQLAlchemy for database management
- Flask-CORS for handling cross-origin requests

### Frontend (Angular)
- Angular Framework
- Angular Forms & Reactive Forms
- Bootstrap for styling
- RxJS for state management
- HttpClient for API communication

## Project Structure
```
Flask-Angular-Ecommerce-Cart/
│── Ecommerce-assessment/         # Backend (Flask API)
│── ecommerce-frontend/           # Frontend (Angular App)
│── .gitignore                    # Git ignore file
│── README.md                     # Documentation
```

## Installation & Setup
### Backend (Flask API)
1. Navigate to the backend directory:
   ```bash
   cd Ecommerce-assessment
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask server:
   ```bash
   flask run
   ```

### Frontend (Angular App)
1. Navigate to the frontend directory:
   ```bash
   cd ecommerce-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Angular development server:
   ```bash
   ng serve
   ```

## API Endpoints (Backend)
| Method | Endpoint         | Description               |
|--------|-----------------|---------------------------|
| GET    | /products       | Fetch all products       |
| POST   | /products       | Add a new product        |
| PUT    | /products/:id   | Update product details   |
| DELETE | /products/:id   | Delete a product         |

## Common Issues & Fixes
### File Upload Issue
Error: *"Failed to set the 'value' property on 'HTMLInputElement': This input element accepts a filename, which may only be programmatically set to the empty string."*

**Solution:**
Ensure that you're handling file input correctly. Modify `onFileSelect` function to:
```typescript
onFileSelect(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.formData.patchValue({ image: file });
  }
}
```

### 400 Bad Request (Backend Error)
If you get a 400 error when submitting product data, check that:
- The backend API is running (`flask run`).
- The request body format matches the expected schema.
- File uploads are handled using `FormData` in Angular.

## Contributing
Feel free to fork this project and submit pull requests.

## License
This project is licensed under the MIT License.

