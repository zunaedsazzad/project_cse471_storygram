import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "./home_before.css";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  const handlesignout = () => {
    localStorage.clear();
    navigate("/");
  };

  const gotoprofile = () => {
    navigate("/profile");
  };

  const showMyBooks = async () => {
    try {
      const token = localStorage.getItem("user_token");
      if (!token) {
        throw new Error("No token found");
      }

      const decodedToken = jwtDecode(token);
      const _id = decodedToken._id;

      const response = await axios.get(
        `http://localhost:3500/api/books?_id=${_id}`
      );
      console.log(response.data);
      localStorage.setItem("books", JSON.stringify(response.data));

      navigate("/myCollections");
    } catch (error) {
      console.error("There was an error!", error);
      // Handle error state, perhaps setting it to state
      setError(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <body class="header">
      <header>
        <nav class="nav">
          <div class="logo">Storygram</div>
          <div class="menu">
            <a>Home</a>
            <a>Feed</a>
            <a onClick={showMyBooks}>My library</a>
          </div>
          <div>
            <button class="button" onClick={handlesignout}>
              Sign out
            </button>
            <button class="button" onClick={gotoprofile}>
              Profile
            </button>
          </div>
        </nav>
        <section class="h-txt">
          <h3 id="h2">About us</h3>
          <h4 id="h3">
            Welcome to Storygram, your ultimate online community for book
            lovers! At Storygram, we believe in the power of sharing stories and
            the joy of discovering new worlds through the pages of a book. Our
            mission is to create a vibrant, interactive platform where readers
            can connect, lend and borrow books, and engage in meaningful
            conversations.
          </h4>
          <br />
        </section>
      </header>
    </body>
  );
};

export default Home;
