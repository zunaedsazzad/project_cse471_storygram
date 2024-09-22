import React, { useState } from 'react';
import axios from 'axios';

const PostReview = () => {
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [message, setMessage] = useState('');


  const handleSubmit = async () => {
    if (!title || !review) {
      setMessage('Please fill out both the title and the review.');
      return;
    }
  
    try {
      const user_token = localStorage.getItem("user_token");
  
      if (!user_token) {
        setMessage('User not authenticated.');
        return;
      }
  
      console.log(user_token);
      const response = await axios.post('http://localhost:3500/reviews/book_reviews', { user_token, title, review });
  
      if (response.status === 201) { // Updated to check for status 201
        setMessage(response.data.message); // Correctly access response message
        setTitle(''); // Reset form
        setReview('');
      } else {
        setMessage('Failed to post review.');
      }
    } catch (error) {
      console.error("Error posting review:", error); // Optional: log the actual error for debugging
      setMessage('Error posting review. Please try again later.');
    }
  };
  

  return (
    <div>
      {/* Navbar */}
      <div style={styles.navbar}>
        <h1>Create your review</h1>
      </div>

      {/* Content */}
      <div style={styles.container}>
        <div style={styles.formGroup}>
          <label htmlFor="title">Review Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            placeholder="Enter the title of your book"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="review">Your Review</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            style={styles.textarea}
            placeholder="Write your review here"
          />
        </div>

        <button style={styles.button} onClick={handleSubmit}>
          Post Review
        </button>

        {/* Message */}
        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  );
};

// Basic styles
const styles = {
  navbar: {
    backgroundColor: '#001529',
    padding: '10px',
    textAlign: 'center',
    color: 'white',
  },
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginTop: '5px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    marginTop: '5px',
    height: '120px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#001529',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  message: {
    marginTop: '15px',
    color: 'green',
  },
};

export default PostReview;
