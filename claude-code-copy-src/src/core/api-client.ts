/**
 * ANTHROPIC API CLIENT — Lz class in cli.js
 *
 * Wraps the Anthropic SDK. Handles auth, retries, streaming, and
 * model-specific configuration.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js (line ~257, Lz class constructor):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   class Lz{
 *     constructor({
 *       baseURL:A=Mh6("ANTHROPIC_BASE_URL"),
 *       apiKey:q=Mh6("ANTHROPIC_API_KEY")??null,
 *       authToken:K=Mh6("ANTHROPIC_AUTH_TOKEN")??null,
 *       ...Y
 *     }={}){
 *       let z={apiKey:q,authToken:K,...Y,
 *              baseURL:A||"https://api.anthropic.com"};
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Headers with anthropic-version:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async buildHeaders({options:A,method:q,bodyHeaders:K,retryCount:Y}){
 *     let w=D3([z,{
 *       Accept:"application/json",
 *       "User-Agent":this.getUserAgent(),
 *       "X-Stainless-Retry-Count":String(Y),
 *       "anthropic-version":"2023-06-01"
 *     },await this.authHeaders(A),this._options.defaultHeaders,K,A.headers]);
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Auth header (X-Api-Key):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async apiKeyAuth(A){
 *     if(this.apiKey==null) return;
 *     return D3([{"X-Api-Key":this.apiKey}])
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — API endpoints:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Beta messages:
 *   this._client.post("/v1/messages?beta=true", {body:z, timeout:w??600000, ...})
 *   // Standard messages:
 *   this._client.post("/v1/messages", {body:A, timeout:K??600000, ...})
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Model constants (Vf8 object):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   Vf8.opus   → "claude-opus-4-6"
 *   Vf8.sonnet → "claude-sonnet-4-6"
 *   Vf8.haiku  → "claude-haiku-4-5-20251001"
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Knowledge cutoff mapping (dK4 function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function dK4(A){
 *     if(A.includes("claude-sonnet-4-6")) return"August 2025";
 *     else if(A.includes("claude-opus-4-6")) return"May 2025";
 *     else if(A.includes("claude-haiku-4")) return"February 2025";
 *     else if(A.includes("claude-opus-4")||A.includes("claude-sonnet-4"))
 *       return"January 2025";
 *     return null
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Prompt caching control:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function kr6({scope:A, querySource:q}={}){
 *     return{
 *       type:"ephemeral",
 *       ...pXz(q)?{ttl:"1h"}:{},
 *       ...A==="global"?{scope:A}:{}
 *     }
 *   }
 *
 *   function kZq(A){  // is caching enabled?
 *     if(_1(process.env.DISABLE_PROMPT_CACHING)) return!1;
 *     if(_1(process.env.DISABLE_PROMPT_CACHING_HAIKU)){...}
 *     return!0
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Extended thinking config:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Adaptive thinking:
 *   g6={type:"adaptive"}
 *
 *   // Budget-based thinking:
 *   g6={budget_tokens:v1, type:"enabled"}
 *
 *   // Passed to API call:
 *   return{ model:kB(w.model), messages:..., system:x, tools:...,
 *           thinking:g6, ... }
 */

import Anthropic from "@anthropic-ai/sdk";

export const MODELS = {
  opus: "claude-opus-4-6",
  sonnet: "claude-sonnet-4-6",
  haiku: "claude-haiku-4-5-20251001",
} as const;

export interface ApiClientOptions {
  apiKey?: string;
  baseURL?: string;
  model?: string;
  enablePromptCaching?: boolean;
}

export function createClient(options: ApiClientOptions) {
  return new Anthropic({
    apiKey: options.apiKey ?? process.env.ANTHROPIC_API_KEY,
    baseURL: options.baseURL ?? process.env.ANTHROPIC_BASE_URL ?? "https://api.anthropic.com",
  });
}

export function buildThinkingConfig(model: string): object | undefined {
  // Adaptive for newer models, budget-based for others
  if (supportsAdaptiveThinking(model)) {
    return { type: "adaptive" };
  }
  if (supportsThinking(model)) {
    return { budget_tokens: getDefaultBudget(model), type: "enabled" };
  }
  return undefined;
}
