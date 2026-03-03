/**
 * READ TOOL — n9 in cli.js, "Read" / o4
 *
 * Multi-format file reader: text, images, PDFs, Jupyter notebooks.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Tool definition:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   n9={
 *     name: o4,  // "Read"
 *     searchHint: "read files, images, PDFs, notebooks",
 *     maxResultSizeChars: 1e5,
 *     strict: !0,
 *     input_examples: [
 *       {file_path:"/Users/username/project/src/index.ts"},
 *       {file_path:"/Users/username/project/README.md",limit:100,offset:50}
 *     ],
 *     inputParamAliases: {
 *       filePath:"file_path", filepath:"file_path", path:"file_path"
 *     },
 *     async checkPermissions(A,q){
 *       let K=await q.getAppState();
 *       return j66(n9,A,K.toolPermissionContext)
 *     },
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — FileReadOutput (5-variant discriminated union):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export type FileReadOutput =
 *     | { file: { type: "text";     filePath, content, numLines, startLine, totalLines } }
 *     | { file: { type: "image";    base64, type: "jpeg"|"png"|"gif"|"webp", ... } }
 *     | { file: { type: "notebook"; filePath, cells: unknown[] } }
 *     | { file: { type: "pdf";      filePath, base64, originalSize } }
 *     | { file: { type: "parts";    filePath, originalSize, count, outputDir } }
 */

export interface FileReadInput {
  file_path: string;
  offset?: number;
  limit?: number;
  pages?: string;  // For PDFs: "1-5", "3", "10-20"
}
