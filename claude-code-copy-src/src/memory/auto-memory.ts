/**
 * AUTO-MEMORY — MEMORY.md system + CLAUDE.md loading in cli.js
 *
 * Persistent memory across sessions via MEMORY.md files.
 * Also handles loading CLAUDE.md project instructions.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — MEMORY.md constants:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   var yG  = "MEMORY.md"    // filename
 *   var RG  = 200            // max lines loaded
 *   var wK4 = "auto memory"  // display name
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Memory loading function (_K4):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function _K4(A){
 *     let{displayName:q,memoryDir:K,extraGuidelines:Y}=A,
 *         z=W1(), w=K+yG;
 *     let _="";
 *     try{_=z.readFileSync(w,{encoding:"utf-8"})}catch{}
 *
 *     if(_.trim()){
 *       let O=_.trim().split(`\n`),H=O.length>RG,j=q===wK4?"auto":"agent";
 *       let J=_.trim();
 *       if(H) J=O.slice(0,RG).join(`\n`)
 *         +`\n\n> WARNING: ${yG} is ${O.length} lines (limit: ${RG}).
 *            Only the first ${RG} lines were loaded.`;
 *       $.push(`## ${yG}`,"",J)
 *     } else
 *       $.push(`## ${yG}`,"",
 *         `Your ${yG} is currently empty. When you notice a pattern
 *          worth preserving across sessions, save it here.`);
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Auto-memory enable check (cD1 function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function cD1(){
 *     if(p9()){
 *       if(PA("tengu_mulberry_fog",!1))
 *         return $K4("auto memory",Jy()).join(`\n`);
 *       return od9()
 *     }
 *     return l("tengu_memdir_disabled",{
 *       disabled_by_env_var:
 *         _1(process.env.CLAUDE_CODE_DISABLE_AUTO_MEMORY),
 *       disabled_by_setting:
 *         u7().autoMemoryEnabled===!1
 *     }),null
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — CLAUDE.md source types:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   NM4=["User","Project","Local","Managed",
 *        "ExperimentalUltraClaudeMd","AutoMem",...[]]
 *
 *   function BE8(A){
 *     if(A==="Local") return "project (local)";
 *     if(A==="AutoMem") return "auto memory";
 *     return A.toLowerCase()
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — CLAUDE.md onboarding check:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function Y88(){
 *     let A=W1().existsSync(FJ3(C1(),"CLAUDE.md")),
 *         q=XeA(C1());
 *     return[
 *       {key:"workspace",text:"Ask Claude to create a new app or project",...},
 *       {key:"claudemd",text:"Run /init to create a CLAUDE.md file...",
 *        isComplete:A,isCompletable:!0,isEnabled:!q}
 *     ]
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Memory guidelines (what to save):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   "- Stable patterns and conventions confirmed across multiple interactions"
 *   "- Key architectural decisions, important file paths, and project structure"
 *   "- User preferences for workflow, tools, and communication style"
 *   "- Solutions to recurring problems and debugging insights"
 */

export const MEMORY_FILENAME = "MEMORY.md";
export const MEMORY_MAX_LINES = 200;
export const MEMORY_DIR = "~/.claude/projects/<project-hash>/memory/";

export type ClaudeMdSource = "User" | "Project" | "Local" | "Managed" | "AutoMem";
