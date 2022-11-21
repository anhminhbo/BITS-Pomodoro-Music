import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './Form.css'

const LogIn = () => {
    
  return (
    <div className='container'>
        <div className='form-body'>
            <div className='form-head'>
                <h1>Login</h1>
            </div>
            <form  method="post" action="login.php">
                <div className='username'>
                    <label className='formlabel' for="username">Username</label>
                    <input className='forminput' required id="username" type="text" name="username" maxlength="50"/>
                </div>
                <div className='password'>
                    <label className='formlabel' for="password">Password</label>
                    <input className='forminput' required id="password" type="text" name="password" maxlength="50"/>
                </div>
            </form>
            <button type="submit" className='btn'>Log In</button>
            <div>
                <p>Don't have an account? <a href='./Register.js'>Register here.</a> </p>
            </div>
        </div>
    </div>
  )
}

export default LogIn