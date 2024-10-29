import React from "react";
import { CallGpt } from "../../api/gpt";
import { useState } from "react";
const Index = () => {
  const [data, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickGpt = async () => {
    try {
      setLoading(true);
      const message = await CallGpt();
      setDate(message);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={handleClickGpt}>go gpt</button>
      <div>message:{data}</div>
    </>
  );
};

export default Index;
