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
    <div className="form">
          <div className="form-body">
            <form>
              <div className="username">
                  <label className="formlabel" for="username">Username </label>
                  <input className="forminput" type="text" id="username" placeholder="Username"/>
              </div>
              <div className="email">
                  <label className="formlabel" for="email">Email </label>
                  <input  type="email" id="email" className="forminput" placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="formlabel" for="password">Password </label>
                  <input className="forminput" type="password"  id="password" placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="formlabel" for="confirmPassword">Confirm Password </label>
                  <input className="forminput" type="password" id="confirmPassword" placeholder="Confirm Password"/>
              </div>
            </form>
          </div>
          <div>
              <button type="submit" class="btn">Register</button>
          </div>
      </div>      
  )
}

export default Register