/**
 * COMPACTION — TZ6() function in cli.js
 *
 * When context gets too long, the conversation is summarized.
 * The summary replaces old messages to free up context window.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — Auto-compact check:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   if(_1(process.env.DISABLE_COMPACT)) return !1;
 *   if(_1(process.env.DISABLE_AUTO_COMPACT)) return !1;
 *   return k1().autoCompactEnabled
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Main compact function (TZ6):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async function TZ6(A,q,K,Y,z,w=!1,_){
 *     try{
 *       if(A.length===0) throw Error(fZ6);  // "Not enough messages to compact."
 *       let $=PN(A), O=kM4(A);
 *       q.onCompactProgress?.({type:"hooks_start",hookType:"pre_compact"});
 *       q.setSDKStatus?.("compacting");
 *       let J=await NZ6({trigger:w?"auto":"manual",
 *                        customInstructions:z??null},
 *                       q.abortController.signal);
 *       // ...generates summary...
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Compact uses the API for summarization:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   W=VZ6({
 *     messages:kX(fzY([...KC(A),q])),
 *     systemPrompt:Uq([
 *       "You are a helpful AI assistant tasked with summarizing conversations."
 *     ]),
 *     thinkingConfig:{type:"disabled"},
 *     tools:M,
 *     signal:Y.abortController.signal,
 *     options:{model:Y.options.mainLoopModel, querySource:"compact"}
 *   })[Symbol.asyncIterator]()
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Compact summary includes transcript path:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   "If you need specific details from before compaction
 *    (like exact code snippets, error messages, or content you generated),
 *    read the full transcript at: ${K}"
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Compact telemetry:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   l("tengu_compact",{
 *     preCompactTokenCount:$,
 *     postCompactTokenCount:g,
 *     truePostCompactTokenCount:b,
 *     autoCompactThreshold:_?.autoCompactThreshold??-1,
 *     willRetriggerNextTurn:...,
 *     isAutoCompact:w,
 *   })
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Error constants:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   fZ6 = "Not enough messages to compact."
 *   IM4 = "Conversation too long. Press esc twice to go up a few messages."
 *   ZZ6 = "Compaction interrupted - may be due to network issues."
 */
