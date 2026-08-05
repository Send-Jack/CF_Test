import { FileCode2, FileType2, Braces, Plus, FolderTree } from 'lucide-react';

const ICONS: Record<string, typeof FileCode2> = {
  tsx: FileCode2,
  jsx: FileCode2,
  ts: FileCode2,
  js: FileCode2,
  css: FileType2,
  json: Braces,
};

export type SourceFile = { name: string; size: string; lang: string };

export function SourcePanel({
  files,
  selectedFile,
  onSelectFile,
}: {
  files: SourceFile[];
  selectedFile: string;
  onSelectFile: (f: string) => void;
}) {
  const totalSize = `${(files.reduce((acc, f) => acc + parseFloat(f.size), 0)).toFixed(1)} KB`;

  return (
    <aside className="flex w-full flex-col border-r border-app-border bg-app-surface-2/60 lg:w-[236px]">
      <div className="flex items-center justify-between border-b border-app-border-soft px-3 py-2">
        <span className="font-mono text-[10px] uppercase tracking-wider text-app-faint">Source</span>
        <button
          className="inline-flex items-center gap-1 rounded border border-app-border-soft px-1.5 py-0.5 font-mono text-[9.5px] text-app-muted t-200 hover:border-app-border-strong hover:text-app-fg"
          aria-label="Add file"
        >
          <Plus className="h-3 w-3" /> Add
        </button>
      </div>

      {/* file tree */}
      <div className="px-2.5 py-2">
        <div className="mb-1.5 flex items-center gap-1.5 font-mono text-[9.5px] text-app-faint">
          <FolderTree className="h-3 w-3" /> submission
        </div>
        <div className="space-y-0.5">
          {files.map((f) => {
            const Icon = ICONS[f.lang] ?? FileCode2;
            const active = selectedFile === f.name;
            return (
              <button
                key={f.name}
                onClick={() => onSelectFile(f.name)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left t-200 ${
                  active
                    ? 'bg-app-accent/12 text-app-fg ring-1 ring-inset border-l-2 border-app-accent'
                    : 'text-app-muted hover:bg-app-surface-3/50 hover:text-app-fg'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${active ? 'text-app-accent' : 'text-app-faint'}`} />
                <span className="flex-1 truncate font-mono text-[11.5px]">{f.name}</span>
                <span className="font-mono text-[9px] text-app-faint">{f.size}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-app-success" />
              </button>
            );
          })}
        </div>
      </div>

      {/* submission details */}
      <div className="mt-auto border-t border-app-border-soft px-2.5 py-3">
        <div className="mb-2 font-mono text-[9.5px] uppercase tracking-wider text-app-faint">Submission details</div>
        <dl className="space-y-1 font-mono text-[10.5px]">
          {[
            ['Framework', 'React'],
            ['Language', 'TypeScript'],
            ['Files', String(files.length)],
            ['Size', totalSize],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-app-faint">{k}</dt>
              <dd className="text-app-muted">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </aside>
  );
}
