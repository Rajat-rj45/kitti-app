export type PlayerConnectionState =
  | 'ONLINE'
  | 'RECONNECTING'
  | 'OFFLINE';

export type WaitingRoomSeat = {
  seatNumber: number;
  playerId: string | null;
  displayName: string | null;
  initials: string | null;
  avatarTone: 'cyan' | 'yellow' | 'teal' | 'green' | 'empty';
  isHost: boolean;
  isCurrentPlayer: boolean;
  isReady: boolean;
  entryReserved: boolean;
  connectionState: PlayerConnectionState;
  pingMs: number | null;
};

export type WaitingRoomRules = {
  capacity: 3 | 4 | 5;
  entryCoins: number;
  platformFee: number;
  expectedPot: number;
  expectedWinnerPayout: number;
  turnSeconds: number;
  reconnectSeconds: number;
  chatEnabled: boolean;
};

export type WaitingRoomData = {
  id: string;
  roomName: string;
  roomCode: string;
  hostPlayerId: string;
  currentPlayerId: string;
  ruleVersion: string;
  seats: WaitingRoomSeat[];
  rules: WaitingRoomRules;
};