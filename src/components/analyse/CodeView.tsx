import { useMemo } from 'react';
import type { Sev } from './analyseData';

type Token = { t: string; c?: string };

const KEY = 'text-app-accent-2';
const STR = 'text-app-success';
const FN = 'text-app-accent';
const TAG = 'text-app-danger';
const ATTR = 'text-app-warning';
const PUNC = 'text-app-muted';
const COMMENT = 'text-app-faint italic';

function tokenizeLine(line: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const push = (t: string, c?: string) => t && out.push({ t, c });

  while (i < line.length) {
    const rest = line.slice(i);

    if (rest.startsWith('//')) {
      push(rest, COMMENT);
      break;
    }
    const strM = rest.match(/^(['"`])(?:\\.|(?!\1).)*\1/);
    if (strM) {
      push(strM[0], STR);
      i += strM[0].length;
      continue;
    }
    const kwM = rest.match(/^(import|from|export|function|return|const|type|let|var|if|else|for|while|new|class|extends|interface|as|in|of|typeof|void|null|undefined|true|false)\b/);
    if (kwM) {
      push(kwM[0], KEY);
      i += kwM[0].length;
      continue;
    }
    const tagM = rest.match(/^(<\/?[A-Z][A-Za-z0-9]*)/);
    if (tagM) {
      push(tagM[0], TAG);
      i += tagM[0].length;
      continue;
    }
    if (rest.startsWith('/>')) {
      push('/>', TAG);
      i += 2;
      continue;
    }
    if (rest.startsWith('>')) {
      push('>', TAG);
      i += 1;
      continue;
    }
    const attrM = rest.match(/^([a-zA-Z][a-zA-Z0-9-]*)(?==)/);
    if (attrM) {
      push(attrM[0], ATTR);
      i += attrM[0].length;
      continue;
    }
    const fnM = rest.match(/^([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/);
    if (fnM) {
      push(fnM[1], FN);
      i += fnM[1].length;
      continue;
    }
    const idM = rest.match(/^[a-zA-Z_$][a-zA-Z0-9_$]*/);
    if (idM) {
      push(idM[0]);
      i += idM[0].length;
      continue;
    }
    const numM = rest.match(/^\d+(\.\d+)?/);
    if (numM) {
      push(numM[0], ATTR);
      i += numM[0].length;
      continue;
    }
    const pM = rest.match(/^[(){}\[\];:,.=+\-*/%<>!&|?]+/);
    if (pM) {
      push(pM[0], PUNC);
      i += pM[0].length;
      continue;
    }
    const wM = rest.match(/^\s+/);
    if (wM) {
      push(wM[0]);
      i += wM[0].length;
      continue;
    }
    push(rest[0]);
    i += 1;
  }
  return out;
}

export function CodeView({
  code,
  markers = [],
  activeLine,
  onLineClick,
}: {
  code: string;
  markers?: { line: number; sev: Sev }[];
  activeLine?: number;
  onLineClick?: (line: number) => void;
}) {
  const lines = useMemo(() => code.split('\n'), [code]);
  const markerMap = useMemo(() => {
    const m = new Map<number, Sev>();
    markers.forEach((mk) => m.set(mk.line, mk.sev));
    return m;
  }, [markers]);

  return (
    <div className="font-mono text-[12px] leading-[1.65]">
      {lines.map((line, idx) => {
        const n = idx + 1;
        const sev = markerMap.get(n);
        const isActive = activeLine === n;
        return (
          <div
            key={n}
            onClick={() => onLineClick?.(n)}
            className={`group flex cursor-pointer ${
              isActive
                ? 'bg-app-accent/12'
                : sev === 'critical'
                ? 'bg-app-danger/10'
                : sev === 'warning'
                ? 'bg-app-warning/10'
                : ''
            }`}
          >
            <span className="w-9 shrink-0 select-none pr-3 text-right text-app-faint/60 group-hover:text-app-muted">
              {n}
            </span>
            <span className="w-4 shrink-0 select-none text-center">
              {sev === 'critical' && <span className="text-app-danger">●</span>}
              {sev === 'warning' && <span className="text-app-warning">▲</span>}
              {sev === 'passed' && <span className="text-app-success">✓</span>}
            </span>
            <span className="whitespace-pre">
              {tokenizeLine(line).map((tk, i) => (
                <span key={i} className={tk.c}>{tk.t}</span>
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}
