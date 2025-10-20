require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { aiLogger } = require('../utils/logger');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Conceptual System Instruction and Schema
const systemInstruction = "You are an expert email classifier. Your task is to analyze the provided email text and categorize it into one of the following labels: Interested, Meeting Booked, Not Interested, Spam, or Out of Office.";

const responseSchema = {
  type: "OBJECT",
  properties: {
    category: {
      type: "STRING",
      enum: ["Interested", "Meeting Booked", "Not Interested", "Spam", "Out of Office"]
    }
  }
};

async function categorizeEmail(emailText: string) {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
        systemInstruction: systemInstruction,
        generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        },
    });
    try{
        const result = await model.generateContent(emailText);
        const data = JSON.parse(result.response.text());
        return data.category;
    }catch(err){
        aiLogger.error(`Error occurred: `,err);
    }
}

module.exports = categorizeEmail;