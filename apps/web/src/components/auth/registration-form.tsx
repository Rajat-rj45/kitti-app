'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import { AuthSubmitButton } from '@/components/auth/auth-submit-button';
import { FormField } from '@/components/auth/form-field';
import {
  registrationSchema,
  type RegistrationFormValues,
} from '@/features/auth/schemas/auth-schema';

const avatars = [
  {
    id: 'cyan',
    label: 'Cyan avatar',
    initials: 'K',
    className: 'bg-[#2DCCD3] text-white',
  },
  {
    id: 'yellow',
    label: 'Yellow avatar',
    initials: 'A',
    className: 'bg-[#FFCA00] text-[#16343D]',
  },
  {
    id: 'teal',
    label: 'Dark teal avatar',
    initials: 'R',
    className: 'bg-[#16343D] text-white',
  },
  {
    id: 'green',
    label: 'Green avatar',
    initials: 'P',
    className: 'bg-[#24A878] text-white',
  },
] as const;

export function RegistrationForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      displayName: '',
      username: '',
      dateOfBirth: '',
      avatar: 'cyan',
      referralCode: '',
      termsAccepted: false,
      fairPlayAccepted: false,
    },
  });

  const selectedAvatar = useWatch({
    control,
    name: 'avatar',
  });

  async function onSubmit() {
    setSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    router.push('/home');
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[2rem] border border-[#16343D]/8 bg-white p-6 shadow-[0_20px_60px_rgb(18_79_86_/_10%)] sm:p-9"
    >
      <span className="inline-flex rounded-full bg-[#FFF7D6] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-[#8A6A00]">
        New player
      </span>

      <h1 className="mt-6 font-[family-name:var(--font-sora)] text-3xl font-extrabold tracking-[-0.04em] text-[#16343D] sm:text-4xl">
        Create your player profile
      </h1>

      <p className="mt-4 text-sm leading-7 text-[#5C747C]">
        Choose the identity other players will see during rooms and matches.
      </p>

      <div className="mt-8 space-y-2">
        <FormField
          label="Display name"
          type="text"
          autoComplete="name"
          placeholder="Rajat"
          registration={register('displayName')}
          error={errors.displayName}
        />

        <FormField
          label="Username"
          type="text"
          autoCapitalize="none"
          autoComplete="username"
          placeholder="rajat_player"
          registration={register('username')}
          error={errors.username}
          prefix="@"
        />

        <FormField
          label="Date of birth"
          type="date"
          registration={register('dateOfBirth')}
          error={errors.dateOfBirth}
          hint="Used only for eligibility and account protection."
        />
      </div>

      <fieldset className="mt-3">
        <legend className="text-sm font-bold text-[#16343D]">
          Choose an avatar
        </legend>

        <div className="mt-3 grid grid-cols-4 gap-3">
          {avatars.map((avatar) => {
            const selected = selectedAvatar === avatar.id;

            return (
              <button
                key={avatar.id}
                type="button"
                onClick={() =>
                  setValue('avatar', avatar.id, {
                    shouldValidate: true,
                  })
                }
                aria-label={avatar.label}
                aria-pressed={selected}
                className={`grid aspect-square transform-gpu place-items-center rounded-2xl border-2 transition-all duration-300 hover:-translate-y-0.5 ${
                  selected
                    ? 'border-[#2DCCD3] bg-[#EAFBFC] shadow-[inset_6px_6px_12px_rgb(255_255_255_/_75%),inset_-8px_-8px_14px_rgb(45_204_211_/_12%),0_14px_28px_rgb(45_204_211_/_14%)] ring-4 ring-[#2DCCD3]/10'
                    : 'border-[#16343D]/8 bg-white shadow-[inset_6px_6px_12px_rgb(255_255_255_/_75%),inset_-8px_-8px_14px_rgb(18_79_86_/_8%),0_10px_24px_rgb(18_79_86_/_7%)] hover:border-[#2DCCD3]/40'
                }`}
              >
                <span
                  className={`grid size-11 place-items-center rounded-full font-[family-name:var(--font-sora)] text-lg font-extrabold ${avatar.className}`}
                >
                  {avatar.initials}
                </span>
              </button>
            );
          })}
        </div>

        {errors.avatar && (
          <p className="mt-2 text-sm font-semibold text-[#C93C48]">
            {errors.avatar.message}
          </p>
        )}
      </fieldset>

      <div className="mt-5">
        <FormField
          label="Referral code"
          type="text"
          autoCapitalize="characters"
          placeholder="Optional"
          registration={register('referralCode')}
          error={errors.referralCode}
          hint="A referral code can only be applied once."
        />
      </div>

      <div className="mt-3 space-y-3">
        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-[#F5FBFC] p-4">
          <input
            type="checkbox"
            className="mt-0.5 size-5 accent-[#2DCCD3]"
            {...register('termsAccepted')}
          />

          <span className="text-sm leading-6 text-[#5C747C]">
            I accept the Terms and Privacy Policy.
          </span>
        </label>

        {errors.termsAccepted && (
          <p className="text-sm font-semibold text-[#C93C48]">
            {errors.termsAccepted.message}
          </p>
        )}

        <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-[#F5FBFC] p-4">
          <input
            type="checkbox"
            className="mt-0.5 size-5 accent-[#2DCCD3]"
            {...register('fairPlayAccepted')}
          />

          <span className="text-sm leading-6 text-[#5C747C]">
            I agree to follow the Fair Play and responsible-use rules.
          </span>
        </label>

        {errors.fairPlayAccepted && (
          <p className="text-sm font-semibold text-[#C93C48]">
            {errors.fairPlayAccepted.message}
          </p>
        )}
      </div>

      <div className="mt-7">
        <AuthSubmitButton
          loading={submitting}
          loadingLabel="Creating profile..."
        >
          Create Account
        </AuthSubmitButton>
      </div>
    </form>
  );
}
