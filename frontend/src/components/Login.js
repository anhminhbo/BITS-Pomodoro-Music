import React from 'react'
import Header from './Header'
import Footer from './Footer'
import './Form.css'

const LogIn = () => {
    
  return (
    <div className='form'>
        <div>
        <h1>Login</h1>
        </div>
        <div className='form-body'>
            <form  method="post" action="login.php">
                <div>
                    <label for="username">Username</label>
                    <input required id="username" type="text" name="username" maxlength="50"/>
                </div>
                <div>
                    <label for="password">Password</label>
                    <input required id="password" type="text" name="password" maxlength="50"/>
                
                </div>
            </form>
        </div>
        <div>
            <p>Don't have an account? <a href='./Register.js'>Register here.</a> </p>
        </div>
    </div>
  )
}

export default LogIn