import { z } from 'zod';

const indianMobilePattern = /^[6-9]\d{9}$/;

export const loginSchema = z.object({
  mobile: z
    .string()
    .trim()
    .min(1, 'Enter your mobile number.')
    .regex(indianMobilePattern, 'Enter a valid 10-digit Indian mobile number.'),
  consent: z.boolean().refine((value) => value, {
    message: 'You must accept the Terms and Privacy Policy.',
  }),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(/^\d{6}$/, 'Enter the complete 6-digit verification code.'),
});

export const registrationSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, 'Display name must contain at least 2 characters.')
      .max(30, 'Display name cannot exceed 30 characters.'),

    username: z
      .string()
      .trim()
      .min(3, 'Username must contain at least 3 characters.')
      .max(20, 'Username cannot exceed 20 characters.')
      .regex(
        /^[a-zA-Z0-9_]+$/,
        'Use only letters, numbers, and underscores.',
      ),

    dateOfBirth: z.string().min(1, 'Select your date of birth.'),

    avatar: z.string().min(1, 'Select an avatar.'),

    referralCode: z
      .string()
      .trim()
      .max(20, 'Referral code is too long.')
      .optional(),

    termsAccepted: z.boolean().refine((value) => value, {
      message: 'Accept the Terms and Privacy Policy.',
    }),

    fairPlayAccepted: z.boolean().refine((value) => value, {
      message: 'Accept the Fair Play rules.',
    }),
  })
  .superRefine((data, context) => {
    const birthDate = new Date(data.dateOfBirth);

    if (Number.isNaN(birthDate.getTime())) {
      return;
    }

    const today = new Date();
    const minimumEligibleDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );

    if (birthDate > minimumEligibleDate) {
      context.addIssue({
        code: 'custom',
        path: ['dateOfBirth'],
        message: 'You must meet the minimum age requirement.',
      });
    }
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type RegistrationFormValues = z.infer<typeof registrationSchema>;
