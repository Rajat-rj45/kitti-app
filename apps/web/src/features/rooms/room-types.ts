export type RoomSpeed = 'Relaxed' | 'Standard' | 'Fast';

export type RoomStatus =
  | 'JOINABLE'
  | 'ALMOST_FULL'
  | 'FULL'
  | 'STARTING'
  | 'LOCKED';

export type Room = {
  id: string;
  name: string;
  hostName: string;
  capacity: 3 | 4 | 5;
  joinedPlayers: number;
  entryCoins: number;
  platformFee: number;
  expectedPot: number;
  expectedWinnerPayout: number;
  speed: RoomSpeed;
  isPrivate: boolean;
  status: RoomStatus;
  turnSeconds: number;
  reconnectSeconds: number;
  chatEnabled: boolean;
  spectatorsEnabled: boolean;
};