import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3500/reviews/get_reviews');
        setReviews(response.data);
      } catch (error) {
        setError('Error fetching reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All Reviews</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}
      <div style={styles.reviewsContainer}>
        {reviews.map((review) => (
          <div key={review._id} style={styles.reviewBox}>
            <h2 style={styles.reviewTitle}>{review.title}</h2>
            <p style={styles.reviewContent}>{review.review}</p>
            <p style={styles.reviewAuthor}>By: {review.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Basic styles
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '20px',
  },
  reviewsContainer: {
    width: '100%',
  },
  reviewBox: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '15px',
    margin: '10px 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  reviewTitle: {
    margin: '0 0 10px',
  },
  reviewContent: {
    margin: '0 0 10px',
  },
  reviewAuthor: {
    fontStyle: 'italic',
    color: '#555',
  },
  error: {
    color: 'red',
  },
};

export default ReviewsPage;
