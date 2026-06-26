import Link from 'next/link';
import { ArrowRight, DoorOpen, KeyRound, Search, UsersRound } from 'lucide-react';

import { PlayerPage } from '@/components/layout/player-page';

const roomActions = [
  {
    title: 'Create Room',
    description: 'Start a table and invite friends with a room code.',
    href: '/rooms/create',
    icon: DoorOpen,
    accent: 'bg-[#EAFBFC] text-[#008F98]',
    surface: 'from-white to-[#EAFBFC]',
  },
  {
    title: 'Join Private',
    description: 'Use an invitation code to enter a private room.',
    href: '/rooms/join',
    icon: KeyRound,
    accent: 'bg-[#FFF7D6] text-[#8A6A00]',
    surface: 'from-white to-[#FFF7D6]',
  },
] as const;

const filters = ['All rooms', '3 players', '4 players', '5 players'] as const;

export default function RoomsPage() {
  return (
    <PlayerPage>
      <section className="relative overflow-hidden rounded-[2rem] bg-[#2DCCD3] p-6 text-white shadow-[0_24px_70px_rgb(45_204_211_/_22%)] sm:p-8 lg:p-10">
        <div
          className="absolute -right-16 -top-16 size-48 rounded-full bg-white/15 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-10 size-52 rounded-full bg-[#FFCA00]/24 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid gap-6 lg:grid-cols-[1fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">
              Room discovery
            </p>

            <h1 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
              Find a table that fits your game
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
              Public and private rooms will appear here with player capacity,
              entry coins, room status and payout information.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-white/12 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-[#FFCA00] text-[#16343D]">
                <UsersRound className="size-6" strokeWidth={2.4} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                  Available now
                </p>
                <p className="font-[family-name:var(--font-sora)] text-2xl font-extrabold">
                  0 rooms
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-2 gap-3 sm:gap-5">
        {roomActions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.href}
              href={action.href}
              className={`group flex min-h-36 transform-gpu flex-col justify-between rounded-[1.6rem] border border-white/80 bg-gradient-to-br ${action.surface} p-4 shadow-[inset_6px_6px_14px_rgb(255_255_255_/_85%),inset_-8px_-10px_18px_rgb(18_79_86_/_7%),0_12px_30px_rgb(18_79_86_/_8%)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2DCCD3]/30 active:translate-y-0 sm:min-h-40 sm:p-5`}
            >
              <div className="flex items-start justify-between gap-3">
                <span
                  className={`grid size-11 place-items-center rounded-2xl shadow-[inset_4px_4px_10px_rgb(255_255_255_/_70%),inset_-5px_-6px_12px_rgb(18_79_86_/_8%)] ${action.accent}`}
                  aria-hidden="true"
                >
                  <Icon className="size-5" strokeWidth={2.4} />
                </span>

                <ArrowRight
                  className="size-5 text-[#2DCCD3] opacity-0 transition duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  strokeWidth={2.5}
                />
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-sora)] text-base font-extrabold text-[#16343D] sm:text-xl">
                  {action.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#5C747C] sm:text-sm">
                  {action.description}
                </p>
              </div>
            </Link>
          );
        })}
      </section>

      <section className="mt-6 rounded-[2rem] border border-[#16343D]/8 bg-white p-5 shadow-[0_15px_45px_rgb(18_79_86_/_6%)] sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
              Public rooms
            </p>

            <h2 className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#16343D]">
              No rooms available yet
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className="shrink-0 rounded-full bg-[#F4FBFC] px-4 py-2 text-xs font-bold text-[#5C747C] transition hover:bg-[#EAFBFC] hover:text-[#008F98]"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#2DCCD3]/35 bg-[#F7FCFC] p-6 text-center">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#EAFBFC] text-[#008F98]">
            <Search className="size-7" strokeWidth={2.4} />
          </span>

          <p className="mt-4 font-[family-name:var(--font-sora)] text-lg font-extrabold text-[#16343D]">
            Waiting for active tables
          </p>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-[#5C747C]">
            Once room services are connected, live tables will be shown here
            with capacity, entry coins and status.
          </p>
        </div>
      </section>
    </PlayerPage>
  );
}
