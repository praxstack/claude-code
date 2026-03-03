/**
 * SYSTEM PROMPT BUILDER — mf() / uc9() / Uq() in cli.js
 *
 * The system prompt is assembled from ~10 dynamic segments that can change
 * between turns. Some segments are cache-eligible (static), others are not.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js (line ~1236, uc9 — the opening paragraph):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function uc9(A){
 *     return`
 *   You are an interactive agent that helps users ${
 *     A!==null
 *       ?'according to your "Output Style" below...'
 *       :"with software engineering tasks."
 *   } Use the instructions below and the tools available to you...
 *
 *   ${QK4}
 *   IMPORTANT: You must NEVER generate or guess URLs for the user...`
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Segment concatenation (line ~6217, Uq call):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   q=Uq([
 *     b31(v),           // base prompt (uc9 + environment + tools preamble)
 *     x31({...}),       // output style / non-interactive adjustments
 *     ...q,             // additional segments (CLAUDE.md, memory, etc.)
 *     ...j&&y?[a0q]:[]  // deferred tools prompt (conditional)
 *   ].filter(Boolean)),
 *   NZq(q);
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Environment info injection (line ~1294, UK4 function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   j=[
 *     `Primary working directory: ${O}`,
 *     [`Is a git repository: ${K}`],
 *     `Platform: ${AA.platform}`,
 *     `OS Version: ${Y}`,
 *     w,  // model identity string
 *     $,  // knowledge cutoff
 *     `The most recent Claude model family is Claude 4.5/4.6.
 *      Model IDs — Opus 4.6: '${Vf8.opus}',
 *      Sonnet 4.6: '${Vf8.sonnet}',
 *      Haiku 4.5: '${Vf8.haiku}'.`
 *   ]
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Cache scoping for system prompt blocks (line ~6197):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function ec8(A,q){
 *     let M=J.join("\n\n");
 *     if(M) X.push({text:M, cacheScope:"global"});  // static → cacheable
 *     let P=D.join("\n\n");
 *     if(P) X.push({text:P, cacheScope:null});       // dynamic → not cached
 *     return X
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * INFERRED SEGMENT ORDER (from multiple evidence points):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   1. Identity paragraph (uc9)
 *   2. Security rules (QK4 constant)
 *   3. Environment info (UK4 — CWD, git, platform, OS, model, cutoff)
 *   4. Auto-memory content (cD1 — MEMORY.md)
 *   5. CLAUDE.md instructions (project/user/local/managed)
 *   6. MCP server instructions (bc9)
 *   7. Output style (xc9)
 *   8. Tool-specific prompts (per enabled tool)
 *   9. Coding guidelines (Bc9)
 *  10. Feature flags / rollout config (lc9)
 *  11. Deferred tools explanation (a0q, conditional)
 */

interface PromptSegment {
  text: string;
  cacheScope: "global" | null; // "global" = static/cacheable, null = dynamic
}

interface PromptOptions {
  cwd: string;
  isGitRepo: boolean;
  platform: string;
  osVersion: string;
  model: string;
  memoryContent?: string;
  claudeMdInstructions?: string[];
  mcpInstructions?: string[];
  enableDeferredTools?: boolean;
}

export function buildSystemPrompt(options: PromptOptions): PromptSegment[] {
  const segments: PromptSegment[] = [];

  // 1. Identity (static, cacheable)
  segments.push({
    text: buildIdentitySegment(),
    cacheScope: "global",
  });

  // 2. Environment info (dynamic per session, but stable within session)
  segments.push({
    text: buildEnvironmentSegment(options),
    cacheScope: "global",
  });

  // 3. Auto-memory (changes across sessions)
  if (options.memoryContent) {
    segments.push({
      text: `# auto memory\n\n${options.memoryContent}`,
      cacheScope: null, // dynamic
    });
  }

  // 4. CLAUDE.md instructions (project-specific)
  if (options.claudeMdInstructions?.length) {
    segments.push({
      text: options.claudeMdInstructions.join("\n\n"),
      cacheScope: null,
    });
  }

  // 5. MCP instructions (dynamic, changes with connected servers)
  if (options.mcpInstructions?.length) {
    segments.push({
      text: `# MCP Server Instructions\n\n${options.mcpInstructions.join("\n\n")}`,
      cacheScope: null,
    });
  }

  // 6. Coding guidelines (static, cacheable)
  segments.push({
    text: buildCodingGuidelines(),
    cacheScope: "global",
  });

  return segments;
}

function buildIdentitySegment(): string {
  return `You are an interactive agent that helps users with software engineering tasks. Use the instructions below and the tools available to you to assist the user.

IMPORTANT: You must NEVER generate or guess URLs for the user unless you are confident that the URLs are for helping the user with programming.`;
}

function buildEnvironmentSegment(options: PromptOptions): string {
  return `# Environment
- Primary working directory: ${options.cwd}
  - Is a git repository: ${options.isGitRepo}
- Platform: ${options.platform}
- OS Version: ${options.osVersion}
- Model: ${options.model}`;
}

function buildCodingGuidelines(): string {
  return `# Doing tasks
- Read code before modifying it.
- Do not create files unless absolutely necessary.
- Avoid over-engineering. Only make changes that are directly requested.`;
}
