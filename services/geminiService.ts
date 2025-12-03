import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedContent } from "../types";

export const generateFunnyBio = async (name: string, traits: string[]): Promise<GeneratedContent> => {
  // Use process.env.API_KEY as per guidelines.
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    return {
      bio: "API Key is missing. Unable to generate content.",
      powerMove: "System Failure",
      weakness: "Missing Configuration",
    };
  }

  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
    You are a savage roaster. Create a funny, roasting profile for this character in Chinese.
    
    Character Name: ${name}
    Traits: ${traits.join(', ')}.
    
    Return a JSON object with these exact keys:
    - bio: A short, spicy, and funny roast description in Chinese (approx 30-50 words). Make it sound like a meme comment.
    - powerMove: A hilarious, useless special ability name in Chinese.
    - weakness: An absurd, funny weakness in Chinese.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 1000, 
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bio: { type: Type.STRING },
            powerMove: { type: Type.STRING },
            weakness: { type: Type.STRING },
          },
          required: ["bio", "powerMove", "weakness"],
        },
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    const result = JSON.parse(text);

    return {
      bio: result.bio || "这家伙太普通了，连 AI 都懒得吐槽... (数据缺失)",
      powerMove: result.powerMove || "平地摔",
      weakness: result.weakness || "存在感为零",
    };

  } catch (error) {
    console.error("Gemini generation failed", error);
    return {
      bio: "系统过载！这人的槽点太多，导致 AI 处理器烧毁了... (请重试)",
      powerMove: "404 Not Found",
      weakness: "断网",
    };
  }
};