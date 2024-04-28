import React from 'react';
import './Navbar.css'

const NavigationBar = () => {
  return (
    <header>
        <div className='navbar-cont'>
        <h1>Flag app</h1>
        <img src="src/assets/logo-techover.png" alt="Techover logo" />  
        <button className='dark-light-mode'>Dark mode</button>    
    </div>
    </header>
  );
};

export default NavigationBar;