/**
 * PERMISSION MODES — ru/rL array in cli.js
 *
 * 5 modes controlling how tool executions are handled.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Mode enum:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   ru=["acceptEdits","bypassPermissions","default","dontAsk","plan"],
 *   AmA=[...ru,...[]],
 *   rL=AmA
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Zod schema with descriptions:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   V66=t6(()=>h.enum(["default","acceptEdits","bypassPermissions","plan","dontAsk"])
 *     .describe(
 *       "'default' - Standard behavior, prompts for dangerous operations.
 *        'acceptEdits' - Auto-accept file edit operations.
 *        'bypassPermissions' - Bypass all permission checks.
 *        'plan' - Planning mode, no actual tool execution.
 *        'dontAsk' - Don't prompt, deny if not pre-approved."))
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — UI metadata for modes:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   plan:              {title:"Plan Mode",     symbol:"⏸", color:"planMode"}
 *   acceptEdits:       {title:"Accept edits",  symbol:"⏵⏵",color:"autoAccept"}
 *   bypassPermissions: {title:"Bypass Perms",  symbol:"⏵⏵",color:"error"}
 *   dontAsk:           {title:"Don't Ask",     symbol:"⏵⏵",color:"error"}
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — dontAsk behavior in permission flow:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   if(_.toolPermissionContext.mode==="dontAsk")
 *     return{behavior:"deny",decisionReason:{type:"mode",mode:"dontAsk"},message:JZq}
 */

export const PERMISSION_MODES = [
  "default",
  "acceptEdits",
  "bypassPermissions",
  "plan",
  "dontAsk",
] as const;

export type PermissionMode = (typeof PERMISSION_MODES)[number];
