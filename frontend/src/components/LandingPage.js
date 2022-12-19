import React from 'react'
import './LandingPage.css'

function LandingPage() {
  console.log(window.__RUNTIME_CONFIG__.BACKEND_URL);
  console.log(window.__RUNTIME_CONFIG__.FRONTEND_URL);
  return (
      <div className = "landing-page-container">
          <div className = "landing-page-content">
              <div className = "landing-page-title">
                  <h1> PUMIDORO </h1>
                  <h3> Pomodoro Music Website </h3>
              </div>
              
              <div className = "landing-page-button">
                  <button className = "started-btn" onClick={() => {window.location.href = window.__RUNTIME_CONFIG__.FRONTEND_URL + '/register'}}> Get Started </button>
              </div>

              <div className = "landing-page-btn-label">
                  <p>Already have an account? <strong><a href='/login'>Log in here!</a></strong></p>
              </div>
          </div>
      </div>
  )
}

export default LandingPage