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

app.post('/isemailvalid', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await Usersmodel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'This email is not registered' });
        }
        return res.json({ emailexist: 'True', email: email });
    } catch (err) {
        console.error('Error during email validation:', err.message);
        res.status(500).json({ message: 'An error occurred during email validation.', error: err.message });
    }
});

app.post('/sendcode', async (req, res) => {
    try {
        const { email } = req.body;
        
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const user = await Usersmodel.findOneAndUpdate(
            { email },
            { otpcode: otp},
            { new: true, upsert: true }
          );
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Email Verification',
            text: `This is your password recovery OTP for Storygram: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending email' });
            } else {
                res.json({ message: 'please check your Email', otp: 'saved' });
            }
        });
    } catch (err) {
        console.error('Error during password recovery:', err.message);
        res.status(500).json({ message: 'An error occurred during password recovery.', error: err.message });
    }
});
app.post('/otpmatch', async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await Usersmodel.findOne({ email });
        console.log(user)
        console.log(otp)

        if(user.otpcode==otp) {
            return res.json({ verification: 'Done'});
        } else {
            return res.json({ message: "Invalid OTP." });
        }
    } catch (err) {
        console.error('Error during password recovery:', err.message);
        res.status(500).json({ message: 'An error occurred during password recovery.', error: err.message });
    }
});

app.post('/changepassword', async (req, res) => {
    try {
        const { email, newpassword } = req.body;
        const user = await Usersmodel.findOneAndUpdate({ email }, { password: newpassword }, { new: true, upsert: true });

        if (user) {
            return res.json({ newpass: "Done" });
        } else {
            return res.status(404).json({ message: "User not found." });
        }
    } catch (err) {
        console.error('Error during password recovery:', err.message);
        res.status(500).json({ message: 'An error occurred during password recovery.', error: err.message });
    }
});

app.post('/sign_in', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usersmodel.findOne({ email });

        if (!user) {
            console.error('User not found for email:', email);
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid & user.isVerified == true) {
            const token = jwt.sign({ email, _id: user._id }, secret, { expiresIn: '1h' });
            return res.status(200).json({ token: token });
        } else {
            console.error('Incorrect password for email:', email);
            return res.status(400).json({ message: "Incorrect password" });
        }
    } catch (err) {
        console.error('Error during sign in:', err.message);
        res.status(500).json({ message: 'An error occurred during sign in.', error: err.message });
    }
});



app.post('/register', async (req, res) => {
    try {
        const { name, email, password, confirmPassword, district, area, selectedGenres } = req.body;
        console.log(selectedGenres)
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const userExists = await Usersmodel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Usersmodel({
            name,
            email,
            password: hashedPassword,
            district,
            area,
            genres: selectedGenres // Ensure this matches the schema property name
        });
        await user.save();

        const token = jwt.sign({ email, _id: user._id }, secret, { expiresIn: '1h' });

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