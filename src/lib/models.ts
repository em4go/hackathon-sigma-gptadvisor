import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

// ============================================
// Provider Configuration
// ============================================

// Kimi provider (Moonshot AI)
export const kimiProvider = createOpenAICompatible({
  name: "kimi",
  baseURL: "https://api.kimi.com/coding/v1",
  apiKey: process.env.KIMI_API_KEY,
});

// ProxyPal provider (local)
export const proxypalProvider = createOpenAICompatible({
  name: "proxypal",
  baseURL: "http://127.0.0.1:8317/v1",
  apiKey: process.env.PROXYPAL_API_KEY,
});

// Google Gemini provider (AI Studio)
export const googleProvider = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ============================================
// Model Definitions
// ============================================

export interface ModelConfig {
  id: string;
  name: string;
  provider: "kimi" | "proxypal" | "google";
  description: string;
  contextWindow: string;
}

export const availableModels: ModelConfig[] = [
  {
    id: "kimi-k2.5",
    name: "Kimi K2.5",
    provider: "proxypal",
    description: "Powerful coding assistant with excellent code understanding",
    contextWindow: "256K",
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "google",
    description: "Fast and efficient multimodal model from Google",
    contextWindow: "1M",
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "google",
    description: "Advanced reasoning and coding capabilities",
    contextWindow: "2M",
  },
];

export const defaultModel = availableModels[0];

// ============================================
// Model Resolution
// ============================================

export function getModel(modelId: string) {
  const modelConfig = availableModels.find((m) => m.id === modelId) || defaultModel;

  switch (modelConfig.provider) {
    case "kimi":
      return kimiProvider.chatModel(modelConfig.id);
    case "proxypal":
      return proxypalProvider.chatModel(modelConfig.id);
    case "google":
      return googleProvider(modelConfig.id);
    default:
      return proxypalProvider.chatModel(defaultModel.id);
  }
}

export function getModelConfig(modelId: string): ModelConfig {
  return availableModels.find((m) => m.id === modelId) || defaultModel;
}
