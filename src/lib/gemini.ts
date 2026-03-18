import 'dotenv/config'; // 
import { GoogleGenerativeAI } from "@google/generative-ai";

// Use environment variable instead of hardcoded key
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

const genAI = new GoogleGenerativeAI(apiKey);
export const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

// const prompt = 'Generate 5 interview questions'

// const result = await model.generateContent(prompt);

// console.log(result.response.text())