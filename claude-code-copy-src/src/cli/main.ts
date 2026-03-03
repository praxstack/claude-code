/**
 * MAIN FUNCTION — Mxz() in cli.js
 *
 * Sets up process handlers, determines client type, then delegates
 * to Commander.js command routing.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js (line ~12889, Mxz main function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async function Mxz(){
 *     Bq("main_function_start"),
 *     process.env.NoDefaultCurrentDirectoryInExePath="1",
 *     INq(),
 *     process.on("exit",()=>{fxz()}),
 *     process.on("SIGINT",()=>{process.exit(0)}),
 *     Bq("main_warning_handler_initialized");
 *
 *     let A=process.argv.slice(2),
 *         q=A.includes("-p")||A.includes("--print"),
 *         K=A.includes("--init-only"),
 *         Y=A.some(($)=>$.startsWith("--sdk-url")),
 *         z=q||K||Y||!process.stdout.isTTY;
 *
 *     // Client type detection (for telemetry):
 *     // "github-action", "sdk-typescript", "sdk-python", "sdk-cli",
 *     // "claude-vscode", "local-agent", "claude-desktop", "remote", "cli"
 *
 *     process.title="claude",
 *     await Gxz(),  // <-- Commander.js run
 *     Bq("main_after_run")
 *   }
 */

export async function main() {
  process.env.NoDefaultCurrentDirectoryInExePath = "1";
  process.on("exit", () => cleanup());
  process.on("SIGINT", () => process.exit(0));

  const args = process.argv.slice(2);
  const isPrintMode = args.includes("-p") || args.includes("--print");
  const isInitOnly = args.includes("--init-only");
  const isSdkMode = args.some((a) => a.startsWith("--sdk-url"));
  const isNonInteractive = isPrintMode || isInitOnly || isSdkMode || !process.stdout.isTTY;

  process.title = "claude";
  await runCommander();
}
