import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY, // Make sure your .env has the OpenAI API key
});
const openai = new OpenAIApi(configuration);

export const parseResumeWithOpenAI = async (text) => {
  try {
    const prompt = `
      Extract job title, company, start date, end date, description, achievements, awards, and certifications from the following resume text.
      Format the response as a JSON object with keys: jobs, achievements, awards, and certifications.
      - jobs should be an array of objects with properties: title, company, startDate, endDate, description.
      - achievements should be an array of strings.
      - awards should be an array of strings.
      - certifications should be an array of strings.

      Resume Text:
      ${text}
    `;

    const response = await openai.createCompletion({
      model: "gpt-4o-mini",
      prompt: prompt,
      max_tokens: 1500,
      temperature: 0,
    });

    return JSON.parse(response.data.choices[0].text);
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw new Error("Failed to parse resume with OpenAI.");
  }
};

