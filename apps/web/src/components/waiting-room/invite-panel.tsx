'use client';

import {
  Check,
  Copy,
  Send,
  Share2,
  Sparkles,
} from 'lucide-react';
import { useState } from 'react';

type InvitePanelProps = {
  roomCode: string;
  roomId: string;
};

export function InvitePanel({
  roomCode,
  roomId,
}: InvitePanelProps) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
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

  async function shareInvite() {
    const url = `${window.location.origin}/rooms/${roomId}`;

    if (navigator.share) {
      await navigator.share({
        title: 'Join my Kitti room',
        text: `Use room code ${roomCode}`,
        url,
      });

      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
  }

  return (
    <aside className="rounded-[2rem] border border-[#2DCCD3]/25 bg-gradient-to-br from-white via-[#F7FEFF] to-[#EAFBFC] p-5 shadow-[inset_7px_7px_16px_rgb(255_255_255_/_86%),inset_-10px_-12px_22px_rgb(45_204_211_/_6%),0_16px_40px_rgb(18_79_86_/_8%)] sm:p-7">
      <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-center">
        <div className="relative mx-auto grid size-24 place-items-center md:mx-0 md:size-28">
          <span className="absolute left-0 top-1 text-[#2DCCD3]">
            <Sparkles className="size-5" strokeWidth={2.4} />
          </span>

          <span className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-[#46D9DE] to-[#19B9C0] text-white shadow-[0_18px_32px_rgb(45_204_211_/_28%)] md:size-24">
            <Send className="size-9 md:size-10" strokeWidth={2.1} />
          </span>
        </div>

        <div className="text-center md:text-left">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#008F98] sm:text-2xl">
            Invite players
          </h2>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#5C747C]">
            Share this private room code with friends before the match starts.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={copyCode}
          className="flex min-h-13 items-center justify-between gap-4 rounded-2xl border border-[#16343D]/8 bg-white/85 px-5 text-[#16343D] shadow-[inset_4px_4px_10px_rgb(255_255_255_/_86%),inset_-5px_-6px_12px_rgb(18_79_86_/_5%),0_8px_20px_rgb(18_79_86_/_7%)] transition hover:-translate-y-0.5 hover:bg-white"
          aria-label="Copy room code"
        >
          <span className="font-[family-name:var(--font-sora)] text-base font-extrabold tracking-[0.1em]">
            {roomCode}
          </span>

          {copied ? (
            <Check className="size-5 shrink-0 text-[#24A878]" strokeWidth={2.6} />
          ) : (
            <Copy className="size-5 shrink-0 text-[#16343D]" strokeWidth={2.3} />
          )}
        </button>

        <button
          type="button"
          onClick={shareInvite}
          className="clay-button clay-button--glass inline-flex min-h-13 items-center justify-center gap-2 px-5 text-sm font-extrabold"
        >
          <Share2 className="size-4" strokeWidth={2.4} />
          Share Invite
        </button>
      </div>
    </aside>
  );
}
