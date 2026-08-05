import { useState } from 'react';
import { ChevronDown, Trash2, TerminalSquare } from 'lucide-react';
import { TERMINAL_OUTPUT } from './analyseData';

const TABS = ['Analysis', 'Build', 'Types', 'Accessibility'] as const;
type TermTab = (typeof TABS)[number];

export function TerminalPanel({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const [tab, setTab] = useState<TermTab>('Analysis');
  const [cleared, setCleared] = useState(false);

  const colorMap: Record<string, string> = {
    faint: 'text-app-faint',
    success: 'text-app-success',
    danger: 'text-app-danger',
    warning: 'text-app-warning',
    muted: 'text-app-muted',
  };

  return (
    <div className="border-t border-app-border bg-app-surface-2/60">
      <div className="flex items-center gap-2 border-b border-app-border-soft px-3 py-1.5">
        <button
          onClick={onToggle}
          className="inline-flex items-center gap-1.5 text-app-faint hover:text-app-muted"
          aria-label={collapsed ? 'Expand terminal' : 'Collapse terminal'}
        >
          <TerminalSquare className="h-3.5 w-3.5" />
          <ChevronDown className={`h-3.5 w-3.5 t-200 ${collapsed ? '' : 'rotate-180'}`} />
        </button>
        <div className="flex gap-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded px-2 py-0.5 font-mono text-[10px] t-200 ${
                tab === t ? 'bg-app-accent/15 text-app-accent' : 'text-app-faint hover:text-app-muted'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          onClick={() => setCleared(true)}
          className="ml-auto inline-flex items-center gap-1 font-mono text-[9.5px] text-app-faint hover:text-app-muted"
          aria-label="Clear terminal"
        >
          <Trash2 className="h-3 w-3" /> Clear
        </button>
      </div>
      {!collapsed && (
        <div className="max-h-[180px] overflow-auto px-3 py-2 font-mono text-[10.5px] leading-relaxed">
          {cleared ? (
            <span className="text-app-faint">terminal cleared</span>
          ) : (
            <>
              {TERMINAL_OUTPUT.map((l, i) => (
                <div key={i} className="flex gap-3">
                  <span className="shrink-0 text-app-faint/50">12:0{i + 1}:0{i + 4}</span>
                  <span className={colorMap[l.c]}>{l.t}</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
