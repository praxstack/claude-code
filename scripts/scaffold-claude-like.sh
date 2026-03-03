#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./scripts/scaffold-claude-like.sh [target-dir]
#
# Example:
#   ./scripts/scaffold-claude-like.sh ./claude-like

TARGET="${1:-./claude-like}"
TARGET="$(cd "$(dirname "$TARGET")" && pwd)/$(basename "$TARGET")"

echo "Scaffolding clean-room Claude-like project at:"
echo "  $TARGET"

mkdir -p "$TARGET"/{bin,src/{cli,config,runtime,tools,memory,plugins,prompts},vendor/ripgrep,wasm}
mkdir -p "$TARGET"/.claude/{commands,agents,skills,plugins,rules,worktrees,agent-memory,agent-memory-local}

cat > "$TARGET/package.json" <<'JSON'
{
  "name": "claude-like",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "bin": {
    "claude-like": "bin/claude.js"
  },
  "scripts": {
    "dev": "node --enable-source-maps src/index.js",
    "start": "node bin/claude.js"
  }
}
JSON

cat > "$TARGET/bin/claude.js" <<'JS'
#!/usr/bin/env node
import { main } from "../src/index.js";

main().catch((err) => {
  console.error(err instanceof Error ? err.message : String(err));
  process.exit(1);
});
JS

cat > "$TARGET/src/index.js" <<'JS'
import { startRepl } from "./cli/repl.js";

export async function main() {
  await startRepl();
}
JS

cat > "$TARGET/src/cli/repl.js" <<'JS'
export async function startRepl() {
  process.stdout.write("claude-like: REPL bootstrap\\n");
}
JS

cat > "$TARGET/src/cli/parse-args.js" <<'JS'
export function parseArgs(argv) {
  return { raw: argv.slice(2) };
}
JS

cat > "$TARGET/src/cli/command-router.js" <<'JS'
export function routeCommand(input) {
  return { type: "noop", input };
}
JS

cat > "$TARGET/src/config/paths.js" <<'JS'
import path from "node:path";
import os from "node:os";

export function configRoot() {
  return process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), ".claude");
}

export function userSettingsPath() {
  return path.join(configRoot(), "settings.json");
}

export function projectClaudeDir(projectRoot) {
  return path.join(projectRoot, ".claude");
}
JS

cat > "$TARGET/src/config/settings.js" <<'JS'
export function loadSettings() {
  return {};
}
JS

cat > "$TARGET/src/config/settings-schema.js" <<'JS'
export const settingsSchema = {
  type: "object"
};
JS

cat > "$TARGET/src/runtime/session.js" <<'JS'
export class Session {
  constructor(cwd = process.cwd()) {
    this.cwd = cwd;
  }
}
JS

cat > "$TARGET/src/runtime/permissions.js" <<'JS'
export function checkPermission(_toolName, _payload) {
  return { allowed: true };
}
JS

cat > "$TARGET/src/runtime/plan-mode.js" <<'JS'
export function inPlanMode() {
  return false;
}
JS

cat > "$TARGET/src/runtime/task-manager.js" <<'JS'
export class TaskManager {
  constructor() {
    this.tasks = new Map();
  }
}
JS

cat > "$TARGET/src/tools/bash.js" <<'JS'
export async function runBash(_input) {
  return { stdout: "", stderr: "", interrupted: false };
}
JS

cat > "$TARGET/src/tools/file.js" <<'JS'
export async function readFileTool(_input) {
  return { type: "text", file: { filePath: "", content: "", numLines: 0, startLine: 1, totalLines: 0 } };
}
JS

cat > "$TARGET/src/tools/search.js" <<'JS'
export async function globTool(_input) {
  return { durationMs: 0, numFiles: 0, filenames: [], truncated: false };
}
JS

cat > "$TARGET/src/tools/mcp.js" <<'JS'
export async function callMcp(_input) {
  return "";
}
JS

cat > "$TARGET/src/tools/web.js" <<'JS'
export async function webSearch(_input) {
  return { query: "", results: [], durationSeconds: 0 };
}
JS

cat > "$TARGET/src/tools/agent.js" <<'JS'
export async function spawnAgent(_input) {
  return { status: "completed", agentId: "stub", content: [{ type: "text", text: "stub" }], totalToolUseCount: 0, totalDurationMs: 0, totalTokens: 0, usage: { input_tokens: 0, output_tokens: 0, cache_creation_input_tokens: null, cache_read_input_tokens: null, server_tool_use: null, service_tier: null, cache_creation: null }, prompt: "" };
}
JS

cat > "$TARGET/src/tools/todo.js" <<'JS'
export function writeTodo(_input) {
  return { oldTodos: [], newTodos: [] };
}
JS

cat > "$TARGET/src/tools/worktree.js" <<'JS'
export async function enterWorktree(_input) {
  return { worktreePath: "", message: "not implemented" };
}
JS

cat > "$TARGET/src/tools/config.js" <<'JS'
export function configTool(_input) {
  return { success: true };
}
JS

cat > "$TARGET/src/memory/store.js" <<'JS'
export class MemoryStore {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }
}
JS

cat > "$TARGET/src/memory/indexer.js" <<'JS'
export function indexMemories(_rootDir) {
  return [];
}
JS

cat > "$TARGET/src/plugins/loader.js" <<'JS'
export async function loadPlugins(_dirs) {
  return [];
}
JS

cat > "$TARGET/src/plugins/manifest.js" <<'JS'
export function validatePluginManifest(_manifest) {
  return { valid: true };
}
JS

cat > "$TARGET/src/prompts/system.js" <<'JS'
export function buildSystemPrompt() {
  return "You are a coding assistant.";
}
JS

cat > "$TARGET/.claude/settings.json" <<'JSON'
{
  "permissions": {
    "defaultMode": "default"
  }
}
JSON

cat > "$TARGET/.claude/settings.local.json" <<'JSON'
{
  "permissions": {}
}
JSON

cat > "$TARGET/CLAUDE.md" <<'MD'
# CLAUDE.md

Project instructions for your clean-room Claude-like implementation.
MD

cat > "$TARGET/CLAUDE.local.md" <<'MD'
# CLAUDE.local.md

Local-only overrides for this project.
MD

cat > "$TARGET/.mcp.json" <<'JSON'
{
  "mcpServers": {}
}
JSON

touch "$TARGET/.claude/commands/.gitkeep"
touch "$TARGET/.claude/agents/.gitkeep"
touch "$TARGET/.claude/skills/.gitkeep"
touch "$TARGET/.claude/plugins/.gitkeep"
touch "$TARGET/.claude/rules/.gitkeep"
touch "$TARGET/.claude/worktrees/.gitkeep"
touch "$TARGET/.claude/agent-memory/.gitkeep"
touch "$TARGET/.claude/agent-memory-local/.gitkeep"

chmod +x "$TARGET/bin/claude.js"

echo "Done."
echo "Next:"
echo "  cd \"$TARGET\""
echo "  node bin/claude.js"
