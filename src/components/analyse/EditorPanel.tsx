import { useState } from 'react';
import { X, Smartphone, Tablet, Monitor, RefreshCw, ExternalLink, Eye, Sun, Moon, GitCompare } from 'lucide-react';
import { CodeView } from './CodeView';
import { DIFF_ORIGINAL, DIFF_PROPOSED, type Finding } from './analyseData';

type EditorTab = 'source' | 'preview' | 'diff';

export function EditorPanel({
  activeTab,
  onTabChange,
  markers,
  activeLine,
  onLineClick,
  selectedFile,
  pendingRepair,
  onApprove,
  onReject,
  code,
}: {
  activeTab: EditorTab;
  onTabChange: (t: EditorTab) => void;
  markers: { line: number; sev: 'critical' | 'warning' | 'passed' }[];
  activeLine?: number;
  onLineClick?: (line: number) => void;
  selectedFile: string;
  pendingRepair?: Finding | null;
  onApprove?: () => void;
  onReject?: () => void;
  code: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col bg-app-surface/40">
      {/* editor tab row */}
      <div className="flex items-center border-b border-app-border-soft bg-app-surface-2/40">
        <div className="flex">
          {(['source', 'preview', 'diff'] as EditorTab[]).map((t) => (
            <button
              key={t}
              onClick={() => onTabChange(t)}
              className={`flex items-center gap-1.5 border-b-2 px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-wider t-200 ${
                activeTab === t ? 'border-app-accent text-app-accent' : 'border-transparent text-app-faint hover:text-app-muted'
              }`}
            >
              {t === 'diff' && <GitCompare className="h-3 w-3" />}
              {t}
            </button>
          ))}
        </div>
        {activeTab === 'source' && (
          <div className="ml-2 flex items-center gap-1.5 border-l border-app-border-soft pl-3">
            <span className="font-mono text-[11px] text-app-muted">{selectedFile}</span>
            <button className="text-app-faint hover:text-app-muted" aria-label="Close file">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
      </div>

      {/* content */}
      <div className="min-h-0 flex-1 overflow-auto">
        {activeTab === 'source' && (
          <SourceTab code={code} markers={markers} activeLine={activeLine} onLineClick={onLineClick} />
        )}
        {activeTab === 'preview' && <PreviewTab />}
        {activeTab === 'diff' && (
          <DiffTab pendingRepair={pendingRepair} onApprove={onApprove} onReject={onReject} />
        )}
      </div>
    </div>
  );
}

function SourceTab({
  code,
  markers,
  activeLine,
  onLineClick,
}: {
  code: string;
  markers: { line: number; sev: 'critical' | 'warning' | 'passed' }[];
  activeLine?: number;
  onLineClick?: (line: number) => void;
}) {
  return (
    <div className="flex h-full">
      <div className="min-w-0 flex-1 overflow-x-auto px-2 py-2">
        <CodeView code={code} markers={markers} activeLine={activeLine} onLineClick={onLineClick} />
      </div>
      {/* minimap / scroll indicator */}
      <div className="hidden w-2 shrink-0 bg-app-surface-2/40 lg:block">
        <div className="h-1/3 w-full rounded bg-app-accent/20" />
      </div>
    </div>
  );
}

function PreviewTab() {
  const [vp, setVp] = useState(390);
  const [dark, setDark] = useState(true);
  const vps = [
    { w: 390, icon: Smartphone },
    { w: 768, icon: Tablet },
    { w: 1024, icon: Monitor },
    { w: 1440, icon: Monitor },
  ];

  return (
    <div className="flex h-full flex-col">
      {/* controls */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-app-border-soft px-3 py-2">
        {vps.map((v) => (
          <button
            key={v.w}
            onClick={() => setVp(v.w)}
            className={`inline-flex items-center gap-1 rounded px-2 py-1 font-mono text-[10px] t-200 ${
              vp === v.w ? 'bg-app-accent/15 text-app-accent' : 'text-app-faint hover:text-app-muted'
            }`}
          >
            <v.icon className="h-3 w-3" /> {v.w}
          </button>
        ))}
        <button
          onClick={() => setVp(1024)}
          className="rounded px-2 py-1 font-mono text-[10px] text-app-faint hover:text-app-muted"
        >
          Fit
        </button>
        <div className="ml-auto flex items-center gap-1">
          <button className="rounded p-1 text-app-faint hover:text-app-muted" aria-label="Refresh preview">
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button className="rounded p-1 text-app-faint hover:text-app-muted" aria-label="Open in isolated frame">
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
          <button className="rounded p-1 text-app-faint hover:text-app-muted" aria-label="Toggle component state">
            <Eye className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={() => setDark((d) => !d)}
            className="rounded p-1 text-app-faint hover:text-app-muted"
            aria-label="Toggle preview theme"
          >
            {dark ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* ruler */}
      <div className="flex items-center gap-2 border-b border-app-border-soft px-3 py-1 font-mono text-[9.5px] text-app-faint">
        <span className="h-1 w-1 rounded-full bg-app-accent" /> viewport: {vp}px
      </div>

      {/* canvas */}
      <div className="flex flex-1 items-start justify-center overflow-auto p-4">
        <div
          className={`rounded-lg border p-3 t-300 ${dark ? 'border-app-border bg-app-surface-3' : 'border-gray-200 bg-white'}`}
          style={{ width: `${Math.min(vp, 900)}px`, maxWidth: '100%' }}
        >
          {vp === 390 && (
            <div className="mb-2 rounded border border-app-warning bg-app-warning/12 px-2 py-1 font-mono text-[9px] text-app-warning">
              Button group exceeds available width by 18px
            </div>
          )}
          {/* simplified component preview */}
          <div className={`rounded-lg border p-4 ${dark ? 'border-app-border bg-app-surface-2' : 'border-gray-200 bg-gray-50'}`}>
            <h2 className={`mb-3 text-sm font-semibold ${dark ? 'text-app-fg' : 'text-gray-900'}`}>Release notes</h2>
            <div className="flex gap-2" style={{ flexWrap: vp >= 768 ? 'nowrap' : 'wrap' }}>
              <button className={`rounded px-3 py-1.5 text-xs ${dark ? 'bg-app-accent text-app-accent-fg' : 'bg-blue-600 text-white'}`}>
                Toggle
              </button>
              <button className={`rounded border px-3 py-1.5 text-xs ${dark ? 'border-app-border text-app-muted' : 'border-gray-300 text-gray-700'}`}>
                Secondary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiffTab({
  pendingRepair,
  onApprove,
  onReject,
}: {
  pendingRepair?: Finding | null;
  onApprove?: () => void;
  onReject?: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="grid flex-1 grid-cols-1 overflow-auto lg:grid-cols-2">
        {/* original */}
        <div className="border-r border-app-border">
          <div className="flex items-center gap-2 border-b border-app-border-soft px-3 py-2">
            <span className="rounded bg-app-danger/15 px-1.5 py-0.5 font-mono text-[9.5px] uppercase text-app-danger">original</span>
            <span className="font-mono text-[10px] text-app-faint">Card.tsx · L16–L22</span>
          </div>
          <div className="overflow-x-auto px-3 py-2 font-mono text-[11px] leading-[1.7]">
            {DIFF_ORIGINAL.map((l) => (
              <div
                key={l.n}
                className={`flex ${l.mark === 'del' ? 'bg-app-danger/12' : ''}`}
              >
                <span className="w-4 shrink-0 text-center text-app-danger">{l.mark === 'del' ? '−' : ' '}</span>
                <span className="w-7 shrink-0 select-none pr-2 text-right text-app-faint/60">{l.n}</span>
                <span className="whitespace-pre text-app-muted">{l.text}</span>
              </div>
            ))}
          </div>
        </div>
        {/* proposed */}
        <div>
          <div className="flex items-center gap-2 border-b border-app-border-soft px-3 py-2">
            <span className="rounded bg-app-success/15 px-1.5 py-0.5 font-mono text-[9.5px] uppercase text-app-success">proposed</span>
            <span className="font-mono text-[10px] text-app-faint">Card.tsx · R-01</span>
          </div>
          <div className="overflow-x-auto px-3 py-2 font-mono text-[11px] leading-[1.7]">
            {DIFF_PROPOSED.map((l) => (
              <div
                key={l.n}
                className={`flex ${l.mark === 'add' ? 'bg-app-success/12' : ''}`}
              >
                <span className="w-4 shrink-0 text-center text-app-success">{l.mark === 'add' ? '+' : ' '}</span>
                <span className="w-7 shrink-0 select-none pr-2 text-right text-app-faint/60">{l.n}</span>
                <span className="whitespace-pre text-app-muted">{l.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* repair summary */}
      <div className="border-t border-app-border-soft px-3 py-3">
        <div className="mb-2 flex items-center gap-2">
          <span className="font-mono text-[11px] text-app-accent">Repair R-01</span>
          <span className="text-[12px] text-app-fg">Add accessible name to IconButton</span>
        </div>
        <div className="mb-3 flex flex-wrap items-center gap-2 font-mono text-[10px]">
          <span className="rounded bg-app-success/12 px-1.5 py-0.5 text-app-success">confidence 94%</span>
          <span className="rounded bg-app-success/12 px-1.5 py-0.5 text-app-success">risk: low</span>
          <span className="text-app-faint">diff applied on approve</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onReject}
            className="inline-flex items-center gap-1.5 rounded-md border border-app-border px-3 py-1.5 text-[12px] text-app-muted t-200 hover:border-app-danger hover:text-app-danger"
          >
            <X className="h-3.5 w-3.5" /> Reject repair
          </button>
          <button
            onClick={onApprove}
            className="inline-flex items-center gap-1.5 rounded-md bg-app-accent px-3 py-1.5 text-[12px] font-medium text-app-accent-fg t-200 hover:bg-app-accent-2"
          >
            Approve repair
          </button>
        </div>
      </div>
    </div>
  );
}
