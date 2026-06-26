import { PlayerBottomNav } from '@/components/layout/player-bottom-nav';
import { PlayerHeader } from '@/components/layout/player-header';
import { PlayerSidebar } from '@/components/layout/player-sidebar';

type PlayerLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function PlayerLayout({ children }: PlayerLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F5FBFC] text-[#16343D]">
      <PlayerSidebar />

      <div className="flex min-h-screen flex-col lg:pl-72">
        <PlayerHeader />
        {children}
      </div>

      <PlayerBottomNav />
    </div>
  );
}