import { useState } from 'react'; // This import is unnecessary if useState is not used in this file
import Signup from "./components/registration/sign_up/signup";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signin from "./components/registration/sign_in/signin.jsx";
import EmailVerification from "./components/home/home_1.jsx"
import Home from "./components/home/home.jsx"
import Initial from "./components/home/home_before.jsx"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/sign_in' element={<Signin />} />
        <Route path='/verified/:token' element={<EmailVerification />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Initial />} />


      </Routes>
    </BrowserRouter>
  );
}


export default App;
