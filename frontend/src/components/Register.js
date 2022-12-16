import React, { useRef, useState } from 'react';
import Footer from './Footer'
import Header from './Header'
import './Form.css'
import axios from "axios";
const terms = require("../doc/Tos.pdf");
const privacy_policies = require("../doc/Pp.pdf");


const Register = () => {
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  let usernameIsValid = false;
  let passwordIsValid = false;
  let confirmpasswordIsValid = false;

  const handleSubmit = async () => {
    // Initialize
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    // Check if username is valid
    if (!username.current.value.match(usernameRegex)) {
      document.getElementById("register-username-message").style.display = "block";
    }  
    else {
      usernameIsValid = true;
      document.getElementById("register-username-message").style.display = "none";
    }

    // Check if password is valid
    // Contain at least 8 characters
    // Contain at least 1 number
    // Contain at least 1 lowercase character (a-z)
    // Contain at least 1 uppercase character (A-Z)
    // Contains only alphabet letters and numbers
    if (!password.current.value.match(passwordRegex)) {
      passwordIsValid = false;
        document.getElementById("register-password-message").style.display = "block";
    } 
    else {
      passwordIsValid = true;
      document.getElementById("register-password-message").style.display = "none";
    }

    // Check if confirm password matches with password
    if (!confirmPassword.current.value == password.current.value) {
      confirmpasswordIsValid = false;
      document.getElementById("register-confirmpassword-message").style.display = "block";
    } 
    else {
      confirmpasswordIsValid = true;
      document.getElementById("register-confirmpassword-message").style.display = "none";
    }

    if (!usernameIsValid && !passwordIsValid && !confirmpasswordIsValid){
      document.getElementsByClassName("register-background")[0].style.minHeight = "93vh";
    }
    else {
      document.getElementsByClassName("register-background")[0].style.minHeight = "90vh";
    }
  
    // end handle submit 
  };
  
  const sendData = async (username, password) => {
    try {
      const response = await postData(username.current.value, password.current.value);
      console.log(response);
      console.log(response.data.code);
      //transition page

    } catch(err) {
      console.log(err);
      console.log(err.response.data.errMessage);

      //require re-input
      document.getElementById("register-user-message").textContent=err.response.data.errMessage;
      document.getElementById("register-user-message").style.display = "none";
    }
  }

    
    

  const postData = async (username, password) => {
    if (usernameIsValid === true && passwordIsValid === true && confirmpasswordIsValid === true) {
      const response = await axios.post({
        url: `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/auth/register`,
        data: {
          username: username,
          password: password,
        }
      }
      );
      return response;
    }

  };
  
  

  return (
      <>
        <div className="register-background">
        </div>
        <div className="login-register-container register-container">
          <div className='form-head'>
            <div className='form-title-bold'>Get started in minutes</div>
            <div className="form-title-sm">First, let's create your account.</div>
          </div>
          <form className='pure-form'>
            <div className="username">
                <div className="formlabel" for="username">Username </div>
                <input className="forminput" type="text" id="username" placeholder="Enter Username" ref={username}/>
            </div>
            <div id="register-username-message" className='register-message'>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16" className='register-message-icon'>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>
              Username contains only numeric and alphabetic characters.
            </div>
            <div className="password login-register-input">
                <div className="formlabel" for="passwbash -x local_startup.shord">Password </div>
                <input className="forminput" type="password"  id="password" placeholder="Password" ref={password}/>
            </div>
            <div id="register-password-message" className='register-message'>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16" className='register-message-icon'>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>
              Password must be at least 8 characters and contains at least one number, one lowercase character and one uppercase character.
            </div>
            <div className="confirm-password login-register-input">
                <div className="formlabel" for="confirmPassword">Confirm Password </div>
                <input className="forminput" type="password" id="confirmPassword" placeholder="Confirm Password" ref={confirmPassword}/>
            </div>
            <div id="register-confirmpassword-message" className='register-message'>
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-exclamation-circle-fill" viewBox="0 0 16 16" className='register-message-icon'>
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
              </svg>
              Unmatched password
            </div>
            <div className='tos'>
              <div id='tos-inform'>By clicking Register, you agree to our <strong><a href={terms}>Terms and Conditions</a></strong> and <strong><a href={privacy_policies}>Privacy Policy</a></strong>.</div>
            </div>
          </form>
          <button className='form-btn' type="submit" onClick={() => handleSubmit()}>Register</button>
          <div className='register-user-message'>
          </div>
          <div className='form-foot form-foot-register'>
            Already have an account?{` `} <strong><a href=''> Log in here!</a></strong>
          </div>
        </div>
      </>     
  );
};

export default Register

