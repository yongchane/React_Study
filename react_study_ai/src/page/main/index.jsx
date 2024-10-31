import React, { useState } from "react";
import { CallGpt } from "../../api/gpt";
import InputBox from "./InputBox";

const fake = JSON.parse(
  `{"title": "약 이름", "ingredient": "약 소개", "effect": "약 효과" ,"taking": "약복용 방법"}`
);

const Index = () => {
  const [data, setData] = useState(fake);
  const [loading, setLoading] = useState(false);
  const [qs, setQs] = useState();

  const sanitizeJsonString = (jsonString) => {
    // JSON 문자열을 정제하는 함수
    return jsonString
      .replace(/```json|```/g, "") // 코드 블록 표시 제거
      .replace(/\n/g, "") // 개행 문자 제거
      .replace(/\s+/g, " ") // 연속된 공백을 하나의 공백으로 축소
      .trim();
  };

  const validateAndParseJson = (jsonString) => {
    // JSON 문자열의 유효성을 검사하고 파싱하는 함수
    try {
      let cleanedString = sanitizeJsonString(jsonString); // 변경: const를 let으로 선언

      // JSON 문자열의 끝에 '}' 추가
      if (!cleanedString.endsWith("}")) {
        cleanedString += "}";
      }

      // 잘 정제된 JSON 문자열인지 확인 후 파싱
      if (cleanedString.startsWith("{")) {
        return JSON.parse(cleanedString);
      } else {
        console.error("유효하지 않은 JSON 형식:", cleanedString);
        return null;
      }
    } catch (error) {
      console.error("입력 메시지를 JSON으로 파싱하는 중 오류 발생:", error);
      return null;
    }
  };

  const handleClickGpt = async (userInput) => {
    try {
      setLoading(true);
      setQs(userInput);
      const message = await CallGpt({
        prompt: `${userInput}`,
      });

      // 메시지 정제 및 JSON으로 변환
      const parsedData = validateAndParseJson(message);

      if (parsedData) {
        // parsedData가 유효한 경우 상태 업데이트
        setData(parsedData);
      } else {
        // parsedData가 유효하지 않은 경우 기본 데이터 유지
        console.warn("유효하지 않은 데이터로 인해 상태를 업데이트하지 않음.");
      }

      console.log("inputdata", userInput, "message", message);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (userInput) => {
    console.log(userInput);
    handleClickGpt(userInput);
  };

  return (
    <>
      <InputBox onClick={handleClickGpt} />
      <div>내 질문: {qs}</div>
      <div>title: {data?.title}</div>
      <div>ingredient: {data?.ingredient}</div>
      <div>effect: {data?.effect}</div>
      <div>taking: {data?.taking}</div>
    </>
  );
};

export default Index;
