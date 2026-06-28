'use client';

import {
  Check,
  Copy,
  Crown,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';

type WaitingRoomHeaderProps = {
  roomName: string;
  roomCode: string;
  onLeave: () => void;
};

export function WaitingRoomHeader({
  roomName,
  roomCode,
  onLeave,
}: WaitingRoomHeaderProps) {
  const [copied, setCopied] = useState(false);

  async function copyRoomCode() {
    try {
      await navigator.clipboard.writeText(roomCode);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <header className="rounded-[1.7rem] border border-white/80 bg-white/90 p-4 shadow-[0_18px_45px_rgb(18_79_86_/_10%)] backdrop-blur-xl sm:p-5 lg:rounded-[2rem] lg:px-7 lg:py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#16343D] text-[#FFCA00] shadow-[0_10px_25px_rgb(22_52_61_/_22%)] sm:size-14">
            <Crown className="size-6" strokeWidth={2.4} />
          </div>

          <div className="hidden h-12 w-px bg-[#16343D]/10 sm:block" />

          <div className="min-w-0">
            <h1 className="truncate font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-[-0.035em] text-[#16343D] sm:text-3xl lg:text-4xl">
              {roomName}
            </h1>

            <div className="mt-1.5 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#2DCCD3] shadow-[0_0_0_4px_rgb(45_204_211_/_12%)]" />
              <span className="text-sm font-semibold text-[#6C838A]">
                Waiting room
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3 sm:flex sm:items-end">
          <div className="min-w-0">
            <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#008F98]">
              Room code
            </p>

            <button
              type="button"
              onClick={copyRoomCode}
              className="flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border border-[#16343D]/8 bg-[#F4FBFC] px-4 text-left shadow-[inset_3px_3px_8px_rgb(255_255_255_/_80%),inset_-4px_-5px_10px_rgb(18_79_86_/_5%)] sm:min-w-44 sm:gap-5"
              aria-label="Copy room code"
            >
              <span className="font-[family-name:var(--font-sora)] text-base font-extrabold tracking-[0.08em] text-[#16343D]">
                {roomCode}
              </span>

              {copied ? (
                <Check className="size-5 text-[#24A878]" strokeWidth={2.5} />
              ) : (
                <Copy className="size-5 text-[#16343D]" strokeWidth={2.2} />
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={onLeave}
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-2xl border border-[#E85661]/18 bg-[#FFF5F6] px-3 text-sm font-bold text-[#E85661] shadow-[inset_4px_4px_10px_rgb(255_255_255_/_85%),inset_-5px_-6px_12px_rgb(232_86_97_/_7%),0_8px_18px_rgb(232_86_97_/_10%)] transition hover:-translate-y-0.5 hover:border-[#E85661]/28 hover:bg-[#FDEDEF] sm:px-5"
          >
            <LogOut className="size-4" strokeWidth={2.4} />
            <span className="hidden sm:inline">Leave Room</span>
            <span className="sm:hidden">Leave</span>
          </button>
        </div>
      </div>
    </header>
  );
}
