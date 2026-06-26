import Link from 'next/link';

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'yellow';
};

const variants = {
  primary:
    'bg-[#2DCCD3] text-white shadow-[0_12px_28px_rgb(45_204_211_/_25%)] hover:bg-[#21B8BF]',

  secondary:
    'border border-[#2DCCD3] bg-white text-[#008F98] hover:bg-[#EAFBFC]',

  yellow:
    'bg-[#FFCA00] text-[#16343D] shadow-[0_12px_28px_rgb(255_202_0_/_22%)] hover:bg-[#F2BD00]',
} as const;

export function ButtonLink({
  href,
  children,
  variant = 'primary',
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-13 items-center justify-center rounded-full px-7 py-3 text-sm font-bold transition duration-200 ${variants[variant]}`}
    >
      {children}
    </Link>
  );
}