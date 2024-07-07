
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const Usersmodel = require('./models/users');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host:"smtp.gmail.com",
    port:587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const secret = process.env.JWT_SECRET;
app.post("/sign_in", async (req, res) => {
    try {
        const { email, password } = req.body;  
        const user = await Usersmodel.findOne({email});
        if (!user) {
            console.error("User not found!") 
            return res.status(400).json({msg: "User not found!"})
        }
        const is_password_valid = await bcrypt.compare(password, user.password)
        if (is_password_valid & user.isVerified) {
            const _id = user._id
            const user_token = jwt.sign({ email, _id}, secret, { expiresIn: '1h' });
            return res.status(200).json({token: user_token})
    } else {
        console.error("Incorrect password for email: ", email)
        return res.status(400).json({msg: "Incorrect Password"})
    }
}  catch (err) {
    console.error('Error during sign in:', err);
    res.status(500).json({ message: 'An error occurred during sign in.', error: err.message });
}
});

app.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword , district, area, genres} = req.body;
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const userExists = await Usersmodel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Usersmodel({ name, email, password: hashedPassword, district, area, genres });
        await user.save();

        const token = jwt.sign({ email }, secret, { expiresIn: '1h' });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `Please verify your email by clicking the following link: http://localhost:3000/verified/${token}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                console.log('Email sent:', info.response);
                res.status(201).json({ message: 'Verification email sent', user });
            }
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: 'An error occurred during registration.', error: err.message });
    }
});

app.get('/verify/:token', async (req, res) => {
    console.log('Verification request received');
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, secret);
        
        console.log('Token decoded:', decoded);

        const user = await Usersmodel.findOne({ email: decoded.email });
        if (!user) {
            console.error('No user found for the email:', decoded.email);
            return res.status(400).json({ message: 'Invalid token' });
        }

        console.log('User found:', user);

        if (user.isVerified) {
            console.log('User already verified:', user.email);
            return res.status(400).json({ message: 'User already verified', user: user.email });
        }

        user.isVerified = true;
        await user.save();

        

        console.log('User verified:', user);

        res.status(200).json({ message: 'Email verified successfully', token: token });

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.error('Token has expired');
            return res.status(400).json({ message: 'Token has expired' });
        } else if (err.name === 'JsonWebTokenError') {
            console.error('Invalid token');
            return res.status(400).json({ message: 'Invalid token' });
        }
        console.error('Error during email verification:', err);
        res.status(500).json({ message: 'Verification failed', error: err.message });
    }
});


app.listen(3500, () => {
    console.log("Server is running on port 3500");
});
