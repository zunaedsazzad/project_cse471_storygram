
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Spin } from 'antd';

// const styles = {
//   bg: {
//     backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.692), rgba(22, 21, 19, 0.705)), url('./book-bindings-bookcase-books-indoors-preview.jpg')",
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     height: '100vh',
//     margin: 0,
//     padding: 0,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   contains: {
//     width: '100%',
//     height: '100vh',
//     backgroundPosition: 'center',
//     backgroundSize: 'cover',
//     position: 'relative',
//   },
//   form: {
//     width: '90%',
//     maxWidth: '450px',
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     background: '#514740e3',
//     padding: '50px 60px 70px',
//     textAlign: 'center',
//   },
//   formHeader: {
//     fontSize: '30px',
//     marginBottom: '60px',
//     color: '#d2c6ae',
//     position: 'relative',
//   },
//   formHeaderAfter: {
//     content: '""',
//     width: '80px',
//     height: '3px',
//     borderRadius: '3px',
//     background: '#c9baa0',
//     position: 'absolute',
//     bottom: '-12px',
//     left: '50%',
//     transform: 'translate(-50%)',
//   },
//   field: {
//     background: '#e0d7cf',
//     margin: '15px 0',
//     borderRadius: '3px',
//     display: 'flex',
//     alignItems: 'center',
//   },
//   input: {
//     width: '100%',
//     background: 'transparent',
//     border: '0',
//     outline: '0',
//     padding: '18px 15px',
//   },
//   button: {
//     background: '#866f59',
//     color: '#ffffff',
//     outline: '0',
//     border: '0',
//     cursor: 'pointer',
//     transition: '1s',
//     height: '40px',
//     borderRadius: '20px',
//     width: '100px',
//     fontSize: '16px',
//   },
//   para: {
//     marginTop: '5%',
//     paddingBottom: '5px',
//     color: '#b3a893',
//   },
// };

// function Code() {
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [send, setSend] = useState('send OTP');
//   const [loading, setLoading] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const navigate = useNavigate();

//   const handleSendCode = async () => {
//     const email = localStorage.getItem('user_email');
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3500/sendcode', { email });
//       setMessage(response.data.message);
//       setSend('OTP sent');
//       setOtpSent(true);
//     } catch (error) {
//       console.error('Error sending code:', error);
//       setMessage('Error sending code. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log(otp);
//     const email = localStorage.getItem('user_email');
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:3500/otpmatch', { email, otp });
//       if (response.data.verification === 'Done') {
//         setMessage('Verification Done');
//         navigate('/setnewpassword');
//       } else {
//         setMessage(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error setting new password:', error);
//       setMessage('Error setting new password. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={styles.contains}>
//       <div style={styles.form}>
//         <h1 style={styles.formHeader}>Recover your password</h1>
//         {!otpSent && <h3>We will send a 6-digit code to your email account</h3>}
//         {loading ? (
//           <Spin />
//         ) : (
//           !otpSent && <button style={styles.button} onClick={handleSendCode}>{send}</button>
//         )}
//         {otpSent && <p>{send}</p>}
//         <form onSubmit={handleSubmit}>
//           <div style={styles.field}>
//             <input
//               type="text"
//               placeholder="6-Digit Code"
//               style={styles.input}
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               maxLength="6"
//             />
//           </div>

//           <button type="submit" style={styles.button}>Submit</button>
//         </form>
//         {message && <p>{message}</p>}
//       </div>
//     </div>
//   );
// }

// export default Code;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spin } from 'antd';

const styles = {
  bg: {
    backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.692), rgba(22, 21, 19, 0.705)), url('./book-bindings-bookcase-books-indoors-preview.jpg')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    height: '100vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contains: {
    width: '100%',
    height: '100vh',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    position: 'relative',
  },
  form: {
    width: '90%',
    maxWidth: '450px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: '#514740e3',
    padding: '50px 60px 70px',
    textAlign: 'center',
  },
  formHeader: {
    fontSize: '30px',
    marginBottom: '60px',
    color: '#d2c6ae',
    position: 'relative',
  },
  formHeaderAfter: {
    content: '""',
    width: '80px',
    height: '3px',
    borderRadius: '3px',
    background: '#c9baa0',
    position: 'absolute',
    bottom: '-12px',
    left: '50%',
    transform: 'translate(-50%)',
  },
  field: {
    background: '#e0d7cf',
    margin: '15px 0',
    borderRadius: '3px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    background: 'transparent',
    border: '0',
    outline: '0',
    padding: '18px 15px',
  },
  button: {
    background: '#866f59',
    color: '#ffffff',
    outline: '0',
    border: '0',
    cursor: 'pointer',
    transition: '1s',
    height: '40px',
    borderRadius: '20px',
    width: '100px',
    fontSize: '15px',
  },
  para: {
    marginTop: '5%',
    paddingBottom: '5px',
    color: '#b3a893',
  },
};

function Code() {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [send, setSend] = useState('send OTP');
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    const email = localStorage.getItem('user_email');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3500/sendcode', { email });
      setMessage(response.data.message);
      setSend('OTP sent');
      setOtpSent(true);
    } catch (error) {
      console.error('Error sending code:', error);
      setMessage('Error sending code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(otp);
    const email = localStorage.getItem('user_email');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3500/otpmatch', { email, otp });
      if (response.data.verification === 'Done') {
        setMessage('Verification Done');
        navigate('/setnewpassword');
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error setting new password:', error);
      setMessage('Error setting new password. Please try again.');
    } finally {
      setLoading(false);
      console.log(otp)
    }
  };

  return (
    <div style={styles.contains}>
      <div style={styles.form}>
        <h1 style={styles.formHeader}>Recover your password</h1>
        {!otpSent && <h3>a six-digit OTP will be sent to your registered email </h3>}
        {loading ? (
          <Spin />
        ) : (
          !otpSent && <button style={styles.button} onClick={handleSendCode}>{send}</button>
        )}
        {otpSent && <p>{send}</p>}
        {otpSent && (
          <form onSubmit={handleSubmit}>
            <div style={styles.field}>
              <input
                type="text"
                placeholder="6-Digit Code"
                style={styles.input}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength="6"
              />
            </div>
            <button type="submit" style={styles.button}>Submit</button>
          </form>
        )}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Code;
