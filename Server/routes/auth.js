const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { Todo } = require('../models/Data');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: "managetask@outlook.com",
    pass: "taskmanager@123",
  },
});

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const mailOptions = {
      from: 'managetask@outlook.com',
      to: email,
      subject: 'Welcome to Task Manager',
      text: `Hello ${username},\n\nThank you for signing up for our Task Manager app!\n\nBest Regards,\nTask Manager Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ status: true, message: 'User registered but error sending email' });
      } else {
        console.log('Email sent:', info.response);
        return res.json({ status: true, message: 'User registered successfully, email sent' });
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Error registering user' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User is not registered' });
    }

    // const validPassword = await bcrypt.compare(password, user.password);
    // if (!validPassword) {
    //   return res.status(400).json({ message: 'Password is incorrect' });
    // }

    const token = jwt.sign(
      { username: user.username, userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'Strict',
    });

    res.cookie('username', user.username, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'Strict',
    });

    res.cookie('email', user.email, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 3600000,
      sameSite: 'Strict',
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ message: 'Error logging in' });
  }
});



router.post('/logout', async (req, res) => {
  try {
    const token = req.cookies.token;
    res.cookie('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
    });
    res.status(200).send({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error during logout' });
  }
});

module.exports = router;
