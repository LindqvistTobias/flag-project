import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  const applyTheme = (darkMode) => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--background-color', '#202C36');
      root.style.setProperty('--text-color', '#F2F2F2');
      root.style.setProperty('--component-color', '#2B3844');
    } else {
      root.style.setProperty('--background-color', '#FFFFFF');
      root.style.setProperty('--text-color', '#333333');
      root.style.setProperty('--component-color', '#F2F2F2');
    }
  };

  // Apply theme on initial render
  applyTheme(isDarkMode);

  // Apply theme whenever isDarkMode changes
  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
