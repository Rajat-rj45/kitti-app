import Link from 'next/link';
import { ArrowRight, BookOpenCheck } from 'lucide-react';

import { KittiLogo } from '@/components/ui/kitti-logo';
import { PLAYER_NAVIGATION } from '@/lib/constants';

import { PlayerNavLink } from './player-nav-link';

export function PlayerSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-[#16343D]/8 bg-white lg:flex lg:flex-col">
      <div className="flex min-h-20 items-center border-b border-[#16343D]/8 px-7">
        <Link href="/home" aria-label="Kitti player home">
          <KittiLogo />
        </Link>
      </div>

      <nav
        className="flex flex-1 flex-col gap-2 px-4 py-6"
        aria-label="Player navigation"
      >
        {PLAYER_NAVIGATION.map((item) => (
          <PlayerNavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
          />
        ))}
      </nav>

      <div className="p-4">
        <div className="rounded-3xl border border-white/80 bg-gradient-to-br from-white to-[#EAFBFC] p-5 shadow-[inset_6px_6px_14px_rgb(255_255_255_/_85%),inset_-8px_-10px_18px_rgb(18_79_86_/_7%),0_12px_30px_rgb(18_79_86_/_8%)]">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-2xl bg-[#EAFBFC] text-[#008F98] shadow-[inset_4px_4px_10px_rgb(255_255_255_/_70%),inset_-5px_-6px_12px_rgb(18_79_86_/_8%)]">
              <BookOpenCheck className="size-5" strokeWidth={2.4} />
            </span>

            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
              Learn the game
            </p>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#5C747C]">
            Understand hand arrangement, reveal order and Kitti outcomes.
          </p>

          <Link
            href="/how-to-play"
            className="mt-4 inline-flex transform-gpu items-center gap-1.5 text-sm font-bold text-[#008F98] transition-all duration-300 hover:translate-x-1 hover:text-[#2DCCD3]"
          >
            How to play
            <ArrowRight className="size-4" strokeWidth={2.4} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
