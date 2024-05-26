import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CountryPage.css";
import arrowLeftWhite from "../assets/arrow-left.svg";
import arrowLeftDark from "../assets/arrow-left-dark.svg";
import { useDarkMode } from "../../DarkModeContext";
import { Skeleton } from "@mui/material";
import "react-loading-skeleton/dist/skeleton.css";
import FooterBar from "../components/FooterBar";
import "../SkeletonBlink.css";

const CountryPage = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const { isDarkMode } = useDarkMode();
  const [currentCountry, setCurrentCountry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCountryData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}`
        );
        const countryData = response.data[0]; // Assuming the first item is the matched country
        setCurrentCountry(countryData);
      } catch (error) {
        console.error("Error fetching country data:", error);
        setCurrentCountry(null); // Handle error by setting currentCountry to null
      }
      setIsLoading(false);
    };

    fetchCountryData();
  }, [name]);

  const getArrowIconSource = () => {
    return isDarkMode ? arrowLeftWhite : arrowLeftDark;
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleBorderCountryClick = async (cca3Code) => {
    try {
      // Fetch country data based on the cca3Code
      const response = await axios.get(
        `https://restcountries.com/v3.1/alpha/${cca3Code}`
      );

      // Check if response data is valid and contains the country name
      if (
        Array.isArray(response.data) &&
        response.data.length > 0 &&
        response.data[0].name &&
        response.data[0].name.common
      ) {
        const matchedCountryName = response.data[0].name.common;

        // Navigate to the matched country's route
        navigate(`/${matchedCountryName}`);
      } else {
        throw new Error("Invalid response data or missing country name");
      }
    } catch (error) {
      console.error("Error fetching border country data:", error.message);
      // Handle error if the border country data cannot be fetched
      // Display an error message or take appropriate actions
    }
  };

  const toggleLoadingState = () => {
    setIsLoading((prevLoading) => !prevLoading);
  };

  const getFirstNativeNameCommon = () => {
    const { nativeName } = currentCountry?.name || {};
    const firstNativeName = Object.values(nativeName || {})[0];
    return firstNativeName?.common || "Unknown Native Name";
  };

  const getFirstLanguageName = () => {
    const languageEntries = Object.entries(currentCountry?.languages || {});
    return languageEntries.length > 0
      ? languageEntries[0][1] || "Unknown Language"
      : "Unknown Language";
  };

  return (
    <div className="main-container">
      <div className="back-container" onClick={handleGoBack}>
        <img src={getArrowIconSource()} alt="arrow" id="arrow" />
        <p className="back-button">BACK</p>
      </div>
      <div className="card-container">
        {isLoading ? (
          <Skeleton
            className="blinking-skeleton"
            variant="square"
            width={600}
            height={300}
          /> // Display skeleton while loading
        ) : (
          <img
            className="flag-image"
            src={currentCountry?.flags?.svg || ""}
            alt={`Flag of ${currentCountry?.name?.common || ""}`}
          />
        )}
        <div className="text-container">
          <h2>
            {isLoading ? (
              <Skeleton className="blinking-skeleton" width={250} height={80} />
            ) : (
              currentCountry.name.common
            )}
          </h2>
          <div className="text-info-container">
            <div className="text-info-small-container">
              <div className="text-info">
                <p>Population:</p>{" "}
                {isLoading ? (
                  <Skeleton
                    className="blinking-skeleton"
                    width={75}
                    height={25}
                  />
                ) : (
                  currentCountry.population
                )}
              </div>
              <div className="text-info">
                <p>Region:</p>{" "}
                {isLoading ? (
                  <Skeleton
                    className="blinking-skeleton"
                    width={75}
                    height={25}
                  />
                ) : (
                  currentCountry.region
                )}
              </div>
              <div className="text-info">
                <p>Capital:</p>{" "}
                {isLoading ? (
                  <Skeleton
                    className="blinking-skeleton"
                    width={75}
                    height={25}
                  />
                ) : (
                  currentCountry?.capital
                )}
              </div>
              <div className="text-info">
                <p>Native name:</p>{" "}
                {isLoading ? (
                  <Skeleton
                    className="blinking-skeleton"
                    width={75}
                    height={25}
                  />
                ) : (
                  getFirstNativeNameCommon()
                )}
              </div>
            </div>
            <div className="text-info-small-container">
              <div>
                <div className="text-info">
                  <p>Top Level Domain:</p>{" "}
                  {isLoading ? (
                    <Skeleton
                      className="blinking-skeleton"
                      width={75}
                      height={25}
                    />
                  ) : (
                    currentCountry.tld
                  )}
                </div>
                <div className="text-info">
                  <p>Currencies:</p>{" "}
                  {isLoading ? (
                    <Skeleton
                      className="blinking-skeleton"
                      width={75}
                      height={25}
                    />
                  ) : (
                    Object.values(currentCountry.currencies || {})
                      .map((currency) => currency.name)
                      .join(", ") || "Unknown Currency"
                  )}
                </div>
                <div className="text-info">
                  <p>Languages:</p>{" "}
                  {isLoading ? (
                    <Skeleton
                      className="blinking-skeleton"
                      width={75}
                      height={25}
                    />
                  ) : (
                    getFirstLanguageName()
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="border-countries">
            <p>Border Countries:</p>
            <ul>
              {isLoading ? (
                <div className="border-skeleton">
                  <Skeleton
                    className="blinking-skeleton"
                    width={45}
                    height={40}
                  />
                  <Skeleton
                    className="blinking-skeleton"
                    width={45}
                    height={40}
                  />
                  <Skeleton
                    className="blinking-skeleton"
                    width={45}
                    height={40}
                  />
                  <Skeleton
                    className="blinking-skeleton"
                    width={45}
                    height={40}
                  />
                </div>
              ) : currentCountry.borders &&
                currentCountry.borders.length > 0 ? (
                currentCountry.borders.map((border) => (
                  <li key={border}>
                    <button
                      className="border"
                      onClick={() => handleBorderCountryClick(border)}
                    >
                      {border || "Unknown Country"}
                    </button>
                  </li>
                ))
              ) : (
                <li>No neighbors</li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <FooterBar
        isLoading={isLoading}
        toggleLoadingState={toggleLoadingState}
      />
    </div>
  );
};

export default CountryPage;
