import React, { useEffect, useRef, useState } from 'react';
import LOGO from '../img/LOGO.png';
import TEXT from '../img/TEXT.png';
import './HeaderFooter.css';
import axios from "axios";
import './ChangePassword.css'

const Header = () => {
  const [username, setUsername] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const oldPassword = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();

  const handleCloseAndOpen = () => {
    setIsOpen(!isOpen);
    const opacity = document.getElementById("header-menu").style.opacity;
    if (opacity === "1") {
      document.getElementById("header-menu").style.visibility = "hidden";
      document.getElementById("header-menu").style.opacity = "0";
    } 
    else {
      document.getElementById("header-menu").style.visibility ="visible";
      document.getElementById("header-menu").style.opacity = "1";
    }
  }

  const handleCloseAndOpenChangePass = () => {
    const opacity = document.getElementById("changePass-outer").style.opacity;
    if (opacity === "1") {
      document.getElementById("changePass-outer").style.visibility = "hidden";
      document.getElementById("changePass-outer").style.opacity = "0";
    } 
    else {
      document.getElementById("changePass-outer").style.visibility ="visible";
      document.getElementById("changePass-outer").style.opacity = "1";
    }
    oldPassword.current.value = "";
    newPassword.current.value = "";
    confirmPassword.current.value = "";
    document.getElementById("changePass-old-password-message").style.display = "none";
    document.getElementById("changePass-new-password-message").style.display = "none";
    document.getElementById("changePass-con-password-message").style.display = "none";
    document.getElementById("changePass-new-password-message-2").style.display = "none";
  }

  const changePass = async (oldPassword, newPassword) => {
    try {
      const payload = {
        oldPassword,
        newPassword
      };
      const response = await axios.put(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/auth/changePassword`,
        payload
      );

      // Han"dle change pass
      alert("Your password has been changed!!!");
      handleCloseAndOpenChangePass();
      return response;
    } 
    catch (err) {
      if (err.response.data.errCode === 112) {
        // Handle when session expired
        window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + "/login";
      } 
      else {
        if (err.response.data.errCode === 102) {
          document.getElementById("changePass-old-password-message").style.display = "block";
        }
        else {document.getElementById("changePass-old-password-message").style.display = "none";}
        if (err.response.data.errCode === 122) {
          document.getElementById("changePass-new-password-message-2").style.display = "block";
        }
        else {document.getElementById("changePass-new-password-message-2").style.display = "none";}
      }
      console.log(err.response.data);
    }
  }

  const handleChangePass = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    let checkNewPassword = false;
    let checkSamePassword = false;
    if (newPassword.current.value.match(passwordRegex)) {
      checkNewPassword = true;
      document.getElementById("changePass-new-password-message").style.display = "none";
    } 
    else {
      document.getElementById("changePass-new-password-message").style.display = "block";
    }
    if (newPassword.current.value === confirmPassword.current.value){
      checkSamePassword = true;
      document.getElementById("changePass-con-password-message").style.display = "none";
    } 
    else {
      document.getElementById("changePass-con-password-message").style.display = "block";
    }
    if (checkNewPassword && checkSamePassword) {
      changePass(oldPassword.current.value, newPassword.current.value);
    }
  }

  useEffect(() => {
    if (window.location.href === window.__RUNTIME_CONFIG__.FRONTEND_URL + '/main') getUsername();
  }, [])

  const getUsername = async () => {
    try {
      const response = await axios.get(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/user/getUsername`
      );
      setUsername(response.data.data);
    } 
    catch (err) {
        if (err.response.data.errCode === 112) {
          // Handle when session expired
          window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/login';
        }
    }
  }

  const logOut = async () => {
    try {
      const response = await axios.get(
        `${window.__RUNTIME_CONFIG__.BACKEND_URL}/api/auth/logout`
      );
      console.log(response.data.message);
      window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/login';
    } 
    catch (err) {
        if (err.response.data.errCode === 112) {
          // Handle when session expired
          window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/login';
        }
    }
  };

  return (
    <>
      <div id="changePass-outer">
          <div className="changePass-container" 
               onKeyDown={(e) => {
               if (e.key === "Enter") {
                 handleChangePass();
               }
          }}>
              <div className="changePass-header">
                  <h1 className='changePass-title'>Change Password</h1> 
                  <svg className='bi bi-x changePass-close-icon' xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" onClick={() => handleCloseAndOpenChangePass()}>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
              </div>
              <div className="changePass-label">Current Password</div>
              <input type="password" id="changePass-current-pass" className='changePass-input' ref={oldPassword}/>
              <div id="changePass-old-password-message" className="changePass-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="currentColor"
                  class="bi bi-exclamation-circle-fill"
                  viewBox="0 0 16 16"
                  className="changePass-message-icon"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
                Your password was not updated, since the provided current password does not match.
              </div>
              <div className="changePass-label">New Password</div>
              <input type="password" id="changePass-new-pass" className='changePass-input' ref={newPassword}/>
              <div id="changePass-new-password-message" className="changePass-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="currentColor"
                  class="bi bi-exclamation-circle-fill"
                  viewBox="0 0 16 16"
                  className="changePass-message-icon"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
                Password must be at least 8 characters and contains at least ONE
                number, ONE lowercase character, ONE uppercase character and NO special characters.
              </div>
              <div id="changePass-new-password-message-2" className="changePass-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="currentColor"
                  class="bi bi-exclamation-circle-fill"
                  viewBox="0 0 16 16"
                  className="changePass-message-icon"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
                Your new password is the same as your old password. Please enter again.
              </div>
              <div className="changePass-label">Confirm Password</div>
              <input type="password" id="changePass-confirm-new-pass" className='changePass-input' ref={confirmPassword}/>
              <div id="changePass-con-password-message" className="changePass-message">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  fill="currentColor"
                  class="bi bi-exclamation-circle-fill"
                  viewBox="0 0 16 16"
                  className="changePass-message-icon"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                </svg>
                Unmatched password.
              </div>
              <input type="button" id="changePass-btn" value="Submit" onClick={() => handleChangePass()}/>
          </div>
      </div>
      <div className='header-container'>
        <img src={LOGO} alt='Pumidoro Logo'/>
        <img src={TEXT} alt='Pumidoro'/>
      </div>
      {
        window.location.href == window.__RUNTIME_CONFIG__.FRONTEND_URL + '/main' 
        ?
          <>
            <div id="header-menu-btn" onClick={() => handleCloseAndOpen()}>
              {
                isOpen ?
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
              }
            </div>
            <div id="header-menu">
              <li>{`Hello, `}
                <div id="header-username" style={{display: "inline"}}>{username}</div>
              </li>
              <li className="btn" onClick={() => handleCloseAndOpenChangePass()}>Change Password</li>
              <li className='btn' onClick={() => logOut()}>Logout</li>
            </div>
          </>
        :
        <></>
      }
    </>
  )
}

export default Header