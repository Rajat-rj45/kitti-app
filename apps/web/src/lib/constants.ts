export const APP_NAME = 'Kitti';

export const APP_DESCRIPTION =
  'A real-time multiplayer three-card battle game with private rooms and transparent play-coin records.';

export const PLAYER_NAVIGATION = [
  {
    label: 'Home',
    href: '/home',
    icon: 'home',
  },
  {
    label: 'Rooms',
    href: '/rooms',
    icon: 'rooms',
  },
  {
    label: 'Play',
    href: '/play',
    icon: 'play',
  },
  {
    label: 'Wallet',
    href: '/wallet',
    icon: 'wallet',
  },
  {
    label: 'Profile',
    href: '/profile',
    icon: 'profile',
  },
] as const;

export type PlayerNavigationIcon =
  (typeof PLAYER_NAVIGATION)[number]['icon'];