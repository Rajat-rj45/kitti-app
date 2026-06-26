import Link from 'next/link';
import { ArrowRight, DoorOpen, KeyRound, Search } from 'lucide-react';

import { PlayerPage } from '@/components/layout/player-page';

const playOptions = [
  {
    title: 'Browse Rooms',
    description: 'Compare public rooms and choose the best table.',
    href: '/rooms',
    icon: Search,
    surface: 'from-white to-[#EAFBFC]',
    accent: 'bg-[#EAFBFC] text-[#008F98]',
  },
  {
    title: 'Join by Code',
    description: 'Enter an invitation code for a private room.',
    href: '/rooms/join',
    icon: KeyRound,
    surface: 'from-white to-[#FFF7D6]',
    accent: 'bg-[#FFF7D6] text-[#8A6A00]',
  },
  {
    title: 'Create Room',
    description: 'Set room size, entry coins and private rules.',
    href: '/rooms/create',
    icon: DoorOpen,
    surface: 'from-white to-[#EDF8F3]',
    accent: 'bg-[#EDF8F3] text-[#247B5D]',
  },
] as const;

export default function PlayPage() {
  return (
    <PlayerPage>
      <section className="relative overflow-hidden rounded-[2rem] bg-[#16343D] p-6 text-white shadow-[0_24px_70px_rgb(22_52_61_/_20%)] sm:p-8 lg:p-10">
        <div
          className="absolute -right-16 -top-16 size-48 rounded-full bg-[#2DCCD3]/20 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-10 size-52 rounded-full bg-[#FFCA00]/18 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7DE2E6]">
            Start a game
          </p>

          <h1 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
            Choose how you want to play
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/75 sm:text-base">
            Review room details before joining. Your coins stay protected until
            you confirm the final room entry.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {playOptions.map((option) => {
          const Icon = option.icon;

          return (
            <Link
              key={option.href}
              href={option.href}
              className={`group flex min-h-48 transform-gpu flex-col justify-between rounded-[2rem] border border-white/80 bg-gradient-to-br ${option.surface} p-5 shadow-[inset_7px_7px_16px_rgb(255_255_255_/_85%),inset_-9px_-11px_20px_rgb(18_79_86_/_7%),0_15px_38px_rgb(18_79_86_/_8%)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2DCCD3]/30 hover:shadow-[inset_8px_8px_18px_rgb(255_255_255_/_90%),inset_-10px_-12px_22px_rgb(18_79_86_/_8%),0_22px_52px_rgb(18_79_86_/_12%)] active:translate-y-0 sm:p-6`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`grid size-12 place-items-center rounded-2xl shadow-[inset_4px_4px_10px_rgb(255_255_255_/_70%),inset_-5px_-6px_12px_rgb(18_79_86_/_8%)] ${option.accent}`}
                  aria-hidden="true"
                >
                  <Icon className="size-6" strokeWidth={2.4} />
                </span>

                <span className="grid size-9 place-items-center rounded-full bg-white/70 text-[#2DCCD3] opacity-0 shadow-sm transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  <ArrowRight className="size-4" strokeWidth={2.5} />
                </span>
              </div>

              <div className="mt-7">
                <h2 className="font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#16343D]">
                  {option.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-[#5C747C]">
                  {option.description}
                </p>
              </div>
            </Link>
          );
        })}
      </section>
    </PlayerPage>
  );
}
