/**
 * BASH TOOL — $q in cli.js, "Bash" / I4
 *
 * Executes shell commands. Most complex permission logic of any tool.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Tool definition:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   $q={
 *     name: I4,  // "Bash"
 *     searchHint: "execute shell commands",
 *     maxResultSizeChars: 30000,
 *     strict: !0,
 *     async description({description:A}){ return A||"Run shell command" },
 *     isEnabled(){ return !0 },
 *     isConcurrencySafe(A){ return this.isReadOnly(A) },
 *     isReadOnly(A){ let q=hl6(A.command); return pN1(A,q).behavior==="allow" },
 *     toAutoClassifierInput(A){ return A.command },
 *     userFacingName(A){
 *       if(!A)return"Bash";
 *       if(A.command){let q=uT6(A.command);if(q)return Hk1({file_path:q.filePath,...})}
 *       return Zn(A)&&_1(process.env.CLAUDE_CODE_BASH_SANDBOX_SHOW_INDICATOR)
 *         ?"SandboxedBash":"Bash"
 *     },
 *     async checkPermissions(A,q){ return await wl8(A,q) },
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Bash security checks (wl8 function, lines ~84464-84592):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Multiple security validators, each returning a behavior:
 *   {behavior:"ask", message:"Command contains quote characters inside a # comment..."}
 *   {behavior:"ask", message:"Command contains shell metacharacters..."}
 *   {behavior:"ask", message:"Command contains input redirection (<)..."}
 *   {behavior:"ask", message:"Command contains output redirection (>)..."}
 *   {behavior:"ask", message:"Command contains newlines that could separate commands"}
 *   {behavior:"allow", updatedInput:{command:q},
 *    decisionReason:{type:"other", reason:"Safe command substitution..."}}
 *   {behavior:"allow", updatedInput:{command:q},
 *    decisionReason:{type:"other", reason:"Empty command is safe"}}
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — BashInput type:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface BashInput {
 *     command: string;
 *     timeout?: number;                    // max 600,000ms
 *     description?: string;
 *     run_in_background?: boolean;
 *     dangerouslyDisableSandbox?: boolean;
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — BashOutput type:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface BashOutput {
 *     stdout: string;
 *     stderr: string;
 *     interrupted: boolean;
 *     isImage?: boolean;
 *     backgroundTaskId?: string;
 *     dangerouslyDisableSandbox?: boolean;
 *     returnCodeInterpretation?: string;
 *     structuredContent?: unknown[];
 *     persistedOutputPath?: string;
 *     persistedOutputSize?: number;
 *   }
 */

import type { Tool } from "./tool-interface";

export interface BashInput {
  command: string;
  timeout?: number;
  description?: string;
  run_in_background?: boolean;
  dangerouslyDisableSandbox?: boolean;
}

export interface BashOutput {
  stdout: string;
  stderr: string;
  interrupted: boolean;
  backgroundTaskId?: string;
}
