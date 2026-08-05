import { Button } from '@/components/ui/Button';
import { HeroAnalysisPanel } from '@/components/hero/HeroAnalysisPanel';
import { ArrowRight, FlaskConical, FileSearch, GitBranch, Lock, Gauge } from 'lucide-react';

const trust = [
  { icon: GitBranch, label: 'Works on pasted JSX — no repo required' },
  { icon: Lock, label: 'Runs in an isolated container, never your runtime' },
  { icon: Gauge, label: 'Type, a11y & dependency checks in one pass' },
];

const capabilities = [
  'Compilation',
  'TypeScript',
  'Dependencies',
  'Accessibility',
  'Code Quality',
  'Responsive Layout',
];

export function Hero() {
  return (
    <section className="atmosphere-hero px-6 pt-10 pb-8">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-8">
          {/* Left — copy */}
          <div className="flex flex-col justify-center pt-2">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-edge bg-surface-900/50 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse-soft" />
              <span className="font-mono text-[11px] text-ink-muted">v2.4 · isolated analysis runtime</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl xl:text-[3.4rem]">
              Find what breaks
              <br />
              before your users do.
            </h1>

            <p className="mt-5 max-w-[460px] text-[15px] leading-relaxed text-ink-muted">
              CoreNex Forge compiles, type-checks and audits your React components
              in an isolated container — then proposes reviewed repairs you approve
              line by line.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button variant="primary" className="px-4 py-2.5">
                <FlaskConical className="h-4 w-4" />
                Analyse a Component
              </Button>
              <Button variant="outline" className="px-4 py-2.5">
                <FileSearch className="h-4 w-4" />
                Explore a Sample Analysis
                <ArrowRight className="h-4 w-4 opacity-60" />
              </Button>
            </div>

            <ul className="mt-8 space-y-2.5">
              {trust.map((t) => (
                <li key={t.label} className="flex items-center gap-2.5 text-[13px] text-ink-muted">
                  <t.icon className="h-4 w-4 text-violet-300" />
                  {t.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right — analysis interface */}
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-2xl bg-violet-500/[0.06] blur-3xl" />
            <div className="panel-depth-wrapper">
              <HeroAnalysisPanel />
            </div>
          </div>
        </div>

        {/* Capability strip */}
        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-edge-soft pt-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint">
            One pass, six checks
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {capabilities.map((c, i) => (
              <span key={c} className="flex items-center gap-2 text-[13px] text-ink-muted">
                <span className="h-1 w-1 rounded-full bg-violet-400/70" />
                {c}
                {i < capabilities.length - 1 && (
                  <span className="ml-3 text-edge-strong">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
