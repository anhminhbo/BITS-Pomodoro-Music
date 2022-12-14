import React, { useRef } from 'react';
import Footer from './Footer'
import Header from './Header'
import './Form.css'

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
      <div className='form-head'>
        <div className='form-title-bold'>Get started in minutes</div>
        <div className="form-title-sm">First, let's create your account.</div>
      </div>
      <form className='pure-form'>
        <div className="username">
            <div className="formlabel" for="username">Username </div>
            <input className="forminput" type="text" id="username" placeholder="Enter Username" ref={username}/>
        </div>
        <div className="email">
            <div className="formlabel" for="email">Email </div>
            <input  type="email" id="email" className="forminput" placeholder="Email" ref={email}/>
        </div>
        <div className="password">
            <div className="formlabel" for="password">Password </div>
            <input className="forminput" type="password"  id="password" placeholder="Password" ref={password}/>
        </div>
        <div className="confirm-password">
            <div className="formlabel" for="confirmPassword">Confirm Password </div>
            <input className="forminput" type="password" id="confirmPassword" placeholder="Confirm Password" ref={confirmPassword}/>
        </div>
        <div className='checkbox'>
          <input type="checkbox" className="formbox" id="checkbox" name='checkbox' ref={checkbox}/>
          <div id='checkbox-inform' for="checkbox">I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.</div>
        </div>
      </form>
      <button className='form-btn' type="submit" onClick={() => handleSubmit()}>Register</button>
      <div className='form-foot form-foot-register'>
        Already have an account?{` `} <strong><a href=''> Log in here!</a></strong>
      </div>
    </div>      
  )
}

export default Register

