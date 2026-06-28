import { notFound } from 'next/navigation';

import { PlayerPage } from '@/components/layout/player-page';
import { RoomDetail } from '@/components/rooms/room-detail';
import { MOCK_ROOMS } from '@/features/rooms/data/mock-rooms';

type RoomDetailPageProps = {
  params: Promise<{
    roomId: string;
  }>;
};

export function generateStaticParams() {
  return MOCK_ROOMS.map((room) => ({
    roomId: room.id,
  }));
}

export default async function RoomDetailPage({
  params,
}: RoomDetailPageProps) {
  const { roomId } = await params;

  const room = MOCK_ROOMS.find((item) => item.id === roomId);

  if (!room) {
    notFound();
  }

  return (
    <PlayerPage>
      <RoomDetail room={room} />
    </PlayerPage>
  );
}