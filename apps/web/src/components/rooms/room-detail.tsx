'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  Coins,
  MessageCircle,
  ShieldCheck,
  Timer,
  Trophy,
} from 'lucide-react';
import { useState } from 'react';

import { EntryConfirmationModal } from '@/components/rooms/entry-confirmation-modal';
import { RoomStatusBadge } from '@/components/rooms/room-status-badge';
import type { Room } from '@/features/rooms/room-types';

type RoomDetailProps = {
  room: Room;
};

export function RoomDetail({ room }: RoomDetailProps) {
  const [confirmationOpen, setConfirmationOpen] = useState(false);

  const unavailable =
    room.status === 'FULL' ||
    room.status === 'STARTING' ||
    room.status === 'LOCKED';

  const openSeats = room.capacity - room.joinedPlayers;

  const ruleRows = [
    ['Match format', 'Three rounds'],
    ['Round 1 starter', 'Current dealer'],
    ['Next round starter', 'Previous round winner'],
    ['Normal next dealer', 'Match winner'],
    ['Kitti next dealer', 'Round 3 winner'],
    ['Turn timer', `${room.turnSeconds} seconds`],
    ['Reconnect allowance', `${room.reconnectSeconds} seconds`],
    ['Chat', room.chatEnabled ? 'Enabled' : 'Disabled'],
    ['Spectators', room.spectatorsEnabled ? 'Enabled' : 'Disabled'],
  ];

  const moneyRows = [
    ['Entry per player', `${room.entryCoins} coins`],
    ['Maximum room pot', `${room.expectedPot} coins`],
    ['Fixed platform fee', `${room.platformFee} coins`],
    ['Expected winner payout', `${room.expectedWinnerPayout} coins`],
  ];

  return (
    <>
      <section className="relative overflow-hidden rounded-[2rem] bg-[#16343D] text-white shadow-[0_24px_65px_rgb(18_52_61_/_20%)]">
        <div
          className="absolute -right-16 -top-16 size-60 rounded-full bg-[#2DCCD3]/28"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-7 right-10 hidden h-28 w-44 rotate-[-8deg] rounded-[1.4rem] border border-white/20 bg-white/10 lg:block"
          aria-hidden="true"
        />

        <div className="relative p-6 sm:p-10">
          <Link
            href="/rooms"
            className="inline-flex min-h-10 items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 text-sm font-bold text-white/85 transition hover:bg-white/15 hover:text-white"
          >
            <ArrowLeft className="size-4" strokeWidth={2.4} />
            Back to rooms
          </Link>

          <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.17em] text-[#7DE2E6]">
                  Hosted by {room.hostName}
                </p>
                <RoomStatusBadge status={room.status} />
              </div>

              <h1 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
                {room.name}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/74 sm:text-base">
                {room.speed} room - {room.turnSeconds}-second turns. Review
                open seats, game rules, and entry coins before joining.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                ['Entry', room.entryCoins],
                ['Pot', room.expectedPot],
                ['Open', openSeats],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl bg-white/10 p-4 text-center shadow-[inset_5px_5px_12px_rgb(255_255_255_/_12%)]"
                >
                  <p className="font-[family-name:var(--font-sora)] text-2xl font-extrabold">
                    {value}
                  </p>
                  <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/60">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {Array.from({ length: room.capacity }).map((_, index) => {
              const occupied = index < room.joinedPlayers;

              return (
                <div
                  key={index}
                  className={`flex min-w-32 items-center gap-3 rounded-2xl border px-4 py-3 ${
                    occupied
                      ? 'border-white/15 bg-white/10'
                      : 'border-dashed border-white/25 bg-transparent'
                  }`}
                >
                  <span
                    className={`grid size-10 place-items-center rounded-2xl text-xs font-extrabold ${
                      occupied
                        ? 'bg-[#2DCCD3] text-white'
                        : 'bg-white/10 text-white/55'
                    }`}
                  >
                    {occupied ? index + 1 : '+'}
                  </span>

                  <span className="text-sm font-semibold text-white/80">
                    {occupied ? `Player ${index + 1}` : 'Open seat'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] border border-white/80 bg-gradient-to-br from-white to-[#F4FBFC] p-6 shadow-[inset_7px_7px_16px_rgb(255_255_255_/_86%),inset_-9px_-11px_20px_rgb(18_79_86_/_6%),0_15px_45px_rgb(18_79_86_/_6%)] sm:p-7">
          <div className="flex items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#EAFBFC] text-[#008F98]">
              <ShieldCheck className="size-6" strokeWidth={2.4} />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
                Room rules
              </p>

              <h2 className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#16343D]">
                Know the table before joining
              </h2>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {ruleRows.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl bg-white/75 px-5 py-4 shadow-[0_8px_20px_rgb(18_79_86_/_4%)]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#7A9097]">
                  {label}
                </span>

                <p className="mt-1 text-sm font-extrabold text-[#16343D]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </article>

        <aside className="space-y-5">
          <article className="rounded-[2rem] border border-white/80 bg-white p-6 shadow-[inset_7px_7px_16px_rgb(255_255_255_/_86%),inset_-9px_-11px_20px_rgb(18_79_86_/_6%),0_15px_45px_rgb(18_79_86_/_6%)] sm:p-7">
            <div className="flex items-start gap-3">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#FFF7D6] text-[#8A6A00]">
                <Coins className="size-6" strokeWidth={2.4} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#8A6A00]">
                  Financial preview
                </p>

                <h2 className="mt-2 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#16343D]">
                  Clear before you join
                </h2>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#16343D]/8">
              {moneyRows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between gap-4 border-b border-[#16343D]/8 bg-white px-5 py-4 last:border-b-0"
                >
                  <span className="text-sm font-semibold text-[#5C747C]">
                    {label}
                  </span>

                  <span className="text-right text-sm font-extrabold text-[#16343D]">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="button"
              disabled={unavailable}
              onClick={() => setConfirmationOpen(true)}
              className="clay-button clay-button--yellow mt-7 inline-flex min-h-14 w-full transform-gpu items-center justify-center px-7 text-base font-extrabold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {unavailable
                ? 'Room Unavailable'
                : `Join for ${room.entryCoins} Coins`}
            </button>

            <p className="mt-4 text-center text-xs leading-5 text-[#6C838A]">
              Coins are reserved only after final confirmation.
            </p>
          </article>

          <div className="grid grid-cols-3 gap-3">
            {[
              [Timer, `${room.turnSeconds}s`, 'Turn'],
              [MessageCircle, room.chatEnabled ? 'On' : 'Off', 'Chat'],
              [Trophy, `${room.expectedWinnerPayout}`, 'Win'],
            ].map(([Icon, value, label]) => {
              const StatIcon = Icon as typeof Timer;

              return (
                <div
                  key={label as string}
                  className="rounded-2xl bg-[#EAFBFC] p-4 text-center text-[#16343D]"
                >
                  <StatIcon
                    className="mx-auto size-5 text-[#008F98]"
                    strokeWidth={2.4}
                  />
                  <p className="mt-2 font-[family-name:var(--font-sora)] text-lg font-extrabold">
                    {value as string}
                  </p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#5C747C]">
                    {label as string}
                  </p>
                </div>
              );
            })}
          </div>
        </aside>
      </section>

      <EntryConfirmationModal
        room={room}
        open={confirmationOpen}
        onClose={() => setConfirmationOpen(false)}
      />
    </>
  );
}
