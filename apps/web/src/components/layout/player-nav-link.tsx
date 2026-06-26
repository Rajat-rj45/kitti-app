'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavigationIcon } from '@/components/ui/navigation-icon';
import type { PlayerNavigationIcon } from '@/lib/constants';

type PlayerNavLinkProps = {
  href: string;
  label: string;
  icon: PlayerNavigationIcon;
  mobile?: boolean;
  primary?: boolean;
};

export function PlayerNavLink({
  href,
  label,
  icon,
  mobile = false,
  primary = false,
}: PlayerNavLinkProps) {
  const pathname = usePathname();

  const active =
    pathname === href ||
    (href !== '/home' && pathname.startsWith(`${href}/`));

  if (mobile && primary) {
    return (
      <Link
        href={href}
        aria-label={label}
        aria-current={active ? 'page' : undefined}
        className="group -mt-7 flex flex-col items-center gap-1"
      >
        <span
          className={`grid size-14 transform-gpu place-items-center rounded-full border-4 border-white shadow-[0_10px_25px_rgb(45_204_211_/_28%)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_34px_rgb(45_204_211_/_34%)] group-active:translate-y-0 ${
            active
              ? 'bg-[#16343D] text-white'
              : 'bg-[#2DCCD3] text-white group-hover:bg-[#21B8BF]'
          }`}
        >
          <NavigationIcon name={icon} className="size-6" />
        </span>

        <span
          className={`text-[11px] font-bold ${
            active ? 'text-[#16343D]' : 'text-[#5C747C]'
          }`}
        >
          {label}
        </span>
      </Link>
    );
  }

  if (mobile) {
    return (
      <Link
        href={href}
        aria-current={active ? 'page' : undefined}
        className={`flex min-w-0 transform-gpu flex-col items-center gap-1 rounded-xl px-2 py-2 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
          active ? 'text-[#2DCCD3]' : 'text-[#7A9097] hover:text-[#16343D]'
        }`}
      >
        <NavigationIcon name={icon} />

        <span className="truncate text-[11px] font-semibold">{label}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`group flex min-h-12 transform-gpu items-center gap-3 rounded-2xl px-4 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
        active
          ? 'bg-[#EAFBFC] text-[#008F98] shadow-[0_10px_24px_rgb(45_204_211_/_12%)]'
          : 'text-[#5C747C] hover:bg-[#F4FBFC] hover:text-[#16343D] hover:shadow-[0_10px_24px_rgb(18_79_86_/_8%)]'
      }`}
    >
      <NavigationIcon
        name={icon}
        className={`size-5 transition ${
          active
            ? 'text-[#2DCCD3]'
            : 'text-[#7A9097] group-hover:text-[#2DCCD3]'
        }`}
      />

      <span>{label}</span>
    </Link>
  );
}
