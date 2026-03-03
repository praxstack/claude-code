# Claude CLI Recreation Guide (Clean-Room)

This guide summarizes the structure inferred from:

- `/Users/praxlannister/Documents/workspace/claude-code/claude-code-npmjs-2.1.64/cli.js`
- `/Users/praxlannister/Documents/workspace/claude-code/claude-code-npmjs-2.1.64/sdk-tools.d.ts`

It is intended for educational clean-room reimplementation.

## 1) NPM Package Layout (Observed)

From `claude-code-npmjs-2.1.64`:

```text
claude-code-npmjs-2.1.63/
  cli.js
  sdk-tools.d.ts
  package.json
  README.md
  LICENSE.md
  bun.lock
  resvg.wasm
  tree-sitter.wasm
  tree-sitter-bash.wasm
  vendor/
    ripgrep/
      COPYING
      arm64-darwin/{rg,ripgrep.node}
      x64-darwin/{rg,ripgrep.node}
      arm64-linux/{rg,ripgrep.node}
      x64-linux/{rg,ripgrep.node}
      arm64-win32/{rg.exe,ripgrep.node}
      x64-win32/{rg.exe,ripgrep.node}
```

## 2) Runtime Folder Hierarchy (Observed in `cli.js` strings)

### Config root

- `CLAUDE_CONFIG_DIR` env var if set
- otherwise `~/.claude`

### User scope (`~/.claude`)

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
  local/claude/
  bash-log.txt
  bash-command-log.txt
  statusline-command.sh
```

### Project scope

```text
<project>/
  CLAUDE.md
  CLAUDE.local.md
  .mcp.json
  .claude/
    CLAUDE.md
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

### Remote memory mode

If `CLAUDE_CODE_REMOTE_MEMORY_DIR` is set, local agent memory is rooted under:

```text
$CLAUDE_CODE_REMOTE_MEMORY_DIR/projects/<project-id>/agent-memory-local/
```

## 3) Tool Surface (from `sdk-tools.d.ts`)

Primary tool groups you should mirror:

- Agent orchestration: `Agent`, `ExitPlanMode`, `EnterWorktree`
- Shell/runtime: `Bash`, `TaskOutput`, `TaskStop`
- Filesystem: `FileRead`, `FileWrite`, `FileEdit`, `Glob`, `Grep`, `NotebookEdit`
- MCP: `ListMcpResources`, `ReadMcpResource`, `SubscribeMcpResource`, `SubscribePolling`, `Mcp`
- Web: `WebFetch`, `WebSearch`
- UX/session: `AskUserQuestion`, `TodoWrite`, `Config`

## 4) Recommended Clean-Room Source Layout

Use this layout for your reimplementation:

```text
claude-like/
  package.json
  bin/
    claude.js
  src/
    index.ts
    cli/
      parse-args.ts
      repl.ts
      command-router.ts
    config/
      paths.ts
      settings.ts
      settings-schema.ts
    runtime/
      session.ts
      permissions.ts
      plan-mode.ts
      task-manager.ts
    tools/
      bash.ts
      file.ts
      search.ts
      mcp.ts
      web.ts
      agent.ts
      todo.ts
      worktree.ts
      config.ts
    memory/
      store.ts
      indexer.ts
    plugins/
      loader.ts
      manifest.ts
    prompts/
      system.ts
    vendor/
      ripgrep/
    wasm/
      tree-sitter.wasm
      tree-sitter-bash.wasm
      resvg.wasm
```

## 5) Build Order To Recreate

1. Implement config path resolver (`CLAUDE_CONFIG_DIR` fallback + user/project/local scopes).
2. Implement settings loading precedence:
   - user: `~/.claude/settings.json`
   - project: `.claude/settings.json`
   - local: `.claude/settings.local.json`
3. Implement core REPL and slash command router.
4. Implement filesystem and bash tools.
5. Implement background task manager (`TaskOutput`/`TaskStop`).
6. Implement worktree isolation (`.claude/worktrees`).
7. Implement memory directories and basic indexing.
8. Add MCP and web tools.
9. Add plugin loader (`.claude/plugins` + manifests).

## 6) Version Notes (2.1.63 -> 2.1.64)

Structural/runtime layout is effectively the same. Notable schema changes in `sdk-tools.d.ts`:

- `AgentInput` removed optional `model` and `max_turns`.
- `AgentOutput` removed `status: "sub_agent_entered"` variant.
- `ExitPlanModeOutput` added optional `isUltraplan`.
- `ReadMcpResourceOutput.contents[]` added optional `blobSavedTo`.

## 7) Notes

- `cli.js` is bundled/minified; use it only for architecture hints and path conventions.
- `sdk-tools.d.ts` is the best source of tool I/O contracts.
- Keep your implementation clean-room: same concepts, your own code.
