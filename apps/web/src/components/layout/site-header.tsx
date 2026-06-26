import Link from 'next/link';

import { ButtonLink } from '@/components/ui/button-link';
import { KittiLogo } from '@/components/ui/kitti-logo';

const links = [
  {
    label: 'How to Play',
    href: '/how-to-play',
  },
  {
    label: 'Fair Play',
    href: '/fair-play',
  },
  {
    label: 'Support',
    href: '/support',
  },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#16343D]/8 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-10">
        <Link href="/" aria-label="Kitti home">
          <KittiLogo />
        </Link>

        <nav
          className="hidden items-center gap-9 md:flex"
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-[#5C747C] transition hover:text-[#2DCCD3]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <ButtonLink
          href="/login"
          size="sm"
        >
          Login
        </ButtonLink>
      </div>
    </header>
  );
}
