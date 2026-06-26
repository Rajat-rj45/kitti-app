type KittiLogoProps = {
  compact?: boolean;
};

export function KittiLogo({ compact = false }: KittiLogoProps) {
  return (
    <div className="inline-flex items-center gap-3" aria-label="Kitti">
      <div
        className="grid size-11 place-items-center rounded-2xl bg-[#2DCCD3] font-bold text-white shadow-[0_8px_24px_rgb(45_204_211_/_28%)]"
        aria-hidden="true"
      >
        K
      </div>

      {!compact && (
        <span className="font-[family-name:var(--font-sora)] text-xl font-extrabold tracking-[0.16em] text-[#16343D]">
          KITTI
        </span>
      )}
    </div>
  );
}