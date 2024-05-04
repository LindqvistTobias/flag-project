import React, { createContext, useContext, useState } from 'react';

// Create a context object for dark mode
const DarkModeContext = createContext();

// Custom hook to access the dark mode context
export const useDarkMode = () => useContext(DarkModeContext);

// Provider component to wrap your app and provide the dark mode state
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};
