export type Sev = 'critical' | 'warning' | 'passed';

export type Finding = {
  id: string;
  sev: Sev;
  category: 'Accessibility' | 'TypeScript' | 'Code Quality' | 'Responsive' | 'Dependencies';
  title: string;
  detail: string;
  file: string;
  line: number;
  rule: string;
  repairId?: string;
};

export const SAMPLE_CODE = `import { useEffect, useState } from "react";

type CardProps = {
  title?: string;
};

export function Card({ title }: CardProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log(window.innerWidth);
    });
  }, []);

  return (
    <article className="card">
      <h2>{title}</h2>

      <button onClick={() => setOpen(!open)}>
        <MenuIcon />
      </button>

      {open && <div className="menu">Menu content</div>}
    </article>
  );
}`;

export const FILES = [
  { name: 'Card.tsx', size: '1.4 KB', lang: 'tsx' },
  { name: 'styles.css', size: '0.8 KB', lang: 'css' },
  { name: 'package.json', size: '1.0 KB', lang: 'json' },
];

export const FINDINGS: Finding[] = [
  {
    id: 'F-01',
    sev: 'critical',
    category: 'Accessibility',
    title: 'Missing accessible name',
    detail: 'Icon-only button has no aria-label. Screen readers will announce an empty control, failing WCAG 4.1.2 (Name, Role, Value).',
    file: 'Card.tsx',
    line: 18,
    rule: 'WCAG 4.1.2',
    repairId: 'R-01',
  },
  {
    id: 'F-02',
    sev: 'warning',
    category: 'Code Quality',
    title: 'Effect has no cleanup',
    detail: 'The resize listener is added on mount but never removed, causing a memory leak and stale updates after unmount.',
    file: 'Card.tsx',
    line: 10,
    rule: 'react-hooks/exhaustive-deps',
    repairId: 'R-02',
  },
  {
    id: 'F-03',
    sev: 'warning',
    category: 'TypeScript',
    title: 'Possible undefined React child',
    detail: "title is typed as string | undefined. Rendering it directly may produce an undefined React child under strict mode.",
    file: 'Card.tsx',
    line: 16,
    rule: 'TS2322',
    repairId: 'R-03',
  },
  {
    id: 'F-04',
    sev: 'warning',
    category: 'Responsive',
    title: 'Layout overflow below 420px',
    detail: 'The button group exceeds its container width at narrow viewports, introducing horizontal scroll and a 0.12 CLS estimate.',
    file: 'styles.css',
    line: 24,
    rule: 'responsive/overflow',
  },
  {
    id: 'F-05',
    sev: 'passed',
    category: 'Dependencies',
    title: 'Dependencies compatible',
    detail: 'React and all installed packages satisfy the required version ranges. No missing or conflicting modules detected.',
    file: 'package.json',
    line: 0,
    rule: 'deps/compatible',
  },
];

export const REPAIRS = [
  {
    id: 'R-01',
    title: 'Add accessible name to IconButton',
    confidence: 94,
    risk: 'low' as const,
    finding: 'F-01',
    summary: 'Add an aria-label to the icon-only button so assistive technology announces its purpose.',
  },
  {
    id: 'R-02',
    title: 'Add effect cleanup for resize listener',
    confidence: 88,
    risk: 'low' as const,
    finding: 'F-02',
    summary: 'Return a cleanup function from the effect to remove the listener on unmount.',
  },
  {
    id: 'R-03',
    title: 'Narrow type: string | undefined → string',
    confidence: 79,
    risk: 'medium' as const,
    finding: 'F-03',
    summary: 'Provide a default value or guard against undefined before rendering the title.',
  },
];

export const STAGES = [
  'Parsing files',
  'Creating isolated container',
  'Compiling component',
  'Running TypeScript checks',
  'Auditing accessibility',
  'Inspecting dependencies',
  'Testing responsive layouts',
  'Preparing findings',
];

export const TERMINAL_OUTPUT = [
  { t: '$ forge analyse Card.tsx', c: 'faint' },
  { t: '✓ source parsed', c: 'success' },
  { t: '✓ isolated container started', c: 'success' },
  { t: '✓ TypeScript checks completed', c: 'success' },
  { t: '✓ dependency graph resolved', c: 'success' },
  { t: '! 1 critical accessibility issue', c: 'danger' },
  { t: '! 3 warnings found', c: 'warning' },
  { t: 'analysis completed in 1.28s', c: 'muted' },
  { t: 'container destroyed', c: 'faint' },
  { t: 'original source preserved', c: 'faint' },
];

export const DIFF_ORIGINAL = [
  { n: 16, text: '      <h2>{title}</h2>', mark: 'ctx' as const },
  { n: 17, text: '', mark: 'ctx' as const },
  { n: 18, text: '      <button onClick={() => setOpen(!open)}>', mark: 'del' as const },
  { n: 19, text: '        <MenuIcon />', mark: 'del' as const },
  { n: 20, text: '      </button>', mark: 'del' as const },
  { n: 21, text: '', mark: 'ctx' as const },
  { n: 22, text: '      {open && <div className="menu">Menu content</div>}', mark: 'ctx' as const },
];

export const DIFF_PROPOSED = [
  { n: 16, text: '      <h2>{title}</h2>', mark: 'ctx' as const },
  { n: 17, text: '', mark: 'ctx' as const },
  { n: 18, text: '      <button', mark: 'add' as const },
  { n: 19, text: '        aria-label="Toggle menu"', mark: 'add' as const },
  { n: 20, text: '        onClick={() => setOpen(!open)}>', mark: 'add' as const },
  { n: 21, text: '        <MenuIcon />', mark: 'add' as const },
  { n: 22, text: '      </button>', mark: 'add' as const },
  { n: 23, text: '', mark: 'ctx' as const },
  { n: 24, text: '      {open && <div className="menu">Menu content</div>}', mark: 'ctx' as const },
];
