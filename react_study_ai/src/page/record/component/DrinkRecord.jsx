import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Back } from "../../../assets/record/Vector.svg";

const DrinkRecord = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState(null); // API 응답 결과 저장
  const [error, setError] = useState(""); // 오류 메시지 저장

  // Get the drink name from the state
  const drinkName = location.state?.drink || "선택된 음료"; // Default value if not found

  // 음료 종류를 한글로 변환하는 객체
  const drinkNames = {
    WATER: "물",
    COFFEE: "커피",
    TEA: "차",
    SPARKLING_WATER: "탄산수",
    JUICE: "주스",
    MILK: "우유",
  };

  // 선택한 ml 값을 상태로 관리
  const [totalMl, setTotalMl] = useState(0);
  const [activeItem, setActiveItem] = useState(null);

  // 버튼 클릭 시 ml 값을 추가하는 함수
  const handleMlSelect = (ml) => {
    setTotalMl((prevMl) => prevMl + ml); // 기존 값에 추가
    setActiveItem(ml); // 현재 클릭한 ml 값을 activeItem으로 설정
  };

  const handleAddDrink = async () => {
    // 요청할 데이터
    navigate("/record");
    const payload = {
      drink: drinkName,
      total: totalMl,
    };

    console.log("Payload:", payload); // payload 출력

    // total이 30ml 미만인 경우 오류 메시지 출력 후 요청 중단
    if (totalMl < 30) {
      setError("마신 양은 30ml 이상이어야 합니다."); // 오류 메시지 출력
      return; // 요청을 중단
    }

    try {
      const response = await fetch(
        "https://port-0-goormthon-server-lxfol2lf38345220.sel5.cloudtype.app/api/getCalWater",
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
        localStorage.setItem(drinkName, data.data); // 음료 이름에 맞는 키로 로컬스토리지에 저장
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
  };

  return (
    <div className="drink-record-container">
      <div className="drink-record-header">
        <div
          className="drink-record-header-back"
          onClick={() => {
            navigate("/record");
          }}
        >
          <Back />
        </div>
        <div className="drink-record-header-title">몇 ml 섭취 하셨나요?</div>
      </div>
      <div className="drink-record-main">
        {/* 음료 이름을 한글로 변환하여 표시 */}
        <div className="drink-record-main-title">
          {drinkNames[drinkName] || drinkName}{" "}
          {/* drinkName에 해당하는 한글 값으로 변환 */}
        </div>
        <div className="drink-record-main-ml">{totalMl}ml</div>
      </div>
      <div className="drink-record-select-container">
        <div className="drink-record-select-container-box">
          {[30, 50, 100, 150].map((ml) => (
            <div
              key={ml}
              className={`drink-record-select-btn${
                activeItem === ml ? " active" : ""
              }`}
              onClick={() => handleMlSelect(ml)}
            >
              {ml}ML
            </div>
          ))}
        </div>
        <div className="drink-record-select-container-box">
          {[200, 250, 300, 330].map((ml) => (
            <div
              key={ml}
              className={`drink-record-select-btn${
                activeItem === ml ? " active" : ""
              }`}
              onClick={() => handleMlSelect(ml)}
            >
              {ml}ML
            </div>
          ))}
        </div>
        <div className="drink-record-select-container-box">
          {[400, 500, 600].map((ml) => (
            <div
              key={ml}
              className={`drink-record-select-btn${
                activeItem === ml ? " active" : ""
              }`}
              onClick={() => handleMlSelect(ml)}
            >
              {ml}ML
            </div>
          ))}
        </div>
        <div className="drink-record-select-container-box">
          {[800, 1000].map((ml) => (
            <div
              key={ml}
              className={`drink-record-select-btn${
                activeItem === ml ? " active" : ""
              }`}
              onClick={() => handleMlSelect(ml)}
            >
              {ml}ML
            </div>
          ))}
        </div>
      </div>

      <div
        className="drink-record-footer"
        onClick={totalMl >= 30 ? handleAddDrink : null}
        style={{
          cursor: totalMl >= 30 ? "pointer" : "not-allowed",
          opacity: totalMl >= 30 ? 1 : 0.5,
        }} // totalMl이 30ml 이상일 때만 버튼 활성화
      >
        추가하기
      </div>
    </div>
  );
};

export default DrinkRecord;
