/**
 * CLI ENTRY POINT — Vxz() in cli.js
 *
 * The very first code that runs. Handles fast-path routing for simple flags
 * before importing the heavy main module.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js (lines 1-7, shebang + metadata):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   #!/usr/bin/env node
 *   // (c) Anthropic PBC. All rights reserved.
 *   // Version: 2.1.64
 *   // Want to see the unminified source? We're hiring!
 *   // https://job-boards.greenhouse.io/anthropic/jobs/4816199008
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js (line ~12932, Vxz entry point):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async function Vxz(){
 *     let A=process.argv.slice(2);
 *     if(A.length===1&&(A[0]==="--version"||A[0]==="-v"||A[0]==="-V")){
 *       console.log(`${{...VERSION_OBJ}.VERSION} (Claude Code)`);
 *       return;
 *     }
 *     let{profileCheckpoint:q}=await Promise.resolve().then(() => (uS(),U6A));
 *     if(q("cli_entry"),A[0]==="--ripgrep"){...}
 *     // ... fast-path for remote-control, tmux, chrome, etc.
 *
 *     // Nesting detection:
 *     if(process.env.CLAUDECODE==="1"
 *        &&!A.some((w)=>w.startsWith("--team-name"))
 *        &&!vxz(A))
 *       console.error(`Error: Claude Code cannot be launched inside another Claude Code session.`),
 *       process.exit(1);
 *
 *     // Dynamic import of the full main module:
 *     let{main:z}=await Promise.resolve().then(() => (LBq(),EBq));
 *     q("cli_after_main_import"), await z(), q("cli_after_main_complete")
 *   }
 *   Vxz();  // <-- the actual invocation
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE (safe subcommands that bypass nesting check):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   var Nxz=["plugin","mcp","auth","doctor","update","install",
 *            "rollback","log","completion"];
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE (entrypoint detection — Xxz function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function Xxz(A){
 *     if(process.env.CLAUDE_CODE_ENTRYPOINT)return;
 *     let q=process.argv.slice(2),K=q.indexOf("mcp");
 *     if(K!==-1&&q[K+1]==="serve"){
 *       process.env.CLAUDE_CODE_ENTRYPOINT="mcp"; return
 *     }
 *     if(_1(process.env.CLAUDE_CODE_ACTION)){
 *       process.env.CLAUDE_CODE_ENTRYPOINT="claude-code-github-action"; return
 *     }
 *     process.env.CLAUDE_CODE_ENTRYPOINT=A?"sdk-cli":"cli"
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE (version/build metadata object):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   {
 *     ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
 *     PACKAGE_URL: "@anthropic-ai/claude-code",
 *     README_URL: "https://code.claude.com/docs/en/overview",
 *     VERSION: "2.1.64",
 *     FEEDBACK_CHANNEL: "https://github.com/anthropics/claude-code/issues",
 *     BUILD_TIME: "2026-03-03T03:18:32Z"
 *   }
 */

const SAFE_SUBCOMMANDS = [
  "plugin", "mcp", "auth", "doctor", "update",
  "install", "rollback", "log", "completion",
];

async function entry() {
  const args = process.argv.slice(2);

  // Fast path: --version
  if (args.length === 1 && ["--version", "-v", "-V"].includes(args[0])) {
    console.log(`${VERSION} (Claude Code)`);
    return;
  }

  // Fast path: --ripgrep (pass through to bundled rg)
  if (args[0] === "--ripgrep") {
    // spawn vendor/ripgrep/<platform>/rg with remaining args
    return;
  }

  // Nesting detection: prevent claude-inside-claude
  if (
    process.env.CLAUDECODE === "1" &&
    !args.some((a) => a.startsWith("--team-name")) &&
    !SAFE_SUBCOMMANDS.includes(args[0])
  ) {
    console.error("Error: Claude Code cannot be launched inside another Claude Code session.");
    process.exit(1);
  }

  // Dynamic import the heavy main module
  const { main } = await import("./main");
  await main();
}

entry();
