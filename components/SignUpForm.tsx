import TextField from '@/components/TextField';
import React, { useImperativeHandle } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'react-daisyui';

interface Props {
  onSubmit: SubmitHandler<SignupForm>;
}

export interface SignUpFormRef {
  setErrors: (errors: SignupFormErrors) => void;
}

/**
 * 회원 가입 폼
 */
const SignUpForm = React.forwardRef<SignUpFormRef, Props>(
  ({ onSubmit }, ref) => {
    const {
      register,
      handleSubmit,
      setError,
      formState: { errors, isSubmitting },
    } = useForm<SignupForm>({
      resolver: zodResolver(SignupSchema),
    });

    //? 부모 컴포넌트에서 setErrors를 호출할 수 있도록 ref를 설정
    useImperativeHandle(
      ref,
      () => {
        return {
          setErrors: (errors) => {
            Object.entries(errors).forEach(([key, value]) => {
              setError(key as SignupFormKeys, { message: value });
            });
          },
        };
      },
      [setError],
    );

    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-screen flex-col items-center justify-center gap-6"
      >
        <TextField
          id="email"
          label="이메일"
          type="text"
          inputProps={register('email')}
          error={errors.email?.message}
        />

        <TextField
          id="password"
          label="패스워드"
          type="password"
          inputProps={register('password')}
          error={errors.password?.message}
        />

        <TextField
          id="confirmPassword"
          label="패스워드 확인"
          type="password"
          inputProps={register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button disabled={isSubmitting} color="primary">
          {isSubmitting ? '로딩중...' : '회원 가입'}
        </Button>
      </form>
    );
  },
);

SignUpForm.displayName = 'SignUpForm';

export default SignUpForm;

const SignupSchema = z
  .object({
    email: z.string().email('이메일 형식이 아닙니다.'),
    password: z.string().min(6, '최소 6자리').max(18, '최대 18자리'),
    confirmPassword: z.string().min(6, '최소 6자리').max(18, '최대 18자리'),
  })
  .refine(
    (form) => {
      return form.password === form.confirmPassword;
    },
    {
      message: '패스워드가 일치하지 않습니다.',
      path: ['confirmPassword'],
    },
  );

export type SignupForm = z.infer<typeof SignupSchema>;
export type SignupFormKeys = keyof Omit<SignupForm, 'confirmPassword'>;
export type SignupFormErrors = Partial<Record<SignupFormKeys, string>>;
