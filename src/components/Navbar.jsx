import React, { useState } from 'react';
import './Navbar.css';
import techoverLogoLight from '../assets/techover-logo.png';
import techoverLogoDark from '../assets/techover-logo-dark.png';
import moonBlack from '../assets/moon-bordered.svg';
import moonWhite from '../assets/moon.svg';

const NavigationBar = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [moonIcon, setMoonIcon] = useState(moonBlack);

    const toggleMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        setMoonIcon(newMode ? moonWhite : moonBlack);

        // Update CSS variables based on the mode
        const root = document.documentElement;
        if (newMode) {
            root.style.setProperty('--background-color', '#202C36');
            root.style.setProperty('--text-color', '#F2F2F2');
            root.style.setProperty('--component-color', '#2B3844');
        } else {
            root.style.setProperty('--background-color', '#FFFFFF');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--component-color', '#F2F2F2');
        }
    };

    const getLogoSource = () => {
        return isDarkMode ? techoverLogoLight : techoverLogoDark ;
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