
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./home_before.css"



const Initial = () => {

  const navigate = useNavigate()
  const userToken = localStorage.getItem('user_token')

  useEffect(() => {
    if (userToken) {
      navigate('/Home')

    }

  } , [userToken, navigate])
  return (

 <body class="header">
 <header>
  <nav class="nav">
    <div class="logo">Storygram</div>
    <div class="menu">
      <a>Home</a>
      <a>Genres</a>
      <a>My library</a>
    </div>
    <div id='buttons'>
    <Link to={'/sign_in'}>
      <button>Sign in</button>
      
    </Link>
    <Link to={'/register'}>
      <button>Sign up</button>
    </Link>
    </div>
  </nav>

 </header>
 </body> 
 )}

export default Initial;