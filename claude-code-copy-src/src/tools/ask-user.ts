/**
 * ASK USER QUESTION — EV6 in cli.js, "AskUserQuestion" / CO
 *
 * Presents structured multiple-choice questions to the user.
 * 1-4 questions, each with 2-4 options, single or multi-select.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — AskUserQuestionInput:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface AskUserQuestionInput {
 *     questions: (1-4 tuple of) {
 *       question: string;
 *       header: string;           // max 12 chars, chip/tag
 *       options: (2-4 tuple of) {
 *         label: string;          // 1-5 words
 *         description: string;
 *       };
 *       multiSelect: boolean;
 *     };
 *     answers?: Record<string, string>;
 *     metadata?: { source?: string };
 *   }
 *
 *   // NOTE: The AskUserQuestionInput.questions field uses TypeScript tuple
 *   // types to enforce cardinality, resulting in the largest single type
 *   // in sdk-tools.d.ts (~1,185 lines from line 627-1812).
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — AskUserQuestionOutput:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export interface AskUserQuestionOutput {
 *     questions: (same structure);
 *     answers: Record<string, string>;  // question text → answer string
 *   }
 */
