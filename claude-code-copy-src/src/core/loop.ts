/**
 * THE AGENTIC CONVERSATION LOOP — Kh6 class (BetaToolRunner) + fC() in cli.js
 *
 * This is the heart of Claude Code. The loop:
 *   1. Sends messages to the API
 *   2. Gets a response (which may contain tool_use blocks)
 *   3. Executes each tool_use
 *   4. Appends tool_result to messages
 *   5. Repeats until the model stops calling tools
 *
 * TWO implementations exist:
 * - Kh6 (SDK ToolRunner): Lower-level, in the embedded Anthropic SDK
 * - fC(): Higher-level, Claude Code's own loop with permissions, hooks, etc.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js (line ~255, Kh6 ToolRunner loop):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   try{
 *     while(!0){
 *       let q;
 *       try{
 *         if(I8(this,DX,"f").params.max_iterations
 *            && I8(this,qh6,"f")>=I8(this,DX,"f").params.max_iterations) break;
 *         // ... increment iteration count ...
 *         let{max_iterations:K,compactionControl:Y,...z}=I8(this,DX,"f").params;
 *
 *         if(z.stream)
 *           q=this.client.beta.messages.stream({...z},I8(this,Ah6,"f")),
 *           yield q;
 *         else
 *           z4(this,Yk,this.client.beta.messages.create({...z,stream:!1},...)),
 *           yield I8(this,Yk,"f");
 *
 *         // After response: check for tool_use -> generate tool_result
 *         if(!I8(this,hq6,"f")){
 *           let{role:$,content:O}=await I8(this,Yk,"f");
 *           I8(this,DX,"f").params.messages.push({role:$,content:O})
 *         }
 *         let _=await I8(this,eS6,"m",Je1).call(this,...);
 *         if(_) I8(this,DX,"f").params.messages.push(_);  // append tool_result
 *         else if(!I8(this,hq6,"f")) break   // no tool_use => done
 *       } finally{if(q)q.abort()}
 *     }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — X43: tool_result message builder:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async function X43(A,q=A.messages.at(-1)){
 *     if(!q||q.role!=="assistant"||!q.content||typeof q.content==="string")
 *       return null;
 *     let K=q.content.filter((z)=>z.type==="tool_use");
 *     if(K.length===0) return null;
 *     return{role:"user",content:await Promise.all(K.map(async(z)=>{
 *       let w=A.tools.find((_)=>...===z.name);
 *       if(!w||!("run"in w))
 *         return{type:"tool_result",tool_use_id:z.id,
 *                content:`Error: Tool '${z.name}' not found`,is_error:!0};
 *       try{
 *         let _=z.input; if("parse"in w&&w.parse) _=w.parse(_);
 *         let $=await w.run(_);
 *         return{type:"tool_result",tool_use_id:z.id,content:$}
 *       }catch(_){
 *         return{type:"tool_result",tool_use_id:z.id,
 *                content:_ instanceof xJ6?_.content:`Error: ${_.message}`,
 *                is_error:!0}
 *       }
 *     }))}
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — fC(): Claude Code's higher-level agent loop:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async function*fC({agentDefinition:A,promptMessages:q,
 *                      toolUseContext:K,canUseTool:Y,isAsync:z,...}){
 *     // streams agent responses with permission checks, hooks, etc.
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — Tool use/result cycle types:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   // Every tool has Input and Output types that define the contract:
 *   // BashInput  → { command, timeout?, description?, ... }
 *   // BashOutput → { stdout, stderr, interrupted, ... }
 *   // The loop converts tool_use.input → ToolInput → call() → ToolOutput → tool_result
 */

import type { Message, ToolUseBlock, ToolResultBlockParam } from "@anthropic-ai/sdk";

interface LoopOptions {
  messages: Message[];
  tools: any[];
  systemPrompt: string;
  maxTurns?: number;
  signal?: AbortSignal;
}

export async function* agenticLoop(options: LoopOptions) {
  const { messages, tools, systemPrompt, maxTurns = Infinity } = options;
  let turns = 0;

  while (turns < maxTurns) {
    // 1. Call the API
    const response = await callApi({ messages, systemPrompt, tools });
    yield { type: "assistant_message" as const, message: response };

    // 2. Extract tool_use blocks
    const toolUses = response.content.filter(
      (block: any): block is ToolUseBlock => block.type === "tool_use"
    );

    if (toolUses.length === 0) break; // Model done — no more tools

    // 3. Execute each tool and collect results
    const toolResults: ToolResultBlockParam[] = await Promise.all(
      toolUses.map(async (toolUse) => {
        const tool = tools.find((t) => t.name === toolUse.name);
        if (!tool) {
          return {
            type: "tool_result" as const,
            tool_use_id: toolUse.id,
            content: `Error: Tool '${toolUse.name}' not found`,
            is_error: true,
          };
        }

        try {
          // Check permissions first
          const permResult = await tool.checkPermissions(toolUse.input, {});
          if (permResult.behavior === "deny") {
            return {
              type: "tool_result" as const,
              tool_use_id: toolUse.id,
              content: permResult.message ?? "Permission denied",
              is_error: true,
            };
          }

          const result = await tool.call(toolUse.input, {});
          return {
            type: "tool_result" as const,
            tool_use_id: toolUse.id,
            content: JSON.stringify(result),
          };
        } catch (err: any) {
          return {
            type: "tool_result" as const,
            tool_use_id: toolUse.id,
            content: `Error: ${err.message}`,
            is_error: true,
          };
        }
      })
    );

    // 4. Append assistant message + tool results to conversation
    messages.push(response as any);
    messages.push({ role: "user", content: toolResults } as any);

    turns++;
    yield { type: "tool_results" as const, results: toolResults };
  }
}
