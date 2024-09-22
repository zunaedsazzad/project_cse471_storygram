import React, { useState, useEffect } from 'react';
import Book from '../book/book';
import './books.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Collections = () => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
            try {
                const parsedBooks = JSON.parse(storedBooks);
                setBooks(parsedBooks); 
            } catch (error) {
                console.error('Error parsing stored books:', error);           
            }
        }
    }, []); 

    function addBook() {
        navigate('/addBook');};
    function Homepage() {
        navigate('/Home');
    }

    return (
        <div>
            <div className='Navbar'> 
                <h1 className='booksh1'>You have  {books.length} books in your collection</h1>
                <div className='buttons'>
                    <h2 onClick={addBook}><FontAwesomeIcon icon={faPlus} /> Add book</h2>
                    <h2 onClick={Homepage}>Home</h2>
                </div>


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
