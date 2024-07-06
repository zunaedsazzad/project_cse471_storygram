import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EmailVerification = () => {
    const { token } = useParams();

    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    localStorage.setItem('user_token', token)

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/verify/${token}`);
                setMessage(response.data.message);
                setEmail(response.data.user); // Assuming you want to set the user's email
                console.log('Email verified:', response.data.message);
                console.log(email)
            } catch (error) {
                setMessage(error.response.data.message || 'An error occurred');
                console.error('Error during email verification:', error);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div>
            <h1>Email Verification Done</h1>
            <p>{message}</p>
        </div>
    );
};

export default EmailVerification;
