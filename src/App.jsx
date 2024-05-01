import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import CountryPage from './routes/CountryPage';
import Navbar from './components/Navbar';

const App = () => { 
  return (
    <Router>      
        <Navbar />        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:name" element={<CountryPage />} />
        </Routes>        
    </Router>
  );
};

export default App;
