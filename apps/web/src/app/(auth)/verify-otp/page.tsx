import type { Metadata } from 'next';

import { OtpForm } from '@/components/auth/otp-form';

export const metadata: Metadata = {
  title: 'Verify OTP',
  description: 'Verify your Kitti login code.',
};

export default function VerifyOtpPage() {
  return <OtpForm />;
}
