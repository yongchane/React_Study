import React from "react";
import { CallGpt } from "../../api/gpt";
import { useState } from "react";
import InputBox from "./InputBox";

const fake = JSON.parse(
  `{"title": "마그네슘", "ingredient": "마그네슘 (마그네슘 구리라우레이트, 마그네슘 옥사이드)", "taking": "매일 식사와 함께 1정을 물과 함께 복용하십시오."}`
);

const Index = () => {
  const [data, setDate] = useState(fake);
  const [loading, setLoading] = useState(false);

  const handleClickGpt = async (userInput) => {
    try {
      setLoading(true);
      const message = await CallGpt({
        prompt: `${userInput}`,
      });
      // JSON 형태의 문자열로 출력이 되기 때문에 js 객체로 변환하는 함수
      setDate(JSON.parse(message));
    } catch (error) {
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
      <InputBox onSubmit={handleSubmit} />
      <button onClick={handleClickGpt}>go gpt</button>
      <div>title:{data?.title}</div>
      <div>ingredient:{data?.ingredient}</div>
      <div>taking:{data?.taking}</div>
    </>
  );
};

export default Index;
