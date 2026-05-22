import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyDp_4RlWE6c8PzAI_ExPIQhk0Rms_HSBUY');

async function testModel(modelName) {
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    await model.generateContent("hello");
    console.log(`✅ ${modelName} works!`);
  } catch (e) {
    console.log(`❌ ${modelName} failed: ${e.message}`);
  }
}

async function run() {
  await testModel("gemini-2.5-flash");
  await testModel("gemini-2.0-flash");
  await testModel("gemini-1.5-flash");
  await testModel("gemini-1.5-flash-latest");
  await testModel("gemini-pro");
  await testModel("gemini-1.5-pro");
}

run();
