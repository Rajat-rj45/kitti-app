import { notFound } from 'next/navigation';

import { PlayerPage } from '@/components/layout/player-page';
import { WaitingRoomClient } from '@/components/waiting-room/waiting-room-client';
import { MOCK_WAITING_ROOM } from '@/features/waiting-room/data/mock-waiting-room';

type WaitingRoomPageProps = {
  params: Promise<{
    roomId: string;
  }>;
};

export default async function WaitingRoomPage({
  params,
}: WaitingRoomPageProps) {
  const { roomId } = await params;

  if (roomId !== MOCK_WAITING_ROOM.id) {
    notFound();
  }

  return (
    <PlayerPage className="max-w-[1600px]">
      <WaitingRoomClient initialRoom={MOCK_WAITING_ROOM} />
    </PlayerPage>
  );
}