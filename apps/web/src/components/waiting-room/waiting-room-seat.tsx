import {
  Check,
  Crown,
  ShieldCheck,
  Signal,
} from 'lucide-react';

import type { WaitingRoomSeat as WaitingRoomSeatData } from '@/features/waiting-room/waiting-room-types';

type WaitingRoomSeatProps = {
  seat: WaitingRoomSeatData;
};

const avatarStyles = {
  cyan: 'bg-[#2DCCD3] text-white',
  yellow: 'bg-[#FFCA00] text-[#16343D]',
  teal: 'bg-[#16343D] text-white',
  green: 'bg-[#24A878] text-white',
  empty: 'bg-[#EDF3F4] text-[#91A4AA]',
} as const;

export function WaitingRoomSeat({
  seat,
}: WaitingRoomSeatProps) {
  return (
    <article
      className={`rounded-[1.5rem] border bg-white p-4 shadow-[0_12px_30px_rgb(18_79_86_/_8%)] sm:p-5 lg:rounded-[1.8rem] ${
        seat.isCurrentPlayer
          ? 'border-[#2DCCD3]/50'
          : 'border-[#16343D]/8'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`grid size-12 shrink-0 place-items-center rounded-2xl font-[family-name:var(--font-sora)] text-lg font-extrabold shadow-[0_8px_18px_rgb(18_79_86_/_12%)] sm:size-14 ${
              avatarStyles[seat.avatarTone]
            }`}
          >
            {seat.initials}
          </span>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate font-[family-name:var(--font-sora)] text-lg font-extrabold text-[#16343D]">
                {seat.displayName}
              </h3>

              {seat.isCurrentPlayer && (
                <span className="rounded-full bg-[#EAFBFC] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#008F98]">
                  You
                </span>
              )}
            </div>

            <p className="mt-1 text-xs font-semibold text-[#6C838A]">
              Seat {seat.seatNumber}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {seat.isHost && (
            <span
              className="grid size-10 place-items-center rounded-2xl bg-[#FFF7D6] text-[#8A6A00]"
              aria-label="Room host"
            >
              <Crown className="size-5" strokeWidth={2.3} />
            </span>
          )}

          <span className="flex items-center gap-1.5 text-xs font-extrabold text-[#247B5D]">
            <Signal className="size-4" strokeWidth={2.4} />
            {seat.pingMs} ms
          </span>
        </div>
      </div>

      <div className="mt-4 h-px bg-[#16343D]/8" />

      <div className="mt-4 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-[#5C747C]">
          <ShieldCheck className="size-5 text-[#008F98]" strokeWidth={2.3} />
          Entry
        </span>

        <span className="text-sm font-extrabold text-[#247B5D]">
          {seat.entryReserved ? 'Reserved' : 'Pending'}
        </span>

        <span
          className={`flex items-center gap-2 text-sm font-extrabold ${
            seat.isReady ? 'text-[#247B5D]' : 'text-[#D99A00]'
          }`}
        >
          <span
            className={`grid size-8 place-items-center rounded-full ${
              seat.isReady ? 'bg-[#DFF6EC]' : 'bg-[#FFF7D6]'
            }`}
          >
            {seat.isReady ? (
              <Check className="size-4" strokeWidth={3} />
            ) : (
              <span className="size-3 rounded-full border-2 border-dashed border-[#D99A00]" />
            )}
          </span>

          {seat.isReady ? 'Ready' : 'Not Ready'}
        </span>
      </div>
    </article>
  );
}