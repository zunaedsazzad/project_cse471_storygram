
import React, { useState } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import "./signin.css"




const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate()

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await axios.post("http://localhost:3500/sign_in", {email, password})
        console.log(response)
        localStorage.setItem("user_token", response.data.token)
        navigate("/home")

    };

    return (

        <div class='contains'>
          <div class='form'>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
              <div class="input">
  
                <div class="field">

                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
                </div>

                <div class="field">

                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
                </div>

                <button type="submit">Sign In</button>

            </div>
            </form>
            <div id="para">
              <p id="para">
                Forgot password? Click here
              </p>
            </div>
            </div>
            </div>


    );
};

export default Signin;
