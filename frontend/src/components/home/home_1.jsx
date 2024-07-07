import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams,  useNavigate } from 'react-router-dom';

const EmailVerification = () => {
    const { token } = useParams();
    const navigate = useNavigate()
    

    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/verify/${token}`);
                setMessage(response.data.message);
                localStorage.setItem('token', response.data.token);
                navigate("/Home")
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
        <div            style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30vh',
            textAlign: 'center',
        }}
    >
            <h1>Email Verification</h1>
            <p>{message}</p>
            <button     style={{
                        marginTop: '40px',
 
                         // Add more gap above the button
                    }}>Edit Profile</button>
        </div>
    );
};

export default EmailVerification;