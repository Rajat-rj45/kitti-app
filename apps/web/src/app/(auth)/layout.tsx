import Link from 'next/link';

import { KittiLogo } from '@/components/ui/kitti-logo';

type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5FBFC] text-[#16343D]">
      <header className="border-b border-[#16343D]/8 bg-white">
        <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-10">
          <Link href="/" aria-label="Return to Kitti home">
            <KittiLogo />
          </Link>

          <Link
            href="/support"
            className="text-sm font-bold text-[#008F98] transition hover:text-[#2DCCD3]"
          >
            Need help?
          </Link>
        </div>
      </header>

      <main className="relative grid min-h-[calc(100vh-80px)] overflow-hidden lg:grid-cols-[0.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[#2DCCD3] p-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div
            className="absolute -left-32 -top-32 size-96 rounded-full bg-white/10"
            aria-hidden="true"
          />

          <div
            className="absolute -bottom-28 -right-28 size-96 rounded-full bg-[#FFCA00]/25"
            aria-hidden="true"
          />

          <div className="relative max-w-xl">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em]">
              Private card strategy
            </span>

            <h1 className="mt-8 font-[family-name:var(--font-sora)] text-5xl font-extrabold leading-[1.04] tracking-[-0.045em]">
              Arrange your cards.
              <span className="block text-[#16343D]">Control your game.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-white/85">
              Join private rooms, build three ordered hands and follow every
              round through a clear multiplayer experience.
            </p>
          </div>

          <div className="relative grid grid-cols-3 gap-4">
            {[
              ['3-5', 'Players'],
              ['9', 'Cards each'],
              ['3', 'Hands'],
            ].map(([value, label]) => (
              <div
                key={label}
                className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur"
              >
                <p className="font-[family-name:var(--font-sora)] text-3xl font-extrabold">
                  {value}
                </p>

                <p className="mt-2 text-sm text-white/75">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="relative flex items-center justify-center px-4 py-10 sm:px-7 lg:px-12">
          <div
            className="pointer-events-none absolute right-0 top-0 size-80 rounded-full bg-[#2DCCD3]/8 blur-3xl"
            aria-hidden="true"
          />

          <div className="relative w-full max-w-lg">{children}</div>
        </section>
      </main>
    </div>
  );
}
