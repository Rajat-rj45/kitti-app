import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Coins, ShieldCheck, Users } from 'lucide-react';

import { PlayerPage } from '@/components/layout/player-page';
import { JoinRoomForm } from '@/components/rooms/join-room-form';

export const metadata: Metadata = {
  title: 'Join Room',
  description: 'Join a private Kitti room using an invitation code.',
};

const checklist = [
  {
    label: 'Private access',
    description: 'Only players with the six-character code can open the room.',
    icon: ShieldCheck,
  },
  {
    label: 'Review before entry',
    description: 'Check seats, rules, timer, and payout before coins reserve.',
    icon: Users,
  },
  {
    label: 'Coin control',
    description: 'Your balance changes only after final confirmation.',
    icon: Coins,
  },
] as const;

export default function JoinRoomPage() {
  return (
    <PlayerPage>
      <section className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-start">
        <div className="relative overflow-hidden rounded-[2rem] bg-[#2DCCD3] p-6 text-white shadow-[0_24px_60px_rgb(45_204_211_/_24%)] sm:p-10">
          <div
            className="absolute -right-16 -top-16 size-56 rounded-full bg-white/20"
            aria-hidden="true"
          />

          <div className="relative">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              Join private room
            </p>

            <h1 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
              Enter the invite and review the table.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
              Private rooms keep the flow simple: code first, details next,
              confirmation last.
            </p>

            <div className="mt-8 grid gap-3">
              {checklist.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex gap-3 rounded-2xl bg-white/16 p-4 shadow-[inset_5px_5px_12px_rgb(255_255_255_/_18%)] backdrop-blur"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/20 text-white">
                      <Icon className="size-5" strokeWidth={2.4} />
                    </span>
                    <div>
                      <h2 className="font-[family-name:var(--font-sora)] text-base font-extrabold">
                        {item.label}
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-white/82">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href="/rooms"
              className="clay-button clay-button--glass mt-7 inline-flex min-h-12 transform-gpu items-center justify-center gap-2 px-7 text-sm font-bold transition-all duration-300"
            >
              Browse public rooms
              <ArrowRight className="size-4" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        <JoinRoomForm />
      </section>
    </PlayerPage>
  );
}
