/**
 * TELEMETRY — l() function with tengu_* event prefix in cli.js
 *
 * 500+ unique telemetry events track every aspect of the application.
 * Internal codename "Tengu" is visible in all event prefixes.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Telemetry invocations (representative sample):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   l("tengu_init", {...})                    // Session initialization
 *   l("tengu_startup_perf", Y)                // Startup performance
 *   l("tengu_api_query", {...})               // API call started
 *   l("tengu_api_success", {...})             // API call succeeded
 *   l("tengu_api_error", {...})               // API call failed
 *   l("tengu_compact", {...})                 // Conversation compacted
 *   l("tengu_exit", {...})                    // Session exit
 *   l("tengu_bash_tool_command_executed",{})  // Bash tool used
 *   l("tengu_agent_created", {...})           // Subagent spawned
 *   l("tengu_agent_tool_selected", {...})     // Agent chose a tool
 *   l("tengu_mcp_add", {...})                 // MCP server added
 *   l("tengu_mcp_delete", {...})              // MCP server removed
 *   l("tengu_plugin_installed", {...})        // Plugin installed
 *   l("tengu_doctor_command", {...})          // Doctor health check
 *   l("tengu_ripgrep_eagain_retry", {})       // Ripgrep retry
 *   l("tengu_memdir_disabled", {...})         // Memory disabled
 *   l("tengu_mulberry_fog", ...)              // Feature flag check
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Structured logging via K8():
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Separate from telemetry, K8() handles debug/verbose logging
 *   // Controlled by --debug, --verbose, ANTHROPIC_LOG env var
 */

export function trackEvent(name: string, properties?: Record<string, any>) {
  // In production, sends to Anthropic's telemetry backend
  // Events are prefixed with "tengu_"
}
