import type { RoomStatus } from '@/features/rooms/room-types';

type RoomStatusBadgeProps = {
  status: RoomStatus;
};

const statusStyles: Record<
  RoomStatus,
  {
    label: string;
    className: string;
  }
> = {
  JOINABLE: {
    label: 'Joinable',
    className: 'bg-[#EAFBFC] text-[#008F98]',
  },
  ALMOST_FULL: {
    label: 'Almost full',
    className: 'bg-[#FFF7D6] text-[#8A6A00]',
  },
  FULL: {
    label: 'Full',
    className: 'bg-[#FDEDEF] text-[#B63844]',
  },
  STARTING: {
    label: 'Starting',
    className: 'bg-[#F3F0FA] text-[#65528F]',
  },
  LOCKED: {
    label: 'Locked',
    className: 'bg-[#EDF1F2] text-[#5C747C]',
  },
};

export function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
  const style = statusStyles[status];

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-xs font-bold ${style.className}`}
    >
      {style.label}
    </span>
  );
}