import React from "react";
import { Skeleton } from '@mui/material';
import "./SkeletonCountryCard.css";
import '../SkeletonBlink.css';


const SkeletonCountryCard = () => {
  return (
    <div className="skeleton-cards-container">
      {Array.from({ length: 12 }).map((_, index) => (
        <div className="skeleton-container" key={index}>
          <Skeleton className="blinking-skeleton" variant="square" sx={{height: 140, width: '100%'}}  />
          <div className="skeleton-country-card-text">
            <h3>
              <Skeleton className="blinking-skeleton" width="90%" height={30} />
            </h3>
            <div className="skeleton-country-card-text-name">
              <p>Population:</p> <Skeleton className="blinking-skeleton" width={100} height={20} />
            </div>
            <div className="skeleton-country-card-text-name">
              <p>Region:</p> <Skeleton className="blinking-skeleton" width={128} height={20} />
            </div>
            <div className="skeleton-country-card-text-name">
              <p>Capital:</p> <Skeleton className="blinking-skeleton" width={126} height={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCountryCard;
