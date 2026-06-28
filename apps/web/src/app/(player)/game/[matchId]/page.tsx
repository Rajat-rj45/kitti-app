import {
  Gamepad2,
  Layers3,
  ShieldCheck,
} from 'lucide-react';

import { PlayerPage } from '@/components/layout/player-page';

type GamePlaceholderPageProps = {
  params: Promise<{
    matchId: string;
  }>;
};

export default async function GamePlaceholderPage({
  params,
}: GamePlaceholderPageProps) {
  const { matchId } = await params;

  return (
    <PlayerPage>
      <section className="rounded-[2rem] bg-[#16343D] p-7 text-white shadow-[0_24px_65px_rgb(22_52_61_/_22%)] sm:p-10">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#7DE2E6]">
          <Gamepad2 className="size-4" />
          Match created
        </span>

        <h1 className="mt-6 font-[family-name:var(--font-sora)] text-3xl font-extrabold sm:text-5xl">
          Card arrangement comes next
        </h1>

        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">
          Match reference: {matchId}. The nine-card arrangement interface will
          be implemented on Day 7.
        </p>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        <article className="rounded-[2rem] bg-gradient-to-br from-white to-[#EAFBFC] p-6 shadow-[0_14px_35px_rgb(18_79_86_/_8%)]">
          <Layers3 className="size-6 text-[#008F98]" />
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#16343D]">
            Nine private cards
          </h2>
        </article>

        <article className="rounded-[2rem] bg-gradient-to-br from-white to-[#FFF7D6] p-6 shadow-[0_14px_35px_rgb(138_106_0_/_8%)]">
          <ShieldCheck className="size-6 text-[#8A6A00]" />
          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#16343D]">
            Server-controlled deal
          </h2>
        </article>
      </section>
    </PlayerPage>
  );
}