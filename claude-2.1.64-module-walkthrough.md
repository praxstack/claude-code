# Claude Code `2.1.64` Walkthrough + Recreation Checklist

This is a clean-room architecture walkthrough based on:

- [`cli.js`](/Users/praxlannister/Documents/workspace/claude-code/claude-code-npmjs-2.1.64/cli.js)
- [`sdk-tools.d.ts`](/Users/praxlannister/Documents/workspace/claude-code/claude-code-npmjs-2.1.64/sdk-tools.d.ts)
- [`package.json`](/Users/praxlannister/Documents/workspace/claude-code/claude-code-npmjs-2.1.64/package.json)

## 1) What ships in the npm package

```text
claude-code-npmjs-2.1.64/
  cli.js                    # bundled runtime (entry + app logic)
  sdk-tools.d.ts            # tool input/output contracts
  package.json
  README.md
  LICENSE.md
  bun.lock
  resvg.wasm
  tree-sitter.wasm
  tree-sitter-bash.wasm
  vendor/ripgrep/<platform>/{rg, ripgrep.node, ...}
```

Interpretation:
- `cli.js` is a bundled monolith.
- Native/wasm assets are included, so runtime does not depend on external `rg`/parser installs.

## 2) Runtime config and folder hierarchy

Evidence in `cli.js` indicates:

- Config root resolver:
  - `process.env.CLAUDE_CONFIG_DIR`
  - fallback `~/.claude`
- Team state under `<config-root>/teams`
- Project overlays and instruction sources:
  - `CLAUDE.md`
  - `.claude/CLAUDE.md`
  - `CLAUDE.local.md`
  - `.claude/rules/`

### User scope

```text
~/.claude/
  settings.json
  keybindings.json
  CLAUDE.md
  commands/
  agents/
  skills/
  plugins/
  rules/
  plans/
  tasks/
  teams/
  worktrees/
  agent-memory/
  agent-memory-local/
```

### Project scope

```text
<project>/
  CLAUDE.md
  CLAUDE.local.md
  .mcp.json
  .claude/
    settings.json
    settings.local.json
    commands/
    agents/
    skills/
    plugins/
    rules/
    worktrees/
    agent-memory/
    agent-memory-local/
```

### Remote-memory behavior

If `CLAUDE_CODE_REMOTE_MEMORY_DIR` is set, memory paths are redirected there.

## 3) Module-level architecture (inferred)

## A. Bootstrap + CLI entry
- Parses args and command mode.
- Initializes settings, auth, telemetry, permissions.
- Starts interactive loop or subcommand flow.

## B. Settings and instruction aggregation
- Merges layered settings (`user` / `project` / `local`).
- Collects instruction docs and rule files.
- Handles managed-policy gating (hooks, permission rules, marketplaces).

## C. Tool runtime
- Strongly typed tool contracts come from `sdk-tools.d.ts`.
- Core tool classes:
  - shell/tasks: `Bash`, `TaskOutput`, `TaskStop`
  - file/search: `FileRead/Write/Edit`, `Glob`, `Grep`, `NotebookEdit`
  - web: `WebFetch`, `WebSearch`
  - coordination: `Agent`, `AskUserQuestion`, `TodoWrite`, `ExitPlanMode`, `Config`, `EnterWorktree`
  - MCP: resource list/read/subscribe + generic `Mcp`

## D. Agent orchestration
- Subagent spawn/resume/background support is in the tool schema.
- Plan mode + approval is represented via `ExitPlanMode`.
- Worktree isolation is integrated (`EnterWorktree` and `.claude/worktrees` usage).

## E. Memory subsystem
- Per-scope memory directories.
- Session and project/user memory routing.
- Optional remote memory root via env vars.

## F. Plugin subsystem
- Plugin cache root uses:
  - `CLAUDE_CODE_PLUGIN_CACHE_DIR` override, else `<config-root>/plugins` (or cowork variant).
- Seed directory support via `CLAUDE_CODE_PLUGIN_SEED_DIR`.
- Project plugins and marketplace support are settings-driven.

## G. MCP subsystem
- Project `.mcp.json` participation is explicit in bundled strings.
- Resource polling/subscribe APIs are first-class in `sdk-tools.d.ts`.

## 4) `sdk-tools.d.ts` map (2.1.64)

Input interfaces:
- `AgentInput`
- `BashInput`
- `TaskOutputInput`
- `ExitPlanModeInput`
- `FileEditInput`
- `FileReadInput`
- `FileWriteInput`
- `GlobInput`
- `GrepInput`
- `TaskStopInput`
- `ListMcpResourcesInput`
- `McpInput`
- `NotebookEditInput`
- `ReadMcpResourceInput`
- `SubscribeMcpResourceInput`
- `UnsubscribeMcpResourceInput`
- `SubscribePollingInput`
- `UnsubscribePollingInput`
- `TodoWriteInput`
- `WebFetchInput`
- `WebSearchInput`
- `AskUserQuestionInput`
- `ConfigInput`
- `EnterWorktreeInput`

Notable 2.1.64 details:
- `AgentInput` does not include `model`/`max_turns` (present in 2.1.63).
- `ReadMcpResourceOutput.contents[]` includes optional `blobSavedTo`.
- `ExitPlanModeOutput` includes optional `isUltraplan`.

## 5) Recreation checklist (ordered, practical)

Use this as the implementation plan for your own clean-room clone.

1. Bootstrap CLI shell
- Implement `bin/claude-like` + REPL loop + slash-command router.
- Verify: running `claude-like` starts an interactive prompt.

2. Implement path resolver
- Add config root fallback `CLAUDE_CONFIG_DIR ?? ~/.claude`.
- Add project `.claude/` resolver.
- Verify: print resolved roots for user/project/local.

3. Implement settings precedence
- Load and merge:
  - `~/.claude/settings.json`
  - `<project>/.claude/settings.json`
  - `<project>/.claude/settings.local.json`
- Verify: local overrides project overrides user.

4. Implement instruction ingestion
- Read `CLAUDE.md`, `.claude/CLAUDE.md`, `CLAUDE.local.md`, `.claude/rules/*`.
- Verify: combined instruction text appears in runtime prompt.

5. Implement core tools (`Bash`, file, grep/glob)
- Mirror contracts from `sdk-tools.d.ts`.
- Verify: tool payloads validate and return schema-shaped outputs.

6. Implement background task manager
- Add task registry + stop/read output.
- Verify: long bash command can be backgrounded and later queried.

7. Implement worktree isolation
- Create isolated git worktree in `.claude/worktrees/<name>`.
- Verify: file edits in worktree do not touch main checkout.

8. Implement memory scopes
- Create user/project/local memory folders and read/write APIs.
- Add optional remote-memory root env support.
- Verify: each scope writes to expected directory.

9. Implement plugin loading
- Load plugin dirs from user/project settings.
- Parse plugin manifests and optional marketplace sources.
- Verify: plugin command/agent/skill discovery is deterministic.

10. Implement MCP integration
- Load `.mcp.json`, list/read resources, poll subscriptions.
- Verify: at least one MCP server round-trip works end-to-end.

11. Final verification phase
- Add integration smoke tests for: settings merge, tool dispatch, background tasks, worktree, memory routing, plugin load, MCP.
- Verify: one command suite passes on a clean machine.

## 6) Start from the scaffold

You already have a starter generator:
- [`scripts/scaffold-claude-like.sh`](/Users/praxlannister/Documents/workspace/claude-code/scripts/scaffold-claude-like.sh)

Run:

```bash
cd /Users/praxlannister/Documents/workspace/claude-code
./scripts/scaffold-claude-like.sh ./claude-like
```

Then implement checklist items in order.
