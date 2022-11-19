import React from 'react';
import LOGO from '../img/LOGO.png';
import TEXT from '../img/TEXT.png';
import './HeaderFooter.css';

const Header = () => {
  return (
    <div className='header-container'>
        <img src={LOGO} alt='Pumidoro Logo'/>
        <img src={TEXT} alt='Pumidoro'/>
    </div>
  )
}

export default Header