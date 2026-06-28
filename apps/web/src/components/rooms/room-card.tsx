import Link from 'next/link';
import { ArrowRight, Coins, Timer, Trophy, Users } from 'lucide-react';

import { RoomStatusBadge } from '@/components/rooms/room-status-badge';
import type { Room } from '@/features/rooms/room-types';

type RoomCardProps = {
  room: Room;
};

export function RoomCard({ room }: RoomCardProps) {
  const unavailable =
    room.status === 'FULL' ||
    room.status === 'STARTING' ||
    room.status === 'LOCKED';

  const openSeats = room.capacity - room.joinedPlayers;

  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-white to-[#F4FBFC] shadow-[inset_7px_7px_15px_rgb(255_255_255_/_85%),inset_-9px_-11px_20px_rgb(18_79_86_/_6%),0_14px_40px_rgb(18_79_86_/_8%)] transition duration-300 hover:-translate-y-1 hover:border-[#2DCCD3]/35 hover:shadow-[inset_8px_8px_16px_rgb(255_255_255_/_90%),inset_-10px_-12px_22px_rgb(18_79_86_/_7%),0_22px_55px_rgb(18_79_86_/_12%)]">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#008F98]">
              Hosted by {room.hostName}
            </p>

            <h2 className="mt-2 truncate font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-[-0.03em] text-[#16343D]">
              {room.name}
            </h2>
          </div>

          <RoomStatusBadge status={room.status} />
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {Array.from({ length: room.capacity }).map((_, index) => {
            const occupied = index < room.joinedPlayers;

            return (
              <span
                key={index}
                className={`grid size-11 place-items-center rounded-2xl border text-xs font-extrabold shadow-[inset_4px_4px_10px_rgb(255_255_255_/_72%),inset_-5px_-6px_12px_rgb(18_79_86_/_8%)] ${
                  occupied
                    ? 'border-[#2DCCD3]/30 bg-[#EAFBFC] text-[#008F98]'
                    : 'border-dashed border-[#16343D]/15 bg-white text-[#91A4AA]'
                }`}
                aria-label={occupied ? 'Occupied seat' : 'Available seat'}
              >
                {occupied ? index + 1 : '+'}
              </span>
            );
          })}

          <p className="ml-2 text-sm font-bold text-[#5C747C]">
            {openSeats} seat{openSeats === 1 ? '' : 's'} open
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 border-y border-[#16343D]/8 bg-white/72">
        {[
          [Coins, 'Entry', room.entryCoins, 'coins', 'text-[#8A6A00]'],
          [Users, 'Players', `${room.joinedPlayers}/${room.capacity}`, 'seated', 'text-[#008F98]'],
          [Trophy, 'Payout', room.expectedWinnerPayout, 'coins', 'text-[#247B5D]'],
        ].map(([Icon, label, value, unit, tone]) => {
          const StatIcon = Icon as typeof Coins;

          return (
            <div key={label as string} className="border-r border-[#16343D]/8 p-4 last:border-r-0">
              <div className={`mx-auto grid size-9 place-items-center rounded-xl bg-white ${tone}`}>
                <StatIcon className="size-4" strokeWidth={2.4} />
              </div>
              <p className="mt-2 text-center text-xs font-semibold text-[#7A9097]">
                {label as string}
              </p>
              <p className="mt-1 text-center font-[family-name:var(--font-sora)] text-lg font-extrabold text-[#16343D]">
                {value as string | number}
              </p>
              <p className="text-center text-[11px] font-semibold text-[#7A9097]">
                {unit as string}
              </p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-2xl bg-[#F3F0FA] text-[#65528F]">
            <Timer className="size-5" strokeWidth={2.4} />
          </span>
          <div>
            <p className="text-sm font-extrabold text-[#16343D]">
              {room.speed} table
            </p>
            <p className="text-xs font-semibold text-[#7A9097]">
              {room.turnSeconds}s turns - {room.platformFee} coin platform fee
            </p>
          </div>
        </div>

        {unavailable ? (
          <button
            type="button"
            disabled
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#EDF1F2] px-5 text-sm font-bold text-[#91A4AA]"
          >
            Unavailable
          </button>
        ) : (
          <Link
            href={`/rooms/${room.id}`}
            className="clay-button clay-button--yellow inline-flex min-h-11 transform-gpu items-center justify-center gap-2 px-5 text-sm font-extrabold transition-all duration-300"
          >
            View Room
            <ArrowRight className="size-4" strokeWidth={2.5} />
          </Link>
        )}
      </div>
    </article>
  );
}
