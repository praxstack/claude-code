# Claude Code — Inferred Source Tree

Reverse-engineered from `@anthropic-ai/claude-code@2.1.64` (build 2026-03-03).
Internal codename: **Tengu** (visible in 500+ `tengu_*` telemetry events).

Every file below maps to evidence extracted from the published `cli.js` bundle
(12MB, 12,935 minified lines) and `sdk-tools.d.ts` (2,362 lines of type defs).

## Published Package Layout

```
@anthropic-ai/claude-code/
├── cli.js                 # 12MB single-file bundle (everything)
├── sdk-tools.d.ts         # TypeScript types for SDK consumers
├── package.json           # Zero runtime deps, optional sharp for images
├── resvg.wasm             # SVG rendering
├── tree-sitter.wasm       # Code parsing engine
├── tree-sitter-bash.wasm  # Bash grammar
└── vendor/ripgrep/        # Platform-specific rg + ripgrep.node binaries
    ├── arm64-darwin/
    ├── arm64-linux/
    ├── arm64-win32/
    ├── x64-darwin/
    ├── x64-linux/
    └── x64-win32/
```

## Inferred Source Tree

```
src/
├── cli/
│   ├── entry.ts           # #!/usr/bin/env node, fast-path routing
│   ├── main.ts            # Main function, process setup
│   └── commands.ts        # Commander.js command tree
├── core/
│   ├── loop.ts            # The agentic conversation loop
│   ├── api-client.ts      # Anthropic SDK wrapper, streaming
│   ├── system-prompt.ts   # Multi-segment prompt builder
│   └── streaming.ts       # SSE event parsing (message_start, etc.)
├── tools/
│   ├── tool-interface.ts  # Base tool shape/contract
│   ├── tool-registry.ts   # H86() — collects all tools
│   ├── bash.ts            # Shell execution
│   ├── read.ts            # File/image/PDF/notebook reader
│   ├── edit.ts            # Find-and-replace file editor
│   ├── write.ts           # File writer/creator
│   ├── glob.ts            # File pattern matching
│   ├── grep.ts            # ripgrep content search
│   ├── web-fetch.ts       # URL fetcher + AI processor
│   ├── web-search.ts      # Web search
│   ├── notebook-edit.ts   # Jupyter cell editor
│   ├── ask-user.ts        # Structured user prompting
│   ├── plan-mode.ts       # EnterPlanMode + ExitPlanMode
│   ├── skill.ts           # Slash command invocation
│   ├── tool-search.ts     # Deferred/lazy tool loading
│   ├── enter-worktree.ts  # Git worktree isolation
│   └── tasks.ts           # TaskCreate/Update/Get/List/Stop/Output
├── permissions/
│   ├── modes.ts           # 5 permission modes
│   ├── checker.ts         # Per-tool permission checking
│   ├── rules.ts           # Pattern matching for allow/deny/ask rules
│   └── file-access.ts     # Path-based read/write permission logic
├── hooks/
│   └── hooks.ts           # 21 lifecycle hook events
├── mcp/
│   ├── client.ts          # MCP client (stdio transport)
│   ├── naming.ts          # mcp__<server>__<tool> convention
│   └── serve.ts           # Claude as MCP server
├── agents/
│   ├── agent-definition.ts # Agent shape/contract
│   ├── built-in.ts        # Plan, claude-code-guide, Explore, etc.
│   ├── spawner.ts         # Sync/async/background execution
│   └── teammates.ts       # Multi-agent mailbox coordination
├── ui/
│   └── repl.tsx           # Ink/React terminal UI
├── config/
│   └── settings.ts        # 5-level settings hierarchy
├── memory/
│   └── auto-memory.ts     # MEMORY.md + CLAUDE.md loading
├── compaction/
│   └── compact.ts         # Conversation summarization
├── telemetry/
│   └── events.ts          # tengu_* event tracking
└── sdk/
    └── query.ts           # Programmatic SDK entry point
```
