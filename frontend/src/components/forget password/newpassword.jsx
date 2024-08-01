import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Newpassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePasswordChange = async (e) => {
        e.preventDefault(); // Prevent default form submission
        
        try {
            if (password === confirmPassword) {
                const email = localStorage.getItem('user_email');
                const response = await axios.post('http://localhost:3500/changepassword', { email, newpassword: password });
                
                if (response.data.newpass === "Done") {
                    localStorage.clear('user_email');
                    navigate('/sign_in');
                } else {
                    setError('Password change failed.');
                }
            } else {
                setError('Passwords do not match.');
            }
        } catch (error) {
            console.error('There was an error!', error);
            setError(error.response?.data?.message || 'An error occurred.');
            setMessage('');
        }
    };

    const styles = {
        bg: {
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.692), rgba(22, 21, 19, 0.705)), url('./book-bindings-bookcase-books-indoors-preview.jpg')",
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '100vh',
            margin: 0,
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        contains: {
            width: '100%',
            height: '100vh',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            position: 'relative',
          },
          form: {
            width: '90%',
            maxWidth: '450px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            background: '#514740e3',
            padding: '50px 60px 70px',
            textAlign: 'center',
          },
          formHeader: {
            fontSize: '30px',
            marginBottom: '60px',
            color: '#d2c6ae',
            position: 'relative',
          },
        field: {
            background: '#e0d7cf',
            margin: '15px 0',
            borderRadius: '3px',
            
            alignItems: 'center',
          },
        
          input: {
            
            width: '100%',
            marginTop: '10px',
            background: 'transparent',
            border: '0',
            outline: '0',
            padding: '18px 15px',
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
        errorMessage: {
            color: 'red',
        },
    };

    return (
        <body style={styles.bg}>
            <div style={styles.contains}>
                <div style={styles.form}>
                    <h1 style={styles.formHeader}>Reset your password</h1>
                    {message && <p>{message}</p>}
                    {error && <p style={styles.errorMessage}>{error}</p>}
                    <form onSubmit={handlePasswordChange}>
                        <div style={styles.field}>
                        <div >
                            <input style={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div>
                            <input style={styles.input} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                        </div>
                        </div>
                        <button type="submit" style={styles.button}>Submit</button>
                    </form>
                </div>
            </div>
        </body>
    );
};

export default Newpassword;
