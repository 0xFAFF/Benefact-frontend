import React from "react";
import "./index.scss";

const PacmanLoader = () => {
  return (
    <div id="pacman-loader-container">
      <div className="loading-text">Loading..</div>
      <div id="pacman-loader">
        <div className="circles">
          <span className="one" />
          <span className="two" />
          <span className="three" />
        </div>
        <div className="pacman">
          <span className="top" />
          <span className="bottom" />
          <span className="left" />
          <div className="eye" />
        </div>
      </div>
    </div>
  );
};

export default PacmanLoader;
