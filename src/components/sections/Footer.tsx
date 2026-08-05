const links = ['Product', 'Documentation', 'Security', 'Status', 'GitHub', 'Terms', 'Privacy'];

export function Footer() {
  return (
    <footer className="border-t border-edge-soft px-6 py-6">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-violet-500/15 ring-1 ring-violet-400/40">
            <span className="h-2 w-2 rounded-[2px] bg-violet-400" />
          </span>
          <span className="text-[14px] font-semibold tracking-tight text-ink">
            CoreNex <span className="text-violet-300">Forge</span>
          </span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          {links.map((l) => (
            <a
              key={l}
              href="#"
              className="text-[12.5px] text-ink-muted t-200 hover:text-white"
            >
              {l}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
