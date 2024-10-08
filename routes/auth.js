const express=require('express')
const jwt=require('jsonwebtoken')
const User=require('../models/User')
const bcrypt = require('bcrypt')

const router= express.Router();

router.post('/register', async (req, res) => {
    try {
    const { username, email, password } = req.body;
    const user = new User({ username, email, password });
    await user.save();
    } catch (error) {
       res.status(400).json({message: error.message}) 
    }
})

router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  module.exports = router;