const axios = require("axios");

const generateAISummary = async (itemData) => {

  try {

    const prompt = `
You are an AI assistant for a Lost and Found platform.

Analyze this item carefully.

Title: ${itemData.title}

Description: ${itemData.description}

Category: ${itemData.category}

Location: ${itemData.location}

Status: ${itemData.status}

Respond ONLY with VALID RAW JSON.

Format:

{
  "summary": "short summary",
  "keywords": ["keyword1", "keyword2"],
  "urgency": "High",
  "tags": ["tag1", "tag2"]
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b:free",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.2,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,

          "Content-Type": "application/json",
        },
      }
    );

    let raw =
      response.data.choices[0].message.content;

    // CLEAN AI RESPONSE
    raw = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log(
      "CLEANED AI RESPONSE:",
      raw
    );

    return raw;

  } catch (error) {

    console.log(
      "AI ERROR:",
      error.response?.data || error.message
    );

    return null;
  }
};

module.exports = generateAISummary;