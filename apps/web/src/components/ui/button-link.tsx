import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

type ButtonLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  variant?: 'primary' | 'secondary' | 'yellow' | 'glass';
  size?: 'sm' | 'md' | 'lg';
};

const variants = {
  primary: 'clay-button--primary focus-visible:outline-[#2DCCD3]',

  secondary: 'clay-button--secondary focus-visible:outline-[#2DCCD3]',

  yellow: 'clay-button--yellow focus-visible:outline-[#FFCA00]',

  glass: 'clay-button--glass focus-visible:outline-white',
} as const;

const sizes = {
  sm: 'min-h-11 px-6 text-sm',
  md: 'min-h-12 px-7 py-3 text-sm',
  lg: 'min-h-13 px-8 py-3 text-base',
} as const;

export function ButtonLink({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`clay-button inline-flex transform-gpu items-center justify-center font-bold transition-all duration-300 ease-out ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
