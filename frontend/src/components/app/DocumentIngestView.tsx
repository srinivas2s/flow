'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { UploadCloud, FileText, CheckCircle2, Sparkles, ArrowRight, Clock, Calendar, Plus, RefreshCw, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExtractedTask {
  title: string;
  deadline: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
}

export const DocumentIngestView: React.FC<{ onImportTasks?: (tasks: ExtractedTask[]) => void }> = ({ onImportTasks }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [activeDoc, setActiveDoc] = useState<string | null>('DBMS_Course_Syllabus.pdf');
  const [isParsed, setIsParsed] = useState(true);

  const sampleDocs = [
    { name: 'DBMS_Course_Syllabus.pdf', size: '2.4 MB', type: 'Academic PDF' },
    { name: 'Frontend_Roadmap_Q3.md', size: '14 KB', type: 'Project Spec' },
    { name: 'Team_Standup_Transcript.txt', size: '8 KB', type: 'Meeting Notes' },
  ];

  const extractedTasks: ExtractedTask[] = [
    { title: 'Finish DBMS Normalization Part 1', deadline: 'August 25, 5:00 PM', duration: 35, priority: 'high' },
    { title: 'Implement BCNF Decomposition Tables', deadline: 'August 28, 5:00 PM', duration: 45, priority: 'high' },
    { title: 'Review Relational Algebra & Lossless Join', deadline: 'August 30, 8:00 PM', duration: 30, priority: 'medium' },
  ];

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setIsParsed(false);
    setTimeout(() => {
      setIsUploading(false);
      setIsParsed(true);
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-28 max-w-3xl mx-auto px-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-flow-text-primary tracking-tight">
            Document Ingestion
          </h1>
          <p className="text-xs sm:text-sm text-flow-text-secondary font-medium">
            Upload syllabi, project specs, and notes to auto-generate actionable tasks
          </p>
        </div>

        <Badge variant="accent" size="sm" icon={<FileText className="w-3.5 h-3.5 text-flow-accent" />}>
          Semantic Extractor
        </Badge>
      </div>

      {/* Upload Drop Zone */}
      <div
        onClick={handleSimulateUpload}
        className="neu-card p-8 border-2 border-dashed border-flow-border hover:border-flow-accent/50 cursor-pointer flex flex-col items-center justify-center text-center transition-all shadow-xl group"
      >
        <div className="w-14 h-14 rounded-2xl neu-raised flex items-center justify-center text-flow-accent mb-4 group-hover:scale-105 transition-transform">
          <UploadCloud className="w-7 h-7" />
        </div>

        <h3 className="text-sm sm:text-base font-black text-flow-text-primary mb-1">
          {isUploading ? 'Analyzing Document with AI...' : 'Click to Upload Document or Syllabus'}
        </h3>
        <p className="text-xs text-flow-text-secondary max-w-sm">
          Supports PDF, Markdown, Word, and text transcripts. FLOW automatically extracts deadlines and work milestones.
        </p>

        {isUploading && (
          <div className="mt-4 flex items-center gap-2 text-xs font-bold text-flow-accent">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            <span>Extracting dates, milestones, and time budgets...</span>
          </div>
        )}
      </div>

      {/* Extracted Tasks Preview */}
      {isParsed && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="neu-card p-5 sm:p-6 border border-flow-border/80 shadow-xl"
        >
          <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-flow-border/60">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-flow-accent" />
              <div>
                <h3 className="text-sm font-black text-flow-text-primary">
                  Extracted Actionable Milestones
                </h3>
                <span className="text-[10px] text-flow-muted">
                  From {activeDoc} (3 tasks identified)
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="gap-1.5 font-bold shadow-md"
              onClick={() => onImportTasks && onImportTasks(extractedTasks)}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Import to Backlog</span>
            </Button>
          </div>

          <div className="space-y-3">
            {extractedTasks.map((t, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl neu-raised flex items-center justify-between gap-3 border border-flow-border/60"
              >
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm font-bold text-flow-text-primary truncate">
                    {t.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1 text-[11px] text-flow-muted font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-flow-accent" />
                      {t.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-flow-accent" />
                      {t.duration} min sprint
                    </span>
                  </div>
                </div>

                <Badge variant={t.priority === 'high' ? 'danger' : 'neutral'} size="sm">
                  {t.priority.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};
