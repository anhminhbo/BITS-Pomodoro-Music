import React from 'react'
import Footer from './Footer'
import Header from './Header'
import './Form.css'

const Register = () => {
    // const [username, setUsername] = useState(null);
    // const [email, setEmail] = useState(null);
    // const [password,setPassword] = useState(null);
    // const [confirmPassword,setConfirmPassword] = useState(null);

    // const handleInputChange = (e) => {
    //     const {id , value} = e.target;
    //     if(id === "username"){
    //         setFirstName(value);
    //     }
    //     if(id === "email"){
    //         setEmail(value);
    //     }
    //     if(id === "password"){
    //         setPassword(value);
    //     }
    //     if(id === "confirmPassword"){
    //         setConfirmPassword(value);
    //     }

    // }

    // const handleSubmit  = () => {
    //     console.log(username,email,password,confirmPassword);
    // }
  return (
    <div className="container">
      <div className="form-body">
        <div className='form-head'>
          <h1>Get started in minutes</h1>
          <p>First let's create your account.</p>
        </div>
        <form>
          <div className="username">
              <label className="formlabel" for="username">Username </label>
              <br/>
              <input className="forminput" type="text" id="username" placeholder="Username"/>
          </div>
          <div className="email">
              <label className="formlabel" for="email">Email </label>
              <br/>
              <input  type="email" id="email" className="forminput" placeholder="Email"/>
          </div>
          <div className="password">
              <label className="formlabel" for="password">Password </label>
              <br/>
              <input className="forminput" type="password"  id="password" placeholder="Password"/>
          </div>
          <div className="confirm-password">
              <label className="formlabel" for="confirmPassword">Confirm Password </label>
              <br/>
              <input className="forminput" type="password" id="confirmPassword" placeholder="Confirm Password"/>
          </div>
          <div className='checkbox'>
            <input type="checkbox" className="formbox" id="checkbox" name='checkbox'/>
            <label for="checkbox">I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.</label>
          </div>
        </form>
        <button type="submit" className='btn'>Register</button>
        <p>Already have an account? <a href=''>Log in here!</a></p>
      </div>
    </div>      
  )
}

export default Register