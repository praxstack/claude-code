/**
 * PLAN MODE — EnterPlanMode (ui6/hZ6) + ExitPlanMode (mX/xM) in cli.js
 *
 * Plan mode restricts the agent to read-only tools. The agent proposes
 * a plan, the user approves, then plan mode exits with optional
 * Bash permission grants.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Tool name constants:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   var QI  = "ExitPlanMode"   // alias
 *   var xM  = "ExitPlanMode"   // used in tool def
 *   var hZ6 = "EnterPlanMode"
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — ExitPlanModeInput:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface ExitPlanModeInput {
 *     allowedPrompts?: { tool: "Bash"; prompt: string }[];
 *     [k: string]: unknown;  // additional arbitrary props
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — ExitPlanModeOutput:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface ExitPlanModeOutput {
 *     plan: string | null;
 *     isAgent: boolean;
 *     filePath?: string;
 *     hasTaskTool?: boolean;
 *     awaitingLeaderApproval?: boolean;  // teammate sent to leader
 *     requestId?: string;
 *     isUltraplan?: boolean;
 *   }
 */
