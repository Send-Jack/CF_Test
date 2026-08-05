import type { ReactNode } from 'react';

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: {
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'outline';
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium focus-ring t-200 select-none';
  const variants: Record<string, string> = {
    primary:
      'btn-primary bg-violet-500 text-white hover:bg-violet-400',
    outline:
      'btn-outline border border-edge text-ink hover:border-violet-400/60 hover:text-white bg-surface-900/40',
    ghost: 'text-ink-muted hover:text-white hover:bg-surface-700/60',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
