import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey || 'dummy');

const generateWithFallback = async (prompt) => {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env.local file.");
  }

  // We are using gemini-2.5-flash as it is the only one working in this environment
  const modelsToTry = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
  
  let lastError = null;
  for (const modelName of modelsToTry) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent(prompt);
      return result.response.text().trim();
    } catch (error) {
      console.warn(`Model ${modelName} failed:`, error.message);
      lastError = error;
      // If it's a 429 (quota), we might want to stop or continue to next model
      // But 404 means the model is definitely not available
    }
  }

  console.error("All Gemini models failed. Last error:", lastError);
  throw new Error("AI Service is temporarily unavailable. Please check your API key or try again later.");
};

export const generateSummary = async (personalInfo, experience, skills, customPrompt = '') => {
  const prompt = customPrompt 
    ? `You are a friendly and helpful resume assistant. Your goal is to write a simple, clear, and professional resume summary (3-4 sentences).

    USER'S REQUEST:
    "${customPrompt}"

    MY DETAILS:
    - Current Title: ${personalInfo.title || 'Professional'}
    - Experience: ${JSON.stringify(experience)}
    - Skills: ${skills}

    RULES:
    1. Be friendly and professional. Use simple, easy-to-understand words.
    2. Follow the USER'S REQUEST exactly. 
    3. Use my details to make it real, but if the request asks for a different role, focus on that.
    4. Do NOT use "I", "me", or "my".
    5. Give me ONLY the summary text. No quotes or extra talking.`
    : `You are a friendly and helpful resume assistant. Write a simple, professional, and easy-to-read summary (3-4 sentences) for my resume using these details:

    Job Title: ${personalInfo.title || 'Professional'}
    Experience: ${JSON.stringify(experience)}
    Skills: ${skills}
    
    RULES:
    - Use simple and clear language.
    - Highlight my best skills and achievements.
    - Be confident but approachable.
    - Do NOT use "I", "me", or "my".
    - Return ONLY the summary text.`;

  return await generateWithFallback(prompt);
};

export const generateExperience = async (jobTitle, company, skills) => {
  const prompt = `You are a friendly and helpful resume assistant. Write 3-4 simple, professional, and easy-to-read bullet points for my work experience.

  MY JOB:
  - Title: ${jobTitle || 'Professional'}
  - Company: ${company || 'Unknown Company'}
  - Skills: ${skills}
  
  RULES:
  - Use simple action words (like Led, Created, Improved).
  - Use clear and easy language that anyone can understand.
  - Do NOT use bullet points or stars at the start. Just plain text.
  - Do NOT use "I", "me", or "my".
  - Return ONLY the points separated by newlines.`;

  const text = await generateWithFallback(prompt);
  return text.split('\n').map(line => line.replace(/^[\s•\-\*]+/, '').trim()).filter(line => line.length > 0).join('\n');
};
