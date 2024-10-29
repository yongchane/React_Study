import React from "react";
import Skyblue from "../assets/main/Skyblue.svg";
import White from "../assets/main/White.svg";
import Logo from "../assets/main/Logo.svg";
import { useLocation, useNavigate } from "react-router-dom";

import Ship from "../assets/main/Ship.svg";

function LogoPage() {
  const navigate = useNavigate();

  return (
    <div
      className="logo_container"
      onClick={() => {
        navigate("/login1");
      }}
    >
      <div className="logo">
        <img src={Logo} alt="" style={{ width: "450px" }} />
      </div>
      <div className="logo_background">
        <img
          className="ship"
          src={Ship}
          alt=""
          style={{ width: "150px", height: "120px" }}
        />
        <img
          className="back_skyblue"
          src={Skyblue}
          alt=""
          style={{ width: "450px" }}
        />
        <img
          className="back_white"
          src={White}
          alt=""
          style={{ width: "450px" }}
        />
      </div>
    </div>
  );
}

export default LogoPage;
