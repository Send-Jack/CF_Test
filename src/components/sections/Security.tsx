import {
  FileCode2,
  Container,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SectionLabel } from '@/components/ui/Section';
import { useInView } from '@/hooks/useInView';

const stages = [
  { id: 'source', title: 'Original source', sub: 'Source preserved', icon: FileCode2 },
  { id: 'isolated', title: 'Isolated analysis', sub: 'Sanitised logs', icon: Container },
  { id: 'approval', title: 'Explicit approval', sub: 'Execution limits', icon: ShieldCheck },
];

const sequence = [
  { n: '01', title: 'Submission received', desc: 'Component bundle ingested', icon: FileCode2 },
  { n: '02', title: 'Isolated container', desc: 'Sandboxed runtime spawned', icon: Container },
  { n: '03', title: 'Analysis complete', desc: 'Checks executed in isolation', icon: CheckCircle2 },
  { n: '04', title: 'Findings returned', desc: 'Sanitised report delivered', icon: ShieldCheck },
  { n: '05', title: 'Original preserved', desc: 'Source untouched until approval', icon: FileCode2 },
];

export function Security() {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);

  return (
    <section id="security" className="atmosphere-security px-6 py-24">
      <div className="mx-auto max-w-[1320px]">
        <div className="reveal mb-12 max-w-2xl">
          <SectionLabel>Controlled Analysis & Security</SectionLabel>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A controlled path from source to repair.
          </h2>
        </div>

        {/* Upper composition */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          <div className="reveal">
            <p className="text-[15px] leading-relaxed text-ink-muted">
              Every analysis runs inside a disposable container with no access to your
              runtime, environment variables or network. Logs are sanitised of source
              content, execution is time- and memory-bounded, and no repair touches the
              original file until you explicitly approve it.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                { label: 'Isolation', desc: 'Disposable container per analysis' },
                { label: 'Sanitised logs', desc: 'Source content stripped from telemetry' },
                { label: 'Execution limits', desc: 'Capped CPU, memory and wall time' },
                { label: 'Explicit approval', desc: 'No file is modified without consent' },
              ].map((r) => (
                <li key={r.label} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400" />
                  <div>
                    <div className="text-[13.5px] font-medium text-ink">{r.label}</div>
                    <div className="text-[12.5px] text-ink-faint">{r.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Three connected stages */}
          <div className="reveal" data-delay="1">
            <div className="panel-depth-soft rounded-xl border border-edge bg-surface-900/60 p-6">
              <div className="flex items-center justify-between gap-2">
                {stages.map((s, i) => (
                  <div key={s.id} className="flex flex-1 items-center">
                    <div className="flex flex-1 flex-col items-center text-center">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-violet-500/10 ring-1 ring-violet-400/30 t-300">
                        <s.icon className="h-5 w-5 text-violet-300" />
                      </span>
                      <div className="mt-2.5 text-[13px] font-medium text-ink">{s.title}</div>
                      <div className="font-mono text-[10px] text-ink-faint">{s.sub}</div>
                    </div>
                    {i < stages.length - 1 && (
                      <div className="flex shrink-0 items-center px-1">
                        <ArrowRight className="h-4 w-4 text-violet-400/60" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-2 rounded-lg bg-base-950/40 px-3 py-2">
                <span className="font-mono text-[11px] text-ink-faint">source preserved</span>
                <span className="text-edge-strong">·</span>
                <span className="font-mono text-[11px] text-ink-faint">sanitised logs</span>
                <span className="text-edge-strong">·</span>
                <span className="font-mono text-[11px] text-ink-faint">execution limits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width visual sequence with scroll animation */}
        <div ref={ref} className="reveal mt-16">
          <div className="relative">
            {/* connecting line */}
            <div className="absolute left-0 right-0 top-[28px] hidden h-px bg-edge md:block">
              <div
                className="h-full bg-gradient-to-r from-violet-500/0 via-violet-400/50 to-violet-500/0 t-500"
                style={{ transform: `scaleX(${inView ? 1 : 0})`, transformOrigin: 'left', transition: 'transform 1.4s ease' }}
              />
            </div>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
              {sequence.map((s, i) => {
                const active = inView;
                const delay = i * 0.14;
                return (
                  <div
                    key={s.n}
                    className="relative flex flex-col items-center text-center"
                    style={{
                      opacity: active ? 1 : 0.35,
                      transform: active ? 'translateY(0)' : 'translateY(8px)',
                      transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
                    }}
                  >
                    <span
                      className={`relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 bg-base-950 t-500 ${
                        active
                          ? 'border-violet-400 bg-violet-500/10'
                          : 'border-edge bg-surface-900'
                      }`}
                    >
                      <s.icon className={`h-5 w-5 t-500 ${active ? 'text-violet-300' : 'text-ink-faint'}`} />
                    </span>
                    <span className="mt-3 font-mono text-[10px] uppercase tracking-wider text-ink-faint">{s.n}</span>
                    <div className="mt-1 text-[13px] font-medium text-ink">{s.title}</div>
                    <div className="mt-0.5 text-[11.5px] leading-snug text-ink-faint">{s.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
