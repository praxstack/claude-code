/**
 * BUILT-IN AGENTS — jX1, tK4, oK4, Dg, FF6 in cli.js
 *
 * Claude Code ships with 5 built-in agent types.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Plan agent (jX1):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   nc9=`You are a software architect and planning specialist...`;
 *   jX1={
 *     agentType: "Plan",
 *     whenToUse: "Software architect agent for designing implementation plans.",
 *     // disallowedTools includes Agent, ExitPlanMode, Edit, Write, NotebookEdit
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — claude-code-guide agent (tK4):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   tK4={
 *     agentType: Lf8,  // "claude-code-guide"
 *     whenToUse: 'Use this agent when the user asks questions
 *       ("Can Claude...", "Does Claude...", "How do I...") about:
 *       (1) Claude Code, (2) Claude Agent SDK, (3) Claude API',
 *     tools: [FY,n3,o4,XX,_k],  // Glob,Grep,Read,WebFetch,WebSearch
 *     source: "built-in",
 *     model: "haiku",
 *     permissionMode: "dontAsk",
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — statusline-setup agent (oK4):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   oK4={
 *     agentType: "statusline-setup",
 *     whenToUse: "Use this agent to configure the user's Claude Code
 *       status line setting.",
 *     tools: ["Read","Edit"],
 *     source: "built-in",
 *     model: "sonnet",
 *     color: "orange",
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Explore agent (Dg):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   Dg={
 *     agentType: "Explore",
 *     whenToUse: Ec9,  // codebase exploration description
 *     disallowedTools: [pq,QI,vq,C3,MM],
 *       // Agent,ExitPlanMode,Edit,Write,NotebookEdit
 *     source: "built-in",
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — general-purpose agent (FF6):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   FF6={
 *     agentType: "general-purpose",
 *     whenToUse: "General-purpose agent for researching complex ques..."
 *   }
 */

import type { AgentDefinition } from "./agent-definition";

export const BUILT_IN_AGENTS: AgentDefinition[] = [
  {
    agentType: "Plan",
    whenToUse: "Software architect agent for designing implementation plans.",
    disallowedTools: ["Agent", "ExitPlanMode", "Edit", "Write", "NotebookEdit"],
    source: "built-in",
    baseDir: "built-in",
    getSystemPrompt: () => "You are a software architect and planning specialist...",
  },
  {
    agentType: "Explore",
    whenToUse: "Fast agent specialized for exploring codebases.",
    disallowedTools: ["Agent", "ExitPlanMode", "Edit", "Write", "NotebookEdit"],
    source: "built-in",
    baseDir: "built-in",
    getSystemPrompt: () => "You are a codebase exploration specialist...",
  },
  {
    agentType: "general-purpose",
    whenToUse: "General-purpose agent for researching complex questions.",
    source: "built-in",
    baseDir: "built-in",
    getSystemPrompt: () => "You are a general-purpose research agent...",
  },
  {
    agentType: "claude-code-guide",
    whenToUse: "Use when user asks about Claude Code, Agent SDK, or Claude API.",
    tools: ["Glob", "Grep", "Read", "WebFetch", "WebSearch"],
    source: "built-in",
    baseDir: "built-in",
    model: "haiku",
    permissionMode: "dontAsk",
    getSystemPrompt: () => "You are a Claude Code documentation assistant...",
  },
  {
    agentType: "statusline-setup",
    whenToUse: "Configure the user's Claude Code status line setting.",
    tools: ["Read", "Edit"],
    source: "built-in",
    baseDir: "built-in",
    model: "sonnet",
    color: "orange",
    getSystemPrompt: () => "You are a status line setup agent...",
  },
];
