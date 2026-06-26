type PlayerPageProps = {
  children: React.ReactNode;
  className?: string;
};

export function PlayerPage({
  children,
  className = '',
}: PlayerPageProps) {
  return (
    <main
      className={`mx-auto w-full max-w-[1440px] flex-1 px-4 pb-28 pt-6 sm:px-6 sm:pt-8 lg:px-8 lg:pb-10 ${className}`}
    >
      {children}
    </main>
  );
}