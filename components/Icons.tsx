export function LogoMark({ className, tip = '#2F5BFF' }: { className?: string; tip?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true">
      <path d="M36 30L36 90L88 60Z" fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="round" />
      <circle cx="36" cy="30" r="12.5" fill="currentColor" />
      <circle cx="36" cy="90" r="12.5" fill="currentColor" />
      <circle cx="88" cy="60" r="12.5" fill={tip} />
    </svg>
  );
}

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" className={className} aria-hidden="true">
      <path d="M1 7H13M8 2L13 7L8 12" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function LinkedIn() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path fill="currentColor" d="M3.6 5.6H1V15h2.6V5.6zM2.3 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM15 9.6c0-2.5-1.3-4.2-3.6-4.2-1.2 0-2 .6-2.4 1.3V5.6H6.5V15h2.6v-4.9c0-1.3.4-2.3 1.7-2.3 1.2 0 1.6 1 1.6 2.3V15H15V9.6z" />
    </svg>
  );
}
