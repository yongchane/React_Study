import React, { useState } from "react";
import Progress from "../../assets/login/Progress4.svg";
import Rain from "../../assets/main/Rain.svg";
import Cloud from "../../assets/main/Cloud.svg";
import Sun from "../../assets/main/Sun.svg";
import { useLocation, useNavigate } from "react-router-dom";

function Login4() {
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve gender, weight, and isOld from the previous state
  const { gender, weight, isOld } = location.state || {};

  // State to track the selected weather
  const [selectedWeather, setSelectedWeather] = useState("");
  const [result, setResult] = useState(null); // API 응답 결과 저장
  const [error, setError] = useState(""); // 오류 메시지 저장

  // Function to handle weather selection
  const handleWeatherSelect = (weather) => {
    setSelectedWeather(weather);
  };

  // Function to navigate to the next page with all data
  const handleNextClick = async () => {
    const payload = {
      gender: gender,
      isOld: isOld,
      weight: weight,
    };

    console.log("Payload:", payload); // payload 출력

    try {
      const response = await fetch(
        "https://port-0-goormthon-server-lxfol2lf38345220.sel5.cloudtype.app/api/getWaterIntake",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // 요청 헤더에서 Content-Type 명시
            Accept: "application/json", // 응답 형식을 JSON으로 설정
          },
          body: JSON.stringify(payload), // JSON으로 직렬화된 데이터
        }
      );

      const data = await response.json();
      console.log("Response Data:", data); // 응답 데이터 출력

      if (response.ok) {
        // 성공적으로 데이터 수신
        setResult(data.data);
        localStorage.setItem("neededWater", data.data);
        localStorage.setItem("weather", selectedWeather); // 음료 이름에 맞는 키로 로컬스토리지에 저장
        setError(""); // 오류 초기화
      } else {
        // 오류 처리
        setError(data.message || "API 오류 발생"); // 오류 메시지 설정
        setResult(null); // 결과 초기화
      }
    } catch (err) {
      // 네트워크 오류 처리
      console.error("Network Error:", err); // 네트워크 오류 출력
      setError("네트워크 오류가 발생했습니다.");
      setResult(null);
    }
    navigate("/main", {
      state: { gender, weight, isOld, selectedWeather },
    });
  };

  return (
    <>
      <div className="login4_container">
        <div className="login4_text">오늘 날씨는 어떤가요?</div>
        <div className="weather_select">
          <div
            className={`weather ${
              selectedWeather === "추움" ? "selected" : ""
            }`} // Add selected class conditionally
            onClick={() => handleWeatherSelect("추움")}
          >
            <div className="weather_content">
              <div>추움</div>
              <div>바람이 많고 비 오는날</div>
            </div>
            <div className="weather_image">
              <img
                src={Rain}
                alt=""
                style={{ width: "60px", height: "60px" }}
              />
            </div>
          </div>
          <div
            className={`weather ${
              selectedWeather === "보통" ? "selected" : ""
            }`} // Add selected class conditionally
            onClick={() => handleWeatherSelect("보통")}
          >
            <div className="weather_content">
              <div>보통</div>
              <div>온대 기후</div>
            </div>
            <div className="weather_image">
              <img
                src={Cloud}
                alt=""
                style={{ width: "60px", height: "60px" }}
              />
            </div>
          </div>
          <div
            className={`weather ${
              selectedWeather === "더움" ? "selected" : ""
            }`} // Add selected class conditionally
            onClick={() => handleWeatherSelect("더움")}
          >
            <div className="weather_content">
              <div>더움</div>
              <div>햇빛이 많고 더운 날</div>
            </div>
            <div className="weather_image">
              <img src={Sun} alt="" style={{ width: "60px", height: "60px" }} />
            </div>
          </div>
        </div>
        <div className="login4_progress">
          <img src={Progress} alt="" />
        </div>
        <div className="login4_next_button">
          <button
            className="login4_btn"
            onClick={handleNextClick}
            disabled={!selectedWeather}
          >
            다음
          </button>
        </div>
      </div>
    </>
  );
}

export default Login4;
