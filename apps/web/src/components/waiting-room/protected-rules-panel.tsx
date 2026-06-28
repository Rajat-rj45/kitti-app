import {
  Clock3,
  Coins,
  MessageCircle,
  ScrollText,
  ShieldCheck,
  Users,
} from 'lucide-react';

import type { WaitingRoomData } from '@/features/waiting-room/waiting-room-types';

type ProtectedRulesPanelProps = {
  room: WaitingRoomData;
};

export function ProtectedRulesPanel({
  room,
}: ProtectedRulesPanelProps) {
  const rules = [
    {
      label: 'Rule version',
      value: room.ruleVersion,
      icon: ScrollText,
    },
    {
      label: 'Match format',
      value: 'Three rounds',
      icon: Users,
    },
    {
      label: 'Room pot',
      value: `${room.rules.expectedPot} coins`,
      icon: Coins,
    },
    {
      label: 'Platform fee',
      value: `${room.rules.platformFee} coins`,
      icon: ShieldCheck,
    },
    {
      label: 'Turn timer',
      value: `${room.rules.turnSeconds} seconds`,
      icon: Clock3,
    },
    {
      label: 'Chat',
      value: room.rules.chatEnabled ? 'Enabled' : 'Disabled',
      icon: MessageCircle,
    },
  ] as const;

  return (
    <aside className="rounded-[2rem] border border-[#FFCA00]/24 bg-gradient-to-br from-white via-[#FFFCF2] to-[#FFF6D6] p-5 shadow-[inset_7px_7px_16px_rgb(255_255_255_/_88%),inset_-10px_-12px_22px_rgb(138_106_0_/_5%),0_16px_40px_rgb(138_106_0_/_8%)] sm:p-7">
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#FFF2B8] text-[#8A6A00] shadow-[0_10px_22px_rgb(255_202_0_/_16%)]">
          <ShieldCheck className="size-6" strokeWidth={2.4} />
        </span>

        <div className="min-w-0">
          <h2 className="font-[family-name:var(--font-sora)] text-xl font-extrabold text-[#16343D] sm:text-2xl">
            Protected match rules
          </h2>

          <p className="mt-1 text-sm leading-6 text-[#6F7F79]">
            Server-validated settings for this room.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {rules.map((rule) => {
          const Icon = rule.icon;

          return (
            <article
              key={rule.label}
              className="min-w-0 rounded-2xl border border-[#16343D]/6 bg-white/78 px-4 py-4 shadow-[0_8px_18px_rgb(138_106_0_/_5%)]"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#FFF7D6] text-[#8A6A00]">
                  <Icon className="size-4" strokeWidth={2.3} />
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#758786]">
                    {rule.label}
                  </p>

                  <p className="mt-1 break-words font-[family-name:var(--font-sora)] text-base font-extrabold leading-6 text-[#16343D]">
                    {rule.value}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </aside>
  );
}
