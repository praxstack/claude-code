/**
 * TASK TOOLS — TaskCreate (m3q), TaskGet (l3q), TaskUpdate (A5q),
 *              TaskList (j5q), TaskStop (AE1), TaskOutput (KE1) in cli.js
 *
 * The task system is conditional — only enabled when MH() returns true.
 * All task tools auto-allow permissions (no user prompt needed).
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — TaskCreate definition:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   m3q={
 *     name: gg,  // "TaskCreate"
 *     searchHint: "create a task in the task list",
 *     maxResultSizeChars: 1e5,
 *     shouldDefer: !0,
 *     isEnabled(){ return MH() },
 *     isConcurrencySafe(){ return !0 },
 *     isReadOnly(){ return !1 },
 *     async checkPermissions(A){ return {behavior:"allow",updatedInput:A} },
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Conditional inclusion in registry:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   ...MH()?[m3q,l3q,A5q,j5q]:[],  // TaskCreate,TaskGet,TaskUpdate,TaskList
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — TodoWrite is mutually exclusive with task tools:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   AN={
 *     name: ke,  // "TodoWrite"
 *     isEnabled(){ return !MH() },  // enabled when tasks are NOT
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — TaskOutputInput:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface TaskOutputInput {
 *     task_id: string;
 *     block: boolean;    // wait for completion?
 *     timeout: number;   // max wait ms
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — TaskStopOutput:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface TaskStopOutput {
 *     message: string;
 *     task_id: string;
 *     task_type: string;
 *     command?: string;
 *   }
 */

// Task tools share the background execution model with Bash and Agent
export interface TaskOutputInput {
  task_id: string;
  block: boolean;
  timeout: number;
}
