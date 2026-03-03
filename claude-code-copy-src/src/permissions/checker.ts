/**
 * PERMISSION CHECKER — j66() (read), jw6() (write), wl8() (bash) in cli.js
 *
 * Each tool delegates to a specialized permission checker. The flow:
 *   1. Check deny rules → hard deny
 *   2. Check ask rules → prompt user
 *   3. Check mode (acceptEdits, bypassPermissions) → may auto-allow
 *   4. Check working directory → allow if inside CWD
 *   5. Check allow rules → allow if matched
 *   6. Default → ask
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Read permission checker (j66):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function j66(A, q, K) {
 *     if(typeof A.getPath !== "function")
 *       return {behavior:"ask", message:`...hasn't granted it yet.`}
 *     let Y = A.getPath(q), z = gr(Y)
 *
 *     // Check UNC paths
 *     for(let j of z)
 *       if(j.startsWith("\\\\") || j.startsWith("//"))
 *         return {behavior:"ask", message:`...UNC path...`}
 *
 *     // Check deny rules
 *     for(let j of z) {
 *       let J = dM(j, K, "read", "deny")
 *       if(J) return {behavior:"deny", message:`Permission to read ${Y} denied.`}
 *     }
 *
 *     // Check ask rules
 *     for(let j of z) {
 *       let J = dM(j, K, "read", "ask")
 *       if(J) return {behavior:"ask", message:`...`}
 *     }
 *
 *     // Check working directory
 *     if(zx(Y, K))
 *       return {behavior:"allow", updatedInput:q,
 *               decisionReason:{type:"mode", mode:"default"}}
 *
 *     // Default: ask
 *     return {behavior:"ask", message:`...`,
 *       suggestions: er6(Y, "read", K),
 *       decisionReason:{type:"workingDir", reason:"outside allowed dirs"}}
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Write permission checker (jw6):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function jw6(A, q, K) {
 *     // Check deny rules for edit
 *     for(let J of z) {
 *       let D = dM(J, K, "edit", "deny")
 *       if(D) return {behavior:"deny", ...}
 *     }
 *     // Check unsafe path patterns
 *     let O = hb8(Y)
 *     if(!O.safe) return {behavior:"ask", message:O.message, ...}
 *
 *     // acceptEdits mode auto-allows in working directory
 *     if(K.mode === "acceptEdits" && H)
 *       return {behavior:"allow", decisionReason:{type:"mode", mode:K.mode}}
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Hook-based permission override:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   if(G !== undefined && G.behavior === "allow" && !A.requiresUserInteraction?.())
 *     L(`Hook approved tool use for ${A.name}, bypassing permission check`),
 *     v = G
 *   else if(G !== undefined && G.behavior === "deny")
 *     L(`Hook denied tool use for ${A.name}`), v = G
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Tools that always auto-allow:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // These tools return {behavior:"allow"} from checkPermissions:
 *   TodoWrite, TaskCreate, TaskGet, TaskUpdate, TaskList,
 *   ToolSearch, EnterWorktree, KillShell, TaskOutput,
 *   ListMcpResources, ReadMcpResource, EnterPlanMode
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Rule storage keys:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   let Y = q.behavior==="allow" ? "alwaysAllowRules"
 *         : q.behavior==="deny"  ? "alwaysDenyRules"
 *         : "alwaysAskRules"
 */

import type { PermissionResult, Tool, ToolContext } from "../tools/tool-interface";
import type { PermissionMode } from "./modes";

export async function checkToolPermission(
  tool: Tool,
  input: any,
  context: ToolContext,
  mode: PermissionMode,
): Promise<PermissionResult> {
  // 1. Tool's own permission check
  const result = await tool.checkPermissions(input, context);

  // 2. Mode overrides
  if (mode === "bypassPermissions") {
    return { behavior: "allow", updatedInput: input };
  }

  if (mode === "dontAsk" && result.behavior === "ask") {
    return { behavior: "deny", message: "Permission denied (dontAsk mode)" };
  }

  if (mode === "plan" && !tool.isReadOnly(input)) {
    return { behavior: "deny", message: "Write operations not allowed in plan mode" };
  }

  return result;
}
