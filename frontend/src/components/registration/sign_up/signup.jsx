import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Spin } from 'antd';
import "./signup.css";

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [district, setDistrict] = useState('');
    const [area, setArea] = useState('');
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Self-help'];

    const handleGenreChange = (event) => {
        const temp_list = [...selectedGenres]
        if (!temp_list.includes(event.target.value)) {
        temp_list.push(event.target.value)}
        setSelectedGenres(temp_list);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3500/register', { name, email, password, confirmPassword, district, area, selectedGenres });
            setMessage('Please check your email to verify your account.');
            setError('');
        } catch (error) {
            console.error('There was an error!', error);
            setError(error.response?.data?.message || 'An error occurred during registration.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
      <body class='body'>
        

        <div>
            <div className='contains'>
                <div className='form'>
                    <h1>Signup</h1>
                    {message && <p>{message}</p>}
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {loading ? (
                        <Spin />
                    ) : (
                        <form onSubmit={handleSignup}>
                            <div className="input">
                                <div className="field">
                                    <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                                </div>
                                <div className="field">
                                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div className="field">
                                    <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                                <div className="field">
                                    <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} required />
                                </div>
                                <div className="field">
                                    <input type="text" placeholder="Area" value={area} onChange={(e) => setArea(e.target.value)} required />
                                </div>
                    <div class='fields'>
                    <div class="select-container">
                      <select value={selectedGenres} onChange={handleGenreChange}>
                        <option value="">Select Genre</option>
                        {genres.map((genre, index) => (
                          <option key={index} value={genre}>
                            {genre}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div class="selected-genres-container">
                      <h4 id='title'>Selected Genres:</h4>
                      <ul>

                        {selectedGenres.map((genre, index) => (
                          <li key={index}>{genre}</li>
                        ))} 
                      </ul>
                    </div>
                  </div>

                                <button type="submit">Sign Up</button>
                            </div>
                        </form>
                    )}
                    <div id="para">
                        <p>
                            Already have an account?<Link to={'/sign_in'}> Click here</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
      </body>
    );
};

export default Signup;