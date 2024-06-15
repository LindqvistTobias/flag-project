import React, { useState } from "react";
import { useDarkMode } from "../../DarkModeContext";
import "./FooterBar.css";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Filter1SharpIcon from "@mui/icons-material/Filter1Sharp";
import Filter2SharpIcon from "@mui/icons-material/Filter2Sharp";
import Filter3SharpIcon from "@mui/icons-material/Filter3Sharp";
import Divider from "@mui/material/Divider";

const FooterBar = ({ isLoading, toggleLoadingState }) => {
  const [highlightedButton, setHighlightedButton] = useState("color-one");
  const { isDarkMode, updateTheme } = useDarkMode();

  const changeColor = (lightColors, darkColors, buttonId) => {
    updateTheme(lightColors, darkColors);
    setHighlightedButton(buttonId);
  };

  const defaultLightColors = ["#FFFFFF", "#333333", "#F2F2F2", "#66666620"];
  const defaultDarkColors = ["#202C36", "#F2F2F2", "#435668", "#FFFFFF30"];

  return (
    <div className="footer-main">
      <div className="footer-container">
        <button
          className={`button-color ${
            highlightedButton === "color-one" ? "highlight" : ""
          }`}
          id="color-one"
          onClick={() =>
            changeColor(defaultLightColors, defaultDarkColors, "color-one")
          }
        >
          <Filter1SharpIcon />
        </button>
        <button
          className={`button-color ${
            highlightedButton === "color-two" ? "highlight" : ""
          }`}
          id="color-two"
          onClick={() =>
            changeColor(
              ["#EEEEEE", "#444444", "#CCCCCC", "#88888820"],
              ["#333333", "#d9bd43", "#222222", "#66666640"],
              "color-two"
            )
          }
        >
          <Filter2SharpIcon />
        </button>
        <button
          className={`button-color ${
            highlightedButton === "color-three" ? "highlight" : ""
          }`}
          id="color-three"
          onClick={() =>
            changeColor(
              ["#DDDDDD", "#222222", "#AAAAAA", "#44444420"],
              ["#111111", "#ff523b", "#000000", "#33333320"],
              "color-three"
            )
          }
        >
          <Filter3SharpIcon />
        </button>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ borderColor: "var(--text-color)" }}
        />
        <button className="hourglass" onClick={toggleLoadingState}>
          {isLoading ? <HourglassBottomIcon /> : <HourglassTopIcon />}
        </button>
      </div>
    </div>
  );
};

export default FooterBar;
