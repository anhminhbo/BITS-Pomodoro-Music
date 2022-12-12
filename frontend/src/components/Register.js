import React, { useRef } from 'react';
import Footer from './Footer'
import Header from './Header'
import './Form.css'
//
const Register = () => {
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const email = useRef();
  const checkbox = useRef();

  const handleSubmit = () => {
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (username.current.value.match(usernameRegex)) console.log("Matched"); else console.log("Matched... cai qq");

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (password.current.value.match(usernameRegex)) console.log("Matched"); else console.log("Matched... cai dau m"); 
    //Contain at least 8 characters
    // contain at least 1 number
    // contain at least 1 lowercase character (a-z)
    // contain at least 1 uppercase character (A-Z)
    // contains only 0-9a-zA-Z

    if (confirmPassword.current.value.match(usernameRegex)) console.log("Matched"); else console.log("Matched... cai dau m");

    const emailRegex =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (email.current.value.match(emailRegex)) console.log("Matched"); else console.log("not matched");

    console.log(checkbox.current.value);
  }

  return (
    <div className="login-register-container register-container">
      <div className="form-body">
        <div className='form-head'>
          <h1>Get started in minutes</h1>
          <p>First let's create your account.</p>
        </div>
        <form className='pure-form'>
          <div className="username">
              <label className="formlabel" for="username">Username </label>
              <br/>
              <input className="forminput" type="text" id="username" placeholder="Enter Username" ref={username}/>
          </div>
          <div className="email">
              <label className="formlabel" for="email">Email </label>
              <br/>
              <input  type="email" id="email" className="forminput" placeholder="Email" ref={email}/>
          </div>
          <div className="password">
              <label className="formlabel" for="password">Password </label>
              <br/>
              <input className="forminput" type="password"  id="password" placeholder="Password" ref={password}/>
          </div>
          <div className="confirm-password">
              <label className="formlabel" for="confirmPassword">Confirm Password </label>
              <br/>
              <input className="forminput" type="password" id="confirmPassword" placeholder="Confirm Password" ref={confirmPassword}/>
          </div>
          <div className='checkbox'>
            <input type="checkbox" className="formbox" id="checkbox" name='checkbox' ref={checkbox}/>
            <label for="checkbox">I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.</label>
          </div>
        </form>
        <div className='btn'>
          <button type="submit" onClick={() => handleSubmit()}>Register</button>
        </div>
        <div className='form-foot'>
          <p>Already have an account? <strong><a href=''> Log in here!</a></strong></p>
        </div>
      </div>
    </div>      
  )
}

export default Register

