import {
  House,
  PlayCircle,
  Rows3,
  UserRound,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';

import type { PlayerNavigationIcon } from '@/lib/constants';

type NavigationIconProps = {
  name: PlayerNavigationIcon;
  className?: string;
};

const icons: Record<PlayerNavigationIcon, LucideIcon> = {
  home: House,
  rooms: Rows3,
  play: PlayCircle,
  wallet: WalletCards,
  profile: UserRound,
};

export function NavigationIcon({
  name,
  className = 'size-5',
}: NavigationIconProps) {
  const Icon = icons[name];

  return <Icon className={className} strokeWidth={2.2} aria-hidden="true" />;
}
