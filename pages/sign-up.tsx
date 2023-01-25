import SignUpForm, { SignupForm, SignUpFormRef } from '@/components/SignUpForm';
import { useRouter } from 'next/router';
import { useCallback, useRef } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { SignUpResponse } from './api/sign-up';

/**
 * 회원 가입 페이지
 */
export default function SignUp() {
  const signUpFormRef = useRef<SignUpFormRef>(null);
  const router = useRouter();

  const handleSubmit: SubmitHandler<SignupForm> = useCallback(
    async ({ email, password, confirmPassword }) => {
      //? headers: { 'Content-Type': 'application/json' } 이거 안해주면
      //? 서버에서 req.body가 undefined가 된다.
      const response = await fetch('/api/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: SignUpResponse = await response.json();

      if (!data.success) {
        signUpFormRef.current?.setErrors(data.errors!);
        return;
      }

      router.replace('/');

      await new Promise((resolve) => setTimeout(resolve, 500));
    },
    [router],
  );

  return <SignUpForm ref={signUpFormRef} onSubmit={handleSubmit} />;
}
