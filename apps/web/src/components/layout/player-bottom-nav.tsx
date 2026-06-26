import { PLAYER_NAVIGATION } from '@/lib/constants';

import { PlayerNavLink } from './player-nav-link';

export function PlayerBottomNav() {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#16343D]/8 bg-white/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 shadow-[0_-12px_30px_rgb(18_79_86_/_8%)] backdrop-blur-xl lg:hidden"
      aria-label="Mobile player navigation"
    >
      <div className="mx-auto grid max-w-lg grid-cols-5 items-end">
        {PLAYER_NAVIGATION.map((item) => (
          <PlayerNavLink
            key={item.href}
            href={item.href}
            label={item.label}
            icon={item.icon}
            mobile
            primary={item.href === '/play'}
          />
        ))}
      </div>
    </nav>
  );
}