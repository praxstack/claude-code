/**
 * TERMINAL UI — Ink/React TUI (tY component) in cli.js
 *
 * The interactive terminal UI is built entirely with React via Ink.
 * This is what renders the conversation, permission dialogs, tool
 * progress, onboarding, and settings editor.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Ink root node setup:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   this.rootNode=i41("ink-root"),
 *   this.renderer=Cs1(this.rootNode,this.stylePool),
 *   this.rootNode.onRender=this.scheduleRender,
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — React hooks usage (scale of the TUI):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   createElement matches:  4,357  (massive React component tree)
 *   useEffect matches:      312
 *   useState matches:       319
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — First render timing:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   L(`[render] first ink render: ${Math.round(process.uptime()*1000)}ms
 *      since process start`)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Provider pattern:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   Zq6.default.createElement(Qs1.Provider,{value:_},K)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — useEffect for terminal resize:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   dy7.useEffect(()=>{
 *     let q=()=>{
 *       if(pu6()) process.stdout.write(`\n`+MO8()+`\n`...)
 *     };
 *     ...
 *   })
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * KEY INSIGHT: The TUI is NOT a simple readline REPL. It's a full React
 * application running in the terminal via Ink. Components include:
 * - Conversation display with markdown rendering
 * - Tool progress indicators / spinners
 * - Permission approval dialogs
 * - Onboarding wizard
 * - Settings editor
 * - Status bar / status line
 * - Hook editor
 * ═══════════════════════════════════════════════════════════════════════════
 */

// In a real implementation, you'd use:
// import { render, Box, Text } from "ink";
// import React from "react";

// The REPL component tree (simplified):
//
// <App>
//   <ThemeProvider>
//     <ConversationView messages={messages} />
//     <ToolProgress activeTool={currentTool} />
//     <PermissionDialog pending={pendingPermission} />
//     <InputArea onSubmit={handleUserInput} />
//     <StatusBar cost={totalCost} tokens={totalTokens} />
//   </ThemeProvider>
// </App>
