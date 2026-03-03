/**
 * GLOB TOOL — lF in cli.js, "Glob" / FY
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   lF={
 *     name: FY,  // "Glob"
 *     searchHint: "find files by name pattern or wildcard",
 *     maxResultSizeChars: 1e5,
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface GlobInput  { pattern: string; path?: string; }
 *   export interface GlobOutput {
 *     durationMs: number; numFiles: number;
 *     filenames: string[]; truncated: boolean;   // capped at 100
 *   }
 */

export interface GlobInput {
  pattern: string;
  path?: string;
}
