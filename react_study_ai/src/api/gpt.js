export const CallGpt = async ({ prompt }) => {
  console.log(">>CallGPT");

  // curl https://api.openai.com/v1/chat/completions \
  //   -H "Content-Type: application/json" \
  //   -H "Authorization: Bearer $OPENAI_API_KEY" \
  //   -d '{
  //  "model": "gpt-4o-mini",
  //  "messages": [{"role": "user", "content": "Say this is a test!"}],
  //  "temperature": 0.7
  //    }'

  const messages = [
    {
      role: "system",
      content: `you are a pharmacist
`,
    },
    {
      role: "user",
      content: `
          Please recommend a nutritional supplement.
          Please provide the response in Korean.

          Follow the instructions below:
          
          1. [title]: Provide the nutritional supplement name.
          2. [content] : Briefly summarize the effects of taking the nutritional supplement.
      
          The output is translated into Korean and structure it in the following JSON format:
          
          {
          "title": "[title]",
          "content" : "[content]"
          }
          User prompt: """${prompt}"""
        `,
    },
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_GPT_API_KEY}`,
      // Create React App은 빌드 시점에 .env 파일의 내용을 process.env에 주입함
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 100,
    }),
  });
  const responseData = await response.json();
  console.log(">>responsData", responseData);

  const message = responseData.choices[0].message.content;

  return message;
};
