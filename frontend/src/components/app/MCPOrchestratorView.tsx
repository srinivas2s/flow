'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Cpu, Play, CheckCircle2, RefreshCw, Layers, Sparkles, Terminal, Shield, Zap, Globe, Database, Calendar, Mail, FileText, Code2, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MCPServer {
  id: string;
  name: string;
  category: string;
  icon: any;
  status: 'connected' | 'idle' | 'syncing';
  toolsCount: number;
  description: string;
  latency: string;
}

export const MCPOrchestratorView: React.FC = () => {
  const [servers, setServers] = useState<MCPServer[]>([
    {
      id: 'gcal',
      name: 'Google Calendar MCP',
      category: 'Calendar',
      icon: Calendar,
      status: 'connected',
      toolsCount: 4,
      description: 'Reads free/busy slots, creates focus events, updates schedules.',
      latency: '24ms',
    },
    {
      id: 'github',
      name: 'GitHub Repository MCP',
      category: 'Engineering',
      icon: Code2,
      status: 'connected',
      toolsCount: 8,
      description: 'Monitors pull requests, issues, review requests, and CI/CD runs.',
      latency: '38ms',
    },
    {
      id: 'notion',
      name: 'Notion Knowledge MCP',
      category: 'Knowledge',
      icon: FileText,
      status: 'connected',
      toolsCount: 6,
      description: 'Queries project docs, specifications, sprint goals, and roadmap.',
      latency: '45ms',
    },
    {
      id: 'postgres',
      name: 'PostgreSQL Context MCP',
      category: 'Database',
      icon: Database,
      status: 'connected',
      toolsCount: 5,
      description: 'Queries local SQLite / Postgres data stores and analytics logs.',
      latency: '12ms',
    },
    {
      id: 'websearch',
      name: 'Brave Web Search MCP',
      category: 'Research',
      icon: Globe,
      status: 'connected',
      toolsCount: 3,
      description: 'Real-time web research, documentation indexing, and citation lookup.',
      latency: '62ms',
    },
  ]);

  const [activePipeline, setActivePipeline] = useState<string>('morning_alignment');
  const [isRunningPipeline, setIsRunningPipeline] = useState(false);
  const [pipelineLogs, setPipelineLogs] = useState<string[]>([
    'MCP Orchestration Gateway initialized.',
    'Loaded 5 connected servers and 26 active tool schemas.',
  ]);

  const runPipeline = (pipelineName: string) => {
    setIsRunningPipeline(true);
    setPipelineLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Triggering pipeline: ${pipelineName}`,
      `[${new Date().toLocaleTimeString()}] Querying Google Calendar MCP for next 8 hours...`,
    ]);

    setTimeout(() => {
      setPipelineLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Found 2 fixed meetings (03:00 PM, 06:00 PM).`,
        `[${new Date().toLocaleTimeString()}] Querying GitHub MCP for blocking PRs...`,
      ]);
    }, 700);

    setTimeout(() => {
      setPipelineLogs((prev) => [
        ...prev,
        `[${new Date().toLocaleTimeString()}] Identified DBMS Normalization assignment due in 24h.`,
        `[${new Date().toLocaleTimeString()}] Orchestrating optimal focus window: 04:45 PM – 05:20 PM.`,
        `[${new Date().toLocaleTimeString()}] Pipeline executed successfully with 0 conflicts.`,
      ]);
      setIsRunningPipeline(false);
    }, 1500);
  };

  const toggleServer = (id: string) => {
    setServers((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'connected' ? 'idle' : 'connected' }
          : s
      )
    );
  };

  return (
    <div className="space-y-6 pb-28 max-w-3xl mx-auto px-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            AI MCP Orchestrator
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
            Unified Model Context Protocol hub for multi-agent tool execution
          </p>
        </div>

        <Badge variant="accent" size="sm" icon={<Cpu className="w-3.5 h-3.5 text-flow-accent" />}>
          {servers.filter((s) => s.status === 'connected').length} Active Servers
        </Badge>
      </div>

      {/* Connected MCP Servers Matrix */}
      <div className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-flow-border/60">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-flow-accent" />
            <h2 className="text-sm font-black text-flow-text-primary">
              Connected MCP Server Registry
            </h2>
          </div>
          <span className="text-[10px] text-flow-muted font-bold uppercase tracking-wider">
            26 Tools Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {servers.map((server) => {
            const Icon = server.icon;
            const isConnected = server.status === 'connected';
            return (
              <div
                key={server.id}
                className="p-4 rounded-2xl neu-raised border border-flow-border/60 flex flex-col justify-between hover:scale-[1.01] transition-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl neu-pressed flex items-center justify-center text-flow-accent">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-flow-text-primary block leading-tight">
                          {server.name}
                        </h3>
                        <span className="text-[10px] text-flow-muted">{server.category}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleServer(server.id)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase transition-all ${
                        isConnected
                          ? 'bg-emerald-500/15 text-emerald-500 border border-emerald-500/30'
                          : 'bg-flow-muted/15 text-flow-muted border border-flow-border'
                      }`}
                    >
                      {isConnected ? 'Online' : 'Paused'}
                    </button>
                  </div>

                  <p className="text-[11px] text-flow-text-secondary line-clamp-2 mt-2 font-medium">
                    {server.description}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-flow-border/40 flex items-center justify-between text-[10px] text-flow-muted font-bold">
                  <span>{server.toolsCount} registered tools</span>
                  <span className="text-flow-accent">{server.latency}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Multi-Tool Agentic Pipeline Tester */}
      <div className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl">
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-flow-border/60">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-flow-accent" />
            <h3 className="text-sm font-black text-flow-text-primary">
              Multi-Agent Execution Pipeline
            </h3>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => runPipeline(activePipeline)}
            isLoading={isRunningPipeline}
            className="gap-1.5 font-bold shadow-md"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Execute Pipeline</span>
          </Button>
        </div>

        {/* Live Execution Terminal Console */}
        <div className="rounded-2xl neu-pressed p-4 font-mono text-[11px] space-y-1.5 border border-flow-border/60 text-flow-text-primary max-h-56 overflow-y-auto">
          <div className="flex items-center gap-2 pb-2 border-b border-flow-border/30 text-flow-muted text-[10px]">
            <Terminal className="w-3.5 h-3.5 text-flow-accent" />
            <span>MCP Agentic Orchestration Console (Real-time trace)</span>
          </div>

          {pipelineLogs.map((log, index) => (
            <div key={index} className="flex items-start gap-2 leading-relaxed">
              <span className="text-flow-accent shrink-0">›</span>
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
