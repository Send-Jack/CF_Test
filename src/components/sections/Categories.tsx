import { useState } from 'react';
import {
  Terminal,
  Braces,
  Package,
  Accessibility,
  Gauge,
  Monitor,
  Smartphone,
  Tablet,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  GitBranch,
  CircleDot,
  Clock,
  FileCode2,
  Layers,
  Activity,
} from 'lucide-react';

type Tab = { id: string; label: string };

function useTabs(tabs: Tab[], initial = 0) {
  const [active, setActive] = useState(initial);
  return { tabs, active, setActive };
}

export function Categories() {
  return (
    <section id="product" className="atmosphere-categories px-6 py-24">
      <div className="mx-auto max-w-[1320px]">
        {/* Section header */}
        <div className="reveal mb-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-md border border-edge-soft bg-surface-900/50 px-2.5 py-1 font-mono text-[11px] text-ink-muted">
            <CircleDot className="h-3 w-3 text-violet-400" />
            <span className="text-violet-300">/forge/analysis/categories</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Six checks run in a single pass.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink-muted">
            Each category produces its own evidence — terminal output, type traces,
            dependency graphs and device frames — so you can act on specifics, not guesses.
          </p>
        </div>

        {/* Analysis workspace */}
        <div className="reveal relative rounded-2xl border border-edge bg-surface-900/50 p-3 shadow-[0_30px_120px_-40px_rgba(83,61,190,0.25)] sm:p-4">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_70%_30%,rgba(124,92,255,0.07),transparent_60%)]" />

          {/* Workspace toolbar */}
          <div className="relative mb-3 flex items-center justify-between gap-3 rounded-lg border border-edge-soft bg-base-950/60 px-3 py-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-critical-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-warn-500/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-success-500/70" />
              </div>
              <span className="hidden font-mono text-[11px] text-ink-faint sm:inline">
                forge <span className="text-edge-strong">/</span> analysis{' '}
                <span className="text-edge-strong">/</span> six-check-pass
              </span>
              <span className="font-mono text-[11px] text-ink-faint sm:hidden">six-check-pass</span>
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-success-400">
              <span className="h-1.5 w-1.5 rounded-full bg-success-500 animate-pulse-soft" />
              all analyzers ready
            </div>
          </div>

          {/* Masonry grid */}
          <div className="relative grid auto-rows-[minmax(0,1fr)] grid-cols-1 gap-3 md:grid-cols-12">
            <CompilationPanel className="md:col-span-6 md:row-span-2" />
            <TypeScriptPanel className="md:col-span-4 md:row-span-2" />
            <ResponsivePanel className="md:col-span-2 md:row-span-4" />
            <DependenciesPanel className="md:col-span-5 md:row-span-2" />
            <AccessibilityPanel className="md:col-span-7 md:row-span-2" />
            <QualityPanel className="md:col-span-5 md:row-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Panel shell ---------- */

function PanelShell({
  icon: Icon,
  title,
  tag,
  tabs,
  active,
  onTab,
  children,
  className = '',
}: {
  icon: typeof Terminal;
  title: string;
  tag: string;
  tabs: Tab[];
  active: number;
  onTab: (i: number) => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-edge-soft bg-base-950/50 p-3.5 t-200 hover:border-violet-400/40 hover:bg-base-900/60 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_50%_0%,rgba(124,92,255,0.06),transparent_70%)]" />
      {/* header */}
      <div className="relative mb-2.5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-violet-500/10 ring-1 ring-violet-400/25">
            <Icon className="h-3.5 w-3.5 text-violet-300" />
          </span>
          <h3 className="text-[13px] font-semibold text-ink">{title}</h3>
        </div>
        <span className="font-mono text-[9.5px] uppercase tracking-wider text-ink-faint">{tag}</span>
      </div>
      {/* tab strip */}
      <div className="relative flex gap-3 border-b border-edge-soft/70 pb-2 text-[10px] font-mono text-ink-faint">
        {tabs.map((t, i) => (
          <button
            key={t.id}
            onClick={() => onTab(i)}
            className={`-mb-2 border-b px-1 pb-2 t-200 ${
              active === i
                ? 'border-violet-400 text-violet-300'
                : 'border-transparent hover:text-ink-muted'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="relative mt-3 flex-1">{children}</div>
    </div>
  );
}

function Chip({ tone, children }: { tone: 'ok' | 'warn' | 'err' | 'muted'; children: React.ReactNode }) {
  const map = {
    ok: 'bg-success-500/15 text-success-400',
    warn: 'bg-warn-500/15 text-warn-400',
    err: 'bg-critical-500/15 text-critical-400',
    muted: 'bg-surface-700/60 text-ink-faint',
  };
  return <span className={`rounded px-1.5 py-0.5 font-mono text-[9.5px] ${map[tone]}`}>{children}</span>;
}

function MetaRow({ children }: { children: React.ReactNode }) {
  return <div className="mt-2.5 flex flex-wrap items-center gap-2 font-mono text-[9.5px] text-ink-faint">{children}</div>;
}

/* ---------- Compilation ---------- */

function CompilationPanel({ className = '' }: { className?: string }) {
  const { tabs, active, setActive } = useTabs([
    { id: 'output', label: 'Output' },
    { id: 'source', label: 'Source' },
    { id: 'summary', label: 'Summary' },
  ]);
  return (
    <PanelShell
      icon={Terminal}
      title="Compilation"
      tag="01 · BUILD"
      tabs={tabs}
      active={active}
      onTab={setActive}
      className={className}
    >
      {active === 0 && (
        <div className="flex h-full flex-col gap-3">
          <div className="overflow-x-auto rounded-lg border border-edge-soft bg-base-950/80 p-3 font-mono text-[11px] leading-[1.7]">
            <div className="text-ink-faint">$ forge build --target Card.tsx</div>
            <div className="text-success-400">✓ workspace resolved</div>
            <div className="text-success-400">✓ parsed 4 source files in 42ms</div>
            <div className="text-success-400">✓ transformed JSX · 3 elements</div>
            <div className="text-success-400">✓ CSS module linked</div>
            <div className="text-warn-400">! warning: unused import 'useEffect' at Card.tsx:3</div>
            <div className="text-warn-400">! warning: source map not generated</div>
            <div className="text-ink-muted">→ bundle 2.4 KB</div>
            <div className="text-ink-muted">→ gzip 0.9 KB</div>
            <div className="text-ink-muted">→ target es2022</div>
          </div>
          {/* build progress timeline */}
          <div className="rounded-lg border border-edge-soft bg-base-950/60 p-3">
            <div className="mb-2 flex items-center gap-1.5 font-mono text-[9.5px] text-ink-faint">
              <Activity className="h-3 w-3 text-violet-300" /> build pipeline
            </div>
            <div className="flex items-center gap-1">
              {['resolve', 'parse', 'transform', 'bundle', 'emit'].map((s, i) => (
                <div key={s} className="flex flex-1 items-center gap-1">
                  <div className="flex flex-col items-center gap-1">
                    <span
                      className={`h-1.5 w-full rounded-full ${i < 4 ? 'bg-success-500' : 'bg-violet-400'}`}
                    />
                    <span className="font-mono text-[8.5px] text-ink-faint">{s}</span>
                  </div>
                  {i < 4 && <span className="mx-0.5 h-px w-2 bg-edge" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {active === 1 && (
        <div className="overflow-x-auto rounded-lg border border-edge-soft bg-base-950/80 p-3 font-mono text-[11px] leading-[1.7]">
          <div className="flex"><span className="w-6 pr-2 text-right text-ink-faint/60">1</span><span className="text-ink-muted">import {`{ useEffect }`} from 'react';</span></div>
          <div className="flex bg-warn-500/10"><span className="w-6 border-l-2 border-warn-400 pr-2 text-right text-warn-400/70">2</span><span className="text-warn-400">{`  // unused — remove`}</span></div>
          <div className="flex"><span className="w-6 pr-2 text-right text-ink-faint/60">3</span><span className="text-ink-muted">import {`{ cn }`} from '@/lib/cn';</span></div>
          <div className="flex"><span className="w-6 pr-2 text-right text-ink-faint/60">4</span><span className="text-ink-muted">export function Card() {`{`}</span></div>
        </div>
      )}
      {active === 2 && (
        <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
          {[
            ['Modules', '4', 'ok'],
            ['Warnings', '2', 'warn'],
            ['Errors', '0', 'ok'],
            ['Duration', '42ms', 'muted'],
          ].map(([k, v, t]) => (
            <div key={k} className="rounded-md border border-edge-soft bg-base-950/60 p-2">
              <div className="text-[9.5px] text-ink-faint">{k}</div>
              <div className={t === 'warn' ? 'text-warn-400' : t === 'ok' ? 'text-success-400' : 'text-ink'}>{v}</div>
            </div>
          ))}
        </div>
      )}
      <MetaRow>
        <Chip tone="ok">compiled</Chip>
        <Chip tone="warn">2 warnings</Chip>
        <Chip tone="muted">4 modules</Chip>
        <span className="ml-auto inline-flex items-center gap-1"><Clock className="h-3 w-3" />42ms</span>
      </MetaRow>
    </PanelShell>
  );
}

/* ---------- TypeScript ---------- */

function TypeScriptPanel({ className = '' }: { className?: string }) {
  const { tabs, active, setActive } = useTabs([
    { id: 'source', label: 'Source' },
    { id: 'diag', label: 'Diagnostic' },
    { id: 'trace', label: 'Trace' },
  ]);
  return (
    <PanelShell
      icon={Braces}
      title="TypeScript"
      tag="02 · TYPES"
      tabs={tabs}
      active={active}
      onTab={setActive}
      className={className}
    >
      {active === 0 && (
        <div className="overflow-x-auto rounded-lg border border-edge-soft bg-base-950/80 p-3 font-mono text-[11px] leading-[1.7]">
          <div className="flex"><span className="w-6 pr-2 text-right text-ink-faint/60">17</span><span className="text-ink-muted">type CardProps = {`{`}</span></div>
          <div className="flex"><span className="w-6 pr-2 text-right text-ink-faint/60">18</span><span className="text-ink-muted">{`  title?: string;`}</span></div>
          <div className="flex"><span className="w-6 pr-2 text-right text-ink-faint/60">19</span><span className="text-ink-muted">{`}`}</span></div>
          <div className="flex"><span className="w-6 pr-2 text-right text-ink-faint/60">21</span><span className="text-ink-muted">const label = props.title;</span></div>
          <div className="flex bg-critical-500/10 ring-1 ring-inset ring-critical-500/20"><span className="w-6 border-l-2 border-critical-400 pr-2 text-right text-critical-400/70">22</span><span className="text-critical-400">{'  ^? string | undefined'}</span></div>
          <div className="flex"><span className="w-6 pr-2 text-right text-ink-faint/60">23</span><span className="text-ink-muted">return {`<h1>{label}</h1>`};</span></div>
        </div>
      )}
      {active === 1 && (
        <div className="space-y-2.5">
          <div className="rounded-md bg-critical-500/10 p-2.5 ring-1 ring-inset ring-critical-500/30">
            <div className="flex items-center gap-2">
              <XCircle className="h-3.5 w-3.5 text-critical-400" />
              <span className="font-mono text-[10px] text-critical-400">TS2322</span>
            </div>
            <div className="mt-1.5 text-[11.5px] leading-snug text-ink">
              Type 'string | undefined' is not assignable to type 'ReactNode'.
            </div>
            <div className="mt-1.5 font-mono text-[9.5px] text-ink-faint">
              <FileCode2 className="mr-1 inline h-3 w-3" />Card.tsx · line 23 · column 15
            </div>
          </div>
          <div className="rounded-md border border-edge-soft bg-base-950/60 p-2.5">
            <div className="mb-1 font-mono text-[9.5px] uppercase text-ink-faint">possible resolution</div>
            <div className="text-[11px] leading-snug text-ink-muted">
              Provide a default value or guard against undefined.
            </div>
          </div>
        </div>
      )}
      {active === 2 && (
        <div className="space-y-1.5 font-mono text-[10.5px]">
          {['props.title', '→ string | undefined', '→ assigned to ReactNode', '→ error TS2322'].map((l, i) => (
            <div key={l} className="flex items-center gap-2 rounded px-1.5 py-1 t-200 hover:bg-surface-800/50">
              <span className="text-ink-faint">t{i}</span>
              <span className={i === 3 ? 'text-critical-400' : 'text-ink-muted'}>{l}</span>
            </div>
          ))}
        </div>
      )}
      <MetaRow>
        <Chip tone="err">TS2322</Chip>
        <Chip tone="err">1 error</Chip>
        <Chip tone="muted">strict mode</Chip>
        <Chip tone="muted">React 19</Chip>
      </MetaRow>
    </PanelShell>
  );
}

/* ---------- Dependencies ---------- */

function DependenciesPanel({ className = '' }: { className?: string }) {
  const { tabs, active, setActive } = useTabs([
    { id: 'graph', label: 'Graph' },
    { id: 'versions', label: 'Versions' },
    { id: 'summary', label: 'Summary' },
  ]);
  const deps = [
    { name: 'react', req: '^19.0.0', inst: '19.2.3', state: 'ok' as const },
    { name: 'lucide-react', req: '^0.340', inst: '0.344', state: 'ok' as const },
    { name: 'clsx', req: '^2.0', inst: '2.1.1', state: 'ok' as const },
    { name: 'swr', req: '^2.2', inst: '2.2.0', state: 'warn' as const },
  ];
  return (
    <PanelShell
      icon={Package}
      title="Dependencies"
      tag="03 · GRAPH"
      tabs={tabs}
      active={active}
      onTab={setActive}
      className={className}
    >
      {active === 0 && (
        <div className="flex flex-col items-center gap-2 py-1 font-mono text-[10.5px]">
          <div className="rounded-lg border border-violet-400/40 bg-violet-500/10 px-3 py-1.5 text-violet-200 shadow-[0_0_18px_-4px_rgba(124,77,255,0.5)]">
            Card.tsx
          </div>
          <div className="h-3 w-px bg-edge" />
          <div className="grid w-full grid-cols-2 gap-1.5">
            {deps.map((d) => (
              <div
                key={d.name}
                className={`rounded-md border px-2 py-1 t-200 hover:scale-[1.03] ${
                  d.state === 'ok'
                    ? 'border-success-500/30 bg-success-500/5 text-success-400'
                    : 'border-warn-500/30 bg-warn-500/5 text-warn-400'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="truncate">{d.name}</span>
                  <span className="ml-auto text-[9px]">{d.state === 'ok' ? '✓' : '△'}</span>
                </div>
                <div className="text-[8.5px] text-ink-faint">{d.inst}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {active === 1 && (
        <div className="space-y-1.5 font-mono text-[10px]">
          {deps.map((d) => (
            <div key={d.name} className="rounded-md border border-edge-soft bg-base-950/60 p-2 t-200 hover:border-edge">
              <div className="flex items-center justify-between">
                <span className={d.state === 'ok' ? 'text-success-400' : 'text-warn-400'}>{d.name}</span>
                <span className="text-ink-faint">{d.inst}</span>
              </div>
              <div className="text-[9px] text-ink-faint">required {d.req}</div>
            </div>
          ))}
        </div>
      )}
      {active === 2 && (
        <div className="grid grid-cols-2 gap-2 font-mono text-[10.5px]">
          {[['4 deps', 'muted'], ['3 ok', 'ok'], ['1 review', 'warn'], ['0 missing', 'ok']].map(([k, t]) => (
            <div key={k} className="rounded-md border border-edge-soft bg-base-950/60 p-2">
              <span className={t === 'warn' ? 'text-warn-400' : t === 'ok' ? 'text-success-400' : 'text-ink'}>{k}</span>
            </div>
          ))}
        </div>
      )}
      <MetaRow>
        <GitBranch className="h-3 w-3 text-violet-300" />
        <Chip tone="ok">3 compatible</Chip>
        <Chip tone="warn">1 review</Chip>
        <span className="ml-auto">0 missing</span>
      </MetaRow>
    </PanelShell>
  );
}

/* ---------- Accessibility ---------- */

function AccessibilityPanel({ className = '' }: { className?: string }) {
  const { tabs, active, setActive } = useTabs([
    { id: 'findings', label: 'Findings' },
    { id: 'dom', label: 'DOM' },
    { id: 'wcag', label: 'WCAG' },
  ]);
  const findings = [
    { sev: 'err', wcag: 'WCAG 4.1.2', title: 'IconButton has no accessible name', loc: 'Card.tsx · L42', fix: 'Add aria-label or visible text.' },
    { sev: 'warn', wcag: 'WCAG 1.4.3', title: 'Contrast 3.2:1 below AA threshold', loc: 'styles.css · L8', fix: 'Increase foreground contrast to 4.5:1.' },
    { sev: 'warn', wcag: 'WCAG 2.4.7', title: 'Focus indicator is not visible', loc: 'Card.tsx · L31', fix: 'Add a visible focus ring.' },
  ];
  return (
    <PanelShell
      icon={Accessibility}
      title="Accessibility"
      tag="04 · A11Y"
      tabs={tabs}
      active={active}
      onTab={setActive}
      className={className}
    >
      {active === 0 && (
        <div className="space-y-2">
          {findings.map((f) => {
            const Icon = f.sev === 'err' ? XCircle : AlertTriangle;
            const isErr = f.sev === 'err';
            return (
              <div
                key={f.wcag}
                className={`rounded-md p-2.5 ring-1 ring-inset t-200 ${
                  isErr
                    ? 'bg-critical-500/10 ring-critical-500/30 hover:bg-critical-500/15'
                    : 'bg-warn-500/10 ring-warn-500/30 hover:bg-warn-500/15'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-3.5 w-3.5 ${isErr ? 'text-critical-400' : 'text-warn-400'}`} />
                  <span className={`font-mono text-[9.5px] uppercase ${isErr ? 'text-critical-400' : 'text-warn-400'}`}>
                    {f.wcag}
                  </span>
                  <span
                    className={`ml-auto rounded px-1.5 py-0.5 font-mono text-[8.5px] uppercase ${
                      isErr ? 'bg-critical-500/15 text-critical-400' : 'bg-warn-500/15 text-warn-400'
                    }`}
                  >
                    {isErr ? 'critical' : 'warning'}
                  </span>
                </div>
                <div className="mt-1.5 text-[11.5px] text-ink">{f.title}</div>
                <div className="mt-1 flex items-center justify-between font-mono text-[9.5px] text-ink-faint">
                  <span>{f.loc}</span>
                </div>
                <div className="mt-1 text-[10.5px] text-ink-muted">→ {f.fix}</div>
              </div>
            );
          })}
        </div>
      )}
      {active === 1 && (
        <div className="overflow-x-auto rounded-lg border border-edge-soft bg-base-950/80 p-3 font-mono text-[10.5px] leading-relaxed">
          <div className="text-ink-faint">{`<button class="icon-btn">`}</div>
          <div className="text-critical-400 pl-2">{`  <svg aria-hidden="true" />`}</div>
          <div className="text-warn-400 pl-2">{`  <!-- missing aria-label -->`}</div>
          <div className="text-ink-faint">{`</button>`}</div>
        </div>
      )}
      {active === 2 && (
        <div className="grid grid-cols-2 gap-2 font-mono text-[10.5px] sm:grid-cols-4">
          {[['Critical', '1', 'err'], ['Warnings', '2', 'warn'], ['Passed', '14', 'ok'], ['Coverage', '82%', 'muted']].map(([k, v, t]) => (
            <div key={k} className="rounded-md border border-edge-soft bg-base-950/60 p-2">
              <div className="text-[9px] text-ink-faint">{k}</div>
              <div className={t === 'err' ? 'text-critical-400' : t === 'warn' ? 'text-warn-400' : t === 'ok' ? 'text-success-400' : 'text-ink'}>{v}</div>
            </div>
          ))}
        </div>
      )}
      <MetaRow>
        <Chip tone="err">1 critical</Chip>
        <Chip tone="warn">2 warnings</Chip>
        <Chip tone="ok">14 passed</Chip>
        <span className="ml-auto">coverage 82%</span>
      </MetaRow>
    </PanelShell>
  );
}

/* ---------- Code Quality ---------- */

function QualityPanel({ className = '' }: { className?: string }) {
  const { tabs, active, setActive } = useTabs([
    { id: 'rules', label: 'Rules' },
    { id: 'complexity', label: 'Complexity' },
    { id: 'metrics', label: 'Metrics' },
  ]);
  const rules = [
    { rule: 'no-unused-vars', state: 'warn' as const },
    { rule: 'react-hooks/exhaustive-deps', state: 'fail' as const },
    { rule: 'jsx-a11y/aria-props', state: 'pass' as const },
    { rule: 'max-depth', state: 'pass' as const },
    { rule: 'prefer-const', state: 'warn' as const },
    { rule: 'no-console', state: 'pass' as const },
  ];
  const metrics = [
    { label: 'Cyclomatic complexity', val: '5 / 7', tone: 'warn' as const },
    { label: 'Cognitive complexity', val: '7 / 10', tone: 'warn' as const },
    { label: 'Component depth', val: '3 / 5', tone: 'ok' as const },
    { label: 'Estimated re-renders', val: '2', tone: 'muted' as const },
  ];
  return (
    <PanelShell
      icon={Gauge}
      title="Code Quality"
      tag="05 · RULES"
      tabs={tabs}
      active={active}
      onTab={setActive}
      className={className}
    >
      {active === 0 && (
        <div className="space-y-1.5">
          {rules.map((r) => {
            const Icon = r.state === 'pass' ? CheckCircle2 : r.state === 'warn' ? AlertTriangle : XCircle;
            const color = r.state === 'pass' ? 'text-success-400' : r.state === 'warn' ? 'text-warn-400' : 'text-critical-400';
            return (
              <div key={r.rule} className="flex items-center gap-2 rounded-md px-1.5 py-1 t-200 hover:bg-surface-800/50">
                <Icon className={`h-3.5 w-3.5 ${color}`} />
                <span className="font-mono text-[10.5px] text-ink-muted">{r.rule}</span>
                <span className={`ml-auto font-mono text-[9px] uppercase ${color}`}>{r.state === 'fail' ? 'failed' : r.state}</span>
              </div>
            );
          })}
        </div>
      )}
      {active === 1 && (
        <div className="space-y-2.5">
          {metrics.map((m) => (
            <div key={m.label}>
              <div className="mb-1 flex items-center justify-between font-mono text-[10px]">
                <span className="text-ink-faint">{m.label}</span>
                <span className={m.tone === 'warn' ? 'text-warn-400' : m.tone === 'ok' ? 'text-success-400' : 'text-ink'}>{m.val}</span>
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 7 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-sm ${
                      i < (m.tone === 'warn' ? 5 : 3) ? (m.tone === 'warn' ? 'bg-warn-500' : 'bg-success-500') : 'bg-surface-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      {active === 2 && (
        <div className="grid grid-cols-2 gap-2 font-mono text-[10.5px]">
          {[['2 warnings', 'warn'], ['1 failed', 'err'], ['3 passed', 'ok'], ['Score 74/100', 'muted']].map(([k, t]) => (
            <div key={k} className="rounded-md border border-edge-soft bg-base-950/60 p-2">
              <span className={t === 'err' ? 'text-critical-400' : t === 'warn' ? 'text-warn-400' : t === 'ok' ? 'text-success-400' : 'text-ink'}>{k}</span>
            </div>
          ))}
        </div>
      )}
      <MetaRow>
        <Chip tone="warn">2 warnings</Chip>
        <Chip tone="err">1 failed</Chip>
        <Chip tone="ok">3 passed</Chip>
        <span className="ml-auto">score 74/100</span>
      </MetaRow>
    </PanelShell>
  );
}

/* ---------- Responsive Layout (tall) ---------- */

function ResponsivePanel({ className = '' }: { className?: string }) {
  const { tabs, active, setActive } = useTabs([
    { id: 'preview', label: 'Preview' },
    { id: 'issues', label: 'Issues' },
    { id: 'measure', label: 'Measurements' },
  ]);
  const frames = [
    { icon: Smartphone, w: 390, state: 'warn' as const, note: 'overflows by 18px' },
    { icon: Tablet, w: 768, state: 'ok' as const, note: 'no layout shift' },
    { icon: Monitor, w: 1024, state: 'ok' as const, note: 'stable layout' },
    { icon: Monitor, w: 1440, state: 'ok' as const, note: 'max width preserved' },
  ];
  return (
    <PanelShell
      icon={Monitor}
      title="Responsive Layout"
      tag="06 · VIEWPORTS"
      tabs={tabs}
      active={active}
      onTab={setActive}
      className={className}
    >
      {active === 0 && (
        <div className="flex h-full flex-col gap-2.5">
          {frames.map((f) => (
            <div
              key={f.w}
              className={`rounded-md border p-2 t-200 hover:-translate-y-0.5 ${
                f.state === 'ok'
                  ? 'border-edge-soft bg-base-950/60 hover:border-success-500/40'
                  : 'border-warn-500/30 bg-warn-500/5 hover:border-warn-500/50'
              }`}
            >
              <div className="mb-1.5 flex items-center gap-1.5">
                <f.icon className={`h-3 w-3 ${f.state === 'ok' ? 'text-violet-300' : 'text-warn-400'}`} />
                <span className="font-mono text-[9.5px] text-ink-faint">{f.w}px</span>
                <span className={`ml-auto font-mono text-[8.5px] ${f.state === 'ok' ? 'text-success-400' : 'text-warn-400'}`}>
                  {f.state === 'ok' ? 'passed' : 'review'}
                </span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-3/4 rounded bg-surface-700" />
                <div className="h-1.5 w-full rounded bg-surface-700" />
                <div className="h-1.5 w-1/2 rounded bg-surface-700" />
                <div className={`mt-0.5 h-2.5 w-10 rounded ${f.state === 'warn' ? 'bg-warn-500/40' : 'bg-violet-500/30'}`} />
              </div>
              <div className="mt-1.5 font-mono text-[8.5px] text-ink-faint">{f.note}</div>
            </div>
          ))}
        </div>
      )}
      {active === 1 && (
        <div className="space-y-2">
          <div className="rounded-md border border-warn-500/25 bg-warn-500/5 p-2.5">
            <div className="flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3 text-warn-400" />
              <span className="text-[10.5px] text-ink">Layout shift detected below 420px</span>
            </div>
            <div className="mt-1 font-mono text-[9.5px] text-ink-faint">Button group overflows container</div>
          </div>
          <div className="rounded-md border border-edge-soft bg-base-950/60 p-2.5">
            <div className="mb-1 font-mono text-[9px] uppercase text-ink-faint">suggested repair</div>
            <div className="text-[10.5px] leading-snug text-ink-muted">
              Stack actions vertically and reduce horizontal padding.
            </div>
          </div>
        </div>
      )}
      {active === 2 && (
        <div className="space-y-1.5 font-mono text-[10px]">
          {[
            ['390px', 'overflow -18px', 'warn'],
            ['768px', 'no shift', 'ok'],
            ['1024px', 'stable', 'ok'],
            ['1440px', 'max width', 'ok'],
          ].map(([w, n, t]) => (
            <div key={w} className="flex items-center justify-between rounded-md border border-edge-soft bg-base-950/60 px-2 py-1.5 t-200 hover:bg-surface-800/50">
              <span className="text-ink-faint">{w}</span>
              <span className={t === 'warn' ? 'text-warn-400' : 'text-success-400'}>{n}</span>
            </div>
          ))}
          <div className="flex items-center gap-1.5 pt-1 text-ink-faint">
            <Layers className="h-3 w-3" /> CLS estimate: 0.12
          </div>
        </div>
      )}
      <MetaRow>
        <Chip tone="ok">3 passed</Chip>
        <Chip tone="warn">1 review</Chip>
        <span className="ml-auto">CLS 0.12</span>
      </MetaRow>
    </PanelShell>
  );
}
