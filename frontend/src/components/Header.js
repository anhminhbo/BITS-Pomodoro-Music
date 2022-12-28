import React, { useState } from 'react';
import LOGO from '../img/LOGO.png';
import TEXT from '../img/TEXT.png';
import './HeaderFooter.css';
import axios from "axios";

const Header = () => {
  const name = "Temp";
  const [isOpen, setIsOpen] = useState(false);

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
          alert("ERROR: Please login first!");
          window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/login';
        }
    }
  };

  return (
    <>
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
              <li>{`Hello, ${name}`}</li>
              <li className="btn">Change Password</li>
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