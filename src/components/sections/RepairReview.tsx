import { useState } from 'react';
import {
  CheckCircle2,
  X,
  Wrench,
  ShieldCheck,
  FileText,
  GitBranch,
} from 'lucide-react';
import { SectionLabel } from '@/components/ui/Section';

const repairs = [
  { id: 'R-01', title: 'Add accessible name to IconButton', confidence: 94, risk: 'low', selected: true },
  { id: 'R-02', title: 'Narrow type: string | undefined → string', confidence: 88, risk: 'low', selected: true },
  { id: 'R-03', title: 'Add effect cleanup for subscription', confidence: 76, risk: 'medium', selected: false },
];

export function RepairReview() {
  const [selected, setSelected] = useState<Record<string, boolean>>({
    'R-01': true,
    'R-02': true,
    'R-03': false,
  });

  const count = Object.values(selected).filter(Boolean).length;

  return (
    <section className="atmosphere-repair px-6 py-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-10 max-w-2xl">
          <SectionLabel>Repair Review</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Repairs remain under your control.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            CoreNex Forge never silently replaces the original component. Every proposed
            change is a reviewed diff — select what you accept, reject what you don't.
          </p>
        </div>

        <div className="reveal panel-depth-soft overflow-hidden rounded-xl border border-edge bg-surface-900/70">
          {/* Header bar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-edge-soft px-5 py-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-violet-300" />
              <span className="font-mono text-[13px] text-ink">Card.tsx</span>
              <span className="text-ink-faint">/</span>
              <span className="font-mono text-[13px] text-ink-muted">Repair R-01</span>
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-success-500/10 px-2.5 py-1 ring-1 ring-success-500/30">
                <ShieldCheck className="h-3.5 w-3.5 text-success-400" />
                <span className="font-mono text-[11px] text-success-400">confidence 94%</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-full bg-success-500/10 px-2.5 py-1 ring-1 ring-success-500/30">
                <span className="font-mono text-[11px] text-success-400">risk: low</span>
              </div>
            </div>
          </div>

          {/* Code comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Original */}
            <div className="border-b border-edge-soft lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between border-b border-edge-soft px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-critical-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-critical-400">original</span>
                  <span className="font-mono text-[11px] text-ink-faint">Card.tsx · L40–L44</span>
                </div>
                <GitBranch className="h-3.5 w-3.5 text-ink-faint" />
              </div>
              <div className="overflow-x-auto scroll-thin p-4 font-mono text-[12.5px] leading-[1.75]">
                <CodeCol lines={originalLines} kind="del" />
              </div>
            </div>

            {/* Proposed */}
            <div>
              <div className="flex items-center justify-between border-b border-edge-soft px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-success-500/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-success-400">proposed</span>
                  <span className="font-mono text-[11px] text-ink-faint">Card.tsx · R-01</span>
                </div>
                <Wrench className="h-3.5 w-3.5 text-violet-300" />
              </div>
              <div className="overflow-x-auto scroll-thin p-4 font-mono text-[12.5px] leading-[1.75]">
                <CodeCol lines={proposedLines} kind="add" />
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="border-t border-edge-soft px-5 py-4">
            <div className="mb-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">Explanation</div>
            <p className="text-[13.5px] leading-relaxed text-ink-muted">
              The toggle <code className="rounded bg-surface-800 px-1 py-0.5 font-mono text-[12px] text-ink">&lt;button&gt;</code> had
              no accessible name, failing <span className="text-violet-300">WCAG 4.1.2</span>. The repair adds an{' '}
              <code className="rounded bg-surface-800 px-1 py-0.5 font-mono text-[12px] text-ink">aria-label</code> so
              assistive technology announces the button's purpose. No behaviour or styling changes.
            </p>
          </div>

          {/* Repair list + actions */}
          <div className="border-t border-edge-soft px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Repairs · {repairs.length}</span>
              <span className="font-mono text-[11px] text-violet-300">{count} selected</span>
            </div>
            <div className="space-y-2">
              {repairs.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelected((s) => ({ ...s, [r.id]: !s[r.id] }))}
                  className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left t-200 ${
                    selected[r.id]
                      ? 'border-violet-400/40 bg-violet-500/[0.06]'
                      : 'border-edge bg-surface-800/40 hover:border-edge-strong'
                  }`}
                >
                  <span
                    className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border t-200 ${
                      selected[r.id] ? 'border-violet-400 bg-violet-500' : 'border-edge-strong'
                    }`}
                  >
                    {selected[r.id] && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] text-ink-faint">{r.id}</span>
                      <span className="text-[13px] text-ink">{r.title}</span>
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-success-400">{r.confidence}%</span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[10px] ${
                      r.risk === 'low'
                        ? 'bg-success-500/10 text-success-400 ring-1 ring-success-500/30'
                        : 'bg-warn-500/10 text-warn-400 ring-1 ring-warn-500/30'
                    }`}
                  >
                    {r.risk}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-lg border border-edge px-4 py-2.5 text-sm font-medium text-ink-muted t-200 hover:border-critical-400/50 hover:text-critical-400">
                <X className="h-4 w-4" />
                Reject Changes
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg bg-violet-500 px-5 py-2.5 text-sm font-medium text-white t-200 hover:bg-violet-400 shadow-[0_0_0_1px_rgba(124,77,255,0.4),0_8px_24px_-12px_rgba(124,77,255,0.7)]">
                <CheckCircle2 className="h-4 w-4" />
                Accept Selected Repairs
              </button>
              <span className="ml-auto font-mono text-[11px] text-ink-faint">{count} of {repairs.length} · diff applied on accept</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Line = { n: number; text: string; mark?: 'add' | 'del' | 'ctx' };

const originalLines: Line[] = [
  { n: 40, text: '  return (', mark: 'ctx' },
  { n: 41, text: '    <article className="card">', mark: 'ctx' },
  { n: 42, text: '      <button onClick={toggle}>', mark: 'del' },
  { n: 43, text: '        <CheckCircle2 />', mark: 'del' },
  { n: 44, text: '      </button>', mark: 'del' },
  { n: 45, text: '    </article>', mark: 'ctx' },
];

const proposedLines: Line[] = [
  { n: 40, text: '  return (', mark: 'ctx' },
  { n: 41, text: '    <article className="card">', mark: 'ctx' },
  { n: 42, text: '      <button', mark: 'add' },
  { n: 43, text: '        aria-label="Toggle state"', mark: 'add' },
  { n: 44, text: '        onClick={toggle}>', mark: 'add' },
  { n: 45, text: '        <CheckCircle2 />', mark: 'add' },
  { n: 46, text: '      </button>', mark: 'add' },
  { n: 47, text: '    </article>', mark: 'ctx' },
];

function CodeCol({ lines, kind }: { lines: Line[]; kind: 'add' | 'del' }) {
  const sign = kind === 'add' ? '+' : '−';
  const signColor = kind === 'add' ? 'text-success-400' : 'text-critical-400';
  return (
    <div>
      {lines.map((l) => (
        <div
          key={l.n}
          className={`flex ${l.mark === 'add' ? 'tok-add' : l.mark === 'del' ? 'tok-del' : ''}`}
        >
          <span className={`w-5 shrink-0 select-none pr-2 text-center ${l.mark === kind ? signColor : 'text-transparent'}`}>
            {l.mark === kind ? sign : ' '}
          </span>
          <span className="w-7 shrink-0 select-none pr-3 text-right text-ink-faint/60">{l.n}</span>
          <span className="whitespace-pre text-ink-muted">{l.text}</span>
        </div>
      ))}
    </div>
  );
}
