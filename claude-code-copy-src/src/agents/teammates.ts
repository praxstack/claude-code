/**
 * TEAMMATE SYSTEM — Multi-agent mailbox coordination in cli.js
 *
 * Full multi-agent architecture with team leads, task assignment,
 * and inter-agent communication.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Hidden CLI flags for teammates:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   --agent-id, --agent-name, --team-name, --agent-color,
 *   --parent-session-id, --teammate-mode, --agent-type
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — AsyncLocalStorage-based context:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Hf8 — AsyncLocalStorage for agent context tracking
 *   // Tracks: team names, agent IDs, parent session IDs
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Conditional team tools in registry:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   ...Z7()?[t6z(),e6z(),A1z()]:[]  // Swarm team tools (conditional)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — TeammateIdle hook event:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   "TeammateIdle"  // in the hook events array
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Leader approval in ExitPlanMode:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // ExitPlanModeOutput:
 *   awaitingLeaderApproval?: boolean  // teammate sent plan to team leader
 *   requestId?: string               // unique ID for the plan approval request
 */
