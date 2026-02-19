import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// Kimi provider (original)
export type KimiModelIds = "kimi-for-coding" | (string & {});

export const kimiProvider = createOpenAICompatible<
  KimiModelIds,
  string,
  string,
  string
>({
  name: "kimi",
  baseURL: "https://api.kimi.com/coding/v1",
  apiKey: process.env.KIMI_API_KEY,
});

// ProxyPal provider (local)
export type ProxyPalModelIds = "kimi-k2.5" | (string & {});

export const proxypalProvider = createOpenAICompatible<
  ProxyPalModelIds,
  string,
  string,
  string
>({
  name: "proxypal",
  baseURL: "http://127.0.0.1:8317/v1",
  apiKey: process.env.PROXYPAL_API_KEY,
});
