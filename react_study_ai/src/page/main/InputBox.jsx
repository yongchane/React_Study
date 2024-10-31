import React from "react";
import { useState } from "react";

const InputBox = ({ onClick }) => {
  //사용자의 입력을 받아, 상위컴포넌트로 데이터 전달
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    onClick(userInput);
    setUserInput("");
  };
  return (
    <div className="inputbox-container">
      <textarea
        className="inputbox"
        value={userInput}
        onChange={handleUserInput}
        placeholder="오늘의 컨디션은 어떤가요?"
        rows={4} // 텍스트박스 높이 조정 (선택 사항)
      />
      <div className="inputbox-btn" onClick={handleClick}>
        {" "}
        컨디션 상태 기록{" "}
      </div>
    </div>
  );
};

export default InputBox;
