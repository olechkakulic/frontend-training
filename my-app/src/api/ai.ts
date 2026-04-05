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
  
  async function generateFromAi(prompt: string) {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt,
        stream: false,
      }),
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  
    const data = await response.json();
    return data.response?.trim?.() ?? "";
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