import React, { useState, useEffect } from 'react';
import Book from '../book/book';
import './books.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Collections = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Retrieve books from localStorage when the component mounts
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            try {
                const parsedBooks = JSON.parse(storedBooks);
                setBooks(parsedBooks); // Update state with the parsed books array
            } catch (error) {
                console.error('Error parsing stored books:', error);
                // Handle the error if parsing fails
            }
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <div>
            <div className='Navbar'> 
                <h1 className='booksh1'>You have  {books.length} books in your collection</h1>
                <button><FontAwesomeIcon icon={faPlus} /> Add book</button>

            </div>

            <div className='books'>
                {books.map(book => (
                    <Book key={book._id} book={book} />
                ))}
            </div>
        </div>
    );
};

export default Collections;
