import React from "react";
import WidgetContent from "./WidgetContent";
import "./css/Widget.css";
import {Link} from "react-router-dom"
function Widget() {
  return (
    <Link to="/nota" className="widget">
      <div className="widget__header">
        <h5>Space to follow</h5>
      </div>
      <div className="widget__contents">
        <WidgetContent />
      </div>
    </Link>
  );
}

export default Widget;
