/**
 * SETTINGS HIERARCHY — 5-level priority system in cli.js
 *
 * Settings are loaded from multiple sources. Higher priority overrides lower.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Source list:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   allowedSettingSources: [
 *     "userSettings","projectSettings","localSettings",
 *     "flagSettings","policySettings"
 *   ]
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Source-to-label mapping (Ya function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function Ya(A){switch(A){
 *     case"userSettings":    return "user";
 *     case"projectSettings": return "project";
 *     case"localSettings":   return "project, gitignored";
 *     case"flagSettings":    return "cli flag";
 *     case"policySettings":  return "managed"
 *   }}
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Friendly display names (suA function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function suA(A){switch(A){
 *     case"userSettings":    return "User settings";
 *     case"projectSettings": return "Shared project settings";
 *     case"localSettings":   return "Project local settings";
 *     case"flagSettings":    return "Command line arguments";
 *     case"policySettings":  return "Enterprise managed settings";
 *   }}
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — File paths:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   userSettings    → ~/.claude/settings.json
 *   projectSettings → .claude/settings.json        (committed)
 *   localSettings   → .claude/settings.local.json   (gitignored)
 *   policySettings  → enterprise managed
 *   flagSettings    → CLI arguments
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Policy settings always present:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function za(){
 *     let A=Fx1(),q=new Set(A);
 *     return q.add("policySettings"),q.add("flagSettings"),Array.from(q)
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — ConfigInput/Output:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface ConfigInput {
 *     setting: string;
 *     value?: string | boolean | number;  // omit to read
 *   }
 *   export interface ConfigOutput {
 *     success: boolean;
 *     operation?: "get" | "set";
 *     setting?: string;
 *     value?: unknown;
 *     previousValue?: unknown;
 *     newValue?: unknown;
 *     error?: string;
 *   }
 */

export type SettingSource =
  | "userSettings"
  | "projectSettings"
  | "localSettings"
  | "flagSettings"
  | "policySettings";

// Priority order: highest first
export const SETTING_PRIORITY: SettingSource[] = [
  "policySettings",   // 1. Enterprise/managed (highest)
  "flagSettings",     // 2. CLI arguments
  "localSettings",    // 3. .claude/settings.local.json (gitignored)
  "projectSettings",  // 4. .claude/settings.json (shared)
  "userSettings",     // 5. ~/.claude/settings.json (lowest)
];

export const SETTING_PATHS: Record<string, string> = {
  userSettings: "~/.claude/settings.json",
  projectSettings: ".claude/settings.json",
  localSettings: ".claude/settings.local.json",
};
