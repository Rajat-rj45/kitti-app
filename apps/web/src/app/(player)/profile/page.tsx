import Link from 'next/link';
import {
  ArrowRight,
  Bell,
  CircleHelp,
  History,
  Settings,
  ShieldCheck,
  Trophy,
  UserRound,
} from 'lucide-react';

import { PlayerPage } from '@/components/layout/player-page';

const profileLinks = [
  {
    label: 'Match History',
    description: 'Review completed games and outcomes.',
    href: '/history',
    icon: History,
    accent: 'bg-[#EAFBFC] text-[#008F98]',
  },
  {
    label: 'Notifications',
    description: 'Room invites, reminders and updates.',
    href: '/notifications',
    icon: Bell,
    accent: 'bg-[#FFF7D6] text-[#8A6A00]',
  },
  {
    label: 'Settings',
    description: 'Account preferences and privacy controls.',
    href: '/settings',
    icon: Settings,
    accent: 'bg-[#EDF8F3] text-[#247B5D]',
  },
  {
    label: 'Help and Support',
    description: 'Get help with rooms, wallet or gameplay.',
    href: '/support',
    icon: CircleHelp,
    accent: 'bg-[#F3F0FA] text-[#65528F]',
  },
] as const;

const profileStats = [
  {
    label: 'Matches',
    value: '0',
  },
  {
    label: 'Wins',
    value: '0',
  },
  {
    label: 'Coins',
    value: '100',
  },
] as const;

export default function ProfilePage() {
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

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="grid size-24 shrink-0 place-items-center rounded-[2rem] bg-[#2DCCD3] shadow-[inset_8px_8px_18px_rgb(255_255_255_/_22%),inset_-10px_-12px_24px_rgb(0_143_152_/_24%),0_18px_38px_rgb(45_204_211_/_22%)]">
              <UserRound className="size-11" strokeWidth={2.4} />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#7DE2E6]">
                Player profile
              </p>

              <h1 className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
                Rajat
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-white/75">
                Profile data is temporary until authentication and player
                services are connected.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] bg-white/10 p-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#FFCA00] text-[#16343D]">
                <ShieldCheck className="size-5" strokeWidth={2.4} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-white/60">
                  Status
                </p>
                <p className="text-sm font-extrabold">Demo player</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">
        {profileStats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-[1.4rem] border border-white/80 bg-white p-4 shadow-[inset_5px_5px_12px_rgb(255_255_255_/_80%),inset_-7px_-8px_16px_rgb(18_79_86_/_6%),0_12px_28px_rgb(18_79_86_/_7%)] sm:rounded-[1.75rem] sm:p-5"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5C747C]">
              {stat.label}
            </p>
            <p className="mt-3 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#2DCCD3] sm:text-4xl">
              {stat.value}
            </p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {profileLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="group flex transform-gpu items-center gap-4 rounded-[1.6rem] border border-white/80 bg-white p-4 shadow-[inset_6px_6px_14px_rgb(255_255_255_/_85%),inset_-8px_-10px_18px_rgb(18_79_86_/_7%),0_12px_30px_rgb(18_79_86_/_8%)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2DCCD3]/30 active:translate-y-0 sm:p-5"
            >
              <span
                className={`grid size-12 shrink-0 place-items-center rounded-2xl shadow-[inset_4px_4px_10px_rgb(255_255_255_/_70%),inset_-5px_-6px_12px_rgb(18_79_86_/_8%)] ${item.accent}`}
                aria-hidden="true"
              >
                <Icon className="size-5" strokeWidth={2.4} />
              </span>

              <div className="min-w-0 flex-1">
                <h2 className="font-[family-name:var(--font-sora)] text-base font-extrabold text-[#16343D]">
                  {item.label}
                </h2>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-[#5C747C]">
                  {item.description}
                </p>
              </div>

              <ArrowRight
                className="size-5 shrink-0 text-[#2DCCD3] transition duration-300 group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
          );
        })}
      </section>

      <section className="mt-6 rounded-[2rem] bg-[#FFF7D6] p-6 shadow-[inset_8px_8px_18px_rgb(255_255_255_/_65%),inset_-12px_-14px_24px_rgb(138_106_0_/_8%),0_16px_40px_rgb(138_106_0_/_10%)]">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8A6A00]">
              Progress
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#16343D]">
              Build your first winning streak
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#5C747C]">
              Match history and badges will appear here after game services are
              connected.
            </p>
          </div>

          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/70 text-[#8A6A00] shadow-[inset_5px_5px_12px_rgb(255_255_255_/_75%),inset_-6px_-7px_14px_rgb(138_106_0_/_10%)]">
            <Trophy className="size-7" strokeWidth={2.4} />
          </span>
        </div>
      </section>
    </PlayerPage>
  );
}
