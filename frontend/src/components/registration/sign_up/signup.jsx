import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "./signup.css"


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [district, setDistrict] = useState('');
    const [area, setArea] = useState('');
    const [genre, setGenre] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const genres = ['Action', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'];

    // const selected = [];

    const handleGenreChange = (event) => {
      const { options } = event.target;
      for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
          selected.push(options[i].value);
        }
      }
      console.log(selected)
      setSelectedGenres(selected);
    };
  


    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/register', { name, email, password, confirmPassword });
            setMessage('Please check your email to verify your account.');
            setError('');
        } catch (error) {
            console.error('There was an error!', error);
            setError(error.response?.data?.message || 'An error occurred during registration.');
            setMessage('');
        }
    };

    return (
      <body class='bg'>

        <div class='contains'>
          <div class='form'>
            <h1>Signup</h1>
            {message && <p>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSignup}>
              <div class="input">
                <div class="field">

                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div class="field">

                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>

                <div class="field">

                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div class="field">

                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>

                <div class="field">

                <input type="text" placeholder="District" value={district} onChange={(e) => setDistrict(e.target.value)} required />
                </div>
                <div class="field">

                <input type="text" placeholder="Area" value={area} onChange={(e) => setArea(e.target.value)} required />
                </div>
                <div>
                <select multiple={true} value={selectedGenres} onChange={handleGenreChange}>
                {genres.map((genre, index) => (
                  <option key={index} value={genre}>
                    {genre}
                  </option>
                ))}
                </select>
                <div>
                  <h3>Selected Genres:</h3>
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
            <div id="para">
              <p>
                Already have an account?<Link to={'/sign_in'}> Click here</Link>
              </p>
            </div>
            </div>
            </div>

            </body>



    );
};

export default Signup;
