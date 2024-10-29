import React from "react";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  return (
    <div className="stc-header-container">
      <div className="stc-header">
        <div
          className="stc-header-m"
          onClick={() => {
            navigate("/statistic");
          }}
        >
          일
        </div>
        <div
          className="stc-header-w"
          onClick={() => {
            navigate("/week");
          }}
        >
          주
        </div>
      </div>
    </div>
  );
};

export default Header;
