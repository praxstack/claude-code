/**
 * AGENT SPAWNER — SZ6 tool definition + fC() generator in cli.js
 *
 * Three execution modes for spawned agents:
 * 1. Synchronous: blocks main thread, returns result inline
 * 2. Background: runs async, tracked as a task
 * 3. Worktree: runs in isolated git worktree
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Agent tool in registry:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   SZ6,     // Agent — first tool in H86() registry
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — fC generator for agent execution:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async function*fC({agentDefinition:A,promptMessages:q,
 *                      toolUseContext:K,canUseTool:Y,isAsync:z,...}){
 *     // streams agent responses with permission checks, hooks, etc.
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — SubagentStart/SubagentStop hook events:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   { hook_event_name: "SubagentStart", agent_id: string, agent_type: string }
 *   { hook_event_name: "SubagentStop" }
 */
