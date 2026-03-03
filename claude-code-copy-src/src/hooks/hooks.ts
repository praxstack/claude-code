/**
 * HOOK SYSTEM — ou[] event list + yy1() in cli.js
 *
 * Hooks are shell commands triggered on lifecycle events.
 * Exit codes control behavior: 0=allow, 2=block/inject feedback.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Complete hook event list (ou array):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   ou=["PreToolUse","PostToolUse","PostToolUseFailure","Notification",
 *       "UserPromptSubmit","SessionStart","SessionEnd","Stop",
 *       "SubagentStart","SubagentStop","PreCompact","PermissionRequest",
 *       "Setup","TeammateIdle","TaskCompleted","Elicitation",
 *       "ElicitationResult","ConfigChange","WorktreeCreate",
 *       "WorktreeRemove","InstructionsLoaded"]
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Empty hook container initialization:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   q={PreToolUse:[],PostToolUse:[],PostToolUseFailure:[],Notification:[],
 *      UserPromptSubmit:[],SessionStart:[],SessionEnd:[],Stop:[],
 *      SubagentStart:[],SubagentStop:[],PreCompact:[],PermissionRequest:[],
 *      Setup:[],TeammateIdle:[],TaskCompleted:[],Elicitation:[],
 *      ElicitationResult:[],ConfigChange:[],WorktreeCreate:[],
 *      WorktreeRemove:[],InstructionsLoaded:[]}
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Hook event schemas (Zod definitions per event):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // PreToolUse
 *   { hook_event_name: "PreToolUse", tool_name: string,
 *     tool_input: unknown, tool_use_id: string }
 *
 *   // PostToolUse
 *   { hook_event_name: "PostToolUse", tool_name: string,
 *     tool_input: unknown, tool_response: unknown, tool_use_id: string }
 *
 *   // SessionStart
 *   { hook_event_name: "SessionStart",
 *     source: "startup"|"resume"|"clear"|"compact",
 *     agent_type?: string, model?: string }
 *
 *   // Stop
 *   { hook_event_name: "Stop", stop_hook_active: boolean,
 *     last_assistant_message?: string }
 *
 *   // UserPromptSubmit
 *   { hook_event_name: "UserPromptSubmit", prompt: string }
 *
 *   // PreCompact
 *   { hook_event_name: "PreCompact",
 *     trigger: "manual"|"auto", custom_instructions: string|null }
 *
 *   // TaskCompleted
 *   { hook_event_name: "TaskCompleted",
 *     task_id: string, task_subject: string, task_description?: string }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Hook config format in settings:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   '{"PostToolUse": [{
 *      "matcher": {"tools": ["BashTool"]},
 *      "hooks": [{"type": "command", "command": "echo Done"}]
 *    }]}'
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — SessionStart hooks called at compact time:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async function FP(A,{sessionId:q,agentType:K,model:Y,...}){
 *     let w=[],_=[];
 *     for await(let O of pE8(A,q,$,Y,...)){
 *       if(O.message) w.push(O.message);
 *       if(O.additionalContexts?.length>0) _.push(...O.additionalContexts)
 *     }
 *     return w
 *   }
 */

export const HOOK_EVENTS = [
  "PreToolUse",
  "PostToolUse",
  "PostToolUseFailure",
  "Notification",
  "UserPromptSubmit",
  "SessionStart",
  "SessionEnd",
  "Stop",
  "SubagentStart",
  "SubagentStop",
  "PreCompact",
  "PermissionRequest",
  "Setup",
  "TeammateIdle",
  "TaskCompleted",
  "Elicitation",
  "ElicitationResult",
  "ConfigChange",
  "WorktreeCreate",
  "WorktreeRemove",
  "InstructionsLoaded",
] as const;

export type HookEvent = (typeof HOOK_EVENTS)[number];

export interface HookDefinition {
  matcher?: { tools?: string[] };
  hooks: { type: "command"; command: string }[];
}

export type HookConfig = Record<HookEvent, HookDefinition[]>;

export interface HookResult {
  behavior?: "allow" | "deny" | "ask";
  message?: string;
  updatedInput?: any;
}
