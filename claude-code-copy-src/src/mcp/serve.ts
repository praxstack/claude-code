/**
 * MCP SERVE — "claude mcp serve" command
 *
 * Claude Code can act AS an MCP server, exposing its tools to other clients.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Command registration:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   K.command("serve").description("Start the Claude Code MCP server")
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Entrypoint detection:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   if(K!==-1&&q[K+1]==="serve"){
 *     process.env.CLAUDE_CODE_ENTRYPOINT="mcp"; return
 *   }
 */
