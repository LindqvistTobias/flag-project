import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './routes/HomePage';
import CountryPage from './routes/CountryPage';
import Navbar from './components/Navbar';
import FooterBar from './components/FooterBar';
import './App.css'
import { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const App = () => { 
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <Router>      
          <Navbar />        
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/:name" element={<CountryPage />} />
          </Routes> 
          <FooterBar />       
      </Router>
    </SkeletonTheme>
  );
};

export default App;
