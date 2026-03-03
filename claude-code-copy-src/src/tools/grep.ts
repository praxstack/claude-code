/**
 * GREP TOOL — Hb in cli.js, "Grep" / n3
 *
 * Powered by bundled ripgrep binaries. Three output modes.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   Hb={
 *     name: n3,  // "Grep"
 *     searchHint: "search file contents with regex (ripgrep)",
 *     maxResultSizeChars: 20000,   // Note: smaller than most tools
 *     strict: !0,
 *     input_examples: [
 *       {pattern:"TODO",output_mode:"files_with_matches"},
 *       {pattern:"function.*export",glob:"*.ts",output_mode:"content","-n":!0}
 *     ],
 *     userFacingName(){ return "Search" },
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Ripgrep retry logic (line ~114):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   l("tengu_ripgrep_eagain_retry",{}),
 *   IWA(A,q,K,(P,W,G)=>{w(P,W,G,!0)},!0);
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — GrepInput (many options):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface GrepInput {
 *     pattern: string;
 *     path?: string;
 *     glob?: string;
 *     output_mode?: "content" | "files_with_matches" | "count";
 *     "-B"?: number;  "-A"?: number;  "-C"?: number;
 *     context?: number;  "-n"?: boolean;  "-i"?: boolean;
 *     type?: string;  head_limit?: number;  offset?: number;
 *     multiline?: boolean;
 *   }
 */

export interface GrepInput {
  pattern: string;
  path?: string;
  glob?: string;
  output_mode?: "content" | "files_with_matches" | "count";
  multiline?: boolean;
}
