/**
 * TOOL SEARCH — pW1 in cli.js, "ToolSearch" / vP
 *
 * Key architectural feature: when there are many MCP tools, tools are
 * loaded lazily ("deferred"). The model calls ToolSearch to discover
 * and activate deferred tools before using them.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Conditional inclusion:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   ...gc()?[pW1]:[]  // ToolSearch only present when deferred tools exist
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Query patterns:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Keyword search:
 *   ToolSearch({ query: "slack" })
 *
 *   // Direct selection by name:
 *   ToolSearch({ query: "select:mcp__slack__read_channel" })
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Read-only classification:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   mdY = new Set(["Read","Glob","Grep","ToolSearch","LSP","TaskGet","TaskList"])
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Tools with shouldDefer:true (can be lazy-loaded):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   m3q.shouldDefer = !0  // TaskCreate
 *   AN.shouldDefer  = !0  // TodoWrite
 *   // MCP tools also set shouldDefer
 */
