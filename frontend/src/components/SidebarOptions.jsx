import { Add } from "@material-ui/icons";
import React from "react";
import "./css/SidebarOptions.css";
import { Link } from "react-router-dom";
function SidebarOptions() {
  return (
    <div className="sidebarOptions">
      <div className="sidebarOption">
        <img
          src="http://drive.google.com/uc?export=view&id=1DPNwnJD0S2BvpjjfvYEBakLETJBefQ33"
          alt=""
        />
        <a
          className="sidbarText"
          href="https://earth.google.com/web/search/Kalinga+Institute+of+Industrial+Technology,+KIIT+Road,+Patia,+Bhubaneswar,+Odisha/@20.3555462,85.8161006,71.94383427a,983.14772684d,35y,0h,45t,0r/data=Cr4BGpMBEowBCiUweDNhMTkwOTE4MTNkYWI4ZDU6MHhhMDMzMDUxY2NkZGJiY2JjGZI3ZRMFWzRAIb7PAv46dFVAKlFLYWxpbmdhIEluc3RpdHV0ZSBvZiBJbmR1c3RyaWFsIFRlY2hub2xvZ3ksIEtJSVQgUm9hZCwgUGF0aWEsIEJodWJhbmVzd2FyLCBPZGlzaGEYAiABIiYKJAmkutX2iL0zQBGhutX2iL0zwBk-eaYG8fJDQCEU8o8tIotOwCgC"
          alt=""
        >
          Direction
        </a>
      </div>

      <Link to="/transport"className="sidebarOption">
        <img
          src="http://drive.google.com/uc?export=view&id=1SK6mjXMa0V1Z_UXWbMff4uC8Ojqrk_Ok"
          alt=""
        />

        <Link to="/transport" className="sidbarText">
          <p>Transportation</p>
        </Link>
      </Link>

      <Link to="/food"  className="sidebarOption">
        <img
          src="http://drive.google.com/uc?export=view&id=1loAVzMJm9O1kqp_er7wpF35GyI0g17O9"
          alt=""
        />
        <Link to="/food" className="sidbarText">
          <p>Food Options</p>
        </Link>
      </Link>

      <Link to="/sports" className="sidebarOption">
        <img
          src="http://drive.google.com/uc?export=view&id=1EHa9NXV_eCjAUC4WzzZFEgXc4dHszxNt"
          alt=""
        />

        <Link to="/sports" className="sidbarText">
          <p>Games and Sports</p>
        </Link>
      </Link>

      <Link to="/tour" className="sidebarOption">
        <img
          src="http://drive.google.com/uc?export=view&id=1HLv5I444xVQO_Rdw-GDr62lTnOV1ooWX"
          alt=""
        />
        <Link to="/tour" className="sidbarText">
          <p>Campus Tour</p>
        </Link>
      </Link>
      <Link to="/nota" className="sidebarOption">
        <Add />
        <Link to="/nota" className="sidbarText">
          <p className="discover">Discover Spaces</p>
        </Link>
      </Link>
    </div>
  );
}

export default SidebarOptions;
