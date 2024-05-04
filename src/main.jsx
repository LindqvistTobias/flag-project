import React from 'react';
import ReactDOM from 'react-dom/client'; // Update import statement
import App from './App.jsx';
import './index.css';
import { DarkModeProvider } from '../DarkModeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </React.StrictMode>,
);