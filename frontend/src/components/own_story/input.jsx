import React, { useState, useEffect, useRef } from 'react';

const AutoResizeTextarea = () => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '100px'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  }, [text]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <textarea
      placeholder='Write your story.....'
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      rows={1}
      style={{
        overflow: 'hidden',
        resize: 'none', // Prevent manual resizing
        width: '100%', // Adjust to your desired width
      }}
    />
  );
};

export default AutoResizeTextarea;
