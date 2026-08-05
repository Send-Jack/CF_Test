import type { ReactNode } from 'react';

type Token = { t: string; c?: string };

export function CodeLine({ children }: { children?: ReactNode }) {
  return <span className="table-row">{children}</span>;
}

export function LineNo({ n, w = 2 }: { n: number; w?: number }) {
  return (
    <span className="table-cell select-none pr-4 text-right text-ink-faint/70" style={{ minWidth: `${w}ch` }}>
      {n}
    </span>
  );
}

export function Tok({ t, c }: Token) {
  return c ? <span className={c}>{t}</span> : <span>{t}</span>;
}

export function CodeBlock({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`font-mono text-[12.5px] leading-[1.65] ${className}`}>
      <div className="table">{children}</div>
    </div>
  );
}
