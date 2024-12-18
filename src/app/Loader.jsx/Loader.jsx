import React from 'react';
import LoaderImg from "../../assets/Loader/bus.gif"
import "./Loader.css"

const Loader = () => {
  return (
    <div className="loader-container">
      <img src={LoaderImg} alt="Loading..." />
      <div className="loader-title">Checking! Please wait...</div>
      <div className="loader-subtitle">Your jeepney is on its way... Beep Beep</div>
    </div>
  );
};

export default Loader;
