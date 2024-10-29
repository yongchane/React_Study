import React, { useState } from "react";
import Progress from "../../assets/login/Progress3.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Login3() {
  const navigate = useNavigate();
  const location = useLocation();
  const { gender, weight } = location.state || {};

  const handleButtonClick = (isOld) => {
    // Navigate to Login4 with gender, weight, and isOld
    navigate("/login4", { state: { gender, weight, isOld } });
  };

  console.log(gender);
  console.log(weight);
  return (
    <>
      <div className="login3_container">
        <div className="login3_text">
          <div className="login3_text1">65세 이상이신가요?</div>
          <div className="login3_text2">
            65세를 기준으로 수분 섭취 권장량을 추천해주고 있습니다.
          </div>
        </div>

        <div className="login3_btn_container">
          <button
            className="login3_btn"
            onClick={() => handleButtonClick(false)}
          >
            아니오
          </button>
          <button
            className="login3_btn"
            onClick={() => handleButtonClick(true)}
          >
            예
          </button>
        </div>
        <div className="login3_progress">
          <img src={Progress} alt="" />
        </div>
      </div>
    </>
  );
}

export default Login3;
