'use client';

import { Gamepad2 } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import { InvitePanel } from '@/components/waiting-room/invite-panel';
import { LeaveRoomModal } from '@/components/waiting-room/leave-room-modal';
import { ProtectedRulesPanel } from '@/components/waiting-room/protected-rules-panel';
import { ReadinessPanel } from '@/components/waiting-room/readiness-panel';
import { WaitingRoomHeader } from '@/components/waiting-room/waiting-room-header';
import { WaitingRoomSeat } from '@/components/waiting-room/waiting-room-seat';
import type { WaitingRoomData } from '@/features/waiting-room/waiting-room-types';

type WaitingRoomClientProps = {
  initialRoom: WaitingRoomData;
};

export function WaitingRoomClient({
  initialRoom,
}: WaitingRoomClientProps) {
  const router = useRouter();

  const [seats, setSeats] = useState(initialRoom.seats);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [starting, setStarting] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [leaveOpen, setLeaveOpen] = useState(false);

  const currentPlayer = seats.find(
    (seat) => seat.playerId === initialRoom.currentPlayerId,
  );

  const occupiedSeats = seats.filter((seat) => seat.playerId);

  const allSeatsFilled =
    occupiedSeats.length === initialRoom.rules.capacity;

  const allPlayersReady =
    allSeatsFilled &&
    occupiedSeats.every((seat) => seat.isReady);

  const allEntriesReserved = occupiedSeats.every(
    (seat) => seat.entryReserved,
  );

  const allPlayersOnline = occupiedSeats.every(
    (seat) => seat.connectionState === 'ONLINE',
  );

  const isHost =
    initialRoom.currentPlayerId === initialRoom.hostPlayerId;

  const canStart =
    isHost &&
    allPlayersReady &&
    allEntriesReserved &&
    allPlayersOnline;

  const blockedReason = useMemo(() => {
    if (!isHost) {
      return 'Only the host can start the match.';
    }

    if (!allSeatsFilled) {
      return 'All required seats must be filled.';
    }

    if (!allPlayersReady) {
      return 'Every player must be Ready.';
    }

    if (!allEntriesReserved) {
      return 'All entry reservations must be confirmed.';
    }

    if (!allPlayersOnline) {
      return 'Every player must be connected.';
    }

    return '';
  }, [
    allEntriesReserved,
    allPlayersOnline,
    allPlayersReady,
    allSeatsFilled,
    isHost,
  ]);

  useEffect(() => {
    if (countdown === null) {
      return;
    }

    if (countdown === 0) {
      router.push('/game/demo-match-001');
      return;
    }

    const timer = window.setTimeout(() => {
      setCountdown((value) =>
        value === null ? null : value - 1,
      );
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [countdown, router]);

  function toggleReady() {
    setSeats((current) =>
      current.map((seat) =>
        seat.playerId === initialRoom.currentPlayerId
          ? {
              ...seat,
              isReady: !seat.isReady,
            }
          : seat,
      ),
    );
  }

  async function startMatch() {
    if (!canStart) {
      return;
    }

    setStarting(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 450);
    });

    setStarting(false);
    setCountdown(3);
  }

  async function leaveRoom() {
    setLeaving(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, 450);
    });

    router.push('/rooms');
  }

  return (
    <>
      <WaitingRoomHeader
        roomName={initialRoom.roomName}
        roomCode={initialRoom.roomCode}
        onLeave={() => setLeaveOpen(true)}
      />

      <section className="mt-5 rounded-[2rem] bg-white/55 p-4 sm:p-5 lg:p-7">
        <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#008F98]">
          Player readiness
        </p>

        <h2 className="mt-2 font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#16343D] sm:text-2xl">
          Who is ready to play?
        </h2>

        <div className="mt-4 grid gap-3 lg:grid-cols-3 lg:gap-5">
          {seats.map((seat) => (
            <WaitingRoomSeat
              key={seat.seatNumber}
              seat={seat}
            />
          ))}
        </div>

        <div className="mt-5">
          <ReadinessPanel
            seats={seats}
            currentPlayerReady={Boolean(currentPlayer?.isReady)}
            canStart={canStart}
            starting={starting}
            blockedReason={blockedReason}
            onToggleReady={toggleReady}
            onStart={startMatch}
          />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <InvitePanel
            roomCode={initialRoom.roomCode}
            roomId={initialRoom.id}
          />

          <ProtectedRulesPanel room={initialRoom} />
        </div>
      </section>

      {countdown !== null && (
        <div
          className="fixed inset-0 z-[120] grid place-items-center bg-[#16343D]/82 p-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm rounded-[2.2rem] bg-white p-7 text-center shadow-[0_35px_100px_rgb(0_0_0_/_30%)]">
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#2DCCD3] text-white">
              <Gamepad2 className="size-6" strokeWidth={2.5} />
            </span>

            <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#008F98]">
              Match starting
            </p>

            <p className="mt-4 font-[family-name:var(--font-sora)] text-7xl font-extrabold text-[#FFCA00]">
              {countdown === 0 ? 'Go' : countdown}
            </p>
          </div>
        </div>
      )}

      <LeaveRoomModal
        open={leaveOpen}
        loading={leaving}
        onClose={() => setLeaveOpen(false)}
        onConfirm={leaveRoom}
      />
    </>
  );
}