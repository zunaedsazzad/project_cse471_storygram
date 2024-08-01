import React from 'react';
import './book.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Book = ({ book }) => {
    const { bookname, authorname, language, bookgenre } = book;

    return (
        <div className='book'>
            <div className='book-genre'>{bookgenre}</div>
            <h4>{bookname}</h4>
            <p>Author Name: {authorname}</p>
            <p>Language: {language}</p>
            <div className='footer'>
                <button>
                    <FontAwesomeIcon icon={faTrash} />
                </button>
            </div>
        </div>
    );
};

export default Book;
