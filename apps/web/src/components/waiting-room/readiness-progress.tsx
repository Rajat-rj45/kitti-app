type ReadinessProgressProps = {
  ready: number;
  total: number;
};

export function ReadinessProgress({
  ready,
  total,
}: ReadinessProgressProps) {
  const percentage = Math.round((ready / total) * 100);

  return (
    <div
      className="relative grid size-40 shrink-0 place-items-center rounded-full sm:size-44"
      style={{
        background: `conic-gradient(#2DCCD3 ${percentage}%, rgba(255,255,255,0.12) ${percentage}% 100%)`,
      }}
      aria-label={`${ready} of ${total} players ready`}
    >
      <div className="grid size-[82%] place-items-center rounded-full bg-[#113843] shadow-inner">
        <div className="text-center">
          <p className="font-[family-name:var(--font-sora)] text-3xl font-extrabold text-white">
            {ready} of {total}
          </p>

          <p className="mt-1 text-xs font-bold text-[#7DE2E6]">
            players ready
          </p>
        </div>
      </div>
    </div>
  );
}
