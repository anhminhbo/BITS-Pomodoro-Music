import React, { useRef } from "react";
import "./Form.css";

const LogIn = () => {
  const username = useRef();
  const password = useRef();

  return (
    <div className="login-register-container login-container">
      <div className="form-head login-head">
        Login
      </div>
      <form className="pure-form" method="post">
        <div className="username">
          <div className="formlabel" for="username">
            Username
          </div>
          <input
            className="forminput"
            required
            id="username"
            type="text"
            name="username"
            maxlength="150"
            placeholder="Enter Username"
            ref={username}
          />
        </div>
        <div className="password">
          <div className="formlabel" for="password">
            Password
          </div>
          <input
            className="forminput"
            required
            id="password"
            type="password"
            name="password"
            maxlength="150"
            placeholder="Enter Password"
            ref={password}
          />
        </div>
      </form>
        <button className="form-btn" onClick={() => {
          console.log(username.current.value);
          console.log(password.current.value);
        }}>
          Log In
        </button>
      <div className="form-foot">
          Don't have an account?{` `}
          <strong>
            <a href=""> Register here!</a>
          </strong>
      </div>
    </div>
  );
};

export default LogIn;
