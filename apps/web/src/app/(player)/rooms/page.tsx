import type { Metadata } from 'next';

import { PlayerPage } from '@/components/layout/player-page';
import { RoomListing } from '@/components/rooms/room-listing';

export const metadata: Metadata = {
  title: 'Rooms',
  description: 'Browse public Kitti game rooms.',
};

export default function RoomsPage() {
  return (
    <PlayerPage>
      <RoomListing />
    </PlayerPage>
  );
}