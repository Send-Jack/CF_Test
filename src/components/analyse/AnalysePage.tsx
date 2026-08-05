import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Play,
  Loader2,
  Trash2,
  FileCode2,
  ChevronRight,
  CheckCircle2,
  Upload,
  ClipboardPaste,
  Sparkles,
  X,
  FileUp,
} from 'lucide-react';
import { SourcePanel, type SourceFile } from './SourcePanel';
import { EditorPanel } from './EditorPanel';
import { FindingsPanel } from './FindingsPanel';
import { TerminalPanel } from './TerminalPanel';
import { FINDINGS, STAGES, SAMPLE_CODE, type Finding } from './analyseData';

type Phase = 'empty' | 'loaded' | 'analysing' | 'results';
type EditorTab = 'source' | 'preview' | 'diff';
type MobileView = 'source' | 'editor' | 'findings' | 'output';

export function AnalysePage() {
  const [phase, setPhase] = useState<Phase>('empty');
  const [stageIdx, setStageIdx] = useState(0);
  const [editorTab, setEditorTab] = useState<EditorTab>('source');
  const [selectedFile, setSelectedFile] = useState('Card.tsx');
  const [selectedFinding, setSelectedFinding] = useState<Finding | null>(null);
  const [activeLine, setActiveLine] = useState<number | undefined>();
  const [terminalCollapsed, setTerminalCollapsed] = useState(false);
  const [scanlineKey, setScanlineKey] = useState(0);
  const [repairDecision, setRepairDecision] = useState<'none' | 'approved' | 'rejected'>('none');
  const [mobileView, setMobileView] = useState<MobileView>('editor');
  const [pasteOpen, setPasteOpen] = useState(false);
  const [pasteText, setPasteText] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [sourceCode, setSourceCode] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('Card.tsx');

  const fileList: SourceFile[] = sourceCode ? [{ name: fileName, size: `${(sourceCode.length / 1024).toFixed(1)} KB`, lang: fileName.split('.').pop() ?? 'tsx' }] : [];

  const fileInputRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  const triggerScanline = useCallback(() => setScanlineKey((k) => k + 1), []);

  // scanline on first open
  useEffect(() => {
    triggerScanline();
  }, [triggerScanline]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const hasSource = sourceCode !== null;

  const runAnalysis = useCallback(() => {
    if (!hasSource) return;
    clearTimers();
    setPhase('analysing');
    setStageIdx(0);
    setTerminalCollapsed(false);
    setRepairDecision('none');
    setSelectedFinding(null);
    triggerScanline();

    STAGES.forEach((_, i) => {
      const t = window.setTimeout(() => setStageIdx(i + 1), 320 * (i + 1));
      timers.current.push(t);
    });

    const done = window.setTimeout(() => {
      setPhase('results');
      triggerScanline();
    }, 320 * (STAGES.length + 1));
    timers.current.push(done);
  }, [clearTimers, hasSource, triggerScanline]);

  const clearSubmission = useCallback(() => {
    clearTimers();
    setPhase('empty');
    setStageIdx(0);
    setSelectedFinding(null);
    setActiveLine(undefined);
    setEditorTab('source');
    setRepairDecision('none');
    setSourceCode(null);
    setFileName('Card.tsx');
    setSelectedFile('Card.tsx');
    triggerScanline();
  }, [clearTimers, triggerScanline]);

  const loadSample = useCallback(() => {
    setSourceCode(SAMPLE_CODE);
    setFileName('Card.tsx');
    setSelectedFile('Card.tsx');
    setPhase('loaded');
    setEditorTab('source');
    triggerScanline();
  }, [triggerScanline]);

  const handlePasteSubmit = useCallback(() => {
    if (!pasteText.trim()) return;
    setSourceCode(pasteText);
    const name = pasteText.includes('export function') || pasteText.includes('export const')
      ? 'Pasted.tsx'
      : 'Pasted.tsx';
    setFileName(name);
    setSelectedFile(name);
    setPhase('loaded');
    setPasteOpen(false);
    setPasteText('');
    triggerScanline();
  }, [pasteText, triggerScanline]);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setSourceCode(String(reader.result ?? ''));
        setFileName(file.name);
        setSelectedFile(file.name);
        setPhase('loaded');
        triggerScanline();
      };
      reader.readAsText(file);
    },
    [triggerScanline]
  );

  const selectFinding = useCallback((f: Finding) => {
    setSelectedFinding(f);
    setActiveLine(f.line || undefined);
    setEditorTab('source');
    setMobileView('editor');
  }, []);

  const reviewRepair = useCallback((f: Finding) => {
    setSelectedFinding(f);
    setEditorTab('diff');
    setRepairDecision('none');
    setMobileView('editor');
  }, []);

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        if (phase !== 'analysing' && hasSource) runAnalysis();
      }
      if (e.key === 'Escape') {
        if (pasteOpen) {
          setPasteOpen(false);
          return;
        }
        setSelectedFinding(null);
        setActiveLine(undefined);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, hasSource, runAnalysis, pasteOpen]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const markers =
    phase === 'results'
      ? FINDINGS.filter((f) => f.line > 0).map((f) => ({ line: f.line, sev: f.sev }))
      : [];

  const showWorkspace = phase === 'loaded' || phase === 'analysing' || phase === 'results';

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col overflow-hidden bg-app">
      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".tsx,.jsx,.ts,.js,.css,.json"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* page toolbar — sticky beneath header */}
      <div className="sticky top-16 z-30 flex items-center gap-3 border-b border-app-border bg-app-surface-2/80 px-3 py-2 backdrop-blur-md">
        {/* breadcrumb */}
        <div className="hidden items-center gap-1.5 font-mono text-[11px] text-app-faint sm:flex">
          <span>Forge</span>
          <ChevronRight className="h-3 w-3" />
          <span>Analyse</span>
          <ChevronRight className="h-3 w-3" />
          <span className="text-app-muted">{hasSource ? fileName : 'New submission'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <FileCode2 className={`h-3.5 w-3.5 ${hasSource ? 'text-app-accent' : 'text-app-faint'}`} />
          <span className="font-mono text-[11px] text-app-muted">{hasSource ? fileName : 'No file'}</span>
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              phase === 'results'
                ? 'bg-app-success'
                : phase === 'analysing'
                ? 'bg-app-warning animate-pulse'
                : hasSource
                ? 'bg-app-accent'
                : 'bg-app-faint'
            }`}
          />
        </div>

        {/* centre tabs */}
        <div className="mx-auto hidden items-center gap-1 md:flex">
          {(['source', 'preview', 'diff'] as EditorTab[]).map((t) => (
            <button
              key={t}
              onClick={() => setEditorTab(t)}
              disabled={phase !== 'results'}
              className={`rounded px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider t-200 disabled:opacity-30 ${
                editorTab === t && showWorkspace
                  ? 'bg-app-accent/15 text-app-accent'
                  : 'text-app-faint hover:text-app-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* right actions */}
        <div className="ml-auto flex items-center gap-1.5">
          <button
            onClick={clearSubmission}
            disabled={!hasSource}
            className="inline-flex items-center gap-1 rounded-md border border-app-border-soft px-2 py-1 font-mono text-[10px] text-app-faint t-200 hover:border-app-border-strong hover:text-app-muted disabled:opacity-30"
          >
            <Trash2 className="h-3 w-3" /> Clear
          </button>
          <button
            onClick={loadSample}
            className="inline-flex items-center gap-1 rounded-md border border-app-border-soft px-2 py-1 font-mono text-[10px] text-app-faint t-200 hover:border-app-border-strong hover:text-app-muted"
          >
            <Sparkles className="h-3 w-3" /> Sample
          </button>
          <button
            onClick={runAnalysis}
            disabled={!hasSource || phase === 'analysing'}
            className="inline-flex items-center gap-1.5 rounded-md bg-app-accent px-3 py-1.5 font-mono text-[11px] font-medium text-app-accent-fg t-200 hover:bg-app-accent-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {phase === 'analysing' ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" /> Analysing…
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" /> Run analysis
                <span className="ml-1 hidden rounded border border-app-accent/30 px-1 py-0.5 text-[8.5px] opacity-70 sm:inline">
                  ⌘↵
                </span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* mobile view switcher */}
      {showWorkspace && (
        <div className="flex items-center gap-1 border-b border-app-border-soft bg-app-surface-2/40 px-2 py-1.5 lg:hidden">
          {(['source', 'editor', 'findings', 'output'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setMobileView(v)}
              className={`rounded px-2.5 py-1 font-mono text-[9.5px] uppercase t-200 ${
                mobileView === v ? 'bg-app-accent/15 text-app-accent' : 'text-app-faint'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      )}

      {/* main workspace */}
      <div className="relative flex min-h-0 flex-1 overflow-hidden">
        {/* scanline — clipped within workspace */}
        <div key={scanlineKey} className="scanline" />
        <div key={`glow-${scanlineKey}`} className="scanline-glow" />

        {!showWorkspace ? (
          <EmptyState
            onLoadSample={loadSample}
            onRun={runAnalysis}
            onPaste={() => setPasteOpen(true)}
            onUpload={() => fileInputRef.current?.click()}
            dragOver={dragOver}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFiles(e.dataTransfer.files);
            }}
            hasSource={hasSource}
          />
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            {/* analysing progress strip */}
            {phase === 'analysing' && (
              <div className="border-b border-app-border-soft bg-app-surface-2/40 px-3 py-2">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px]">
                  {STAGES.map((s, i) => (
                    <span key={s} className="inline-flex items-center gap-1.5">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          i < stageIdx ? 'bg-app-success' : i === stageIdx ? 'bg-app-accent animate-pulse' : 'bg-app-faint/40'
                        }`}
                      />
                      <span className={i < stageIdx ? 'text-app-success' : i === stageIdx ? 'text-app-accent' : 'text-app-faint'}>
                        {s}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* results repair banner */}
            {phase === 'results' && repairDecision !== 'none' && (
              <div
                className={`flex items-center gap-2 border-b px-3 py-1.5 font-mono text-[10.5px] ${
                  repairDecision === 'approved'
                    ? 'border-app-success/30 bg-app-success/12 text-app-success'
                    : 'border-app-border bg-app-surface-2/40 text-app-muted'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {repairDecision === 'approved'
                  ? 'Repair R-01 approved — diff applied to proposed view. Original source preserved.'
                  : 'Repair R-01 rejected. No changes applied.'}
              </div>
            )}

            <div className="flex min-h-0 flex-1">
              {/* source panel */}
              <div className={`min-w-0 ${mobileView === 'source' ? 'block flex-1' : 'hidden'} lg:block`}>
                <SourcePanel
                  files={fileList}
                  selectedFile={selectedFile}
                  onSelectFile={setSelectedFile}
                />
              </div>

              {/* editor */}
              <div className={`min-w-0 flex-1 ${mobileView === 'editor' ? 'block' : 'hidden'} lg:block`}>
                <EditorPanel
                  activeTab={editorTab}
                  onTabChange={setEditorTab}
                  markers={markers}
                  activeLine={activeLine}
                  onLineClick={(n) => setActiveLine(n)}
                  selectedFile={selectedFile}
                  pendingRepair={selectedFinding}
                  onApprove={() => setRepairDecision('approved')}
                  onReject={() => setRepairDecision('rejected')}
                  code={sourceCode ?? SAMPLE_CODE}
                />
              </div>

              {/* findings */}
              <div className={`min-w-0 ${mobileView === 'findings' ? 'block flex-1' : 'hidden'} lg:block`}>
                {phase === 'results' ? (
                  <FindingsPanel
                    selectedId={selectedFinding?.id ?? null}
                    onSelect={selectFinding}
                    onReviewRepair={reviewRepair}
                  />
                ) : (
                  <SubmissionInfoPanel fileName={fileName} phase={phase} stageIdx={stageIdx} />
                )}
              </div>
            </div>

            {/* terminal */}
            <div className={`${mobileView === 'output' ? 'block' : 'hidden'} lg:block`}>
              <TerminalPanel collapsed={terminalCollapsed} onToggle={() => setTerminalCollapsed((c) => !c)} />
            </div>
          </div>
        )}
      </div>

      {/* paste modal */}
      {pasteOpen && (
        <PasteModal
          value={pasteText}
          onChange={setPasteText}
          onSubmit={handlePasteSubmit}
          onClose={() => setPasteOpen(false)}
        />
      )}
    </div>
  );
}

/* ---------- Empty state ---------- */

function EmptyState({
  onLoadSample,
  onRun,
  onPaste,
  onUpload,
  dragOver,
  onDragOver,
  onDragLeave,
  onDrop,
  hasSource,
}: {
  onLoadSample: () => void;
  onRun: () => void;
  onPaste: () => void;
  onUpload: () => void;
  dragOver: boolean;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  hasSource: boolean;
}) {
  return (
    <div className="flex flex-1 items-center justify-center overflow-auto p-6">
      <div className="w-full max-w-xl">
        <div className="mb-5 text-center">
          <h1 className="text-lg font-semibold text-app-fg">Analyse a React component</h1>
          <p className="mt-1.5 text-[13px] text-app-muted">
            {hasSource
              ? 'Submission ready — press Run analysis to begin.'
              : 'Paste TSX, JSX or upload a small component bundle.'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={onPaste}
            className="inline-flex items-center gap-1.5 rounded-md border border-app-border-soft bg-app-surface-2/50 px-3 py-1.5 font-mono text-[11px] text-app-muted t-200 hover:border-app-border-strong hover:text-app-fg"
          >
            <ClipboardPaste className="h-3.5 w-3.5" /> Paste component
          </button>
          <button
            onClick={onUpload}
            className="inline-flex items-center gap-1.5 rounded-md border border-app-border-soft bg-app-surface-2/50 px-3 py-1.5 font-mono text-[11px] text-app-muted t-200 hover:border-app-border-strong hover:text-app-fg"
          >
            <Upload className="h-3.5 w-3.5" /> Upload files
          </button>
          <button
            onClick={onLoadSample}
            className="inline-flex items-center gap-1.5 rounded-md border border-app-accent bg-app-accent/12 px-3 py-1.5 font-mono text-[11px] text-app-accent t-200 hover:bg-app-accent hover:text-app-accent-fg"
          >
            <Sparkles className="h-3.5 w-3.5" /> Load sample
          </button>
        </div>

        {/* drop zone */}
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={onUpload}
          className={`relative mt-5 cursor-pointer overflow-hidden rounded-xl border p-8 t-200 ${
            dragOver
              ? 'border-app-accent bg-app-accent/10'
              : 'border-app-border bg-app-surface-2/30 hover:border-app-border-strong'
          }`}
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(var(--accent)/0.10),transparent_70%)]" />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <div
              className={`grid h-10 w-10 place-items-center rounded-lg border t-200 ${
                dragOver
                  ? 'border-app-accent bg-app-accent/20 text-app-accent'
                  : 'border-app-accent/30 bg-app-accent/12 text-app-accent'
              }`}
            >
              <FileCode2 className={`h-5 w-5 ${dragOver ? 'scale-110' : ''} t-200`} />
            </div>
            <div className="font-mono text-[12px] text-app-muted">
              {dragOver ? 'Release files to add them' : 'Drop files here or click to browse'}
            </div>
            <div className="flex flex-wrap justify-center gap-1.5 font-mono text-[9.5px] text-app-faint">
              {['.tsx', '.jsx', '.css', '.json'].map((f) => (
                <span key={f} className="rounded border border-app-border-soft px-1.5 py-0.5">
                  {f}
                </span>
              ))}
            </div>
            <div className="font-mono text-[9.5px] text-app-faint">
              Maximum 10 files · Maximum 1 MB · No repository required
            </div>
          </div>
        </div>

        <div className="mt-5 flex justify-center">
          <button
            onClick={onRun}
            disabled={!hasSource}
            className="inline-flex items-center gap-1.5 rounded-md bg-app-accent px-4 py-2 font-mono text-[12px] font-medium text-app-accent-fg t-200 hover:bg-app-accent-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Play className="h-3.5 w-3.5" /> Run analysis
            <span className="ml-1 rounded border border-app-accent/30 px-1 py-0.5 text-[8.5px] opacity-70">⌘↵</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Paste modal ---------- */

function PasteModal({
  value,
  onChange,
  onSubmit,
  onClose,
}: {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-app-border bg-app-surface shadow-2xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-app-border-soft px-4 py-2.5">
          <div className="flex items-center gap-2">
            <ClipboardPaste className="h-4 w-4 text-app-accent" />
            <span className="font-mono text-[12px] text-app-fg">Paste component source</span>
          </div>
          <button
            onClick={onClose}
            className="rounded p-1 text-app-faint hover:text-app-fg"
            aria-label="Close paste dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        {/* textarea */}
        <textarea
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
              e.preventDefault();
              onSubmit();
            }
          }}
          placeholder={'import { useState } from "react";\n\nexport function MyComponent() {\n  // ...\n}'}
          className="min-h-[300px] flex-1 resize-none bg-app-surface-2/40 p-4 font-mono text-[12px] leading-relaxed text-app-fg outline-none placeholder:text-app-faint/50"
        />
        {/* footer */}
        <div className="flex items-center justify-between border-t border-app-border-soft px-4 py-2.5">
          <span className="font-mono text-[10px] text-app-faint">
            {value.length} chars · ⌘↵ to submit
          </span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="rounded-md border border-app-border-soft px-3 py-1.5 font-mono text-[11px] text-app-muted t-200 hover:border-app-border-strong hover:text-app-fg"
            >
              Cancel
            </button>
            <button
              onClick={onSubmit}
              disabled={!value.trim()}
              className="rounded-md bg-app-accent px-3 py-1.5 font-mono text-[11px] font-medium text-app-accent-fg t-200 hover:bg-app-accent-2 disabled:opacity-40"
            >
              Add source
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Submission info (loaded / analysing) ---------- */

function SubmissionInfoPanel({
  fileName,
  phase,
  stageIdx,
}: {
  fileName: string;
  phase: Phase;
  stageIdx: number;
}) {
  return (
    <aside className="flex w-full flex-col border-l border-app-border bg-app-surface-2/60 lg:w-[360px]">
      <div className="border-b border-app-border-soft px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-app-faint">Submission</span>
      </div>

      <div className="space-y-3 p-3">
        <div className="rounded-lg border border-app-border-soft bg-app-surface/40 p-3">
          <div className="mb-2 flex items-center gap-2">
            <FileCode2 className="h-4 w-4 text-app-accent" />
            <span className="font-mono text-[12px] text-app-fg">{fileName}</span>
          </div>
          <dl className="space-y-1 font-mono text-[10.5px]">
            {[
              ['Framework', 'React'],
              ['Language', 'TypeScript'],
              ['Status', phase === 'analysing' ? 'Analysing…' : 'Ready'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between">
                <dt className="text-app-faint">{k}</dt>
                <dd className={k === 'Status' && phase === 'analysing' ? 'text-app-warning' : 'text-app-muted'}>
                  {v}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {phase === 'analysing' && (
          <div className="rounded-lg border border-app-border-soft bg-app-surface/40 p-3">
            <div className="mb-2 font-mono text-[9.5px] uppercase tracking-wider text-app-faint">Progress</div>
            <div className="space-y-1.5">
              {STAGES.map((s, i) => (
                <div key={s} className="flex items-center gap-2 font-mono text-[10px]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      i < stageIdx ? 'bg-app-success' : i === stageIdx ? 'bg-app-accent animate-pulse' : 'bg-app-faint/40'
                    }`}
                  />
                  <span className={i < stageIdx ? 'text-app-success' : i === stageIdx ? 'text-app-accent' : 'text-app-faint'}>
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {phase === 'loaded' && (
          <div className="rounded-lg border border-app-accent/20 bg-app-accent/8 p-3">
            <div className="flex items-center gap-2 font-mono text-[10.5px] text-app-accent">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Source loaded — ready to analyse
            </div>
            <p className="mt-1.5 text-[10.5px] leading-relaxed text-app-muted">
              Press Run analysis to start the staged inspection. Original source is preserved.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
