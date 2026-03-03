/**
 * COMMANDER.JS COMMAND TREE — Gxz() in cli.js
 *
 * Defines the full CLI command hierarchy using Commander.js.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js (line ~12890, Gxz command setup):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async function Gxz(){
 *     Bq("run_function_start");
 *     function A(){...} // help formatter
 *     let q=new tNq().configureHelp(A()).enablePositionalOptions();
 *     Bq("run_commander_initialized"),
 *     q.hook("preAction",async()=>{...}),
 *     q.name("claude")
 *      .description("Claude Code - starts an interactive session by default...")
 *      .argument("[prompt]","Your prompt",String)
 *      .helpOption("-h, --help","Display help for command")
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Top-level commands (exact .command() strings):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   .command("mcp")          → "Configure and manage MCP servers"
 *   .command("server")       → "Start a Claude Code session server"
 *   .command("open <cc-url>")→ "Connect to a Claude Code server"
 *   .command("auth")         → "Manage authentication"
 *   .command("plugin")       → "Manage Claude Code plugins"
 *   .command("setup-token")  → "Set up a long-lived authentication token"
 *   .command("agents")       → "List configured agents"
 *   .command("remote-control")→ "Connect your local environment for remote-control"
 *   .command("doctor")       → "Check the health of your auto-updater"
 *   .command("update")       → "Check for updates and install if available"
 *   .command("install")      → "Install Claude Code native build"
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — MCP subcommands:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   K.command("serve")                              → Start MCP server
 *   K.command("remove <name>")                      → Remove MCP server
 *   K.command("list")                               → List configured servers
 *   K.command("get <name>")                         → Get server details
 *   K.command("add <name> <commandOrUrl> [args...]")→ Add MCP server
 *   K.command("add-json <name> <json>")             → Add server via JSON
 *   K.command("add-from-claude-desktop")            → Import from Desktop
 *   K.command("reset-project-choices")              → Reset approvals
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Auth subcommands:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   Y.command("login")    → "Sign in to your Anthropic account"
 *   Y.command("status")   → "Show authentication status"
 *   Y.command("logout")   → "Log out from your Anthropic account"
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Plugin subcommands:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   z.command("validate <path>")      → Validate a plugin
 *   z.command("list")                 → List installed plugins
 *   z.command("install <plugin>")     → Install (alias: i)
 *   z.command("uninstall <plugin>")   → Uninstall (aliases: remove, rm)
 *   z.command("enable <plugin>")      → Enable
 *   z.command("disable [plugin]")     → Disable
 *   z.command("update <plugin>")      → Update
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Key root command options (exact flag strings):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   -p, --print                   Print response and exit
 *   -c, --continue                Continue last conversation
 *   -r, --resume [value]          Resume a session
 *   -w, --worktree [name]         Work in a git worktree
 *   --model <model>               Override model
 *   --permission-mode <mode>      Set permission mode
 *   --output-format <format>      "text", "json", "stream-json"
 *   --max-turns <turns>           Maximum agentic turns
 *   --max-budget-usd <amount>     Dollar budget cap
 *   --allowedTools <tools...>     Restrict available tools
 *   --system-prompt <prompt>      Override system prompt
 *   --mcp-config <configs...>     MCP server configs
 *   --effort <level>              low/medium/high/max
 *   --agent <agent>               Use a specific agent
 */

import { Command } from "commander";

export function buildCommands(): Command {
  const program = new Command();

  program
    .name("claude")
    .description("Claude Code - starts an interactive session by default")
    .argument("[prompt]", "Your prompt")
    .option("-p, --print", "Print response and exit")
    .option("-c, --continue", "Continue last conversation")
    .option("-r, --resume [value]", "Resume a session")
    .option("-w, --worktree [name]", "Work in a git worktree")
    .option("--model <model>", "Override model")
    .option("--permission-mode <mode>", "Permission mode")
    .option("--output-format <format>", "Output format: text, json, stream-json")
    .option("--max-turns <turns>", "Maximum agentic turns")
    .option("--max-budget-usd <amount>", "Dollar budget cap");

  // Subcommands
  const mcp = program.command("mcp").description("Configure and manage MCP servers");
  mcp.command("serve").description("Start the Claude Code MCP server");
  mcp.command("add <name> <commandOrUrl> [args...]").description("Add an MCP server");
  mcp.command("remove <name>").description("Remove an MCP server");
  mcp.command("list").description("List configured MCP servers");

  const auth = program.command("auth").description("Manage authentication");
  auth.command("login").description("Sign in to your Anthropic account");
  auth.command("logout").description("Log out");
  auth.command("status").description("Show authentication status");

  const plugin = program.command("plugin").description("Manage Claude Code plugins");
  plugin.command("list").description("List installed plugins");
  plugin.command("install <plugin>").description("Install a plugin");
  plugin.command("uninstall <plugin>").description("Uninstall a plugin");

  program.command("server").description("Start a Claude Code session server");
  program.command("agents").description("List configured agents");
  program.command("doctor").description("Check auto-updater health");
  program.command("update").description("Check for and install updates");

  return program;
}
