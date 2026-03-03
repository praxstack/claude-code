/**
 * AGENT DEFINITION — The shape/contract for subagents in cli.js
 *
 * Each agent (built-in or custom) conforms to this structure.
 * The Agent tool (pq/"Agent") spawns child instances of the conversation loop
 * with restricted tool sets and custom system prompts.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Agent definition fields (assembled from multiple defs):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   {
 *     agentType: string,        // e.g., "Plan", "claude-code-guide"
 *     whenToUse: string,        // Description for model selection
 *     tools: string[],          // Allowed tools (by name)
 *     disallowedTools: string[],// Blocked tools
 *     source: string,           // "built-in", "userSettings", "projectSettings"
 *     baseDir: string,
 *     model: string,            // "inherit", "sonnet", "haiku", "opus"
 *     color: string,            // Terminal color for agent output
 *     permissionMode: string,   // "default", "dontAsk", etc.
 *     getSystemPrompt: function,// Returns custom system prompt
 *     memory: object,           // Optional persistent memory config
 *     isolation: string,        // "worktree" for git worktree isolation
 *     background: boolean,
 *     requiredMcpServers: string[],
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — AgentInput:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface AgentInput {
 *     description: string;      // 3-5 word task description
 *     prompt: string;           // Full task prompt
 *     subagent_type: string;    // Agent type to use
 *     resume?: string;          // Agent ID to resume
 *     run_in_background?: boolean;
 *     name?: string;
 *     team_name?: string;
 *     mode?: "acceptEdits"|"bypassPermissions"|"default"|"dontAsk"|"plan";
 *     isolation?: "worktree";
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — AgentOutput (discriminated union):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Variant 1: Completed synchronously
 *   { status: "completed", agentId, content: {type:"text",text}[],
 *     totalToolUseCount, totalDurationMs, totalTokens, usage, prompt }
 *
 *   // Variant 2: Launched asynchronously
 *   { status: "async_launched", agentId, description, prompt,
 *     outputFile, canReadOutputFile? }
 */

export interface AgentDefinition {
  agentType: string;
  whenToUse: string;
  tools?: string[];
  disallowedTools?: string[];
  source: "built-in" | "userSettings" | "projectSettings" | "localSettings";
  baseDir: string;
  model?: "inherit" | "sonnet" | "haiku" | "opus";
  color?: string;
  permissionMode?: string;
  getSystemPrompt: (context: any) => string;
  memory?: { dir: string };
  isolation?: "worktree";
  background?: boolean;
  requiredMcpServers?: string[];
}
