// app/(auth)/[authType]/page.tsx

import LoginForm from '@/components/LoginForm/LoginForm';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ authType: string }>;
};

export default async function AuthPage({ params }: Props) {
  const { authType } = await params;

  if (authType !== 'login' && authType !== 'register') {
    return notFound();
  }

  return (
    <div>
      {authType === 'login' && <LoginForm />}
      {authType === 'register' && <RegisterForm />}
    </div>
  );
}