'use client';

import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { AuthSubmitButton } from '@/components/auth/auth-submit-button';
import {
  otpSchema,
  type OtpFormValues,
} from '@/features/auth/schemas/auth-schema';

const RESEND_SECONDS = 30;

function maskMobileNumber(mobile: string) {
  if (mobile.length !== 10) {
    return '+91 ***** *****';
  }

  return `+91 ******${mobile.slice(-4)}`;
}

export function OtpForm() {
  const router = useRouter();

  const [mobile, setMobile] = useState('');
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMobile(sessionStorage.getItem('kitti:pending-mobile') ?? '');
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setSeconds((current) => current - 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [seconds]);

  async function onSubmit(values: OtpFormValues) {
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 600));

    if (values.otp === '123456') {
      router.push('/home');
      return;
    }

    router.push('/register');
  }

  function handleOtpChange(value: string) {
    setValue('otp', value.replace(/\D/g, '').slice(0, 6), {
      shouldValidate: true,
    });
  }

  function handleResend() {
    if (seconds > 0) {
      return;
    }

    setSeconds(RESEND_SECONDS);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[2rem] border border-[#16343D]/8 bg-white p-6 shadow-[0_20px_60px_rgb(18_79_86_/_10%)] sm:p-9"
    >
      <span className="inline-flex rounded-full bg-[#EAFBFC] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#008F98]">
        Verify mobile
      </span>

      <h1 className="mt-6 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] text-[#16343D] sm:text-4xl">
        Enter verification code
      </h1>

      <p className="mt-4 text-sm leading-7 text-[#5C747C]">
        We sent a six-digit code to{' '}
        <span className="font-bold text-[#16343D]">
          {maskMobileNumber(mobile)}
        </span>
        .
      </p>

      <div className="mt-8">
        <label
          htmlFor="otp"
          className="mb-2 block text-sm font-bold text-[#16343D]"
        >
          Verification code
        </label>

        <input
          id="otp"
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={6}
          placeholder="000000"
          aria-invalid={Boolean(errors.otp)}
          className={`min-h-16 w-full rounded-2xl border bg-white px-4 text-center font-[family-name:var(--font-sora)] text-2xl font-extrabold tracking-[0.28em] text-[#16343D] outline-none transition placeholder:text-[#C0CDD1] focus:border-[#2DCCD3] focus:ring-4 focus:ring-[#2DCCD3]/10 sm:px-5 sm:text-3xl sm:tracking-[0.42em] ${
            errors.otp ? 'border-[#E85661]' : 'border-[#16343D]/12'
          }`}
          {...register('otp')}
          onChange={(event) => handleOtpChange(event.target.value)}
        />

        <p
          className={`mt-2 min-h-5 text-sm ${
            errors.otp ? 'font-semibold text-[#C93C48]' : 'text-[#6C838A]'
          }`}
        >
          {errors.otp?.message ??
            'For the current UI demo, use 123456 for an existing player.'}
        </p>
      </div>

      <div className="mt-5">
        <AuthSubmitButton loading={submitting} loadingLabel="Verifying...">
          Verify and Continue
        </AuthSubmitButton>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-sm">
        <Link
          href="/login"
          className="font-bold text-[#008F98] hover:text-[#2DCCD3]"
        >
          Change number
        </Link>

        <button
          type="button"
          onClick={handleResend}
          disabled={seconds > 0}
          className="font-bold text-[#008F98] transition hover:text-[#2DCCD3] disabled:cursor-not-allowed disabled:text-[#91A4AA]"
        >
          {seconds > 0 ? `Resend in ${seconds}s` : 'Resend code'}
        </button>
      </div>
    </form>
  );
}
