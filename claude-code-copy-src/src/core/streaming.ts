/**
 * SSE STREAM EVENT PARSER — Jh6 class (MessageStream) in cli.js
 *
 * Processes the raw SSE events from the Anthropic API into structured
 * message objects. Claude Code has TWO levels of streaming:
 * 1. SDK-level (Jh6/MessageStream) — parses raw SSE into typed events
 * 2. App-level (RZq generator) — accumulates events into conversation messages
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js (line ~255, Jh6 class Le1 dispatch method):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   Le1=function(q){
 *     if(this.ended)return;
 *     let K=I8(this,$y,"m",OiA).call(this,q);
 *     switch(this._emit("streamEvent",q,K),q.type){
 *       case"content_block_delta":{
 *         let Y=K.content.at(-1);
 *         switch(q.delta.type){
 *           case"text_delta":
 *             { if(Y.type==="text") this._emit("text",q.delta.text,Y.text||""); break}
 *           case"input_json_delta":
 *             { if(jiA(Y)&&Y.input) this._emit("inputJson",q.delta.partial_json,Y.input); break}
 *           case"thinking_delta":
 *             { if(Y.type==="thinking") this._emit("thinking",q.delta.thinking,Y.thinking); break}
 *           case"signature_delta":
 *             { if(Y.type==="thinking") this._emit("signature",Y.signature); break}
 *         } break}
 *       case"message_stop":
 *         { this._addMessageParam(K),this._addMessage(Te1(K,...),!0); break}
 *       case"content_block_stop":
 *         { this._emit("contentBlock",K.content.at(-1)); break}
 *       case"message_start":
 *         { z4(this,Fa,K,"f"); break}
 *       case"content_block_start":
 *       case"message_delta": break
 *     }
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — App-level streaming loop (line ~6214, RZq generator):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   for await(let v1 of e){
 *     switch(v1.type){
 *       case"message_start":
 *         { V6=v1.message, C6=Date.now()-c, A6=Nw6(A6,v1.message?.usage); break}
 *       case"content_block_start":
 *         // initializes Y6[v1.index] by type
 *         break;
 *       case"content_block_delta":
 *         // accumulates text/json/thinking deltas into Y6
 *         break;
 *       case"content_block_stop":{
 *         let M6=Y6[v1.index];
 *         let r6={message:{...V6,content:LR1([M6],Y,w.agentId)},
 *                 requestId:f6, type:"assistant", uuid:ql8(), ...};
 *         _6.push(r6), yield r6;
 *         break}
 *       case"message_delta":
 *         { A6=Nw6(A6,v1.usage), z6=v1.delta.stop_reason; break}
 *       case"message_stop": break
 *     }
 *     yield{type:"stream_event",event:v1, ...}
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Cache usage tracking (Nw6 function):
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function Nw6(A,q){
 *     return{
 *       input_tokens: q.input_tokens>0 ? q.input_tokens : A.input_tokens,
 *       cache_creation_input_tokens: ...,
 *       cache_read_input_tokens: ...,
 *       output_tokens: q.output_tokens ?? A.output_tokens,
 *       cache_creation:{
 *         ephemeral_1h_input_tokens: ...,
 *         ephemeral_5m_input_tokens: ...
 *       }
 *     }
 *   }
 */

// The 6 SSE event types from the Anthropic streaming API
export type StreamEventType =
  | "message_start"
  | "content_block_start"
  | "content_block_delta"
  | "content_block_stop"
  | "message_delta"
  | "message_stop";

export interface StreamEvent {
  type: StreamEventType;
  message?: any;
  index?: number;
  delta?: any;
  usage?: any;
  content_block?: any;
}

export interface UsageAccumulator {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number;
  cache_read_input_tokens: number;
}

export async function* processStream(rawStream: AsyncIterable<StreamEvent>) {
  let message: any = null;
  let contentBlocks: any[] = [];
  let usage: UsageAccumulator = {
    input_tokens: 0, output_tokens: 0,
    cache_creation_input_tokens: 0, cache_read_input_tokens: 0,
  };

  for await (const event of rawStream) {
    switch (event.type) {
      case "message_start":
        message = event.message;
        break;
      case "content_block_start":
        contentBlocks[event.index!] = event.content_block;
        break;
      case "content_block_delta":
        // Accumulate deltas (text_delta, input_json_delta, thinking_delta)
        break;
      case "content_block_stop":
        yield { type: "content_block" as const, block: contentBlocks[event.index!] };
        break;
      case "message_delta":
        // stop_reason, final usage
        break;
      case "message_stop":
        yield { type: "message_complete" as const, message, usage };
        break;
    }
    yield { type: "raw_event" as const, event };
  }
}
