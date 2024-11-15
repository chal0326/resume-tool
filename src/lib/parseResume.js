// parseResume.js or wherever you define the function
export const parseResumeWithOpenAI = async (text) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // Access the API key from environment variables
      },
      body: JSON.stringify({
        model: "gpt-4", // or "gpt-3.5-turbo" if you're using the 3.5 model
        messages: [
          {
            role: "system",
            content: "You are an assistant that helps extract structured data from resumes.",
          },
          {
            role: "user",
            content: `Extract job title, company, start date, end date, experience, achievements, awards, and certifications from the following resume text. Experience can be acknowledged as a single bullet point under each job therefore there may be multiple experiences under each single job. Based on each experience generate 1 associated transferrable skill the user gained by completing that experience.
                      Format the response as a JSON object with keys: jobs, experiences, transferrable_skills, achievements, awards, certifications.
                      Here is the JSON formatted columns:
                      {
  jobs: [{
    title: string,
    company: string,
    startDate: string,
    endDate: string
  }],
  experiences: [{
    text: string,
    skill: string  // The transferable skill associated with this experience
  }],
  achievements: [{
    name: string,
    date: string,
    description: string
  }],
  awards: [{
    name: string,
    date: string,
    description: string
  }],
  certifications: [{
    name: string,
    date: string,
    description: string,
    organization: string
  }]
}

                      Resume Text:
                      ${text}`,
          },
        ],
        max_tokens: 1500,
        temperature: 0,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to call OpenAI API');
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);
  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw new Error("Failed to parse resume with OpenAI.");
  }
};
