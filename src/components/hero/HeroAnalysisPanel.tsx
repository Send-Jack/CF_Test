import {
  FileCode2,
  FileType2,
  Braces,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Wrench,
  FileText,
  ChevronRight,
} from 'lucide-react';

const files = [
  { name: 'Card.tsx', icon: FileCode2, active: true },
  { name: 'styles.css', icon: FileType2 },
  { name: 'package.json', icon: Braces },
];

const findings = [
  {
    sev: 'critical',
    icon: ShieldAlert,
    title: 'Missing aria-label on IconButton',
    line: 'L42',
    color: 'text-critical-400',
    dot: 'bg-critical-500',
    ring: 'ring-critical-500/30',
  },
  {
    sev: 'warning',
    icon: AlertTriangle,
    title: 'Type mismatch: string | undefined',
    line: 'L18',
    color: 'text-warn-400',
    dot: 'bg-warn-500',
    ring: 'ring-warn-500/30',
  },
  {
    sev: 'ok',
    icon: CheckCircle2,
    title: 'Dependency versions compatible',
    line: 'pkg',
    color: 'text-success-400',
    dot: 'bg-success-500',
    ring: 'ring-success-500/30',
  },
];

const codeLines: { n: number; tokens: { t: string; c?: string }[]; mark?: 'add' | 'del' }[] = [
  { n: 1, tokens: [{ t: 'import', c: 'tok-key' }, { t: ' { ', c: 'tok-punc' }, { t: 'useState', c: 'tok-fn' }, { t: ' } ', c: 'tok-punc' }, { t: 'from', c: 'tok-key' }, { t: " 'react'", c: 'tok-str' }] },
  { n: 2, tokens: [{ t: 'import', c: 'tok-key' }, { t: ' { ', c: 'tok-punc' }, { t: 'CheckCircle2', c: 'tok-fn' }, { t: ' } ', c: 'tok-punc' }, { t: 'from', c: 'tok-key' }, { t: " 'lucide-react'", c: 'tok-str' }] },
  { n: 3, tokens: [] },
  { n: 4, tokens: [{ t: 'type', c: 'tok-key' }, { t: ' ', c: 'tok-punc' }, { t: 'CardProps', c: 'tok-fn' }, { t: ' = {', c: 'tok-punc' }] },
  { n: 5, tokens: [{ t: '  title', c: 'tok-attr' }, { t: ': ', c: 'tok-punc' }, { t: 'string', c: 'tok-key' }, { t: ';', c: 'tok-punc' }] },
  { n: 6, tokens: [{ t: '  count', c: 'tok-attr' }, { t: '?: ', c: 'tok-punc' }, { t: 'number', c: 'tok-key' }, { t: ';', c: 'tok-punc' }] },
  { n: 7, tokens: [{ t: '};', c: 'tok-punc' }] },
  { n: 8, tokens: [] },
  { n: 9, tokens: [{ t: 'export', c: 'tok-key' }, { t: ' ', c: 'tok-punc' }, { t: 'function', c: 'tok-key' }, { t: ' ', c: 'tok-punc' }, { t: 'Card', c: 'tok-fn' }, { t: '({ title, count }: ', c: 'tok-punc' }, { t: 'CardProps', c: 'tok-fn' }, { t: ') {', c: 'tok-punc' }] },
  { n: 10, tokens: [{ t: '  return', c: 'tok-key' }, { t: ' (', c: 'tok-punc' }] },
  { n: 11, tokens: [{ t: '    <article', c: 'tok-tag' }, { t: ' ', c: 'tok-punc' }, { t: 'className', c: 'tok-attr' }, { t: '=', c: 'tok-punc' }, { t: '"card"', c: 'tok-str' }, { t: '>', c: 'tok-tag' }], mark: 'del' },
  { n: 12, tokens: [{ t: '      <button', c: 'tok-tag' }, { t: ' ', c: 'tok-punc' }, { t: 'onClick', c: 'tok-attr' }, { t: '=', c: 'tok-punc' }, { t: '{toggle}', c: 'tok-punc' }, { t: '>', c: 'tok-tag' }], mark: 'del' },
  { n: 13, tokens: [{ t: '        <CheckCircle2 />', c: 'tok-tag' }], mark: 'del' },
  { n: 14, tokens: [{ t: '      </button>', c: 'tok-tag' }], mark: 'del' },
  { n: 15, tokens: [{ t: '      <button', c: 'tok-tag' }, { t: ' ', c: 'tok-punc' }, { t: 'aria-label', c: 'tok-attr' }, { t: '=', c: 'tok-punc' }, { t: '"Toggle"', c: 'tok-str' }, { t: ' ', c: 'tok-punc' }, { t: 'onClick', c: 'tok-attr' }, { t: '=', c: 'tok-punc' }, { t: '{toggle}', c: 'tok-punc' }, { t: '>', c: 'tok-tag' }], mark: 'add' },
  { n: 16, tokens: [{ t: '        <CheckCircle2 />', c: 'tok-tag' }], mark: 'add' },
  { n: 17, tokens: [{ t: '      </button>', c: 'tok-tag' }], mark: 'add' },
  { n: 18, tokens: [{ t: '    </article>', c: 'tok-tag' }] },
  { n: 19, tokens: [{ t: '  );', c: 'tok-punc' }] },
  { n: 20, tokens: [{ t: '}', c: 'tok-punc' }] },
];

export function HeroAnalysisPanel() {
  return (
    <div className="panel-depth overflow-hidden rounded-xl border border-edge bg-surface-900/80 backdrop-blur-sm">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-edge-soft px-3.5 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/70" />
        </div>
        <span className="font-mono text-[11px] text-ink-faint">forge · analysis / Card.tsx</span>
        <span className="font-mono text-[11px] text-success-400">● ready</span>
      </div>

      <div className="grid grid-cols-[180px_1fr]">
        {/* File nav */}
        <aside className="border-r border-edge-soft bg-base-950/40 py-2.5">
          <div className="px-3 pb-2 font-mono text-[10px] uppercase tracking-wider text-ink-faint">Files</div>
          {files.map((f) => (
            <button
              key={f.name}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-[12.5px] t-200 ${
                f.active
                  ? 'bg-violet-500/10 text-ink ring-1 ring-inset ring-violet-400/30'
                  : 'text-ink-muted hover:bg-surface-700/40 hover:text-ink'
              }`}
            >
              <f.icon className={`h-3.5 w-3.5 ${f.active ? 'text-violet-300' : 'text-ink-faint'}`} />
              <span className="font-mono">{f.name}</span>
            </button>
          ))}
          <div className="mt-3 px-3 pb-1 font-mono text-[10px] uppercase tracking-wider text-ink-faint">Props</div>
          <div className="px-3 py-1 font-mono text-[11px] leading-relaxed text-ink-muted">
            <div>title: <span className="text-success-400">"Release"</span></div>
            <div>count: <span className="text-warn-400">3</span></div>
          </div>
        </aside>

        {/* Code + findings */}
        <div className="min-w-0">
          {/* Readiness bar */}
          <div className="flex items-center justify-between border-b border-edge-soft px-3.5 py-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-ink-faint">Readiness</span>
              <div className="h-1.5 w-28 overflow-hidden rounded-full bg-surface-700">
                <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-warn-500 to-success-500" />
              </div>
            </div>
            <span className="font-mono text-[12px] font-semibold text-success-400">78 / 100</span>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-edge-soft px-2 py-1.5">
            {['Code', 'Findings', 'Props'].map((t, i) => (
              <button
                key={t}
                className={`rounded px-2.5 py-1 font-mono text-[11px] t-200 ${
                  i === 0 ? 'bg-surface-700 text-ink' : 'text-ink-faint hover:text-ink-muted'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Code */}
          <div className="max-h-[260px] overflow-y-auto scroll-thin px-3.5 py-2.5">
            <div className="font-mono text-[12px] leading-[1.6]">
              {codeLines.map((l) => (
                <div
                  key={l.n}
                  className={`flex ${l.mark === 'add' ? 'tok-add' : l.mark === 'del' ? 'tok-del' : ''}`}
                >
                  <span className="w-7 shrink-0 select-none pr-3 text-right text-ink-faint/60">{l.n}</span>
                  <span className="whitespace-pre">
                    {l.tokens.map((tk, i) => (
                      <span key={i} className={tk.c}>{tk.t}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Findings */}
          <div className="border-t border-edge-soft px-3.5 py-2.5">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">Findings · 3</span>
              <div className="flex items-center gap-1.5">
                {['critical', 'warning', 'ok'].map((s) => (
                  <span
                    key={s}
                    className={`rounded-full px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${
                      s === 'critical' ? 'bg-critical-500/15 text-critical-400' : s === 'warning' ? 'bg-warn-500/15 text-warn-400' : 'bg-success-500/15 text-success-400'
                    }`}
                  >
                    {s === 'ok' ? 'ok' : s}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              {findings.map((f) => (
                <div
                  key={f.title}
                  className={`flex items-center gap-2.5 rounded-md bg-surface-800/60 px-2.5 py-1.5 ring-1 ring-inset ${f.ring}`}
                >
                  <f.icon className={`h-3.5 w-3.5 ${f.color}`} />
                  <span className="flex-1 truncate text-[12px] text-ink">{f.title}</span>
                  <span className="font-mono text-[10px] text-ink-faint">{f.line}</span>
                  <ChevronRight className="h-3.5 w-3.5 text-ink-faint" />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 border-t border-edge-soft px-3.5 py-2.5">
            <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md bg-violet-500 px-3 py-1.5 text-[12px] font-medium text-white t-200 hover:bg-violet-400">
              <Wrench className="h-3.5 w-3.5" /> Repair
            </button>
            <button className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-md border border-edge px-3 py-1.5 text-[12px] font-medium text-ink-muted t-200 hover:border-violet-400/50 hover:text-white">
              <FileText className="h-3.5 w-3.5" /> Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
