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
      model: 'llama3-8b-8192',
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

export const generateSummary = async (personalInfo, experience, skills, customPrompt = '') => {
  const prompt = customPrompt 
    ? `You are a friendly, warm, and helpful resume assistant. Your goal is to write an engaging, conversational, and friendly resume summary (3-4 sentences).

    USER'S REQUEST:
    "${customPrompt}"

    MY DETAILS:
    - Current Title: ${personalInfo.title || 'Professional'}
    - Experience: ${JSON.stringify(experience)}
    - Skills: ${skills}

    RULES:
    1. Write in a very friendly, natural, and human-like tone. Use conversational but professional language.
    2. Follow the USER'S REQUEST exactly. 
    3. Use my details to make it real, but if the request asks for a different role, focus on that.
    4. Do NOT use "I", "me", or "my". Focus on the person in third-person implicitly (e.g., "Passionate developer with...").
    5. Give me ONLY the summary text in paragraph form. No quotes or extra talking.`
    : `You are a friendly, warm, and helpful resume assistant. Write an engaging, conversational, and friendly summary (3-4 sentences) for my resume using these details:

    Job Title: ${personalInfo.title || 'Professional'}
    Experience: ${JSON.stringify(experience)}
    Skills: ${skills}
    
    RULES:
    - Write in a very friendly, natural, and human-like tone. Use conversational but professional language.
    - Highlight my best skills and achievements warmly.
    - Be confident, approachable, and enthusiastic.
    - Do NOT use "I", "me", or "my". Focus on the person implicitly.
    - Return ONLY the summary text in paragraph form. No extra text.`;

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
