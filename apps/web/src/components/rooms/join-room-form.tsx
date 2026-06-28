'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { CheckCircle2, KeyRound, ShieldCheck } from 'lucide-react';

export function JoinRoomForm() {
  const router = useRouter();

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleCodeChange(value: string) {
    const normalized = value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 6);

    setCode(normalized);
    setError('');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (code.length !== 6) {
      setError('Enter the complete six-character room code.');
      return;
    }

    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    if (code === 'KITTI1') {
      router.push('/rooms/room-emerald-01');
      return;
    }

    setSubmitting(false);
    setError('This room code is invalid or has expired.');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-white to-[#F4FBFC] shadow-[inset_8px_8px_18px_rgb(255_255_255_/_86%),inset_-10px_-12px_22px_rgb(18_79_86_/_7%),0_18px_48px_rgb(18_79_86_/_9%)]"
    >
      <div className="border-b border-[#16343D]/8 p-6 sm:p-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-[#FFF7D6] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8A6A00]">
          <KeyRound className="size-4" strokeWidth={2.5} />
          Private invitation
        </span>

        <h1 className="mt-6 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] text-[#16343D] sm:text-4xl">
          Join with a room code
        </h1>

        <p className="mt-4 text-sm leading-7 text-[#5C747C]">
          Enter the six-character code shared by the room host. You will review
          table rules, entry coins, and payout before confirming.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        <label
          htmlFor="room-code"
          className="mb-3 block text-sm font-extrabold text-[#16343D]"
        >
          Room code
        </label>

        <div className="relative">
          <input
            id="room-code"
            type="text"
            value={code}
            onChange={(event) => handleCodeChange(event.target.value)}
            maxLength={6}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            placeholder="KITTI1"
            aria-invalid={Boolean(error)}
            aria-describedby="room-code-message"
            className={`min-h-16 w-full rounded-2xl border bg-white px-5 text-center font-[family-name:var(--font-sora)] text-2xl font-extrabold uppercase tracking-[0.24em] text-[#16343D] outline-none transition placeholder:text-[#C0CDD1] focus:border-[#2DCCD3] focus:ring-4 focus:ring-[#2DCCD3]/10 sm:text-3xl sm:tracking-[0.34em] ${
              error ? 'border-[#E85661]' : 'border-[#16343D]/12'
            }`}
          />

          {code.length === 6 && !error ? (
            <span className="absolute right-4 top-1/2 grid size-8 -translate-y-1/2 place-items-center rounded-full bg-[#EDF8F3] text-[#247B5D]">
              <CheckCircle2 className="size-5" strokeWidth={2.5} />
            </span>
          ) : null}
        </div>

        <p
          id="room-code-message"
          className={`mt-3 min-h-5 text-sm ${
            error ? 'font-semibold text-[#C93C48]' : 'text-[#6C838A]'
          }`}
        >
          {error || 'Use KITTI1 for the current frontend demo.'}
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="clay-button clay-button--yellow mt-6 inline-flex min-h-14 w-full transform-gpu items-center justify-center gap-2 px-7 text-base font-extrabold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Checking room...' : 'Find Room'}
        </button>

        <div className="mt-6 flex gap-3 rounded-2xl bg-[#EAFBFC] p-4">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[#008F98]">
            <ShieldCheck className="size-5" strokeWidth={2.4} />
          </span>

          <p className="text-sm leading-6 text-[#5C747C]">
            A room code gives access only to that room. It never logs you in,
            reveals private information, or spends coins automatically.
          </p>
        </div>
      </div>
    </form>
  );
}










