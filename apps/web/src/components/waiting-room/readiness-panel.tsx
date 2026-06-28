import {
  Check,
  Hourglass,
} from 'lucide-react';

import { ReadinessProgress } from '@/components/waiting-room/readiness-progress';
import type { WaitingRoomSeat } from '@/features/waiting-room/waiting-room-types';

type ReadinessPanelProps = {
  seats: WaitingRoomSeat[];
  currentPlayerReady: boolean;
  canStart: boolean;
  starting: boolean;
  blockedReason: string;
  onToggleReady: () => void;
  onStart: () => void;
};

export function ReadinessPanel({
  seats,
  currentPlayerReady,
  canStart,
  starting,
  blockedReason,
  onToggleReady,
  onStart,
}: ReadinessPanelProps) {
  const occupied = seats.filter((seat) => seat.playerId);
  const readyCount = occupied.filter((seat) => seat.isReady).length;

  return (
    <section className="rounded-[2rem] bg-[#163F49] p-5 text-white shadow-[0_22px_55px_rgb(22_52_61_/_24%)] sm:p-7 lg:p-8">
      <div className="grid gap-7 lg:grid-cols-[auto_1fr_1fr] lg:items-center">
        <div className="flex justify-center lg:justify-start">
          <ReadinessProgress
            ready={readyCount}
            total={occupied.length}
          />
        </div>

        <div className="border-white/15 lg:border-l lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#7DE2E6]">
            Match readiness
          </p>

          <div className="mt-4 space-y-2">
            {occupied.map((seat) => (
              <div
                key={seat.playerId}
                className="flex items-center justify-between gap-3 rounded-2xl bg-white/10 px-3 py-2.5"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#2DCCD3] text-sm font-extrabold text-white">
                    {seat.initials}
                  </span>

                  <span className="truncate text-sm font-bold">
                    {seat.displayName}
                  </span>
                </div>

                <span
                  className={`flex items-center gap-2 text-xs font-extrabold ${
                    seat.isReady ? 'text-[#9DE6B9]' : 'text-[#FFD45C]'
                  }`}
                >
                  {seat.isReady && (
                    <Check className="size-4" strokeWidth={3} />
                  )}
                  {seat.isReady ? 'Ready' : 'Not Ready'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-white/15 lg:border-l lg:pl-8">
          <div className="flex items-start gap-3">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#2DCCD3]/20 text-[#7DE2E6]">
              <Hourglass className="size-5" strokeWidth={2.4} />
            </span>

            <div>
              <p className="font-[family-name:var(--font-sora)] text-lg font-extrabold text-[#7DE2E6]">
                {currentPlayerReady
                  ? 'Waiting for the host'
                  : 'Confirm your readiness'}
              </p>

              <p className="mt-1 text-sm leading-6 text-white/65">
                {currentPlayerReady
                  ? 'All players must be ready before the match can start.'
                  : 'Press Ready after checking your room status.'}
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <button
              type="button"
              onClick={onToggleReady}
              className="clay-button clay-button--yellow inline-flex min-h-11 w-full transform-gpu items-center justify-center px-5 text-sm font-extrabold text-[#16343D] transition-all duration-300"
            >
              <span className="relative z-10 leading-none">
                {currentPlayerReady ? 'Cancel Ready' : 'I Am Ready'}
              </span>
            </button>

            <button
              type="button"
              onClick={onStart}
              disabled={!canStart || starting}
              className={`inline-flex min-h-11 w-full transform-gpu items-center justify-center px-5 text-sm font-extrabold transition-all duration-300 disabled:cursor-not-allowed ${
                canStart
                  ? 'clay-button clay-button--success text-white'
                  : 'rounded-full bg-white/12 text-white/35 hover:bg-white/18'
              }`}
            >
              <span className="relative z-10 leading-none">
                {starting ? 'Starting...' : 'Start Match'}
              </span>
            </button>
          </div>

          <p className="mt-4 text-center text-xs font-semibold text-white/65">
            {canStart ? 'Room is ready to start.' : blockedReason}
          </p>
        </div>
      </div>
    </section>
  );
}
