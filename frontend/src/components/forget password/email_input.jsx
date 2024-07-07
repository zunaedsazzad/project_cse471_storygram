import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmailInput() {
    localStorage.clear()
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.post('http://localhost:3500/isemailvalid', { email });
            if (response.data.emailexist === "True") {
                localStorage.setItem('user_email', response.data.email);
                navigate('/code');
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.error('There was an error!', error);
            setMessage(error.response?.data?.message || 'An error occurred');
        }
    };

    const styles = {
        body: {
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.692), rgba(22, 21, 19, 0.705)), url('./book-bindings-bookcase-books-indoors-preview.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
        },
        container: {
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
        form: {
            width: '90%',
            maxWidth: '450px',
            background: '#514740e3',
            padding: '50px 60px 70px',
            textAlign: 'center',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0,0,0,0.2)',
        },
        formTitle: {
            fontSize: '30px',
            marginBottom: '20px',
            color: '#d2c6ae',
        },
        formSubtitle: {
            marginBottom: '20px',
            color: '#d2c6ae',
        },
        field: {
            background: '#e0d7cf',
            margin: '15px 0',
            borderRadius: '3px',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
        },
        input: {
            width: '100%',
            background: 'transparent',
            border: '0',
            outline: '0',
            padding: '15px',
            fontSize: '16px',
            color: '#333',
        },
        button: {
            background: '#866f59',
            color: '#ffffff',
            outline: '0',
            border: '0',
            cursor: 'pointer',
            transition: '0.3s',
            borderRadius: '20px',
            padding: '12px 30px',
            fontSize: '16px',
            marginTop: '20px',
        },
    };

    return (
        <div style={styles.body}>
            <div style={styles.container}>
                <div style={styles.form}>
                    <h1 style={styles.formTitle}>Recover your password</h1>
                    <p style={styles.formSubtitle}>Enter Your Registered Email Here</p>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.field}>
                            <input
                                type="email"
                                placeholder="Email"
                                style={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" style={styles.button}>Submit</button>
                    </form>
                    {message && <p>{message}</p>}
                </div>
            </div>
        </div>
    );
}

export default EmailInput;
