'use client';

import {
  LogOut,
  X,
} from 'lucide-react';

type LeaveRoomModalProps = {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function LeaveRoomModal({
  open,
  loading,
  onClose,
  onConfirm,
}: LeaveRoomModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-end justify-center bg-[#16343D]/45 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="leave-room-title"
    >
      <div className="w-full max-w-md rounded-t-[2rem] bg-white p-6 shadow-[0_30px_90px_rgb(0_0_0_/_22%)] sm:rounded-[2rem] sm:p-8">
        <div className="flex items-center justify-between">
          <span className="grid size-12 place-items-center rounded-2xl bg-[#FDEDEF] text-[#E85661]">
            <LogOut className="size-5" strokeWidth={2.4} />
          </span>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="grid size-10 place-items-center rounded-full bg-[#F4FBFC] text-[#5C747C]"
            aria-label="Close leave confirmation"
          >
            <X className="size-5" />
          </button>
        </div>

        <h2
          id="leave-room-title"
          className="mt-6 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#16343D]"
        >
          Leave this room?
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#5C747C]">
          This demo will return you to the room list. Real coin-release rules
          will be controlled by the backend.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="clay-button clay-button--glass min-h-12 px-5 text-sm font-extrabold"
          >
            Stay
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#E85661] px-5 text-sm font-extrabold text-white shadow-[0_10px_25px_rgb(232_86_97_/_22%)] disabled:opacity-60"
          >
            {loading ? 'Leaving...' : 'Leave Room'}
          </button>
        </div>
      </div>
    </div>
  );
}