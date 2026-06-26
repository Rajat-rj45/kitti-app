import { RoundCardShowcase } from '@/components/game/round-card-showcase';
import { SiteHeader } from '@/components/layout/site-header';
import { ButtonLink } from '@/components/ui/button-link';

const stats = [
  {
    value: '3-5',
    label: 'Players per room',
  },
  {
    value: '9',
    label: 'Cards per player',
  },
  {
    value: '3',
    label: 'Ordered hands',
  },
] as const;

const features = [
  {
    number: '01',
    title: 'Create private rooms',
    description:
      'Invite three to five players using a secure room code and clear entry details.',
  },
  {
    number: '02',
    title: 'Arrange your strategy',
    description:
      'Split nine cards into three ordered hands before confirming your final arrangement.',
  },
  {
    number: '03',
    title: 'Play transparent rounds',
    description:
      'Follow every reveal, round winner and match result through a clear server-controlled flow.',
  },
] as const;

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#16343D]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden bg-white">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
          >
            <div className="absolute -left-40 top-10 size-[34rem] rounded-full bg-[#2DCCD3]/10 blur-3xl" />
            <div className="absolute -right-28 top-0 size-96 rounded-full bg-[#FFCA00]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto grid min-h-[calc(100svh-80px)] w-full max-w-7xl items-center gap-8 px-5 py-8 sm:px-7 sm:py-10 lg:grid-cols-[1fr_0.95fr] lg:gap-10 lg:px-10 lg:py-10">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#EAFBFC] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#008F98]">
                <span className="size-2 rounded-full bg-[#2DCCD3]" />
                Multiplayer card strategy
              </div>

              <h1 className="mt-5 font-[family-name:var(--font-sora)] text-[clamp(2.35rem,4.6vw,4.2rem)] font-extrabold leading-[1.02] tracking-[-0.045em] text-[#16343D]">
                Play smarter.
                <span className="mt-1 block text-[#2DCCD3]">
                  Win the Kitti.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#5C747C] sm:text-lg">
                Arrange nine cards into three ordered hands, compete across
                three rounds and experience a clean multiplayer card game built
                around strategy.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/login" size="lg">
                  Start Playing
                </ButtonLink>

                <ButtonLink href="/how-to-play" variant="secondary" size="lg">
                  Learn How to Play
                </ButtonLink>
              </div>

              <dl className="mt-8 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-3xl border border-[#16343D]/8 bg-white p-4 shadow-[0_10px_35px_rgb(18_79_86_/_8%)]"
                  >
                    <dd className="font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#2DCCD3]">
                      {stat.value}
                    </dd>

                    <dt className="mt-1 text-sm font-medium text-[#5C747C]">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative mx-auto w-full max-w-xl">
              <RoundCardShowcase />
            </div>
          </div>
        </section>

        <section className="bg-[#F4FBFC] py-20">
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-7 lg:px-10">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#008F98]">
                How it works
              </p>

              <h2 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.035em] text-[#16343D] sm:text-5xl">
                Simple to learn.
                <span className="block text-[#2DCCD3]">
                  Strategic to master.
                </span>
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="rounded-[2rem] bg-white p-7 shadow-[0_15px_45px_rgb(18_79_86_/_8%)] transition duration-200 hover:-translate-y-1"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#EAFBFC] text-sm font-extrabold text-[#008F98]">
                    {feature.number}
                  </span>

                  <h3 className="mt-7 font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#16343D]">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#5C747C]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
