import React from "react";
import "./SkeletonCountryCard.css";
import Skeleton from "react-loading-skeleton";

const SkeletonCountryCard = () => {
  return (
    <div className="skeleton-cards-container">
      {Array.from({ length: 12 }).map((_, index) => (
        <div className="skeleton-container" key={index}>
          <Skeleton height={140} width="100%" />
          <div className="skeleton-country-card-text">
            <h3>
              <Skeleton width="90%" />
            </h3>
            <div className="skeleton-country-card-text-name">
              <p>Population:</p> <Skeleton width={100} height={20} />
            </div>
            <div className="skeleton-country-card-text-name">
              <p>Region:</p> <Skeleton width={128} height={20} />
            </div>
            <div className="skeleton-country-card-text-name">
              <p>Capital:</p> <Skeleton width={126} height={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCountryCard;
