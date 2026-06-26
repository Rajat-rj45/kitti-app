import { ButtonLink } from './button-link';

type EmptyStateProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
};

export function EmptyState({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <section className="rounded-[2rem] border border-[#16343D]/8 bg-white p-7 shadow-[0_15px_45px_rgb(18_79_86_/_7%)] sm:p-10">
      <span className="inline-flex rounded-full bg-[#EAFBFC] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
        {eyebrow}
      </span>

      <h2 className="mt-6 max-w-xl font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-[-0.03em] text-[#16343D] sm:text-3xl">
        {title}
      </h2>

      <p className="mt-4 max-w-2xl text-sm leading-7 text-[#5C747C] sm:text-base">
        {description}
      </p>

      {actionLabel && actionHref && (
        <ButtonLink
          href={actionHref}
          className="mt-7"
        >
          {actionLabel}
        </ButtonLink>
      )}
    </section>
  );
}
