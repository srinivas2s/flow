'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Mail, Calendar, Clock, CheckCircle2, Sparkles, Plus, RefreshCw, Inbox, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const EmailSyncView: React.FC<{ onScheduleEmailTask?: (title: string, deadline: string) => void }> = ({ onScheduleEmailTask }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [emails, setEmails] = useState([
    {
      id: '1',
      sender: 'Prof. Anderson (DBMS Faculty)',
      subject: 'Clarification on Normalization Assignment & Submission Deadline',
      snippet: 'Please note the normalization PDF is due this Friday at 5:00 PM. No late extensions will be granted.',
      detectedDeadline: 'Friday, 5:00 PM',
      detectedDuration: '45 mins focus',
      status: 'actionable',
      actionTitle: 'Submit DBMS Normalization Assignment',
    },
    {
      id: '2',
      sender: 'Marcus Vance (Engineering Lead)',
      subject: 'Architecture Review: Design Token Migration Sync',
      snippet: 'Let us sync today at 6:00 PM for 30 minutes to review the token updates before production deploy.',
      detectedDeadline: 'Today, 6:00 PM',
      detectedDuration: '30 mins meeting',
      status: 'scheduled',
      actionTitle: 'Attend Design Token Migration Sync',
    },
    {
      id: '3',
      sender: 'Stripe Billing System',
      subject: 'Monthly invoice and usage summary',
      snippet: 'Your statement for the previous billing cycle is now available.',
      detectedDeadline: null,
      detectedDuration: null,
      status: 'informational',
      actionTitle: null,
    },
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
    }, 800);
  };

  return (
    <div className="space-y-6 pb-28 max-w-3xl mx-auto px-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Email Schedule Sync
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
            Automated inbox scanner that detects commitments and auto-schedules them
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleSync}
          isLoading={isSyncing}
          className="gap-1.5 font-bold shadow-md"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>Sync Inbox</span>
        </Button>
      </div>

      {/* Sync Status Banner */}
      <div className="neu-card p-4 sm:p-5 border border-flow-accent/40 bg-flow-accent/5 flex items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl neu-raised flex items-center justify-center text-flow-accent shrink-0">
            <Inbox className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs sm:text-sm font-bold text-flow-text-primary">
              Live Inbox Connector Active
            </p>
            <p className="text-[11px] text-flow-text-secondary font-medium mt-0.5">
              FLOW parses incoming mail threads in the background to prevent missed deadlines.
            </p>
          </div>
        </div>

        <Badge variant="success" size="sm">
          Active Sync
        </Badge>
      </div>

      {/* Emails Stream */}
      <div className="space-y-3.5">
        {emails.map((email) => (
          <div
            key={email.id}
            className="neu-card p-5 border border-flow-border/80 shadow-lg space-y-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-flow-accent uppercase tracking-wider block">
                  {email.sender}
                </span>
                <h3 className="text-xs sm:text-sm font-black text-flow-text-primary mt-0.5">
                  {email.subject}
                </h3>
              </div>

              <Badge
                variant={email.status === 'actionable' ? 'accent' : email.status === 'scheduled' ? 'warning' : 'neutral'}
                size="sm"
              >
                {email.status.toUpperCase()}
              </Badge>
            </div>

            <p className="text-xs text-flow-text-secondary font-medium leading-relaxed neu-pressed p-3 rounded-xl">
              &ldquo;{email.snippet}&rdquo;
            </p>

            {email.detectedDeadline && (
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-flow-border/50">
                <div className="flex items-center gap-3 text-[11px] text-flow-muted font-medium">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-flow-accent" />
                    {email.detectedDeadline}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-flow-accent" />
                    {email.detectedDuration}
                  </span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="gap-1.5 font-bold shadow-md text-xs"
                  onClick={() =>
                    onScheduleEmailTask &&
                    email.actionTitle &&
                    email.detectedDeadline &&
                    onScheduleEmailTask(email.actionTitle, email.detectedDeadline)
                  }
                >
                  <Plus className="w-3 h-3" />
                  <span>Save to Schedule</span>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
