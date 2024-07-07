import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./home_before.css"

// import { useEffect } from 'react';

const Home = () => {

  const navigate = useNavigate()
  const handlesignout = () =>{
    localStorage.clear()
    navigate('/')
  }



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
      <button onClick={handlesignout}>Sign out</button>

      </div>
    </nav>
    <section class="h-txt">
      <h3 id="h2">About us</h3>
      <h4 id="h3">
        Welcome to Storygram, your ultimate online community for book
        lovers! At Storygram, we believe in the power of sharing stories
        and the joy of discovering new worlds through the pages of a book. Our
        mission is to create a vibrant, interactive platform where readers can
        connect, lend and borrow books, and engage in meaningful
        conversations.
      </h4>
      <br />
    </section>
    </header>
    </body> 

  );
}

export default Home;


