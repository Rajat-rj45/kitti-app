import Link from 'next/link';
import { Bell, Coins } from 'lucide-react';

type PlayerHeaderProps = {
  title?: string;
};

export function PlayerHeader({ title }: PlayerHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[#16343D]/8 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7A9097]">
            Player dashboard
          </p>

          <h1 className="truncate font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#16343D] sm:text-2xl">
            {title ?? 'Kitti'}
          </h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/wallet"
            className="clay-button clay-button--secondary flex min-h-11 transform-gpu items-center gap-2 px-3 text-sm font-bold transition-all duration-300 sm:px-4"
            aria-label="Open wallet. Balance 100 coins."
          >
            <span
              className="grid size-6 place-items-center rounded-full bg-[#FFCA00] text-[11px] font-extrabold text-[#16343D]"
              aria-hidden="true"
            >
              <Coins className="size-3.5" strokeWidth={2.5} />
            </span>

            <span className="tabular-nums">100</span>

            <span className="hidden text-xs font-semibold text-[#5C747C] sm:inline">
              coins
            </span>
          </Link>

          <Link
            href="/notifications"
            className="clay-button clay-button--secondary relative grid size-11 transform-gpu place-items-center transition-all duration-300"
            aria-label="Notifications"
          >
            <Bell className="size-5" strokeWidth={2.2} aria-hidden="true" />

            <span className="absolute right-1 top-1 size-2.5 rounded-full border-2 border-white bg-[#E85661]" />
          </Link>

          <Link
            href="/profile"
            className="clay-button clay-button--dark grid size-11 transform-gpu place-items-center text-sm font-extrabold transition-all duration-300"
            aria-label="Open profile"
          >
            R
          </Link>
        </div>
      </div>
    </header>
  );
}
