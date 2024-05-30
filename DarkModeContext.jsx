import React, { createContext, useContext, useState, useEffect } from 'react';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const defaultLightColors = ['#FFFFFF', '#333333', '#F2F2F2', '#66666620'];
  const defaultDarkColors = ['#202C36', '#F2F2F2', '#435668', '#FFFFFF30'];

  const applyTheme = (darkMode) => {
    const root = document.documentElement;
    if (darkMode) {
      root.style.setProperty('--background-color', root.style.getPropertyValue('--background-color-dark'));
      root.style.setProperty('--text-color', root.style.getPropertyValue('--text-color-dark'));
      root.style.setProperty('--component-color', root.style.getPropertyValue('--component-color-dark'));
      root.style.setProperty('--highlight-color', root.style.getPropertyValue('--highlight-color-dark'));
    } else {
      root.style.setProperty('--background-color', root.style.getPropertyValue('--background-color-light'));
      root.style.setProperty('--text-color', root.style.getPropertyValue('--text-color-light'));
      root.style.setProperty('--component-color', root.style.getPropertyValue('--component-color-light'));
      root.style.setProperty('--highlight-color', root.style.getPropertyValue('--highlight-color-light'));
    }
  };

  const updateTheme = (lightColors, darkColors) => {
    const root = document.documentElement;
    const [lightBackground, lightText, lightComponent, lightHighlight] = lightColors;
    const [darkBackground, darkText, darkComponent, darkHighlight] = darkColors;

    root.style.setProperty('--background-color-light', lightBackground);
    root.style.setProperty('--text-color-light', lightText);
    root.style.setProperty('--component-color-light', lightComponent);
    root.style.setProperty('--highlight-color-light', lightHighlight);

    root.style.setProperty('--background-color-dark', darkBackground);
    root.style.setProperty('--text-color-dark', darkText);
    root.style.setProperty('--component-color-dark', darkComponent);
    root.style.setProperty('--highlight-color-dark', darkHighlight);

    applyTheme(isDarkMode);
  };

  useEffect(() => {
    updateTheme(defaultLightColors, defaultDarkColors);
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode, updateTheme }}>
      {children}
    </DarkModeContext.Provider>
  );
};