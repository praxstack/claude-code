/**
 * PERMISSION RULES — dM() matcher function in cli.js
 *
 * Rules are patterns like "Bash(npm test)" or "Edit(docs/**)" that
 * match tool invocations. Stored in settings as arrays under
 * alwaysAllowRules / alwaysDenyRules / alwaysAskRules.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Rule format validation:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   'Permission rules must be in an array.
 *    Format: ["Tool(specifier)"].
 *    Examples: ["Bash(npm run build)", "Edit(docs/**)", "Read(~/.zshrc)"]'
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Tool categories for rule matching:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   qo1={
 *     filePatternTools: ["Read","Write","Edit","Glob","NotebookRead","NotebookEdit"],
 *     bashPrefixTools: ["Bash"],
 *     customValidation: {
 *       WebSearch: (A) => { /* validates no wildcards */ }
 *     }
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Rule sources track where the rule came from:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // $.source === "session" for session-only rules
 *   if($ && $.source === "session") {
 *     let J = $.ruleValue.ruleContent
 *     if(J === y31 || J === R31) // "/.claude/**" or "~/.claude/**"
 *       return {behavior:"allow", ...}
 *   }
 */

export interface PermissionRule {
  toolName: string;
  ruleContent?: string;  // e.g., "npm test" for Bash, "docs/**" for Edit
}

export function parseRule(rule: string): PermissionRule {
  // "Bash(npm run build)" → { toolName: "Bash", ruleContent: "npm run build" }
  const match = rule.match(/^(\w+)\((.+)\)$/);
  if (match) {
    return { toolName: match[1], ruleContent: match[2] };
  }
  return { toolName: rule };
}

export function matchRule(rule: PermissionRule, toolName: string, input: any): boolean {
  if (rule.toolName !== toolName) return false;
  if (!rule.ruleContent) return true; // bare tool name matches everything
  // File pattern tools: glob match against file_path
  // Bash prefix tools: prefix match against command
  return false; // implement matching logic
}
