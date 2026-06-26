import Link from 'next/link';
import {
  ArrowRight,
  CircleHelp,
  Coins,
  KeyRound,
  Plus,
  WalletCards,
} from 'lucide-react';

import { PlayerPage } from '@/components/layout/player-page';
import { ButtonLink } from '@/components/ui/button-link';

const quickActions = [
  {
    label: 'Create Room',
    shortLabel: 'Create',
    description: 'Start a private or public table.',
    href: '/rooms/create',
    icon: Plus,
    accent: 'bg-[#EAFBFC] text-[#008F98]',
    surface: 'from-white to-[#EAFBFC]',
  },
  {
    label: 'Join by Code',
    shortLabel: 'Join',
    description: 'Enter a private room invitation.',
    href: '/rooms/join',
    icon: KeyRound,
    accent: 'bg-[#FFF7D6] text-[#8A6A00]',
    surface: 'from-white to-[#FFF7D6]',
  },
  {
    label: 'Add Coins',
    shortLabel: 'Coins',
    description: 'Review your play-coin balance.',
    href: '/wallet',
    icon: Coins,
    accent: 'bg-[#EDF8F3] text-[#247B5D]',
    surface: 'from-white to-[#EDF8F3]',
  },
  {
    label: 'How to Play',
    shortLabel: 'Rules',
    description: 'Learn hand and round rules.',
    href: '/how-to-play',
    icon: CircleHelp,
    accent: 'bg-[#F3F0FA] text-[#65528F]',
    surface: 'from-white to-[#F3F0FA]',
  },
] as const;

export default function HomePage() {
  return (
    <PlayerPage>
      <section className="overflow-hidden rounded-[2rem] bg-[#2DCCD3] p-7 text-white shadow-[0_24px_60px_rgb(45_204_211_/_24%)] sm:p-10">
        <div className="max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/80">
            Welcome back, Rajat
          </p>

          <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
            Ready for the next Kitti?
          </h2>

          <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
            Create a room, invite your friends and arrange your three hands
            before the match begins.
          </p>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <ButtonLink
              href="/play"
              variant="yellow"
              size="lg"
              className="font-extrabold"
            >
              Play Now
            </ButtonLink>

            <ButtonLink href="/rooms/join" variant="glass" size="lg">
              Join Private Room
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
              Quick actions
            </p>

            <h2 className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#16343D]">
              What would you like to do?
            </h2>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.href}
                href={action.href}
                className={`group flex min-h-36 transform-gpu flex-col justify-between rounded-[1.6rem] border border-white/80 bg-gradient-to-br ${action.surface} p-4 shadow-[inset_6px_6px_14px_rgb(255_255_255_/_85%),inset_-8px_-10px_18px_rgb(18_79_86_/_7%),0_12px_30px_rgb(18_79_86_/_8%)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2DCCD3]/30 hover:shadow-[inset_7px_7px_15px_rgb(255_255_255_/_90%),inset_-9px_-11px_20px_rgb(18_79_86_/_8%),0_18px_42px_rgb(18_79_86_/_12%)] active:translate-y-0 sm:min-h-40 sm:p-5`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-2xl shadow-[inset_4px_4px_10px_rgb(255_255_255_/_70%),inset_-5px_-6px_12px_rgb(18_79_86_/_8%)] transition-transform duration-300 group-hover:-translate-y-0.5 ${action.accent}`}
                    aria-hidden="true"
                  >
                    <Icon className="size-5" strokeWidth={2.4} />
                  </span>

                  <span className="grid size-8 place-items-center rounded-full bg-white/70 text-[#2DCCD3] opacity-0 shadow-sm transition duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    <ArrowRight className="size-4" strokeWidth={2.5} />
                  </span>
                </div>

                <div className="mt-4">
                  <h3 className="font-[family-name:var(--font-sora)] text-[15px] font-extrabold leading-tight text-[#16343D] sm:text-lg">
                    <span className="sm:hidden">{action.shortLabel}</span>
                    <span className="hidden sm:inline">{action.label}</span>
                  </h3>

                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#5C747C] sm:text-sm">
                    {action.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <article className="rounded-[2rem] border border-[#16343D]/8 bg-white p-7 shadow-[0_15px_45px_rgb(18_79_86_/_6%)]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
            Public rooms
          </p>

          <h2 className="mt-3 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#16343D]">
            No rooms available yet
          </h2>

          <p className="mt-3 text-sm leading-7 text-[#5C747C]">
            Public room discovery will be connected to the backend room service
            in a later phase.
          </p>
        </article>

        <article className="relative overflow-hidden rounded-[2rem] bg-[#FFF7D6] p-6 shadow-[inset_8px_8px_18px_rgb(255_255_255_/_65%),inset_-12px_-14px_24px_rgb(138_106_0_/_8%),0_18px_45px_rgb(138_106_0_/_12%)] sm:p-7">
          <div
            className="absolute -right-10 -top-10 size-32 rounded-full bg-[#FFCA00]/45"
            aria-hidden="true"
          />

          <div className="relative">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8A6A00]">
                  Wallet balance
                </p>

                <p className="mt-3 font-[family-name:var(--font-sora)] text-4xl font-extrabold text-[#16343D]">
                  100
                </p>

                <p className="mt-1 text-sm font-semibold text-[#5C747C]">
                  play coins ready
                </p>
              </div>

              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/70 text-lg font-black text-[#8A6A00] shadow-[inset_5px_5px_12px_rgb(255_255_255_/_75%),inset_-6px_-7px_14px_rgb(138_106_0_/_10%)]">
                <WalletCards className="size-6" strokeWidth={2.4} />
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/55 p-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A6A00]/70">
                  Locked
                </p>
                <p className="mt-1 font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#16343D]">
                  0
                </p>
              </div>

              <div className="rounded-2xl bg-white/55 p-3">
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#8A6A00]/70">
                  Status
                </p>
                <p className="mt-1 text-sm font-extrabold text-[#247B5D]">
                  Ready
                </p>
              </div>
            </div>

            <Link
              href="/wallet"
              className="clay-button clay-button--yellow mt-5 inline-flex min-h-11 w-full transform-gpu items-center justify-center px-5 text-sm font-extrabold transition-all duration-300"
            >
              Open wallet
            </Link>
          </div>
        </article>
      </section>
    </PlayerPage>
  );
}
