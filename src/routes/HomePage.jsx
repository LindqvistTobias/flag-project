import React from 'react';
import './HomePage.css'

const HomePage = () => {
  return (
    <main>
        <div className='filter-cont'>
          <input type="text" className="search" />
          <input type="text" className="choose-region" />
        </div>
        <h2>Hemsida</h2>
    </main>
  );
};

export default HomePage;