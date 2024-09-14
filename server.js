const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const User = require('./models/User'); // Import the User model
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken'); // Import jsonwebtoken for JWTs

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

// Basic route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Registration route
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    // Validate the input
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }
  
      // Create a new user
      const newUser = new User({
        name,
        email,
        password,
      });
  
      // Save the new user
      await newUser.save();
  
      // Create a JWT token
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(201).json({ token, msg: 'User registered successfully' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    // Validate the input
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }
  
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'User not found' });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
      }
  
      // Create a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.status(200).json({ token, msg: 'Logged in successfully' });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });



  // Authentication middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Apply authentication middleware to protected routes
app.get('/protected', authenticateToken, (req, res) => {
  res.send('This is a protected route');
});
  
