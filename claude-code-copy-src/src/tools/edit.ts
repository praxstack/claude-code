/**
 * EDIT TOOL — Y0 in cli.js, "Edit" / vq
 *
 * Surgical find-and-replace in files. NOT read-only, NOT concurrency-safe.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   Y0={
 *     name: vq,  // "Edit"
 *     searchHint: "modify file contents in place",
 *     maxResultSizeChars: 1e5,
 *     strict: !0,
 *     async description(){ return "A tool for editing files" },
 *     isConcurrencySafe(){ return !1 },
 *     isReadOnly(){ return !1 },
 *     getPath(A){ return A.file_path },
 *     inputParamAliases: {
 *       old_str:"old_string", new_str:"new_string",
 *       oldString:"old_string", newString:"new_string",
 *       filePath:"file_path", filepath:"file_path", path:"file_path"
 *     },
 *     async checkPermissions(A,q){
 *       let K=await q.getAppState();
 *       return jw6(Y0,A,K.toolPermissionContext)
 *     },
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — FileEditInput/Output:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface FileEditInput {
 *     file_path: string;
 *     old_string: string;
 *     new_string: string;        // must differ from old_string
 *     replace_all?: boolean;     // default false
 *   }
 *
 *   export interface FileEditOutput {
 *     filePath: string;
 *     oldString: string;
 *     newString: string;
 *     originalFile: string;      // full original contents
 *     structuredPatch: { oldStart, oldLines, newStart, newLines, lines }[];
 *     userModified: boolean;     // if user changed the proposed edit
 *     replaceAll: boolean;
 *     gitDiff?: { filename, status, additions, deletions, changes, patch };
 *   }
 */

export interface FileEditInput {
  file_path: string;
  old_string: string;
  new_string: string;
  replace_all?: boolean;
}
