import React, { useRef } from "react";
import "./Form.css";
import axios from "axios";

const background = require('../img/BG.jpg');

const LogIn = () => {
  const username = useRef();
  const password = useRef();
  const login = async (username, password) => {
    try {
      const response = await axios.post(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/auth/login`,
        {
          username,
          password,
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="login-background">
      </div>
      <div className="login-register-container login-container">
        <div className="form-head login-head">
          Login
        </div>
        <form className="pure-form" method="post">
          <div className="username login-register-input">
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
          <div className="password login-register-input">
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
            login();
          }}>
            Login
          </button>
        <div className="form-foot">
            Don't have an account?{` `}
            <strong>
              <a href="/register"> Register here!</a>
            </strong>
        </div>
      </div>
    </>
  );
};

export default LogIn;
