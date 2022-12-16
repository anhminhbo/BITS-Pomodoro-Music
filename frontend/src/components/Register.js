import React, { useRef, useState } from 'react';
import Footer from './Footer'
import Header from './Header'
import './Form.css'
import axios from "axios";


const Register = () => {
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [checkbox, setCheckbox] = useState(false);
  let usernameIsValid = false;
  let passwordIsValid = false;
  let confirmpasswordIsValid = false;
  let checkboxIsValid = false;
  

  const handleSubmit = async () => {
   

    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!username.current.value.match(usernameRegex)) {
      document.getElementById("register-username-message").style.display = "block";
    } else {
      usernameIsValid = true;
      document.getElementById("register-username-message").style.display = "none";
    }

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!password.current.value.match(passwordRegex)) {
        document.getElementById("register-password-message").style.display = "block";
    } else {
      passwordIsValid = true;
      document.getElementById("register-password-message").style.display = "none";
    }
    //Contain at least 8 characters
    // contain at least 1 number
    // contain at least 1 lowercase character (a-z)
    // contain at least 1 uppercase character (A-Z)
    // contains only 0-9a-zA-Z

    if (!confirmPassword.current.value.match(password.current.value)) {
      document.getElementById("register-confirmpassword-message").style.display = "block";
    } else {
      confirmpasswordIsValid = true;
      document.getElementById("register-confirmpassword-message").style.display = "none";
    }
  
    console.log(checkbox);
    if (checkbox === false) {
      document.getElementById("register-checkbox-message").style.display = "block";
    }
    else {
      checkboxIsValid = true;
      document.getElementById("register-checkbox-message").style.display = "none";
      
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
    if (usernameIsValid === true && passwordIsValid === true && confirmpasswordIsValid === true && checkboxIsValid === true) {
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
    <div className="login-register-background">
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
          <div id="register-username-message">
          ! Username contains only numeric and alphabetic characters.
          </div>
          <div className="password">
              <div className="formlabel" for="passwbash -x local_startup.shord">Password </div>
              <input className="forminput" type="password"  id="password" placeholder="Password" ref={password}/>
          </div>
          <div id="register-password-message">
          ! Password must be at least 8 characters and contains at least 1 number, 1 lowercase character and 1 uppercase character.
          </div>
          <div className="confirm-password">
              <div className="formlabel" for="confirmPassword">Confirm Password </div>
              <input className="forminput" type="password" id="confirmPassword" placeholder="Confirm Password" ref={confirmPassword}/>
          </div>
          <div id="register-confirmpassword-message">
          ! Unmatched password
          </div>
          <div className='checkbox'>
            <input type="checkbox" className="formbox" id="checkbox" name='checkbox' onClick={(e) => {
              setCheckbox(e.target.checked);
            }}/>
            <div id='checkbox-inform' for="checkbox">I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.</div>
          </div>
          <div id="register-checkbox-message">
          Please agree to our ToS and Privacy Policy.
          </div>
        </form>
        <button className='form-btn' type="submit" onClick={() => handleSubmit()}>Register</button>
        <div className='register-user-message'>
        </div>
        <div className='form-foot form-foot-register'>
          Already have an account?{` `} <strong><a href=''> Log in here!</a></strong>
        </div>
      </div>
    </div>      
  );
};

export default Register

