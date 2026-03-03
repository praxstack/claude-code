/**
 * WRITE TOOL — z0 in cli.js, "Write" / C3
 *
 * Creates or overwrites entire files.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   z0={
 *     name: C3,  // "Write"
 *     searchHint: "create or overwrite files",
 *     maxResultSizeChars: 1e5,
 *     strict: !0,
 *     input_examples: [
 *       {file_path:"/Users/username/project/src/newFile.ts",content:"Hello, World!"}
 *     ],
 *     async description(){ return "Write a file to the local filesystem." },
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — FileWriteOutput:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface FileWriteOutput {
 *     type: "create" | "update";
 *     filePath: string;
 *     content: string;
 *     structuredPatch: { oldStart, oldLines, newStart, newLines, lines }[];
 *     originalFile: string | null;   // null for new files
 *     gitDiff?: { filename, status, additions, deletions, changes, patch };
 *   }
 */

export interface FileWriteInput {
  file_path: string;
  content: string;
}
