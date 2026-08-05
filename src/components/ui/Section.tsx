import type { ReactNode } from 'react';

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-violet-300">
      <span className="h-1 w-1 rounded-full bg-violet-400" />
      {children}
    </span>
  );
}

export function SectionHeading({
  label,
  title,
  className = '',
}: {
  label?: string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      {label && <SectionLabel>{label}</SectionLabel>}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
