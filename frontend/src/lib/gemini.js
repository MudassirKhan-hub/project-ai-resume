import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const groqApiKey = import.meta.env.VITE_GROQ_API_KEY;
const openaiApiKey = import.meta.env.VITE_OPENAI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey || 'dummy');

const callGroqAPI = async (prompt) => {
  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${groqApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  
  if (!response.ok) throw new Error(`Groq API failed with status ${response.status}`);
  const data = await response.json();
  return data.choices[0].message.content.trim();
};

const callOpenAIAPI = async (prompt) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  
  if (!response.ok) throw new Error(`OpenAI API failed with status ${response.status}`);
  const data = await response.json();
  return data.choices[0].message.content.trim();
};

const generateWithFallback = async (prompt) => {
  let lastError = null;

  // 1. Try Gemini
  if (apiKey) {
    const modelsToTry = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-1.5-pro", "gemini-pro"];
    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        return result.response.text().trim();
      } catch (error) {
        console.warn(`Gemini Model ${modelName} failed:`, error.message);
        lastError = error;
      }
    }
  } else {
    console.warn("Gemini API key is not configured.");
  }

  // 2. Try Groq (First Fallback)
  if (groqApiKey) {
    try {
      console.log("Trying Groq API as fallback...");
      return await callGroqAPI(prompt);
    } catch (error) {
      console.warn("Groq API failed:", error.message);
      lastError = error;
    }
  }

  // 3. Try OpenAI (Second Fallback)
  if (openaiApiKey) {
    try {
      console.log("Trying OpenAI API as fallback...");
      return await callOpenAIAPI(prompt);
    } catch (error) {
      console.warn("OpenAI API failed:", error.message);
      lastError = error;
    }
  }

  console.error("All AI services failed. Last error:", lastError);
  throw new Error("AI Service is temporarily unavailable. Please check your API keys or try again later.");
};

export const generateSummary = async (personalInfo, experience, skills, currentSummary = '') => {
  const prompt = currentSummary && currentSummary.trim().length > 0 && currentSummary !== 'A passionate Software Engineer with expertise in modern web technologies. Dedicated to building scalable and user-friendly applications while maintaining clean code practices.'
    ? `You are an expert AI resume writer. The user has provided some rough notes, a current draft, or specific instructions for their resume summary.

    USER'S INPUT (Instructions or Rough Draft):
    "${currentSummary}"

    MY CURRENT FORM DETAILS:
    - Current Title: ${personalInfo.title || 'Professional'}
    - Experience: ${JSON.stringify(experience)}
    - Skills: ${skills}

    RULES:
    1. WRITE A HIGHLY PROFESSIONAL RESUME SUMMARY based strictly on the USER'S INPUT.
    2. CRITICAL: The "CURRENT FORM DETAILS" might contain default placeholder data for a "Software Engineer" (e.g. JavaScript, React, Node). IF the USER'S INPUT is about a DIFFERENT field (like Marketing, Teacher, HR, Doctor, etc.), YOU MUST COMPLETELY IGNORE the "CURRENT FORM DETAILS". Do NOT mention Software Engineering, coding, or any tech skills.
    3. If the USER'S INPUT is just a rough draft, polish it into an engaging resume summary.
    4. Return ONLY the final summary text in paragraph form. Do NOT include quotes, intros, or conversational filler.`
    : `You are a friendly, warm, and helpful resume assistant. Write an engaging, conversational, and friendly summary (3-4 sentences) for my resume using these details:

    Job Title: ${personalInfo.title || 'Professional'}
    Experience: ${JSON.stringify(experience)}
    Skills: ${skills}
    
    RULES:
    - Write in a very friendly, natural, and human-like tone.
    - CRITICAL: If the Job Title is NOT related to Software Engineering/IT, but the Skills say "JavaScript, React.js", IGNORE those tech skills and experience. They are placeholder data. Only write about the actual Job Title provided.
    - Do NOT use "I", "me", or "my". Focus on the person implicitly.
    - Return ONLY the summary text in paragraph form. No extra text.`;

  return await generateWithFallback(prompt);
};

export const generateExperience = async (jobTitle, company, skills, currentDescription = '') => {
  const prompt = currentDescription && currentDescription.trim().length > 0
    ? `You are an expert resume writer. The user wants to write or improve their job experience bullet points based on these notes/instructions:

  USER'S NOTES / INSTRUCTIONS:
  "${currentDescription}"
  
  JOB CONTEXT:
  - Title: ${jobTitle || 'Professional'}
  - Company: ${company || 'Unknown Company'}
  - Skills: ${skills}
  
  RULES:
  1. Transform the user's notes into professional, impactful resume bullet points.
  2. CRITICAL: If the user's notes or Job Title are for a NON-TECH field, COMPLETELY IGNORE the 'Skills' if they contain Software Engineering terms like JavaScript or React. Those are placeholders. Focus ONLY on the user's notes.
  3. STRICTLY follow the user's instructions if they asked for a specific language, tone, or format.
  4. Do NOT use bullet points or stars (* or -) at the start of lines. Just plain text separated by newlines.
  5. Return ONLY the final text. No extra talking.`
    : `You are a friendly and helpful resume assistant. Write 3-4 simple, professional, and easy-to-read bullet points for my work experience.

  MY JOB:
  - Title: ${jobTitle || 'Professional'}
  - Company: ${company || 'Unknown Company'}
  - Skills: ${skills}
  
  RULES:
  - CRITICAL: If the Job Title is NOT related to Software Engineering/IT, IGNORE 'Skills' like JavaScript or React as they are placeholder data.
  - Use simple action words (like Led, Created, Improved).
  - Use clear and easy language that anyone can understand.
  - Do NOT use bullet points or stars at the start. Just plain text.
  - Do NOT use "I", "me", or "my".
  - Return ONLY the points separated by newlines.`;

  const text = await generateWithFallback(prompt);
  return text.split('\n').map(line => line.replace(/^[\s•\-*]+/, '').trim()).filter(line => line.length > 0).join('\n');
};
