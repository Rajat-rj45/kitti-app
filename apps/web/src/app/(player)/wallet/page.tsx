import Link from 'next/link';
import {
  CheckCircle2,
  Coins,
  History,
  LockKeyhole,
  PlayCircle,
  PlusCircle,
  WalletCards,
} from 'lucide-react';

import { PlayerPage } from '@/components/layout/player-page';

const walletStats = [
  {
    label: 'Available',
    value: '100',
    tone: 'text-[#008F98]',
    surface: 'bg-[#EAFBFC]',
    icon: Coins,
  },
  {
    label: 'Locked',
    value: '0',
    tone: 'text-[#8A6A00]',
    surface: 'bg-[#FFF7D6]',
    icon: LockKeyhole,
  },
  {
    label: 'Room entries',
    value: '0',
    tone: 'text-[#247B5D]',
    surface: 'bg-[#EDF8F3]',
    icon: CheckCircle2,
  },
] as const;

export default function WalletPage() {
  return (
    <PlayerPage>
      <section className="relative overflow-hidden rounded-[2rem] bg-[#16343D] p-6 text-white shadow-[0_24px_70px_rgb(22_52_61_/_20%)] sm:p-8 lg:p-10">
        <div
          className="absolute -right-16 -top-16 size-48 rounded-full bg-[#2DCCD3]/25 blur-2xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-20 left-10 size-52 rounded-full bg-[#FFCA00]/20 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7DE2E6]">
              Wallet
            </p>

            <h1 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
              Manage your play coins
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
              Track coins available for rooms, locked reservations and future
              ledger activity from one place.
            </p>
          </div>

          <div className="rounded-[1.75rem] bg-white/10 p-5 backdrop-blur-xl shadow-[inset_8px_8px_18px_rgb(255_255_255_/_8%),inset_-10px_-12px_24px_rgb(0_0_0_/_12%)]">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/65">
              Available balance
            </p>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-[family-name:var(--font-sora)] text-6xl font-extrabold tabular-nums leading-none">
                  100
                </p>
                <p className="mt-2 text-sm font-semibold text-white/70">
                  play coins
                </p>
              </div>

              <span className="grid size-14 place-items-center rounded-2xl bg-[#FFCA00] font-[family-name:var(--font-sora)] text-xl font-black text-[#16343D] shadow-[0_14px_30px_rgb(255_202_0_/_25%)]">
                <WalletCards className="size-7" strokeWidth={2.4} />
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">
        {walletStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article
              key={stat.label}
              className="rounded-[1.4rem] border border-white/80 bg-white p-4 shadow-[inset_5px_5px_12px_rgb(255_255_255_/_80%),inset_-7px_-8px_16px_rgb(18_79_86_/_6%),0_12px_28px_rgb(18_79_86_/_7%)] sm:rounded-[1.75rem] sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`inline-flex rounded-xl px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] ${stat.surface} ${stat.tone}`}
                >
                  {stat.label}
                </span>

                <span
                  className={`grid size-9 shrink-0 place-items-center rounded-xl ${stat.surface} ${stat.tone}`}
                  aria-hidden="true"
                >
                  <Icon className="size-4" strokeWidth={2.4} />
                </span>
              </div>

              <p
                className={`mt-4 font-[family-name:var(--font-sora)] text-2xl font-extrabold tabular-nums sm:text-4xl ${stat.tone}`}
              >
                {stat.value}
              </p>
            </article>
          );
        })}
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="rounded-[2rem] bg-[#FFF7D6] p-6 shadow-[inset_8px_8px_18px_rgb(255_255_255_/_65%),inset_-12px_-14px_24px_rgb(138_106_0_/_8%),0_16px_40px_rgb(138_106_0_/_10%)]">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8A6A00]">
            Quick actions
          </p>

          <div className="mt-5 grid gap-3">
            <button
              type="button"
              disabled
              className="clay-button clay-button--yellow inline-flex min-h-12 w-full items-center justify-center gap-2 px-5 text-sm font-extrabold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PlusCircle className="size-5" strokeWidth={2.4} />
              Add coins coming soon
            </button>

            <Link
              href="/play"
              className="clay-button clay-button--secondary inline-flex min-h-12 items-center justify-center gap-2 px-5 text-sm font-extrabold transition-all duration-300"
            >
              <PlayCircle className="size-5" strokeWidth={2.4} />
              Use coins to play
            </Link>
          </div>

          <p className="mt-4 text-sm leading-6 text-[#5C747C]">
            Coin purchase and ledger sync will connect after payment and wallet
            services are implemented.
          </p>
        </article>

        <article className="rounded-[2rem] border border-[#16343D]/8 bg-white p-6 shadow-[0_15px_45px_rgb(18_79_86_/_6%)] sm:p-7">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
                Recent transactions
              </p>

              <h2 className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-extrabold">
                No activity yet
              </h2>
            </div>

            <span className="rounded-full bg-[#EAFBFC] px-4 py-2 text-xs font-bold text-[#008F98]">
              <span className="inline-flex items-center gap-1.5">
                <History className="size-3.5" strokeWidth={2.4} />
                Ledger pending
              </span>
            </span>
          </div>

          <div className="mt-6 rounded-[1.5rem] border border-dashed border-[#2DCCD3]/35 bg-[#F7FCFC] p-5 text-center">
            <p className="text-sm font-bold text-[#16343D]">
              Your coin history will appear here.
            </p>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#5C747C]">
              Deposits, room entries, locked coins, refunds and match winnings
              will be listed once backend wallet services are connected.
            </p>
          </div>
        </article>
      </section>
    </PlayerPage>
  );
}
