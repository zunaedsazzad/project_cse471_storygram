import React, { useState } from "react";
import axios from "axios";
import { Spin, Alert, Space, Button } from "antd";
import AutoResizeTextarea from "../input";

const ImagePromptApp = () => {
  const [prompt, setPrompt] = useState("");
  const [title, setTitle] = useState("");
  const [imageData, setImageData] = useState(null);
  const [spinning, setSpinning] = useState(false);
  const [percent, setPercent] = useState(0);
  const [error, setError] = useState(null);

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };
  const getTitle = (e) => {
    setTitle(e.target.value)
    
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSpinning(true);
    setError(null);
    let ptg = -10;
    const interval = setInterval(() => {
      ptg += 10;  
      setPercent(ptg);
    }, 100);

    try {
      const defaultPrompt = `generate a natural realisitic photo of ${prompt}`;
      const body = { prompt: defaultPrompt };
  
      const response = await axios.post("https://eae8-59-153-103-57.ngrok-free.app/image", body);
      console.log(response.data.image);
      setImageData(response.data.image); 
    } catch (err) {
      setError("Error fetching image. Please try again.");
    } finally {
      clearInterval(interval);
      setSpinning(false);
      setPercent(0);
    }
  };

  const handleSave = () => {
    const body ={title: title, context: prompt, image: imageData};
    const response = axios.post("https://", body);
    console.log("Save button clicked");
  };

  const handleHome = () => {
    window.location.href = "/"; 
  };

  const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
-
        <h1 style={styles.headline}>Create Your Own Story</h1>
        <button onClick={handleSave} style={styles.saveButton}>
          Save
        </button>
      </div>
      <input style={styles.titlearea} type="text" placeholder="Story Title" onChange={getTitle} />
      <form onSubmit={handleFormSubmit} style={styles.form}>
        <AutoResizeTextarea
          value={prompt}
          onChange={handlePromptChange}
          placeholder="Enter your prompt"
          style={styles.textarea}
        />
        <button type="submit" style={styles.button}>
          Generate Image
        </button>
      </form>

      <Spin spinning={spinning} percent={percent} fullscreen />

      {error && <Alert message="Error" description={error} type="error" showIcon />}
      
      {imageData && (
        <div style={styles.imageContainer}>
          <img
            src={imageData}
            alt="Generated from prompt"
            style={styles.image}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "'Arial', sans-serif",
    color: "#b2a191",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "rgb(156, 144, 131)",
    color: "#fff",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  headline: {
    fontSize: "24px",
    margin: 0,
  },
  homeButton: {
    backgroundColor: "transparent",
    border: "none",
    color: "black",
    fontSize: "16px",
    cursor: "pointer",
    padding: "8px 12px",
  },
  saveButton: {
    backgroundColor: "#6f4e37",
    border: "none",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  form: {
    display: "inline-block",
    textAlign: "left",
    maxWidth: "600px",
    width: "100%",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    marginTop: "80px", // Adjusted to push form below the navbar
  },

  titlearea: {
    width: "100%",
    marginright: "20px",
    marginleft: "20px",
    padding: "12px 16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    fontFamily: "'Arial', sans-serif",
    marginBottom: "20px",
    boxSizing: "border-box",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s",
    lineHeight: "2.5",
    color: "#333",
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    fontFamily: "'Arial', sans-serif",
    marginBottom: "20px",
    boxSizing: "border-box",
    boxShadow: "inset 0 1px 3px rgba(0, 0, 0, 0.1)",
    transition: "border-color 0.3s",
    lineHeight: "2.5",
    color: "#333",
  },
  button: {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "#867162",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
  imageContainer: {
    marginTop: "20px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default ImagePromptApp;
