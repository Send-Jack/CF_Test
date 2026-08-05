import { useState } from 'react';
import {
  Upload,
  ScanSearch,
  ListChecks,
  Wrench,
  FileCode2,
  FileType2,
  Braces,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Loader2,
  GitBranch,
  Package,
  Accessibility,
  ChevronRight,
} from 'lucide-react';
import { SectionLabel } from '@/components/ui/Section';

type StepId = 'submit' | 'analyse' | 'understand' | 'repair';

const steps: { id: StepId; n: string; title: string; desc: string; icon: typeof Upload }[] = [
  { id: 'submit', n: '01', title: 'Submit', desc: 'Paste a component or upload a bundle. Forge ingests TSX, styles and props.', icon: Upload },
  { id: 'analyse', n: '02', title: 'Analyse', desc: 'An isolated container compiles and runs type, dependency and accessibility checks.', icon: ScanSearch },
  { id: 'understand', n: '03', title: 'Understand', desc: 'Findings are mapped to exact lines with severity and a plain-language explanation.', icon: ListChecks },
  { id: 'repair', n: '04', title: 'Repair', desc: 'Forge proposes a diff with confidence and risk. You approve, reject or edit.', icon: Wrench },
];

export function Workflow() {
  const [active, setActive] = useState<StepId>('submit');

  return (
    <section id="workflow" className="atmosphere-workflow px-6 pt-16 pb-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-12 max-w-2xl">
          <SectionLabel>Workflow</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            From pasted component to reviewed repair.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            Four stages, one controlled path. Each step advances the live interface
            on the right — nothing is mocked or left empty.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12">
          {/* Steps */}
          <div className="reveal">
            <ol className="relative space-y-3">
              {steps.map((s, i) => {
                const isActive = s.id === active;
                const isDone = steps.findIndex((x) => x.id === active) > i;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => setActive(s.id)}
                      className={`group flex w-full items-start gap-4 rounded-xl border p-4 text-left t-300 ${
                        isActive
                          ? 'border-violet-400/40 bg-violet-500/[0.06]'
                          : 'border-edge bg-surface-900/40 hover:border-edge-strong hover:bg-surface-800/50'
                      }`}
                    >
                      <div
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-lg font-mono text-[13px] font-semibold t-300 ${
                          isActive
                            ? 'bg-violet-500 text-white shadow-[0_0_0_1px_rgba(124,77,255,0.5),0_8px_20px_-10px_rgba(124,77,255,0.8)]'
                            : isDone
                            ? 'bg-success-500/15 text-success-400 ring-1 ring-success-500/30'
                            : 'bg-surface-700 text-ink-faint'
                        }`}
                      >
                        {isDone ? <CheckCircle2 className="h-5 w-5" /> : s.n}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <s.icon className={`h-4 w-4 ${isActive ? 'text-violet-300' : 'text-ink-faint'}`} />
                          <h3 className="text-[15px] font-semibold text-ink">{s.title}</h3>
                        </div>
                        <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{s.desc}</p>
                      </div>
                      <ChevronRight
                        className={`mt-2 h-4 w-4 t-300 ${isActive ? 'text-violet-300' : 'text-ink-faint/40'}`}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>

            <div className="mt-6 flex items-center gap-2 rounded-lg border border-edge-soft bg-base-950/40 px-4 py-3">
              <span className="font-mono text-[11px] text-ink-faint">stage</span>
              <span className="font-mono text-[12px] text-violet-300">{active}</span>
              <div className="ml-auto flex gap-1">
                {steps.map((s) => (
                  <span
                    key={s.id}
                    className={`h-1.5 w-6 rounded-full t-300 ${
                      s.id === active ? 'bg-violet-400' : 'bg-surface-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Live interface */}
          <div className="reveal" data-delay="1">
            <div className="panel-depth-soft overflow-hidden rounded-xl border border-edge bg-surface-900/80">
              <div className="flex items-center justify-between border-b border-edge-soft px-3.5 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
                </div>
                <span className="font-mono text-[11px] text-ink-faint">forge · stage / {active}</span>
                <span className="font-mono text-[11px] text-violet-300">● live</span>
              </div>
              <div className="min-h-[420px]">
                {active === 'submit' && <SubmitView />}
                {active === 'analyse' && <AnalyseView />}
                {active === 'understand' && <UnderstandView />}
                {active === 'repair' && <RepairView />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelHeader({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="border-b border-edge-soft px-4 py-2.5">
      <div className="text-[13px] font-medium text-ink">{title}</div>
      <div className="font-mono text-[11px] text-ink-faint">{sub}</div>
    </div>
  );
}

function SubmitView() {
  const files = [
    { name: 'Card.tsx', icon: FileCode2, size: '2.1 KB', state: 'uploaded' },
    { name: 'styles.css', icon: FileType2, size: '0.8 KB', state: 'uploaded' },
    { name: 'package.json', icon: Braces, size: '0.3 KB', state: 'uploaded' },
  ];
  return (
    <div className="grid grid-cols-[180px_1fr]">
      <aside className="border-r border-edge-soft bg-base-950/40 p-3">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint">Submission</div>
        {files.map((f) => (
          <div key={f.name} className="mb-1.5 flex items-center gap-2 rounded-md bg-surface-800/50 px-2.5 py-2">
            <f.icon className="h-3.5 w-3.5 text-violet-300" />
            <div className="min-w-0 flex-1">
              <div className="truncate font-mono text-[11.5px] text-ink">{f.name}</div>
              <div className="font-mono text-[10px] text-ink-faint">{f.size}</div>
            </div>
            <CheckCircle2 className="h-3.5 w-3.5 text-success-400" />
          </div>
        ))}
        <div className="mt-3 mb-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">Sample props</div>
        <pre className="rounded-md bg-surface-800/60 p-2 font-mono text-[10.5px] leading-relaxed text-ink-muted">{`{
  "title": "Release",
  "count": 3,
  "disabled": false
}`}</pre>
      </aside>
      <div>
        <PanelHeader title="Paste or upload a component" sub="drag-and-drop · tsx · jsx · css · json" />
        <div className="p-4">
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-edge-strong bg-base-950/40 px-4 py-6">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-violet-500/10 ring-1 ring-violet-400/30">
              <Upload className="h-5 w-5 text-violet-300" />
            </div>
            <div>
              <div className="text-[13px] text-ink">Drop files or paste a component</div>
              <div className="font-mono text-[11px] text-ink-faint">3 files received · 3.2 KB total</div>
            </div>
            <div className="ml-auto flex items-center gap-1.5 rounded-full bg-success-500/10 px-2.5 py-1 ring-1 ring-success-500/30">
              <CheckCircle2 className="h-3.5 w-3.5 text-success-400" />
              <span className="font-mono text-[11px] text-success-400">upload complete</span>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {[
              { label: 'Card.tsx', state: 'parsed', pct: 100 },
              { label: 'styles.css', state: 'linked', pct: 100 },
              { label: 'package.json', state: 'resolved', pct: 100 },
            ].map((r) => (
              <div key={r.label} className="flex items-center gap-3">
                <span className="w-28 font-mono text-[11px] text-ink-muted">{r.label}</span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-700">
                  <div className="h-full rounded-full bg-success-500 t-300" style={{ width: `${r.pct}%` }} />
                </div>
                <span className="w-16 text-right font-mono text-[10px] text-success-400">{r.state}</span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between rounded-md bg-surface-800/50 px-3 py-2">
            <span className="font-mono text-[11px] text-ink-faint">ready to analyse</span>
            <button className="inline-flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-1.5 text-[12px] font-medium text-white t-200 hover:bg-violet-400">
              <ScanSearch className="h-3.5 w-3.5" /> Run analysis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyseView() {
  const checks = [
    { label: 'Compilation', icon: FileCode2, state: 'parsed', pct: 100, color: 'text-success-400' },
    { label: 'TypeScript', icon: Braces, state: 'checking', pct: 72, color: 'text-violet-300' },
    { label: 'Dependencies', icon: Package, state: 'resolving', pct: 54, color: 'text-violet-300' },
    { label: 'Accessibility', icon: Accessibility, state: 'queued', pct: 18, color: 'text-ink-faint' },
  ];
  return (
    <div>
      <PanelHeader title="Running isolated analysis" sub="container · forge-runtime:0.9 · 2 vCPU / 512 MB" />
      <div className="p-4">
        {/* Terminal output */}
        <div className="rounded-lg border border-edge-soft bg-base-950/70 p-3 font-mono text-[11.5px] leading-relaxed">
          <div className="text-ink-faint">$ forge analyse --target Card.tsx --strict</div>
          <div className="text-success-400">✓ parsed Card.tsx (2.1 KB)</div>
          <div className="text-ink-muted">→ spawning isolated container…</div>
          <div className="text-success-400">✓ container ready · id 7f3a2c</div>
          <div className="text-violet-300">→ running tsc --noEmit…</div>
          <div className="text-warn-400">! 2 type issues found</div>
          <div className="text-violet-300">→ resolving dependencies…</div>
          <div className="flex items-center gap-1.5 text-ink-faint">
            <Loader2 className="h-3 w-3 animate-spin" /> checking accessibility tree
          </div>
        </div>

        {/* Check rows */}
        <div className="mt-4 space-y-2.5">
          {checks.map((c) => (
            <div key={c.label} className="flex items-center gap-3 rounded-md bg-surface-800/50 px-3 py-2.5">
              <c.icon className={`h-4 w-4 ${c.color}`} />
              <span className="w-28 text-[13px] text-ink">{c.label}</span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-700">
                <div
                  className={`h-full rounded-full t-500 ${c.pct === 100 ? 'bg-success-500' : 'bg-violet-400'}`}
                  style={{ width: `${c.pct}%`, transition: 'width 0.6s ease' }}
                />
              </div>
              <span className={`w-20 text-right font-mono text-[11px] ${c.color}`}>{c.state}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-ink-faint">
          <span>elapsed 3.2s · cpu 38% · mem 204 MB</span>
          <span className="text-violet-300">analysis in progress</span>
        </div>
      </div>
    </div>
  );
}

function UnderstandView() {
  const findings = [
    {
      sev: 'critical', icon: ShieldAlert, title: 'IconButton missing accessible name',
      line: 42, code: '<button onClick={toggle}>',
    },
    {
      sev: 'warning', icon: AlertTriangle, title: 'Type mismatch: string | undefined',
      line: 18, code: 'const label = props.title;',
    },
    {
      sev: 'warning', icon: AlertTriangle, title: 'Effect missing cleanup function',
      line: 27, code: 'useEffect(() => { subscribe(); }, [])',
    },
  ];
  return (
    <div className="grid grid-cols-[1fr_280px]">
      <div>
        <PanelHeader title="Card.tsx — annotated" sub="findings mapped to source" />
        <div className="max-h-[360px] overflow-y-auto scroll-thin p-3 font-mono text-[12px] leading-[1.7]">
          {Array.from({ length: 30 }).map((_, i) => {
            const n = i + 1;
            const f = findings.find((x) => x.line === n);
            return (
              <div
                key={n}
                className={`flex px-1 ${f ? (f.sev === 'critical' ? 'bg-critical-500/10' : 'bg-warn-500/10') : ''}`}
              >
                <span className="w-7 shrink-0 select-none pr-3 text-right text-ink-faint/60">{n}</span>
                <span className="whitespace-pre text-ink-muted">
                  {f ? (
                    <span className={f.sev === 'critical' ? 'text-critical-400' : 'text-warn-400'}>{f.code}</span>
                  ) : (
                    sampleCode(n)
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <aside className="border-l border-edge-soft bg-base-950/40">
        <div className="border-b border-edge-soft px-3 py-2.5">
          <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Findings · 3</span>
        </div>
        <div className="space-y-2 p-3">
          {findings.map((f) => (
            <div
              key={f.title}
              className={`rounded-md bg-surface-800/60 p-2.5 ring-1 ring-inset ${
                f.sev === 'critical' ? 'ring-critical-500/30' : 'ring-warn-500/30'
              }`}
            >
              <div className="flex items-center gap-2">
                <f.icon className={`h-3.5 w-3.5 ${f.sev === 'critical' ? 'text-critical-400' : 'text-warn-400'}`} />
                <span className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                  f.sev === 'critical' ? 'bg-critical-500/15 text-critical-400' : 'bg-warn-500/15 text-warn-400'
                }`}>{f.sev}</span>
                <span className="ml-auto font-mono text-[10px] text-ink-faint">L{f.line}</span>
              </div>
              <div className="mt-1.5 text-[12px] leading-snug text-ink">{f.title}</div>
              <div className="mt-1 font-mono text-[10.5px] text-ink-faint">{f.code}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

function sampleCode(n: number): string {
  const lines: Record<number, string> = {
    1: "import { useState } from 'react';",
    2: "import { CheckCircle2 } from 'lucide-react';",
    4: 'type CardProps = {',
    5: '  title: string;',
    6: '  count?: number;',
    7: '};',
    9: 'export function Card({ title, count }: CardProps) {',
    10: '  const [open, setOpen] = useState(false);',
    12: '  return (',
    13: '    <article className="card">',
    20: '    </article>',
    21: '  );',
    22: '}',
  };
  return lines[n] ?? '';
}

function RepairView() {
  return (
    <div>
      <PanelHeader title="Proposed repair · R-01" sub="Card.tsx · L42 · IconButton accessibility" />
      <div className="grid grid-cols-2 divide-x divide-edge-soft">
        <div className="p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-critical-500/15 px-1.5 py-0.5 font-mono text-[10px] uppercase text-critical-400">original</span>
            <span className="font-mono text-[11px] text-ink-faint">Card.tsx</span>
          </div>
          <pre className="rounded-md bg-base-950/60 p-2.5 font-mono text-[11.5px] leading-relaxed">
<span className="tok-del">{'      <button onClick={toggle}>'}</span>{'\n'}
<span className="tok-del">{'        <CheckCircle2 />'}</span>{'\n'}
<span className="tok-del">{'      </button>'}</span>
          </pre>
        </div>
        <div className="p-3">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-success-500/15 px-1.5 py-0.5 font-mono text-[10px] uppercase text-success-400">proposed</span>
            <span className="font-mono text-[11px] text-ink-faint">Card.tsx</span>
          </div>
          <pre className="rounded-md bg-base-950/60 p-2.5 font-mono text-[11.5px] leading-relaxed">
<span className="tok-add">{'      <button'}</span>{'\n'}
<span className="tok-add">{'        aria-label="Toggle state"'}</span>{'\n'}
<span className="tok-add">{'        onClick={toggle}>'}</span>{'\n'}
<span className="tok-add">{'        <CheckCircle2 />'}</span>{'\n'}
<span className="tok-add">{'      </button>'}</span>
          </pre>
        </div>
      </div>
      <div className="border-t border-edge-soft p-3">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-ink-faint">confidence</span>
            <span className="font-mono text-[12px] font-semibold text-success-400">94%</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-ink-faint">risk</span>
            <span className="rounded-full bg-success-500/10 px-2 py-0.5 font-mono text-[11px] text-success-400 ring-1 ring-success-500/30">low</span>
          </div>
          <p className="flex-1 text-[12px] leading-snug text-ink-muted">
            Adds an accessible name to the toggle button so screen readers announce its purpose.
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-edge px-3 py-1.5 text-[12px] text-ink-muted t-200 hover:border-critical-400/50 hover:text-critical-400">
            Reject
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-violet-500 px-3 py-1.5 text-[12px] font-medium text-white t-200 hover:bg-violet-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> Approve repair
          </button>
        </div>
      </div>
    </div>
  );
}
