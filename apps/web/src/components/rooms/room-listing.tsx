'use client';

import Link from 'next/link';
import {
  ArrowRight,
  KeyRound,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { useMemo, useState } from 'react';

import { RoomCard } from '@/components/rooms/room-card';
import { MOCK_ROOMS } from '@/features/rooms/data/mock-rooms';

type CapacityFilter = 'ALL' | '3' | '4' | '5';

const capacityOptions: {
  label: string;
  value: CapacityFilter;
}[] = [
  {
    label: 'All rooms',
    value: 'ALL',
  },
  {
    label: '3 players',
    value: '3',
  },
  {
    label: '4 players',
    value: '4',
  },
  {
    label: '5 players',
    value: '5',
  },
];

export function RoomListing() {
  const [capacity, setCapacity] = useState<CapacityFilter>('ALL');
  const [joinableOnly, setJoinableOnly] = useState(true);

  const rooms = useMemo(() => {
    return MOCK_ROOMS.filter((room) => {
      const matchesCapacity =
        capacity === 'ALL' || room.capacity === Number(capacity);

      const matchesAvailability =
        !joinableOnly ||
        room.status === 'JOINABLE' ||
        room.status === 'ALMOST_FULL';

      return matchesCapacity && matchesAvailability;
    });
  }, [capacity, joinableOnly]);

  const availableSeats = MOCK_ROOMS.reduce(
    (total, room) => total + Math.max(room.capacity - room.joinedPlayers, 0),
    0,
  );

  const joinableRooms = MOCK_ROOMS.filter(
    (room) => room.status === 'JOINABLE' || room.status === 'ALMOST_FULL',
  ).length;

  return (
    <>
      <section className="relative overflow-hidden rounded-[2rem] bg-[#2DCCD3] p-6 text-white shadow-[0_24px_60px_rgb(45_204_211_/_24%)] sm:p-10">
        <div
          className="absolute -right-16 -top-16 size-56 rounded-full bg-white/20"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-6 right-8 hidden h-28 w-44 rotate-[-7deg] rounded-[1.4rem] border border-white/35 bg-white/15 shadow-[inset_8px_8px_18px_rgb(255_255_255_/_22%)] lg:block"
          aria-hidden="true"
        />

        <div className="relative grid gap-8 lg:grid-cols-[1fr_360px] lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">
              Public rooms
            </p>

            <h1 className="mt-4 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
              Pick a table and enter with confidence.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
              Compare seats, speed, entry coins, expected payout, and room
              status before you commit your balance.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/rooms/join"
                className="clay-button clay-button--yellow inline-flex min-h-13 transform-gpu items-center justify-center gap-2 px-8 text-base font-extrabold transition-all duration-300"
              >
                <KeyRound className="size-5" strokeWidth={2.4} />
                Join Private Room
              </Link>

              <Link
                href="/play"
                className="clay-button clay-button--glass inline-flex min-h-13 transform-gpu items-center justify-center gap-2 px-8 text-base font-bold transition-all duration-300"
              >
                Practice First
                <ArrowRight className="size-5" strokeWidth={2.4} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              ['Rooms', MOCK_ROOMS.length],
              ['Open', availableSeats],
              ['Live', joinableRooms],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl bg-white/16 p-4 text-center shadow-[inset_5px_5px_12px_rgb(255_255_255_/_18%)] backdrop-blur"
              >
                <p className="font-[family-name:var(--font-sora)] text-2xl font-extrabold">
                  {value}
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/75">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-[inset_7px_7px_16px_rgb(255_255_255_/_80%),inset_-9px_-11px_18px_rgb(18_79_86_/_6%),0_14px_36px_rgb(18_79_86_/_7%)]">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-2xl bg-[#EAFBFC] text-[#008F98] shadow-[inset_4px_4px_10px_rgb(255_255_255_/_70%),inset_-5px_-6px_12px_rgb(18_79_86_/_8%)]">
                <SlidersHorizontal className="size-5" strokeWidth={2.4} />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
                  Filters
                </p>
                <h2 className="font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#16343D]">
                  Find your next table
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-2">
              {capacityOptions.map((option) => {
                const active = capacity === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setCapacity(option.value)}
                    className={`min-h-11 rounded-full px-5 text-sm font-bold transition ${
                      active
                        ? 'bg-[#16343D] text-white shadow-[0_10px_24px_rgb(18_52_61_/_18%)]'
                        : 'border border-[#16343D]/10 bg-white text-[#5C747C] hover:border-[#2DCCD3]/35 hover:text-[#008F98]'
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <label className="flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-full border border-[#16343D]/8 bg-[#F5FBFC] px-5 lg:justify-start">
              <span className="text-sm font-bold text-[#5C747C]">
                Joinable only
              </span>

              <input
                type="checkbox"
                checked={joinableOnly}
                onChange={(event) => setJoinableOnly(event.target.checked)}
                className="size-5 accent-[#2DCCD3]"
              />
            </label>
          </div>
        </div>
      </section>

      {rooms.length > 0 ? (
        <section className="mt-6 grid gap-5 xl:grid-cols-2">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </section>
      ) : (
        <section className="mt-6 rounded-[2rem] border border-dashed border-[#16343D]/15 bg-white p-10 text-center shadow-[0_14px_36px_rgb(18_79_86_/_6%)]">
          <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#EAFBFC] text-[#008F98]">
            <Search className="size-6" strokeWidth={2.4} />
          </span>

          <h2 className="mt-5 font-[family-name:var(--font-sora)] text-2xl font-extrabold text-[#16343D]">
            No matching rooms
          </h2>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[#5C747C]">
            Change the capacity or availability filter to see other tables.
          </p>
        </section>
      )}
    </>
  );
}
