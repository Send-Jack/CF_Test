import { useEffect, useState } from 'react';
import { Search, ChevronDown, Command, Sun, Moon, Palette, Check } from 'lucide-react';
import { Link } from '@/router';
import { useTheme, ACCENTS } from '@/theme';
import { Logo } from '@/components/ui/Logo';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const { mode, accent, toggleMode, setAccent } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'border-b border-app-border-soft bg-app-surface/85 backdrop-blur-xl shadow-[0_8px_30px_-12px_rgba(0,0,0,0.6)]'
          : 'border-b border-transparent bg-app-surface/40 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-6">
        {/* Logo */}
        <a href="/" className="group flex items-center gap-2.5">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight text-app-fg">
            CoreNex <span className="text-app-accent">Forge</span>
          </span>
        </a>

        {/* Center nav */}
        <nav className="hidden items-center gap-0.5 md:flex">
          {['Product', 'Workflow', 'Security', 'Docs'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="relative rounded-md px-3.5 py-1.5 text-sm text-app-muted t-200 hover:text-app-fg hover:bg-app-surface-3/40"
            >
              {l}
            </a>
          ))}
          <Link
            to="/analyse"
            className="relative rounded-md px-3.5 py-1.5 text-sm text-app-muted t-200 hover:text-app-fg hover:bg-app-surface-3/40"
          >
            Analyse
          </Link>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-2.5">
          <button className="hidden items-center gap-2 rounded-lg border border-app-border-soft bg-app-surface-2/40 px-2.5 py-1.5 text-xs text-app-faint t-200 hover:border-app-border-strong hover:text-app-muted hover:bg-app-surface-3/50 sm:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Search</span>
            <span className="ml-1 inline-flex items-center gap-0.5 rounded border border-app-border-soft bg-app-surface/60 px-1 py-0.5 text-[10px] text-app-faint">
              <Command className="h-2.5 w-2.5" />
              K
            </span>
          </button>

          {/* theme mode toggle */}
          <button
            onClick={toggleMode}
            className="grid h-8 w-8 place-items-center rounded-lg border border-app-border-soft bg-app-surface-2/40 text-app-muted t-200 hover:border-app-border-strong hover:text-app-fg"
            aria-label="Toggle light/dark mode"
          >
            {mode === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* accent palette */}
          <div className="relative">
            <button
              onClick={() => setPaletteOpen((o) => !o)}
              className="grid h-8 w-8 place-items-center rounded-lg border border-app-border-soft bg-app-surface-2/40 text-app-muted t-200 hover:border-app-border-strong hover:text-app-fg"
              aria-label="Select accent colour"
            >
              <Palette className="h-4 w-4" />
            </button>
            {paletteOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setPaletteOpen(false)} />
                <div className="absolute right-0 top-10 z-50 w-44 rounded-lg border border-app-border bg-app-surface p-2 shadow-xl">
                  <div className="mb-1.5 px-1 font-mono text-[9.5px] uppercase tracking-wider text-app-faint">Accent</div>
                  {ACCENTS.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        setAccent(a.id);
                        setPaletteOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left t-200 hover:bg-app-surface-3/50 ${
                        accent === a.id ? 'bg-app-accent/12' : ''
                      }`}
                    >
                      <span className="h-3.5 w-3.5 rounded-full border border-app-border" style={{ backgroundColor: a.swatch }} />
                      <span className="text-[12px] text-app-muted">{a.label}</span>
                      {accent === a.id && <Check className="ml-auto h-3.5 w-3.5 text-app-accent" />}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          <Link
            to="/analyse"
            className="focus-ring-accent inline-flex items-center gap-1.5 rounded-lg bg-app-accent px-3.5 py-2 text-sm font-medium text-app-accent-fg hover:bg-app-accent-2"
          >
            Launch Forge
            <ChevronDown className="h-3.5 w-3.5 opacity-70" />
          </Link>
        </div>
      </div>
    </header>
  );
}
