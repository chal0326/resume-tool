// parseResume.js or wherever you define the function
export const parseResumeWithOpenAI = async (text) => {
  if (!text?.trim()) {
    throw new Error('Resume text is required');
  }

  const systemPrompt = `You are an expert resume parser. Extract and structure resume data accurately and consistently. You must respond ONLY with valid JSON - no additional text, explanations, or markdown formatting.`;
  
  const userPrompt = `Extract job title, company, start date, end date, experience, achievements, awards, and certifications from the following resume text. Experience can be acknowledged as a single bullet point under each job therefore there may be multiple experiences under each single job. Based on each experience generate 1 associated transferrable skill the user gained by completing that experience.

Please ensure all dates are in YYYY-MM format. For current positions, set endDate to null and isCurrent to true.

Format the response as a valid JSON object with the following structure:
{
  "jobs": [{
    "title": string,
    "company": string,
    "startDate": string,
    "endDate": string | null,
    "isCurrent": boolean
  }],
  "experiences": [{
    "text": string,
    "skill": string
  }],
  "achievements": [{
    "name": string,
    "date": string,
    "description": string
  }],
  "awards": [{
    "name": string,
    "date": string,
    "description": string
  }],
  "certifications": [{
    "name": string,
    "date": string,
    "description": string,
    "organization": string
  }]
}

Resume Text:
${text}`;

  const retry = async (fn, retries = 3) => {
    try {
      return await fn();
    } catch (error) {
      if (retries > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return retry(fn, retries - 1);
      }
      throw error;
    }
  };

  try {
    const response = await retry(async () => {
      return await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          max_tokens: 2000,
          temperature: 0.1,
        }),
      });
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        `OpenAI API failed with status ${response.status}: ${
          errorData?.error?.message || 'Unknown error'
        }`
      );
    }

    const data = await response.json();
    const parsedContent = data.choices[0]?.message?.content;
    
    if (!parsedContent) {
      throw new Error('No content received from OpenAI');
    }

    try {
      const jsonResult = JSON.parse(parsedContent);
      // Validate the response structure
      if (!jsonResult.jobs || !Array.isArray(jsonResult.jobs)) {
        throw new Error('Invalid response structure: missing or invalid jobs array');
      }
      return jsonResult;
    } catch (parseError) {
      console.error('JSON Parse Error:', parsedContent);
      throw new Error('Failed to parse OpenAI response as JSON');
    }

  } catch (error) {
    console.error("Error with OpenAI API:", error);
    throw error; // Re-throw to handle in the UI
  }
};

// When processing the OpenAI response before sending to Supabase:
export const formatDateForDB = (dateStr) => {
  if (!dateStr) return null;
  // Just return the YYYY-MM string directly
  return dateStr;
};

export const formatJobForDB = (job, userId) => {
  return {
    user_id: userId,
    job_title: job.title,
    company: job.company,
    start_date: job.startDate,  // No need for formatting since it's text now
    end_date: job.endDate,      // No need for formatting since it's text now
    is_current: job.isCurrent
  };
};
