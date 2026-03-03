/**
 * SDK PROGRAMMATIC API — The query() export for SDK consumers
 *
 * This is the programmatic entry point for using Claude Code as a library.
 * Used by VS Code extensions, GitHub Actions, and custom integrations.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — SDK query function:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Usage:
 *   import { query } from "@anthropic-ai/claude-code";
 *
 *   for await (const message of query({
 *     prompt: "Explain what this repository does",
 *     options: {
 *       cwd: "/path/to/project",
 *       allowedTools: ["Read", "Glob", "Grep"],
 *     },
 *   })) {
 *     if ("result" in message) {
 *       console.log(message.result);
 *     }
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Client type detection for SDK:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Client types detected:
 *   // "sdk-typescript", "sdk-python", "sdk-cli",
 *   // "github-action", "claude-vscode", "local-agent",
 *   // "claude-desktop", "remote", "cli"
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — SDK supports hooks via callback:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // options.hooks: HookCallback for all hook events
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — All tool types are exported:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export type ToolInputSchemas = AgentInput | BashInput | ... (all 22+)
 *   export type ToolOutputSchemas = AgentOutput | BashOutput | ... (all 22+)
 */

export interface QueryOptions {
  prompt: string;
  options?: {
    cwd?: string;
    allowedTools?: string[];
    disallowedTools?: string[];
    model?: string;
    permissionMode?: string;
    systemPrompt?: string;
    hooks?: any; // HookCallback
  };
}

export async function* query(input: QueryOptions) {
  // This is the async generator that streams conversation events
  // to SDK consumers. It wraps the full agentic loop.
  yield { type: "start" as const };
  // ... run loop ...
  yield { type: "result" as const, result: "" };
}
