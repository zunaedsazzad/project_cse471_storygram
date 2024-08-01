import React, { useState } from 'react';
import './addbook.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Addbook = () => {
    const [bookname, setBookname] = useState('');
    const [authname, setAuthname] = useState('');
    const [language, setLanguage] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleAddBook = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('user_token');
            if (!token) throw new Error('No token found');
            const decodedToken = jwtDecode(token);
            const _id = decodedToken._id;

            const response = await axios.post('http://localhost:3500/addbook', {
                user_id: _id,
                bookname: bookname,
                authorname: authname,
                language: language,
                bookgenre: genre
            });

            if (response.data.message === "Book added successfully") {
                setMessage('Book added successfully');
                navigate('/addbook');
                setBookname('')
                setAuthname('')
                setLanguage('')
                setGenre('')
            }

        } catch (error) {
            console.error('There was an error!', error);
            setError(error.response?.data?.message || 'An error occurred during addbook.');
            setMessage('');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1 className="h1">Add a new book</h1>
            <div className="input-section">
                <div className="left-page">
                    <input
                        type="text"
                        placeholder="Book Name"
                        value={bookname}
                        onChange={(e) => setBookname(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Author Name"
                        value={authname}
                        onChange={(e) => setAuthname(e.target.value)}
                        required
                    />
                </div>
                <div className="right-page">
                    <input
                        type="text"
                        placeholder="Language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        required
                    />
                    <select
                        className="input-section"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                    >
                        <option value="">--Please choose a genre--</option>
                        <option value="fiction">Fiction</option>
                        <option value="non-fiction">Non-Fiction</option>
                        <option value="mystery">Mystery</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="science-fiction">Science Fiction</option>
                        <option value="biography">Biography</option>
                    </select>
                </div>
            </div>
            <button className="add-button" onClick={handleAddBook} disabled={loading}>
                {loading ? 'Adding...' : 'Add'}
            </button>
            {error && <p className="error-message">{error}</p>}
            {message && <p className="success-message">{message}</p>}
        </div>
    );
};

export default Addbook;
