import React, { useState } from "react";
import { CallGpt } from "../../api/gpt";
import InputBox from "./InputBox";

const fake = JSON.parse(`{"title": "약 이름", "content":"영양제 내용"}`);

const Index = () => {
  const [data, setData] = useState(fake);
  const [loading, setLoading] = useState(false);
  const [qs, setQs] = useState();

  const handleClickGpt = async (userInput) => {
    try {
      setLoading(true);
      const message = await CallGpt({
        prompt: `${userInput}`,
      });

      // 백틱과 ```json 포맷 제거
      const cleanedMessage = message.replace(/```json|```/g, "").trim();

      // JSON 파싱 후 상태 업데이트
      setData(JSON.parse(cleanedMessage));
      setQs(userInput);
      console.log("inputdata", userInput, "message", message);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputBox onClick={handleClickGpt} />
      <div>내 질문: {qs}</div>
      <div>약이름: {data?.title}</div>
      <div>content: {data?.content}</div>
      {/* <div>ingredient: {data?.ingredient}</div>
      <div>effect: {data?.effect}</div>
      <div>taking: {data?.taking}</div> */}
    </>
  );
};

export default Index;
