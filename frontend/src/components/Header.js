import React from 'react'
import LOGO from '../img/LOGO.png'
import TEXT from '../img/TEXT.png'
import './HeaderFooter.css'
const Header = () => {
  return (
    <div  className='header-container'>
        <img src={LOGO} alt="pumidoro logo" />
        <img src={TEXT} alt="Pumidoro" className='pumitext'/>
    </div>
    
  )
}

export default Header