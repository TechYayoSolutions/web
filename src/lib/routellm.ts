import OpenAI from "openai";

const routellm = new OpenAI({
  baseURL: process.env.ROUTELLM_BASE_URL || "https://routellm.abacus.ai/v1",
  apiKey: process.env.ROUTELLM_API_KEY,
});

export const ROUTELLM_MODEL = process.env.ROUTELLM_MODEL || "route-llm";

export default routellm;
