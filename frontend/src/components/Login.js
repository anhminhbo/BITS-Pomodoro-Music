import React, { useRef } from "react";
import "./Form.css";
import axios from "axios";

const background = require("../img/BG.jpg");

const LogIn = () => {
  const username = useRef();
  const password = useRef();

  const login = async (username, password) => {
    document.getElementById("login-usernotfound-message").style.display =
    "none";
    document.getElementById("login-passwordinvalid-message").style.display =
    "none";
    try {
      const payload = {
        username,
        password,
      };

      await axios.post(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/auth/login`,
        payload
      );

      window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + "/main";
    } catch (err) {
      if (err.response.data.errCode === 103) {
        // Handle when user not found
        console.log(err);
        console.log("Handle when user not found");
        document.getElementById("login-usernotfound-message").style.display =
        "block";

      } else if (err.response.data.errCode === 102) {
        // Handle when Password is invalid
        console.log("Handle when Password is invalid");
        document.getElementById("login-passwordinvalid-message").style.display =
        "block";

      }
    }
  };

  return (
    <>
      <div className="login-background">
        <div
          className="login-register-container login-container"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              login(username.current.value, password.current.value);
            }
          }}
        >
          <div className="form-head login-head">Login</div>
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
                defaultValue={
                  sessionStorage.getItem("username")
                    ? sessionStorage.getItem("username")
                    : ""
                }
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
          <button
            className="form-btn"
            onClick={() => {
              login(username.current.value, password.current.value);
            }}
          >
            Login
          </button>
          <div id="login-usernotfound-message" className="register-message">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                fill="currentColor"
                class="bi bi-exclamation-circle-fill"
                viewBox="0 0 16 16"
                className="register-message-icon"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
              User not found.
            </div>
            <div id="login-passwordinvalid-message" className="register-message">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                fill="currentColor"
                class="bi bi-exclamation-circle-fill"
                viewBox="0 0 16 16"
                className="register-message-icon"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
              </svg>
              Password is invalid.
            </div>
          <div className="form-foot">
            Don't have an account?{` `}
            <strong>
              <a href="/register"> Register here!</a>
            </strong>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogIn;
