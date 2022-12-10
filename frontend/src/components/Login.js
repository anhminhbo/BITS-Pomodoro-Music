import React, { useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Form.css";

const LogIn = () => {
  const username = useRef();
  const password = useRef();

  return (
    <div className="login-register-container">
      <div className="form-body">
        <div className="form-head login-head">
          <h1>Login</h1>
        </div>
        <form className="pure-form" method="post">
          <div className="username">
            <label className="formlabel" for="username">
              Username
            </label>
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
            <label className="formlabel" for="password">
              Password
            </label>
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
        <div className="btn">
          <button onClick={() => {
            console.log(username.current.value);
            console.log(password.current.value);
          }}>Log In</button>
        </div>
        <div className="form-foot">
          <p>
            Don't have an account?{" "}
            <strong>
              <a href=""> Register here.</a>
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
