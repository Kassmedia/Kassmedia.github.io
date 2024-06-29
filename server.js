const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors'); // Enable CORS if needed

// Replace with your MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/oja-agbe-harvestify';

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Define the product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String
  },
  imageUrl: {
    type: String // Replace with actual image storage logic (e.g., cloud storage)
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  }
});

const Product = mongoose.model('Product', productSchema);

// Define the supplier schema
const supplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  }]
});

// Hash password before saving a supplier
supplierSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Supplier = mongoose.model('Supplier', supplierSchema);

// Middleware for parsing JSON data and uploading images (replace with actual storage)
app.use(express.json());
app.use(cors()); // Enable CORS if needed

const upload = multer({ dest: 'uploads/' }); // Temporary image storage

// Route to register a new supplier
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const newSupplier = new Supplier({ name, email, password });
    await newSupplier.save();

    res.json({ message: 'Registration successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to login a supplier
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ supplierId: supplier._id }, process.env.JWT_SECRET,

