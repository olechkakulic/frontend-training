import axios from "axios"; 
import {
  buildChatPrompt,
  buildDescriptionPrompt,
  buildPricePrompt,
} from "./lib/aiPrompts";

const OLLAMA_BASE_URL = "http://localhost:11434";
const OLLAMA_MODEL = "llama3";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type AiPayload = {
  title: string;
  category: string;
  price?: number | string;
  params: unknown;
  description?: string;
};

type AiChatPayload = AiPayload & {
  history: ChatMessage[];
  question: string;
};

const ollamaApi = axios.create({
  baseURL: OLLAMA_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

async function generateFromAi(prompt: string) {
  try {
    const response = await ollamaApi.post("/api/generate", {
      model: OLLAMA_MODEL,
      prompt,
      stream: false,
    });


    return response.data.response?.trim?.() ?? "";
    
  } catch (error) {
    console.error("Ollama API error:", error);
    
    if (axios.isAxiosError(error)) {
       throw new Error(`Ollama error: ${error.response?.status} - ${error.message}`);
    }
    throw error;
  }
}

export async function requestAiPrice(payload: AiPayload) {
  return generateFromAi(buildPricePrompt(payload));
}

export async function requestAiDescription(payload: AiPayload) {
  return generateFromAi(buildDescriptionPrompt(payload));
}

export async function requestAiChatWithAd(payload: AiChatPayload) {
  return generateFromAi(buildChatPrompt(payload));
}
