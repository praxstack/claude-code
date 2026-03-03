/**
 * TOOL REGISTRY — H86() function in cli.js
 *
 * Collects ALL tools (built-in + conditional + MCP) into a single array.
 * Some tools are conditionally included based on feature flags.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js (line ~98127, H86 function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function H86(){
 *     return[
 *       SZ6,     // Agent
 *       KE1,     // TaskOutput
 *       $q,      // Bash
 *       lF,      // Glob
 *       Hb,      // Grep
 *       mX,      // ExitPlanMode
 *       n9,      // Read
 *       Y0,      // Edit
 *       z0,      // Write
 *       gi,      // NotebookEdit
 *       $0,      // WebFetch
 *       AN,      // TodoWrite
 *       YE1,     // WebSearch
 *       AE1,     // KillShell (TaskStop)
 *       EV6,     // AskUserQuestion
 *       o16,     // Skill
 *       ui6,     // EnterPlanMode
 *
 *       // Conditional: Task tools (behind MH() flag)
 *       ...MH()?[m3q,l3q,A5q,j5q]:[],  // TaskCreate,TaskGet,TaskUpdate,TaskList
 *
 *       og8,                             // LSP
 *
 *       // Conditional: Worktree
 *       ...yV6()?[X3q]:[],              // EnterWorktree
 *
 *       // Conditional: Swarm/team tools
 *       ...Z7()?[t6z(),e6z(),A1z()]:[],
 *
 *       // MCP tools
 *       Kl,                              // ListMcpResources
 *       Yl,                              // ReadMcpResource
 *       ...PE1?[PE1]:[],                 // SubscribeMcpResource
 *       ...WE1?[WE1]:[],                // UnsubscribeMcpResource
 *       ...GE1?[GE1]:[],                // SubscribePolling
 *       ...ZE1?[ZE1]:[],                // UnsubscribePolling
 *
 *       // Conditional: ToolSearch (deferred tool loader)
 *       ...gc()?[pW1]:[]
 *     ]
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Enabled tools filter (wF8 function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function wF8(){
 *     let A=H86(),
 *         q=A.map((K)=>K.isEnabled())
 *     return A.filter((K,Y)=>q[Y]).map((K)=>K.name)
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Tool name constants (minified variable assignments):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   var pq  = "Agent"
 *   var I4  = "Bash"
 *   var o4  = "Read"
 *   var vq  = "Edit"
 *   var C3  = "Write"
 *   var FY  = "Glob"
 *   var n3  = "Grep"
 *   var XX  = "WebFetch"
 *   var MM  = "NotebookEdit"
 *   var ke  = "TodoWrite"
 *   var Dj  = "Skill"
 *   var CO  = "AskUserQuestion"
 *   var xM  = "ExitPlanMode"
 *   var vP  = "ToolSearch"
 *   var gg  = "TaskCreate"
 *   var $x  = "TaskUpdate"
 *   var IZ6 = "TaskGet"
 *   var xZ6 = "TaskList"
 *   var NG1 = "EnterWorktree"
 *   var _k  = "WebSearch"
 *   var OU  = "TaskOutput"
 *   var hZ6 = "EnterPlanMode"
 *   var ig8 = "LSP"
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — File pattern tool categories (line ~15501):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   qo1={
 *     filePatternTools: ["Read","Write","Edit","Glob","NotebookRead","NotebookEdit"],
 *     bashPrefixTools: ["Bash"],
 *     customValidation: {
 *       WebSearch: (A) => { /* validates no wildcards */ }
 *     }
 *   }
 */

import type { Tool } from "./tool-interface";

export function getAllTools(): Tool[] {
  return [
    // Always present (core tools)
    agentTool,
    taskOutputTool,
    bashTool,
    globTool,
    grepTool,
    exitPlanModeTool,
    readTool,
    editTool,
    writeTool,
    notebookEditTool,
    webFetchTool,
    todoWriteTool,
    webSearchTool,
    taskStopTool,
    askUserQuestionTool,
    skillTool,
    enterPlanModeTool,

    // Conditional: Task tools
    ...(isTasksEnabled() ? [taskCreateTool, taskGetTool, taskUpdateTool, taskListTool] : []),

    // Conditional: Worktree
    ...(isWorktreeAvailable() ? [enterWorktreeTool] : []),

    // MCP tools
    listMcpResourcesTool,
    readMcpResourceTool,

    // Conditional: Deferred tool loader
    ...(hasDeferredTools() ? [toolSearchTool] : []),
  ];
}

export function getEnabledTools(): Tool[] {
  return getAllTools().filter((t) => t.isEnabled());
}

export function getEnabledToolNames(): string[] {
  return getEnabledTools().map((t) => t.name);
}

// Write-mutating tools
export const WRITE_TOOLS = new Set(["Edit", "Write", "NotebookEdit"]);

// Read-only tools (always safe)
export const READ_ONLY_TOOLS = new Set([
  "Read", "Glob", "Grep", "ToolSearch", "LSP", "TaskGet", "TaskList",
]);
