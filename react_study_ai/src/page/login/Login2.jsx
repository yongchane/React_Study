import React, { useState } from "react";
import Progress from "../../assets/login/Progress2.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Login2() {
  const navigate = useNavigate();

  const location = useLocation();
  const { gender } = location.state || {};

  console.log(gender);

  const [weight, setWeight] = useState(0);

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };
  console.log(weight);
  return (
    <>
      <div className="login2_container">
        <div className="login2_text">
          <div className="login2_text1">몸무게를 입력해 주세요</div>
          <div className="login2_text2">정수로 입력해 주세요</div>
        </div>
        <div className="input_weight">
          <input
            type="text"
            placeholder="00"
            value={weight}
            onChange={handleWeightChange}
          />
          Kg
        </div>
        <div className="login1_progress">
          <img src={Progress} alt="" />
        </div>
        <div className="login2_next_button">
          <button
            className="next_button"
            onClick={() => {
              navigate("/login3", {
                state: { gender: gender, weight: weight },
              });
            }}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}

export default Login2;
