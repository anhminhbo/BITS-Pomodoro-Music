import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './Form.css'

const LogIn = () => {
    
  return (
    <div className='container'>
        <div className='form-body'>
            <div className='form-head login-head'>
                <h1>Login</h1>
            </div>
            <form  method="post" action="login.php">
                <div className='username'>
                    <label className='formlabel' for="username">Username</label>
                    <input className='forminput' required id="username" type="text" name="username" maxlength="150"/>
                </div>
                <div className='password'>
                    <label className='formlabel' for="password">Password</label>
                    <input className='forminput' required id="password" type="password" name="password" maxlength="150"/>
                </div>
            </form>
            <div className='btn'>
                <button type="submit" >Log In</button>
            </div>
            <div className='form-foot'>
                <p>Don't have an account? <strong><a href=''> Register here.</a></strong></p>
            </div>
        </div>
    </div>
  )
}

export default LogIn