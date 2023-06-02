import React from "react";
import Feed from "./Feed";
import KiinectHeader from "./KiinectHeader";
import Sidebar from "./Sidebar";
import Widget from "./Widget";

import "./css/Kiinect.css";

function Kiinect() {
  return (
    <div className="Kiinect">
      <div className="Kiinect__contents">
        <div className="Kiinect__content">
    
          
          <Sidebar />
          <Feed />
          <Widget />
        </div>
      </div>
    </div>
  );
}

export default Kiinect;
