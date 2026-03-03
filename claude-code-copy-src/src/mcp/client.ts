/**
 * MCP CLIENT — D01 class + iN8 stdio transport in cli.js
 *
 * Claude Code consumes MCP servers via stdio transport. Each server
 * is a child process. Tools are prefixed with mcp__<server>__<tool>.
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM cli.js — MCP transport types:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   K0w=t6(()=>h.enum(["stdio","sse","sse-ide","http","ws","sdk"]))
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — MCP tool naming convention:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   function jO(A){ let q=A.replace(/[^a-zA-Z0-9_-]/g,"_"); return q }
 *   function rv(A){
 *     let q=A.split("__"),[K,Y,...z]=q;
 *     if(K!=="mcp"||!Y) return null;
 *     return { serverName:Y, toolName:z.length>0?z.join("__"):void 0 }
 *   }
 *   function jh(A){ return `mcp__${jO(A)}__` }
 *   function Ao1(A,q){ return `${jh(A)}${jO(q)}` }
 *
 *   // Example: mcp__slack__read_channel
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — .mcp.json project file loading:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   let K={},Y=await eV8(A.path,".mcp.json");
 *   if(Y) K={...K,...Y};
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — mcpServers in settings:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   ZmA=t6(()=>h.object({mcpServers:h.record(h.string(),au())}))
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — Stdio server resolution:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   switch(A.type){
 *     case void 0:
 *     case"stdio":{
 *       let H={...A};
 *       if(H.command) H.command=$(H.command);
 *       if(H.args) H.args=H.args.map(...)
 *     }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE — MCP tools have "passthrough" permission:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   async checkPermissions(){
 *     return{behavior:"passthrough", message:"MCPTool requires permission.",
 *       suggestions:[{type:"addRules",
 *         rules:[{toolName:w, ruleContent:void 0}],
 *         behavior:"allow", destination:"localSettings"}]}
 *   }
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * EVIDENCE FROM sdk-tools.d.ts — MCP tool types:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   export type McpInput = { [k: string]: unknown }  // fully open schema
 *   export type McpOutput = string                    // raw string result
 *   export interface ListMcpResourcesOutput =
 *     { uri, name, mimeType?, description?, server }[]
 */

export type McpTransportType = "stdio" | "sse" | "http" | "ws" | "sdk";

export interface McpServerConfig {
  type?: McpTransportType;
  command?: string;
  args?: string[];
  env?: Record<string, string>;
}

export function buildToolName(serverName: string, toolName: string): string {
  const sanitize = (s: string) => s.replace(/[^a-zA-Z0-9_-]/g, "_");
  return `mcp__${sanitize(serverName)}__${sanitize(toolName)}`;
}

export function parseToolName(fullName: string): { serverName: string; toolName?: string } | null {
  const parts = fullName.split("__");
  const [prefix, server, ...rest] = parts;
  if (prefix !== "mcp" || !server) return null;
  return { serverName: server, toolName: rest.length > 0 ? rest.join("__") : undefined };
}
