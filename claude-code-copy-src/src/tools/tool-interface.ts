/**
 * TOOL INTERFACE — The standard shape every tool implements in cli.js
 *
 * Every tool in Claude Code is an object conforming to this interface.
 * The minified code assigns each to a variable (e.g., $q=Bash, n9=Read).
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Bash tool showing the full shape:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   $q={
 *     name: I4,                          // I4 = "Bash"
 *     searchHint: "execute shell commands",
 *     maxResultSizeChars: 30000,
 *     strict: !0,
 *
 *     async description({description:A}){ return A||"Run shell command" },
 *     async prompt(){ return QZq() },
 *
 *     isConcurrencySafe(A){ return this.isReadOnly(A) },
 *     isReadOnly(A){ let q=hl6(A.command); return pN1(A,q).behavior==="allow" },
 *     isEnabled(){ return !0 },
 *
 *     get inputSchema(){ return nZq() },
 *     get outputSchema(){ return hMz() },
 *     inputParamAliases: undefined,
 *
 *     userFacingName(A){ ... },
 *     getToolUseSummary(A){ ... },
 *     getActivityDescription(A){ ... },
 *     renderToolUseMessage(input, opts){ ... },
 *     renderToolResultMessage(result, context, opts){ ... },
 *
 *     toAutoClassifierInput(A){ return A.command },
 *
 *     async checkPermissions(A,q){ return await wl8(A,q) },
 *     async call(input, context, ...){ ... },
 *
 *     mapToolResultToToolResultBlockParam(result, toolUseId){ ... }
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Read tool (n9) with inputParamAliases:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   n9={
 *     name: o4,  // o4 = "Read"
 *     searchHint: "read files, images, PDFs, notebooks",
 *     maxResultSizeChars: 1e5,
 *     strict: !0,
 *     inputParamAliases: {
 *       filePath: "file_path",
 *       filepath: "file_path",
 *       path: "file_path"
 *     },
 *     input_examples: [
 *       {file_path:"/Users/username/project/src/index.ts"},
 *       {file_path:"/Users/username/project/README.md",limit:100,offset:50}
 *     ],
 *     ...
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Edit tool (Y0) with path getter:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   Y0={
 *     name: vq,  // vq = "Edit"
 *     searchHint: "modify file contents in place",
 *     isConcurrencySafe(){ return !1 },
 *     isReadOnly(){ return !1 },
 *     getPath(A){ return A.file_path },
 *     inputParamAliases: {
 *       old_str:"old_string", new_str:"new_string",
 *       oldString:"old_string", newString:"new_string",
 *       filePath:"file_path", filepath:"file_path", path:"file_path"
 *     },
 *     ...
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Tool categories (line ~85337):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   udY = new Set(["Edit","Write","NotebookEdit"])          // write tools
 *   mdY = new Set(["Read","Glob","Grep","ToolSearch","LSP",
 *                   "TaskGet","TaskList"])                   // read-only tools
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — Consistent Input/Output type pattern:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Every tool follows {ToolName}Input / {ToolName}Output convention:
 *   export type ToolInputSchemas =
 *     | AgentInput | BashInput | FileEditInput | FileReadInput
 *     | FileWriteInput | GlobInput | GrepInput | ...
 *   export type ToolOutputSchemas =
 *     | AgentOutput | BashOutput | FileEditOutput | FileReadOutput
 *     | FileWriteOutput | GlobOutput | GrepOutput | ...
 */

import type { ZodSchema } from "zod";

export interface PermissionResult {
  behavior: "allow" | "deny" | "ask" | "passthrough";
  updatedInput?: any;
  message?: string;
  suggestions?: any[];
  decisionReason?: {
    type: "rule" | "mode" | "workingDir" | "other";
    rule?: any;
    mode?: string;
    reason?: string;
  };
}

export interface ToolContext {
  getAppState(): Promise<any>;
  abortController: AbortController;
  [key: string]: any;
}

export interface Tool<TInput = any, TOutput = any> {
  // Identity
  name: string;
  searchHint: string;
  aliases?: string[];
  maxResultSizeChars: number;
  strict?: boolean;
  shouldDefer?: boolean;

  // Schema
  readonly inputSchema: ZodSchema<TInput>;
  readonly outputSchema?: ZodSchema<TOutput>;
  inputParamAliases?: Record<string, string>;
  input_examples?: TInput[];

  // Description (can be async for dynamic prompts)
  description(input?: TInput): Promise<string> | string;
  prompt(): Promise<string> | string;

  // Display
  userFacingName(input?: TInput): string;
  getToolUseSummary?(input?: TInput): string;
  getActivityDescription?(input?: TInput): string;
  renderToolUseMessage?(input: TInput, opts?: any): any;
  renderToolResultMessage?(result: TOutput, context: any, opts?: any): any;

  // Behavior classification
  isEnabled(): boolean;
  isConcurrencySafe(input?: TInput): boolean;
  isReadOnly(input?: TInput): boolean;
  getPath?(input: TInput): string; // for file-based tools

  // Permission + execution
  checkPermissions(input: TInput, context: ToolContext): Promise<PermissionResult>;
  validateInput?(input: TInput, context: ToolContext): Promise<TInput>;
  call(input: TInput, context: ToolContext): Promise<TOutput>;

  // Result mapping for API
  mapToolResultToToolResultBlockParam?(result: TOutput, toolUseId: string): any;
}
