import { useState } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Wrench,
} from 'lucide-react';
import { FINDINGS, type Finding, type Sev } from './analyseData';

const SEV_META: Record<Sev, { icon: typeof ShieldAlert; label: string; color: string; bg: string }> = {
  critical: { icon: ShieldAlert, label: 'critical', color: 'text-app-danger', bg: 'bg-app-danger/15' },
  warning: { icon: AlertTriangle, label: 'warning', color: 'text-app-warning', bg: 'bg-app-warning/15' },
  passed: { icon: CheckCircle2, label: 'passed', color: 'text-app-success', bg: 'bg-app-success/15' },
};

type Filter = 'all' | Sev;

export function FindingsPanel({
  selectedId,
  onSelect,
  onReviewRepair,
}: {
  selectedId: string | null;
  onSelect: (f: Finding) => void;
  onReviewRepair?: (f: Finding) => void;
}) {
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState<string | null>(null);

  const counts = {
    critical: FINDINGS.filter((f) => f.sev === 'critical').length,
    warning: FINDINGS.filter((f) => f.sev === 'warning').length,
    passed: FINDINGS.filter((f) => f.sev === 'passed').length,
  };

  const filtered = filter === 'all' ? FINDINGS : FINDINGS.filter((f) => f.sev === filter);
  const groups = ['Accessibility', 'TypeScript', 'Code Quality', 'Responsive', 'Dependencies'];

  return (
    <aside className="flex w-full flex-col border-l border-app-border bg-app-surface-2/60 lg:w-[360px]">
      <div className="border-b border-app-border-soft px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-app-faint">Findings</span>
      </div>

      {/* summary */}
      <div className="flex items-center gap-2 border-b border-app-border-soft px-3 py-2 font-mono text-[10px]">
        <span className="inline-flex items-center gap-1 text-app-danger">
          <span className="h-1.5 w-1.5 rounded-full bg-app-danger" /> {counts.critical} critical
        </span>
        <span className="inline-flex items-center gap-1 text-app-warning">
          <span className="h-1.5 w-1.5 rounded-full bg-app-warning" /> {counts.warning} warnings
        </span>
        <span className="inline-flex items-center gap-1 text-app-success">
          <span className="h-1.5 w-1.5 rounded-full bg-app-success" /> {counts.passed} passed
        </span>
      </div>

      {/* filters */}
      <div className="flex gap-1 border-b border-app-border-soft px-2.5 py-1.5">
        {(['all', 'critical', 'warning', 'passed'] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded px-2 py-0.5 font-mono text-[9.5px] capitalize t-200 ${
              filter === f ? 'bg-app-accent/15 text-app-accent' : 'text-app-faint hover:text-app-muted'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* list */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {groups.map((cat) => {
          const items = filtered.filter((f) => f.category === cat);
          if (items.length === 0) return null;
          return (
            <div key={cat} className="mb-3">
              <div className="mb-1 px-1 font-mono text-[9px] uppercase tracking-wider text-app-faint">{cat}</div>
              <div className="space-y-1">
                {items.map((f) => {
                  const meta = SEV_META[f.sev];
                  const Icon = meta.icon;
                  const active = selectedId === f.id;
                  const open = expanded === f.id;
                  return (
                    <div
                      key={f.id}
                      className={`rounded-lg border p-2 t-200 ${
                        active
                          ? 'border-app-accent bg-app-accent/12'
                          : 'border-app-border-soft bg-app-surface/40 hover:border-app-border-strong'
                      }`}
                    >
                      <button
                        onClick={() => {
                          onSelect(f);
                          setExpanded(open ? null : f.id);
                        }}
                        className="flex w-full items-start gap-2 text-left"
                      >
                        <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${meta.color}`} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-1.5">
                            <span className="truncate text-[11.5px] text-app-fg">{f.title}</span>
                          </div>
                          <div className="mt-0.5 font-mono text-[9.5px] text-app-faint">
                            {f.file} · L{f.line}
                          </div>
                        </div>
                        <ChevronRight className={`mt-0.5 h-3.5 w-3.5 shrink-0 text-app-faint t-200 ${open ? 'rotate-90' : ''}`} />
                      </button>
                      {open && (
                        <div className="mt-2 space-y-2 border-t border-app-border-soft pt-2">
                          <p className="text-[10.5px] leading-relaxed text-app-muted">{f.detail}</p>
                          <div className="flex flex-wrap items-center gap-1.5 font-mono text-[9px]">
                            <span className={`rounded px-1.5 py-0.5 ${meta.bg} ${meta.color}`}>{f.rule}</span>
                            <span className={`rounded px-1.5 py-0.5 ${meta.bg} ${meta.color} uppercase`}>{meta.label}</span>
                          </div>
                          {f.repairId && (
                            <button
                              onClick={() => onReviewRepair?.(f)}
                              className="flex w-full items-center justify-center gap-1.5 rounded-md border border-app-accent bg-app-accent/12 px-2 py-1.5 font-mono text-[10px] text-app-accent t-200 hover:bg-app-accent hover:text-app-accent-fg"
                            >
                              <Wrench className="h-3 w-3" /> Review repair {f.repairId}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* footer */}
      <div className="border-t border-app-border-soft px-3 py-2 font-mono text-[9.5px] text-app-faint">
        4 actionable findings · analysis completed in 1.28s
      </div>
    </aside>
  );
}

export { SEV_META };
export type { Finding };
