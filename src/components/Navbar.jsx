import React from 'react';
import './Navbar.css';
import techoverLogoLight from '../assets/techover-logo.png';
import techoverLogoDark from '../assets/techover-logo-dark.png';
import moonBlack from '../assets/moon-bordered.svg';
import moonWhite from '../assets/moon.svg';
import { useDarkMode } from '../../DarkModeContext';

const NavigationBar = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const getLogoSource = () => {
    return isDarkMode ? techoverLogoLight : techoverLogoDark;
  };

  const moonIcon = isDarkMode ? moonWhite : moonBlack;

  const toggleMode = () => {
    toggleDarkMode(); // Toggle dark mode state using the context function
  };

  return (
    <header>
      <div className='navbar-cont'>
        <h1>The Flag App</h1>
        <img className="logo" src={getLogoSource()} alt="Techover logo" />  
        <button className='dark-light-mode' onClick={toggleMode}>
          <img src={moonIcon} className="moon-icon" alt="Moon icon" />
          {isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}
        </button> 
      </div>
    </header>
  );
};

export default NavigationBar;
