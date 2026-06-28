'use client';

import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

import type { Room } from '@/features/rooms/room-types';

type EntryConfirmationModalProps = {
  room: Room;
  open: boolean;
  onClose: () => void;
  currentBalance?: number;
};

export function EntryConfirmationModal({
  room,
  open,
  onClose,
  currentBalance = 100,
}: EntryConfirmationModalProps) {
  const router = useRouter();

  if (!open) {
    return null;
  }

  const balanceAfterJoin = currentBalance - room.entryCoins;
  const insufficientBalance = balanceAfterJoin < 0;

  function handleConfirm() {
    if (insufficientBalance) {
      router.push('/wallet');
      return;
    }

    router.push(`/rooms/${room.id}/waiting`);
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-[#16343D]/45 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="entry-confirmation-title"
    >
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] border border-white/80 bg-white p-6 shadow-[0_30px_90px_rgb(0_0_0_/_22%)] sm:rounded-[2rem] sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="inline-flex rounded-full bg-[#FFF7D6] px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-[#8A6A00]">
              Final confirmation
            </span>

            <h2
              id="entry-confirmation-title"
              className="mt-5 font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-[-0.03em] text-[#16343D]"
            >
              Join {room.name}?
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid size-11 shrink-0 place-items-center rounded-full border border-[#16343D]/10 bg-white text-[#5C747C] transition hover:bg-[#F5FBFC]"
            aria-label="Close entry confirmation"
          >
            <X className="size-5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="mt-7 overflow-hidden rounded-2xl border border-[#16343D]/8">
          {[
            ['Room entry', `${room.entryCoins} coins`],
            ['Current balance', `${currentBalance} coins`],
            ['Balance after joining', `${balanceAfterJoin} coins`],
            ['Total room pot', `${room.expectedPot} coins`],
            ['Platform fee', `${room.platformFee} coins`],
            ['Expected winner payout', `${room.expectedWinnerPayout} coins`],
          ].map(([label, value]) => (
            <div
              key={label}
              className="flex items-center justify-between gap-4 border-b border-[#16343D]/8 px-5 py-4 last:border-b-0"
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

        <div
          className={`mt-5 rounded-2xl p-4 ${
            insufficientBalance
              ? 'bg-[#FDEDEF] text-[#B63844]'
              : 'bg-[#EAFBFC] text-[#41666E]'
          }`}
        >
          <p className="text-sm leading-6">
            {insufficientBalance
              ? 'Your available balance is too low for this room.'
              : 'Your entry coins become reserved after joining and cannot be used in another room until released or settled.'}
          </p>
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex min-h-13 flex-1 items-center justify-center rounded-full border border-[#16343D]/12 bg-white px-6 text-sm font-bold text-[#5C747C] transition hover:bg-[#F5FBFC]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="clay-button clay-button--yellow inline-flex min-h-13 flex-1 transform-gpu items-center justify-center px-6 text-sm font-extrabold transition-all duration-300"
          >
            {insufficientBalance
              ? 'Add Coins'
              : `Confirm ${room.entryCoins} Coins`}
          </button>
        </div>
      </div>
    </div>
  );
}
