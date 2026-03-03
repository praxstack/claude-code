/**
 * WEB FETCH TOOL — $0 in cli.js, "WebFetch" / XX
 *
 * Fetches a URL, converts HTML to markdown, processes with a smaller model.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface WebFetchInput { url: string; prompt: string; }
 *   export interface WebFetchOutput {
 *     bytes: number; code: number; codeText: string;
 *     result: string;  // AI-processed result
 *     durationMs: number; url: string;
 *   }
 */

export interface WebFetchInput { url: string; prompt: string; }
