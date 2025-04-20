const multer = require('multer');
const path = require('path');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // specify the folder where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with the current timestamp and the original file extension
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

// Set up file filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);  // Accept the file if it's an image
  } else {
    cb(new Error('Only image files are allowed!'), false);  // Reject non-image files
  }
};

// Initialize multer with the storage and file filter
const upload = multer({ storage, fileFilter });

module.exports = upload;  // Export the multer instance to be used in routes
