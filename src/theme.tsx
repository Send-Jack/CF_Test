import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type ThemeMode = 'dark' | 'light';
export type Accent = 'violet' | 'blue' | 'emerald' | 'amber' | 'rose';

type ThemeState = {
  mode: ThemeMode;
  accent: Accent;
  setMode: (m: ThemeMode) => void;
  setAccent: (a: Accent) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');
  const [accent, setAccent] = useState<Accent>('violet');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('theme-light', mode === 'light');
    root.classList.remove('accent-violet', 'accent-blue', 'accent-emerald', 'accent-amber', 'accent-rose');
    root.classList.add(`accent-${accent}`);
  }, [mode, accent]);

  return (
    <ThemeContext.Provider value={{ mode, accent, setMode, setAccent, toggleMode: () => setMode((m) => (m === 'dark' ? 'light' : 'dark')) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export const ACCENTS: { id: Accent; label: string; swatch: string }[] = [
  { id: 'violet', label: 'Violet', swatch: '#7c4dff' },
  { id: 'blue', label: 'Blue', swatch: '#2563eb' },
  { id: 'emerald', label: 'Emerald', swatch: '#059669' },
  { id: 'amber', label: 'Amber', swatch: '#d97706' },
  { id: 'rose', label: 'Rose', swatch: '#e11d48' },
];
