import type { Metadata } from 'next';

import { RegistrationForm } from '@/components/auth/registration-form';

export const metadata: Metadata = {
  title: 'Create Account',
  description: 'Create your Kitti player profile.',
};

export default function RegisterPage() {
  return <RegistrationForm />;
}
