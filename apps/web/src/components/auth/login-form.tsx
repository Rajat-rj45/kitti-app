'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { AuthSubmitButton } from '@/components/auth/auth-submit-button';
import { FormField } from '@/components/auth/form-field';
import {
  loginSchema,
  type LoginFormValues,
} from '@/features/auth/schemas/auth-schema';

export function LoginForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      mobile: '',
      consent: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setSubmitting(true);

    sessionStorage.setItem('kitti:pending-mobile', values.mobile);

    await new Promise((resolve) => setTimeout(resolve, 600));

    router.push('/verify-otp');
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[2rem] border border-[#16343D]/8 bg-white p-6 shadow-[0_20px_60px_rgb(18_79_86_/_10%)] sm:p-9"
    >
      <span className="inline-flex rounded-full bg-[#EAFBFC] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
        Player login
      </span>

      <h1 className="mt-6 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] text-[#16343D] sm:text-4xl">
        Welcome to Kitti
      </h1>

      <p className="mt-4 text-sm leading-7 text-[#5C747C]">
        Enter your mobile number. We will send a six-digit verification code.
      </p>

      <div className="mt-8">
        <FormField
          label="Mobile number"
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          placeholder="98765 43210"
          prefix="+91"
          registration={register('mobile')}
          error={errors.mobile}
          hint="Use the mobile number linked to your player account."
        />
      </div>

      <label className="mt-2 flex cursor-pointer items-start gap-3 rounded-2xl bg-[#F5FBFC] p-4">
        <input
          type="checkbox"
          className="mt-0.5 size-5 rounded border-[#16343D]/20 accent-[#2DCCD3]"
          {...register('consent')}
        />

        <span className="text-sm leading-6 text-[#5C747C]">
          I agree to the{' '}
          <Link
            href="/legal/terms"
            className="font-bold text-[#008F98] hover:text-[#2DCCD3]"
          >
            Terms
          </Link>{' '}
          and{' '}
          <Link
            href="/legal/privacy"
            className="font-bold text-[#008F98] hover:text-[#2DCCD3]"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {errors.consent && (
        <p className="mt-2 text-sm font-semibold text-[#C93C48]">
          {errors.consent.message}
        </p>
      )}

      <div className="mt-7">
        <AuthSubmitButton loading={submitting} loadingLabel="Sending code...">
          Continue
        </AuthSubmitButton>
      </div>

      <p className="mt-6 text-center text-sm text-[#6C838A]">
        Having trouble signing in?{' '}
        <Link
          href="/support"
          className="font-bold text-[#008F98] hover:text-[#2DCCD3]"
        >
          Contact support
        </Link>
      </p>
    </form>
  );
}
