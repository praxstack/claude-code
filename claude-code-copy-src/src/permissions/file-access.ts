/**
 * FILE ACCESS PERMISSIONS — zx() (working dir check) + dM() (rule matcher) in cli.js
 *
 * Path-based permission logic for Read, Edit, Write tools.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Working directory check:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // zx(Y, K) — checks if path Y is within allowed working directories
 *   if(zx(Y, K))
 *     return {behavior:"allow", updatedInput:q,
 *             decisionReason:{type:"mode", mode:"default"}}
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Path safety checks:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // UNC path detection (network paths)
 *   if(j.startsWith("\\\\") || j.startsWith("//"))
 *     return {behavior:"ask", message:`...UNC path...`}
 *
 *   // Suspicious Windows patterns
 *   if(jVq(j))
 *     return {behavior:"ask", message:`...suspicious Windows path pattern...`}
 *
 *   // Unsafe path patterns for writes
 *   let O = hb8(Y)
 *   if(!O.safe)
 *     return {behavior:"ask", message:O.message, ...}
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Speculation/auto-allow for file access:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   return L(`[Speculation] ${W?"Write":"Read"} ${V} -> ${P[f]}`),
 *     {behavior:"allow", updatedInput:P,
 *      decisionReason:{type:"other", reason:"speculation_file_access"}}
 */
